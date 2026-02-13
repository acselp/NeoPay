import { Customer, Connection, Meter, Reading } from '../../models/types';

// Mock Customers
export const mockCustomers: Customer[] = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'ABC Corporation' },
  { id: 3, name: 'Maria Garcia' },
  { id: 4, name: 'Tech Solutions Inc.' },
  { id: 5, name: 'Robert Johnson' },
];

// Mock Connections
export const mockConnections: Connection[] = [
  {
    id: 101,
    customerId: 1,
    customerName: 'John Smith',
    locationLabel: '123 Main Street, Apt 4B',
    utilityName: 'Electricity',
    status: 'Active',
    meterId: 1001,
  },
  {
    id: 102,
    customerId: 1,
    customerName: 'John Smith',
    locationLabel: '123 Main Street, Apt 4B',
    utilityName: 'Gas',
    status: 'Active',
    meterId: 1002,
  },
  {
    id: 103,
    customerId: 2,
    customerName: 'ABC Corporation',
    locationLabel: '500 Business Park, Building A',
    utilityName: 'Electricity',
    status: 'Active',
    meterId: 1003,
  },
  {
    id: 104,
    customerId: 2,
    customerName: 'ABC Corporation',
    locationLabel: '500 Business Park, Building B',
    utilityName: 'Electricity',
    status: 'Active',
    meterId: 1004,
  },
  {
    id: 105,
    customerId: 3,
    customerName: 'Maria Garcia',
    locationLabel: '789 Oak Avenue',
    utilityName: 'Water',
    status: 'Active',
    meterId: 1005,
  },
  {
    id: 106,
    customerId: 4,
    customerName: 'Tech Solutions Inc.',
    locationLabel: '1000 Innovation Drive',
    utilityName: 'Electricity',
    status: 'Inactive',
    meterId: 1006,
  },
  {
    id: 107,
    customerId: 5,
    customerName: 'Robert Johnson',
    locationLabel: '456 Pine Street',
    utilityName: 'Electricity',
    status: 'Active',
    meterId: 1007,
  },
  {
    id: 108,
    customerId: 5,
    customerName: 'Robert Johnson',
    locationLabel: '456 Pine Street',
    utilityName: 'Gas',
    status: 'Suspended',
    meterId: 1008,
  },
];

// Mock Meters
export const mockMeters: Meter[] = [
  {
    id: 1001,
    serialNumber: 'EL-2023-001',
    barcodeValue: '1234567890123',
    digits: 6,
    multiplier: 1,
    assignedConnectionId: 101,
  },
  {
    id: 1002,
    serialNumber: 'GAS-2023-001',
    barcodeValue: '1234567890124',
    digits: 5,
    multiplier: 10,
    assignedConnectionId: 102,
  },
  {
    id: 1003,
    serialNumber: 'EL-2023-002',
    barcodeValue: '1234567890125',
    digits: 7,
    multiplier: 1,
    assignedConnectionId: 103,
  },
  {
    id: 1004,
    serialNumber: 'EL-2023-003',
    barcodeValue: '1234567890126',
    digits: 6,
    multiplier: 1,
    assignedConnectionId: 104,
  },
  {
    id: 1005,
    serialNumber: 'WTR-2023-001',
    barcodeValue: '1234567890127',
    digits: 5,
    multiplier: 100,
    assignedConnectionId: 105,
  },
  {
    id: 1006,
    serialNumber: 'EL-2022-099',
    barcodeValue: '1234567890128',
    digits: 6,
    multiplier: 1,
    assignedConnectionId: 106,
  },
  {
    id: 1007,
    serialNumber: 'EL-2024-001',
    barcodeValue: '9876543210001',
    digits: 6,
    multiplier: 1,
    assignedConnectionId: 107,
  },
  {
    id: 1008,
    serialNumber: 'GAS-2024-001',
    barcodeValue: '9876543210002',
    digits: 5,
    multiplier: 10,
    assignedConnectionId: 108,
  },
];

// Mock Readings (historical data)
export const mockReadings: Reading[] = [
  // Connection 101 - John Smith Electricity
  {
    id: 10001,
    meterId: 1001,
    timestamp: '2024-01-15T10:30:00Z',
    value: 45230,
    source: 'mobile',
  },
  {
    id: 10002,
    meterId: 1001,
    timestamp: '2024-02-15T11:00:00Z',
    value: 45680,
    source: 'mobile',
  },
  {
    id: 10003,
    meterId: 1001,
    timestamp: '2024-03-15T09:45:00Z',
    value: 46150,
    source: 'mobile',
  },

  // Connection 102 - John Smith Gas
  {
    id: 10004,
    meterId: 1002,
    timestamp: '2024-02-01T14:00:00Z',
    value: 12340,
    source: 'mobile',
  },
  {
    id: 10005,
    meterId: 1002,
    timestamp: '2024-03-01T13:30:00Z',
    value: 12520,
    source: 'mobile',
  },

  // Connection 103 - ABC Corp Building A
  {
    id: 10006,
    meterId: 1003,
    timestamp: '2024-03-01T08:00:00Z',
    value: 1234567,
    source: 'mobile',
  },

  // Connection 104 - ABC Corp Building B
  {
    id: 10007,
    meterId: 1004,
    timestamp: '2024-02-28T16:00:00Z',
    value: 567890,
    source: 'mobile',
  },

  // Connection 105 - Maria Garcia Water
  {
    id: 10008,
    meterId: 1005,
    timestamp: '2024-01-20T11:00:00Z',
    value: 23450,
    source: 'mobile',
  },
  {
    id: 10009,
    meterId: 1005,
    timestamp: '2024-02-20T10:30:00Z',
    value: 23890,
    source: 'mobile',
  },

  // Connection 106 - Tech Solutions (Inactive, old reading)
  {
    id: 10010,
    meterId: 1006,
    timestamp: '2023-06-15T09:00:00Z',
    value: 789012,
    source: 'mobile',
  },

  // Connection 107 - Robert Johnson Electricity (new meter, no readings)
  // No readings for meter 1007

  // Connection 108 - Robert Johnson Gas (suspended)
  {
    id: 10011,
    meterId: 1008,
    timestamp: '2024-01-10T10:00:00Z',
    value: 5670,
    source: 'mobile',
  },
];

// Helper to get meter by barcode
export function getMeterByBarcode(barcode: string): Meter | undefined {
  return mockMeters.find(m => m.barcodeValue === barcode);
}

// Helper to get meter by ID
export function getMeterById(id: number): Meter | undefined {
  return mockMeters.find(m => m.id === id);
}

// Helper to get connection by ID
export function getConnectionById(id: number): Connection | undefined {
  return mockConnections.find(c => c.id === id);
}

// Helper to get last reading for a meter
export function getLastReadingForMeter(meterId: number): Reading | undefined {
  const readings = mockReadings
    .filter(r => r.meterId === meterId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return readings[0];
}

// Helper to calculate average consumption for a meter
export function getAverageConsumption(meterId: number): number | undefined {
  const readings = mockReadings
    .filter(r => r.meterId === meterId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  if (readings.length < 2) return undefined;

  let totalConsumption = 0;
  for (let i = 1; i < readings.length; i++) {
    totalConsumption += readings[i].value - readings[i - 1].value;
  }

  return totalConsumption / (readings.length - 1);
}

// Helper to search connections
export function searchConnections(query: string, statusFilter?: string): Connection[] {
  const lowerQuery = query.toLowerCase();

  return mockConnections.filter(c => {
    // Status filter
    if (statusFilter && statusFilter !== 'all' && c.status !== statusFilter) {
      return false;
    }

    // Search in various fields
    const meter = mockMeters.find(m => m.assignedConnectionId === c.id);
    const searchableText = [
      c.customerName,
      c.locationLabel,
      c.utilityName,
      c.id.toString(),
      meter?.serialNumber || '',
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(lowerQuery);
  });
}

// Mutable readings array for adding new readings
let nextReadingId = 20000;
export function addReading(reading: Omit<Reading, 'id'>): Reading {
  const newReading: Reading = {
    ...reading,
    id: nextReadingId++,
  };
  mockReadings.push(newReading);
  return newReading;
}
