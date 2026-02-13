import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueuedReading } from '../models/types';

const QUEUE_KEY = '@utility_app:reading_queue';

/**
 * Get all queued readings
 */
export async function getQueuedReadings(): Promise<QueuedReading[]> {
  try {
    const data = await AsyncStorage.getItem(QUEUE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to get queued readings:', error);
    return [];
  }
}

/**
 * Add a reading to the queue
 */
export async function addToQueue(reading: QueuedReading): Promise<void> {
  try {
    const queue = await getQueuedReadings();
    queue.push(reading);
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Failed to add reading to queue:', error);
    throw error;
  }
}

/**
 * Remove a reading from the queue by clientGeneratedId
 */
export async function removeFromQueue(clientGeneratedId: string): Promise<void> {
  try {
    const queue = await getQueuedReadings();
    const filtered = queue.filter(r => r.clientGeneratedId !== clientGeneratedId);
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to remove reading from queue:', error);
    throw error;
  }
}

/**
 * Update a queued reading (e.g., increment retry count, set error)
 */
export async function updateQueuedReading(
  clientGeneratedId: string,
  updates: Partial<QueuedReading>
): Promise<void> {
  try {
    const queue = await getQueuedReadings();
    const index = queue.findIndex(r => r.clientGeneratedId === clientGeneratedId);
    if (index !== -1) {
      queue[index] = { ...queue[index], ...updates };
      await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    }
  } catch (error) {
    console.error('Failed to update queued reading:', error);
    throw error;
  }
}

/**
 * Clear the entire queue
 */
export async function clearQueue(): Promise<void> {
  try {
    await AsyncStorage.removeItem(QUEUE_KEY);
  } catch (error) {
    console.error('Failed to clear queue:', error);
    throw error;
  }
}

/**
 * Get count of queued readings
 */
export async function getQueueCount(): Promise<number> {
  const queue = await getQueuedReadings();
  return queue.length;
}
