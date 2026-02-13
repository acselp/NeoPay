import apiClient from './client';
import { mockApi } from './mock/handlers';
import { config } from '../config';
import {
  Connection,
  Meter,
  LastReadingResponse,
  ReadingSubmission,
  Reading,
  ConnectionSearchParams,
} from '../models/types';

/**
 * API Endpoints
 * Automatically switches between mock and real API based on config
 */

export const api = {
  /**
   * Authenticate user
   */
  async login(username: string, password: string): Promise<{ token: string; expiresAt: string }> {
    if (config.USE_MOCK_API) {
      return mockApi.login(username, password);
    }

    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  },

  /**
   * Get meter by barcode value
   */
  async getMeterByBarcode(barcode: string): Promise<Meter | null> {
    if (config.USE_MOCK_API) {
      return mockApi.getMeterByBarcode(barcode);
    }

    try {
      const response = await apiClient.get(`/meters/by-barcode/${encodeURIComponent(barcode)}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  /**
   * Get meter by ID
   */
  async getMeterById(id: number): Promise<Meter | null> {
    if (config.USE_MOCK_API) {
      return mockApi.getMeterById(id);
    }

    try {
      const response = await apiClient.get(`/meters/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  /**
   * Get connection by ID
   */
  async getConnectionById(id: number): Promise<Connection | null> {
    if (config.USE_MOCK_API) {
      return mockApi.getConnectionById(id);
    }

    try {
      const response = await apiClient.get(`/connections/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  /**
   * Search connections
   */
  async searchConnections(params: ConnectionSearchParams): Promise<Connection[]> {
    if (config.USE_MOCK_API) {
      return mockApi.searchConnections(params);
    }

    const response = await apiClient.get('/connections', {
      params: {
        query: params.query,
        status: params.status || 'active',
      },
    });
    return response.data;
  },

  /**
   * Get last reading for a meter
   */
  async getLastReading(meterId: number): Promise<LastReadingResponse> {
    if (config.USE_MOCK_API) {
      return mockApi.getLastReading(meterId);
    }

    const response = await apiClient.get(`/meters/${meterId}/last-reading`);
    return response.data;
  },

  /**
   * Submit a new reading
   */
  async submitReading(submission: ReadingSubmission): Promise<Reading> {
    if (config.USE_MOCK_API) {
      return mockApi.submitReading(submission);
    }

    const response = await apiClient.post('/readings', submission);
    return response.data;
  },
};

export default api;
