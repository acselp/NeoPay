import { useEffect, useCallback } from 'react';
import { create } from 'zustand';
import { api } from '../api';
import { QueuedReading, ReadingSubmission } from '../models/types';
import {
  getQueuedReadings,
  addToQueue,
  removeFromQueue,
  updateQueuedReading,
  clearQueue,
} from '../storage/queue';
import { generateUuid } from '../utils/uuid';
import { useNetworkStatus } from './useNetworkStatus';
import { config } from '../config';

interface SyncState {
  pendingCount: number;
  isSyncing: boolean;
  lastSyncAttempt: string | null;
  queuedReadings: QueuedReading[];
  setPendingCount: (count: number) => void;
  setIsSyncing: (syncing: boolean) => void;
  setLastSyncAttempt: (timestamp: string) => void;
  setQueuedReadings: (readings: QueuedReading[]) => void;
}

export const useSyncStore = create<SyncState>((set) => ({
  pendingCount: 0,
  isSyncing: false,
  lastSyncAttempt: null,
  queuedReadings: [],
  setPendingCount: (count) => set({ pendingCount: count }),
  setIsSyncing: (syncing) => set({ isSyncing: syncing }),
  setLastSyncAttempt: (timestamp) => set({ lastSyncAttempt: timestamp }),
  setQueuedReadings: (readings) => set({ queuedReadings: readings, pendingCount: readings.length }),
}));

interface SubmitReadingParams {
  meterId: number;
  value: number;
  timestamp: string;
  note?: string;
  exceptionReason?: string;
  connectionInfo?: {
    customerName: string;
    locationLabel: string;
    meterSerial: string;
  };
}

export function useOfflineSync() {
  const { isOnline } = useNetworkStatus();
  const {
    pendingCount,
    isSyncing,
    queuedReadings,
    setIsSyncing,
    setLastSyncAttempt,
    setQueuedReadings,
  } = useSyncStore();

  // Load queued readings on mount
  const loadQueue = useCallback(async () => {
    const readings = await getQueuedReadings();
    setQueuedReadings(readings);
  }, [setQueuedReadings]);

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  // Auto-sync when coming online
  useEffect(() => {
    if (isOnline && pendingCount > 0 && !isSyncing) {
      syncQueue();
    }
  }, [isOnline, pendingCount]);

  /**
   * Submit a reading - tries online first, queues if fails
   */
  const submitReading = useCallback(
    async (params: SubmitReadingParams): Promise<{ success: boolean; queued: boolean; error?: string }> => {
      const clientGeneratedId = generateUuid();
      const submission: ReadingSubmission = {
        clientGeneratedId,
        meterId: params.meterId,
        timestamp: params.timestamp,
        value: params.value,
        source: 'mobile',
        note: params.note,
        exceptionReason: params.exceptionReason,
      };

      // Try to submit online first
      if (isOnline) {
        try {
          await api.submitReading(submission);
          return { success: true, queued: false };
        } catch (error: any) {
          console.log('Online submit failed, queueing:', error.message);
        }
      }

      // Queue for later
      const queuedReading: QueuedReading = {
        ...submission,
        queuedAt: new Date().toISOString(),
        retryCount: 0,
        connectionInfo: params.connectionInfo,
      };

      await addToQueue(queuedReading);
      await loadQueue();

      return { success: true, queued: true };
    },
    [isOnline, loadQueue]
  );

  /**
   * Sync all queued readings
   */
  const syncQueue = useCallback(async () => {
    if (isSyncing || !isOnline) return;

    setIsSyncing(true);
    setLastSyncAttempt(new Date().toISOString());

    const readings = await getQueuedReadings();
    let successCount = 0;
    let failCount = 0;

    for (const reading of readings) {
      try {
        await api.submitReading({
          clientGeneratedId: reading.clientGeneratedId,
          meterId: reading.meterId,
          timestamp: reading.timestamp,
          value: reading.value,
          source: reading.source,
          note: reading.note,
          exceptionReason: reading.exceptionReason,
        });

        await removeFromQueue(reading.clientGeneratedId);
        successCount++;
      } catch (error: any) {
        failCount++;
        const newRetryCount = reading.retryCount + 1;

        if (newRetryCount >= config.MAX_SYNC_RETRIES) {
          // Keep in queue but mark with error
          await updateQueuedReading(reading.clientGeneratedId, {
            retryCount: newRetryCount,
            lastError: error.message || 'Unknown error',
          });
        } else {
          await updateQueuedReading(reading.clientGeneratedId, {
            retryCount: newRetryCount,
          });
        }
      }
    }

    await loadQueue();
    setIsSyncing(false);

    return { successCount, failCount };
  }, [isSyncing, isOnline, loadQueue, setIsSyncing, setLastSyncAttempt]);

  /**
   * Manually clear all queued readings
   */
  const clearAllQueued = useCallback(async () => {
    await clearQueue();
    await loadQueue();
  }, [loadQueue]);

  /**
   * Remove a specific reading from the queue
   */
  const removeQueued = useCallback(
    async (clientGeneratedId: string) => {
      await removeFromQueue(clientGeneratedId);
      await loadQueue();
    },
    [loadQueue]
  );

  return {
    pendingCount,
    isSyncing,
    queuedReadings,
    submitReading,
    syncQueue,
    clearAllQueued,
    removeQueued,
    loadQueue,
  };
}

export default useOfflineSync;
