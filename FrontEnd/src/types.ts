// Shared domain types used across the application.

export type CustomerStatus = 'active' | 'inactive' | 'pending';
export type ConnectionStatus = 'active' | 'pending' | 'disconnected';
export type MeterStatus = 'active' | 'inactive' | 'available';
export type ReadingSource = 'manual' | 'smart-meter';
export type ReadingType = 'cumulative' | 'direct';
export type RolloverBehavior = 'reset' | 'continue';

export interface Utility {
  id: string;
  name: string;
  unit: string;
  readingType: ReadingType;
  decimalsAllowed: number;
  rolloverValue: number;
  rolloverBehavior: RolloverBehavior;
  warningThreshold: number;
  createdAt: string;
  updatedBy: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  createdAt: string;
  notes: string;
}

export interface Location {
  id: string;
  customerId: string;
  label: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Connection {
  id: string;
  customerId: string;
  locationId: string;
  utilityId: string;
  status: ConnectionStatus;
  accountNumber: string;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Meter {
  id: string;
  connectionId: string | null;
  serialNumber: string;
  installDate: string | null;
  digits: number;
  multiplier: number;
  status: MeterStatus;
  manufacturer: string;
  model: string;
}

export interface Reading {
  id: string;
  meterId: string;
  value: number;
  readingDate: string;
  source: ReadingSource;
  createdBy: string;
}

export interface MeterHistoryEntry {
  id: string;
  connectionId: string;
  meterId: string;
  action: 'installed' | 'removed';
  date: string;
  performedBy: string;
  notes?: string;
  finalReading?: number;
  initialReading?: number;
}
