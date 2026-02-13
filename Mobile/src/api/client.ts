import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '../config';

const AUTH_TOKEN_KEY = '@utility_app:auth_token';

// Transform PascalCase keys to camelCase
function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function transformKeys(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(transformKeys);
  }
  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const camelKey = toCamelCase(key);
        newObj[camelKey] = transformKeys(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

// Transform camelCase keys to PascalCase for requests
function toPascalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function transformKeysToBackend(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(transformKeysToBackend);
  }
  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const pascalKey = toPascalCase(key);
        newObj[pascalKey] = transformKeysToBackend(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  async (requestConfig: InternalAxiosRequestConfig) => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (token && requestConfig.headers) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Failed to get auth token:', error);
    }
    return requestConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - transform PascalCase to camelCase and handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Transform response data from PascalCase to camelCase
    if (response.data && !config.USE_MOCK_API) {
      response.data = transformKeys(response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear it
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      // In a real app, you would redirect to login here
    }
    return Promise.reject(error);
  }
);

// Request interceptor - transform camelCase to PascalCase for request body
apiClient.interceptors.request.use(
  async (requestConfig: InternalAxiosRequestConfig) => {
    // Transform request data from camelCase to PascalCase
    if (requestConfig.data && !config.USE_MOCK_API) {
      requestConfig.data = transformKeysToBackend(requestConfig.data);
    }
    return requestConfig;
  }
);

// Token management
export const setAuthToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getAuthToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
};

export default apiClient;
