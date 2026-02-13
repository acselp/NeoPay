// Core Entity Types

export interface Customer {
  id: number;
  name: string;
}

export interface Connection {
  id: number;
  customerId: number;
  customerName: string;
  locationLabel: string;
  utilityName: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  meterId?: number;
}

export interface Meter {
  id: number;
  serialNumber: string;
  barcodeValue: string;
  digits: number; // Number of digits on meter display (e.g., 5, 6, 7)
  multiplier: number; // Consumption multiplier (e.g., 1, 10, 100)
  assignedConnectionId: number;
}

export interface Reading {
  id: number;
  meterId: number;
  timestamp: string; // ISO8601
  value: number;
  source: 'mobile' | 'web' | 'manual';
  note?: string;
  exceptionReason?: string;
}

// API Request/Response Types

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
}

export interface ReadingSubmission {
  clientGeneratedId: string;
  meterId: number;
  timestamp: string;
  value: number;
  source: 'mobile';
  note?: string;
  exceptionReason?: string;
}

export interface LastReadingResponse {
  reading: Reading | null;
  averageConsumption?: number; // Average consumption between readings
}

export interface ConnectionSearchParams {
  query?: string;
  status?: 'Active' | 'Inactive' | 'Suspended' | 'all';
}

// Offline Queue Types

export interface QueuedReading extends ReadingSubmission {
  queuedAt: string;
  retryCount: number;
  lastError?: string;
  connectionInfo?: {
    customerName: string;
    locationLabel: string;
    meterSerial: string;
  };
}

// Navigation Types

export type RootStackParamList = {
  Home: undefined;
  BarcodeScanner: undefined;
  ConnectionList: { initialQuery?: string };
  ConnectionDetail: { connectionId: number };
  AddReading: {
    connectionId: number;
    meterId: number;
    fromBarcode?: boolean;
  };
  SyncQueue: undefined;
  Settings: undefined;
};

// Validation Types

export interface ValidationResult {
  isValid: boolean;
  warnings: ValidationWarning[];
  errors: string[];
}

export interface ValidationWarning {
  type: 'lower_than_last' | 'unusually_high' | 'potential_rollover';
  message: string;
  requiresConfirmation: boolean;
  requiresReason: boolean;
}

export interface ReadingFormData {
  value: string;
  timestamp: Date;
  note: string;
  exceptionReason: string;
}

// UI State Types

export interface SyncStatus {
  isOnline: boolean;
  pendingCount: number;
  isSyncing: boolean;
  lastSyncAttempt?: string;
}
