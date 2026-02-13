import { config } from '../../config';
import {
  Connection,
  Meter,
  LastReadingResponse,
  ReadingSubmission,
  Reading,
  ConnectionSearchParams,
} from '../../models/types';
import {
  getMeterByBarcode,
  getMeterById,
  getConnectionById,
  getLastReadingForMeter,
  getAverageConsumption,
  searchConnections,
  addReading,
  mockConnections,
} from './data';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock API Handlers
 * These simulate backend API responses with realistic delays
 */

export const mockApi = {
  /**
   * Authenticate user (stub - always succeeds)
   */
  async login(username: string, password: string): Promise<{ token: string; expiresAt: string }> {
    await delay(config.MOCK_API_DELAY);

    // Always succeed for mock
    return {
      token: 'mock-jwt-token-' + Date.now(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  },

  /**
   * Get meter by barcode value
   */
  async getMeterByBarcode(barcode: string): Promise<Meter | null> {
    await delay(config.MOCK_API_DELAY);

    const meter = getMeterByBarcode(barcode);
    return meter || null;
  },

  /**
   * Get meter by ID
   */
  async getMeterById(id: number): Promise<Meter | null> {
    await delay(config.MOCK_API_DELAY);

    const meter = getMeterById(id);
    return meter || null;
  },

  /**
   * Get connection by ID
   */
  async getConnectionById(id: number): Promise<Connection | null> {
    await delay(config.MOCK_API_DELAY);

    const connection = getConnectionById(id);
    return connection || null;
  },

  /**
   * Search connections with optional filters
   */
  async searchConnections(params: ConnectionSearchParams): Promise<Connection[]> {
    await delay(config.MOCK_API_DELAY);

    const { query = '', status = 'Active' } = params;

    if (!query && status === 'Active') {
      // Return all active connections if no search query
      return mockConnections.filter(c => c.status === 'Active');
    }

    return searchConnections(query, status === 'all' ? undefined : status);
  },

  /**
   * Get last reading for a meter
   */
  async getLastReading(meterId: number): Promise<LastReadingResponse> {
    await delay(config.MOCK_API_DELAY);

    const reading = getLastReadingForMeter(meterId);
    const avgConsumption = getAverageConsumption(meterId);

    return {
      reading: reading || null,
      averageConsumption: avgConsumption,
    };
  },

  /**
   * Submit a new reading
   */
  async submitReading(submission: ReadingSubmission): Promise<Reading> {
    await delay(config.MOCK_API_DELAY * 2); // Slightly longer for writes

    // Simulate occasional failures (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Network error: Unable to submit reading');
    }

    const newReading = addReading({
      meterId: submission.meterId,
      timestamp: submission.timestamp,
      value: submission.value,
      source: submission.source,
      note: submission.note,
      exceptionReason: submission.exceptionReason,
    });

    return newReading;
  },
};

export default mockApi;
