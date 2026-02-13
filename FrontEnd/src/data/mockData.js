// Mock Data for Utility Management Platform

export const utilities = [
  {
    id: 'util-1',
    name: 'Electricity',
    unit: 'kWh',
    readingType: 'cumulative',
    decimalsAllowed: 2,
    rolloverValue: 99999,
    rolloverBehavior: 'reset',
    warningThreshold: 500,
    createdAt: '2024-01-15',
    updatedBy: 'admin',
  },
  {
    id: 'util-2',
    name: 'Water',
    unit: 'm³',
    readingType: 'cumulative',
    decimalsAllowed: 3,
    rolloverValue: 9999,
    rolloverBehavior: 'reset',
    warningThreshold: 50,
    createdAt: '2024-01-15',
    updatedBy: 'admin',
  },
  {
    id: 'util-3',
    name: 'Gas',
    unit: 'm³',
    readingType: 'cumulative',
    decimalsAllowed: 2,
    rolloverValue: 99999,
    rolloverBehavior: 'reset',
    warningThreshold: 100,
    createdAt: '2024-02-01',
    updatedBy: 'admin',
  },
];

export const customers = [
  {
    id: 'cust-1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    createdAt: '2024-01-20',
    notes: 'Premium customer, priority support',
  },
  {
    id: 'cust-2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 234-5678',
    status: 'active',
    createdAt: '2024-02-15',
    notes: '',
  },
  {
    id: 'cust-3',
    name: 'Michael Brown',
    email: 'mbrown@email.com',
    phone: '+1 (555) 345-6789',
    status: 'active',
    createdAt: '2024-03-01',
    notes: 'Multiple properties',
  },
  {
    id: 'cust-4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 456-7890',
    status: 'inactive',
    createdAt: '2023-11-10',
    notes: 'Account suspended - payment issues',
  },
  {
    id: 'cust-5',
    name: 'Robert Wilson',
    email: 'rwilson@email.com',
    phone: '+1 (555) 567-8901',
    status: 'active',
    createdAt: '2024-04-05',
    notes: '',
  },
  {
    id: 'cust-6',
    name: 'Jennifer Martinez',
    email: 'jmartinez@email.com',
    phone: '+1 (555) 678-9012',
    status: 'active',
    createdAt: '2024-01-25',
    notes: 'Business account',
  },
  {
    id: 'cust-7',
    name: 'David Anderson',
    email: 'danderson@email.com',
    phone: '+1 (555) 789-0123',
    status: 'active',
    createdAt: '2024-05-12',
    notes: '',
  },
  {
    id: 'cust-8',
    name: 'Lisa Thompson',
    email: 'lthompson@email.com',
    phone: '+1 (555) 890-1234',
    status: 'pending',
    createdAt: '2024-06-01',
    notes: 'New customer - awaiting first connection',
  },
];

export const locations = [
  {
    id: 'loc-1',
    customerId: 'cust-1',
    label: 'Main Residence',
    address: '123 Oak Street',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
  },
  {
    id: 'loc-2',
    customerId: 'cust-1',
    label: 'Vacation Home',
    address: '456 Beach Road',
    city: 'Miami',
    state: 'FL',
    zipCode: '33139',
  },
  {
    id: 'loc-3',
    customerId: 'cust-2',
    label: 'Home',
    address: '789 Maple Avenue',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62702',
  },
  {
    id: 'loc-4',
    customerId: 'cust-3',
    label: 'Property 1',
    address: '321 Pine Street',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
  },
  {
    id: 'loc-5',
    customerId: 'cust-3',
    label: 'Property 2',
    address: '654 Elm Court',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60602',
  },
  {
    id: 'loc-6',
    customerId: 'cust-3',
    label: 'Property 3',
    address: '987 Cedar Lane',
    city: 'Naperville',
    state: 'IL',
    zipCode: '60540',
  },
  {
    id: 'loc-7',
    customerId: 'cust-4',
    label: 'Home',
    address: '147 Birch Drive',
    city: 'Peoria',
    state: 'IL',
    zipCode: '61602',
  },
  {
    id: 'loc-8',
    customerId: 'cust-5',
    label: 'Home',
    address: '258 Willow Way',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62703',
  },
  {
    id: 'loc-9',
    customerId: 'cust-6',
    label: 'Office Building',
    address: '369 Commerce Blvd',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60603',
  },
  {
    id: 'loc-10',
    customerId: 'cust-7',
    label: 'Home',
    address: '741 Ash Street',
    city: 'Rockford',
    state: 'IL',
    zipCode: '61101',
  },
];

export const connections = [
  {
    id: 'conn-1',
    customerId: 'cust-1',
    locationId: 'loc-1',
    utilityId: 'util-1',
    status: 'active',
    accountNumber: 'ELEC-2024-001',
    startDate: '2024-01-25',
    endDate: null,
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25',
    updatedBy: 'admin',
  },
  {
    id: 'conn-2',
    customerId: 'cust-1',
    locationId: 'loc-1',
    utilityId: 'util-2',
    status: 'active',
    accountNumber: 'WATER-2024-001',
    startDate: '2024-01-25',
    endDate: null,
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25',
    updatedBy: 'admin',
  },
  {
    id: 'conn-3',
    customerId: 'cust-1',
    locationId: 'loc-2',
    utilityId: 'util-1',
    status: 'active',
    accountNumber: 'ELEC-2024-002',
    startDate: '2024-02-01',
    endDate: null,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
    updatedBy: 'admin',
  },
  {
    id: 'conn-4',
    customerId: 'cust-2',
    locationId: 'loc-3',
    utilityId: 'util-1',
    status: 'active',
    accountNumber: 'ELEC-2024-003',
    startDate: '2024-02-20',
    endDate: null,
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20',
    updatedBy: 'admin',
  },
  {
    id: 'conn-5',
    customerId: 'cust-2',
    locationId: 'loc-3',
    utilityId: 'util-2',
    status: 'active',
    accountNumber: 'WATER-2024-002',
    startDate: '2024-02-20',
    endDate: null,
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20',
    updatedBy: 'admin',
  },
  {
    id: 'conn-6',
    customerId: 'cust-3',
    locationId: 'loc-4',
    utilityId: 'util-1',
    status: 'active',
    accountNumber: 'ELEC-2024-004',
    startDate: '2024-03-05',
    endDate: null,
    createdAt: '2024-03-05',
    updatedAt: '2024-03-05',
    updatedBy: 'admin',
  },
  {
    id: 'conn-7',
    customerId: 'cust-3',
    locationId: 'loc-5',
    utilityId: 'util-1',
    status: 'pending',
    accountNumber: 'ELEC-2024-005',
    startDate: '2024-06-01',
    endDate: null,
    createdAt: '2024-05-28',
    updatedAt: '2024-05-28',
    updatedBy: 'admin',
  },
  {
    id: 'conn-8',
    customerId: 'cust-3',
    locationId: 'loc-6',
    utilityId: 'util-2',
    status: 'active',
    accountNumber: 'WATER-2024-003',
    startDate: '2024-03-10',
    endDate: null,
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10',
    updatedBy: 'admin',
  },
  {
    id: 'conn-9',
    customerId: 'cust-4',
    locationId: 'loc-7',
    utilityId: 'util-1',
    status: 'disconnected',
    accountNumber: 'ELEC-2023-010',
    startDate: '2023-11-15',
    endDate: '2024-04-01',
    createdAt: '2023-11-15',
    updatedAt: '2024-04-01',
    updatedBy: 'billing',
  },
  {
    id: 'conn-10',
    customerId: 'cust-5',
    locationId: 'loc-8',
    utilityId: 'util-1',
    status: 'active',
    accountNumber: 'ELEC-2024-006',
    startDate: '2024-04-10',
    endDate: null,
    createdAt: '2024-04-10',
    updatedAt: '2024-04-10',
    updatedBy: 'admin',
  },
  {
    id: 'conn-11',
    customerId: 'cust-5',
    locationId: 'loc-8',
    utilityId: 'util-2',
    status: 'active',
    accountNumber: 'WATER-2024-004',
    startDate: '2024-04-10',
    endDate: null,
    createdAt: '2024-04-10',
    updatedAt: '2024-04-10',
    updatedBy: 'admin',
  },
  {
    id: 'conn-12',
    customerId: 'cust-6',
    locationId: 'loc-9',
    utilityId: 'util-1',
    status: 'active',
    accountNumber: 'ELEC-2024-007',
    startDate: '2024-02-01',
    endDate: null,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
    updatedBy: 'admin',
  },
  {
    id: 'conn-13',
    customerId: 'cust-6',
    locationId: 'loc-9',
    utilityId: 'util-3',
    status: 'active',
    accountNumber: 'GAS-2024-001',
    startDate: '2024-02-15',
    endDate: null,
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15',
    updatedBy: 'admin',
  },
  {
    id: 'conn-14',
    customerId: 'cust-7',
    locationId: 'loc-10',
    utilityId: 'util-1',
    status: 'active',
    accountNumber: 'ELEC-2024-008',
    startDate: '2024-05-15',
    endDate: null,
    createdAt: '2024-05-15',
    updatedAt: '2024-05-15',
    updatedBy: 'admin',
  },
];

export const meters = [
  {
    id: 'meter-1',
    connectionId: 'conn-1',
    serialNumber: 'EM-2024-00125',
    installDate: '2024-01-25',
    digits: 5,
    multiplier: 1,
    status: 'active',
    manufacturer: 'SmartMeter Co',
    model: 'SM-500',
  },
  {
    id: 'meter-2',
    connectionId: 'conn-2',
    serialNumber: 'WM-2024-00089',
    installDate: '2024-01-25',
    digits: 4,
    multiplier: 1,
    status: 'active',
    manufacturer: 'AquaFlow',
    model: 'AF-200',
  },
  {
    id: 'meter-3',
    connectionId: 'conn-3',
    serialNumber: 'EM-2024-00156',
    installDate: '2024-02-01',
    digits: 5,
    multiplier: 1,
    status: 'active',
    manufacturer: 'SmartMeter Co',
    model: 'SM-500',
  },
  {
    id: 'meter-4',
    connectionId: 'conn-4',
    serialNumber: 'EM-2024-00201',
    installDate: '2024-02-20',
    digits: 5,
    multiplier: 1,
    status: 'active',
    manufacturer: 'PowerTrack',
    model: 'PT-300',
  },
  {
    id: 'meter-5',
    connectionId: 'conn-5',
    serialNumber: 'WM-2024-00112',
    installDate: '2024-02-20',
    digits: 4,
    multiplier: 1,
    status: 'active',
    manufacturer: 'AquaFlow',
    model: 'AF-200',
  },
  {
    id: 'meter-6',
    connectionId: 'conn-6',
    serialNumber: 'EM-2024-00267',
    installDate: '2024-03-05',
    digits: 6,
    multiplier: 1,
    status: 'active',
    manufacturer: 'SmartMeter Co',
    model: 'SM-600',
  },
  {
    id: 'meter-7',
    connectionId: 'conn-8',
    serialNumber: 'WM-2024-00145',
    installDate: '2024-03-10',
    digits: 4,
    multiplier: 1,
    status: 'active',
    manufacturer: 'HydroMeter',
    model: 'HM-150',
  },
  {
    id: 'meter-8',
    connectionId: 'conn-9',
    serialNumber: 'EM-2023-00089',
    installDate: '2023-11-15',
    digits: 5,
    multiplier: 1,
    status: 'inactive',
    manufacturer: 'PowerTrack',
    model: 'PT-300',
  },
  {
    id: 'meter-9',
    connectionId: 'conn-10',
    serialNumber: 'EM-2024-00312',
    installDate: '2024-04-10',
    digits: 5,
    multiplier: 1,
    status: 'active',
    manufacturer: 'SmartMeter Co',
    model: 'SM-500',
  },
  {
    id: 'meter-10',
    connectionId: 'conn-11',
    serialNumber: 'WM-2024-00178',
    installDate: '2024-04-10',
    digits: 4,
    multiplier: 1,
    status: 'active',
    manufacturer: 'AquaFlow',
    model: 'AF-200',
  },
  {
    id: 'meter-11',
    connectionId: 'conn-12',
    serialNumber: 'EM-2024-00189',
    installDate: '2024-02-01',
    digits: 6,
    multiplier: 10,
    status: 'active',
    manufacturer: 'IndustrialPower',
    model: 'IP-1000',
  },
  {
    id: 'meter-12',
    connectionId: 'conn-13',
    serialNumber: 'GM-2024-00023',
    installDate: '2024-02-15',
    digits: 5,
    multiplier: 1,
    status: 'active',
    manufacturer: 'GasTrack',
    model: 'GT-400',
  },
  {
    id: 'meter-13',
    connectionId: 'conn-14',
    serialNumber: 'EM-2024-00398',
    installDate: '2024-05-15',
    digits: 5,
    multiplier: 1,
    status: 'active',
    manufacturer: 'SmartMeter Co',
    model: 'SM-500',
  },
  // Unassigned meters (available for new connections)
  {
    id: 'meter-14',
    connectionId: null,
    serialNumber: 'EM-2024-00412',
    installDate: null,
    digits: 5,
    multiplier: 1,
    status: 'available',
    manufacturer: 'SmartMeter Co',
    model: 'SM-500',
  },
  {
    id: 'meter-15',
    connectionId: null,
    serialNumber: 'WM-2024-00201',
    installDate: null,
    digits: 4,
    multiplier: 1,
    status: 'available',
    manufacturer: 'AquaFlow',
    model: 'AF-200',
  },
  {
    id: 'meter-16',
    connectionId: null,
    serialNumber: 'GM-2024-00045',
    installDate: null,
    digits: 5,
    multiplier: 1,
    status: 'available',
    manufacturer: 'GasTrack',
    model: 'GT-400',
  },
];

export const readings = [
  // Connection 1 - Electricity (John Smith - Main Residence)
  { id: 'read-1', meterId: 'meter-1', value: 1250, readingDate: '2024-02-01', source: 'manual', createdBy: 'field-tech-1' },
  { id: 'read-2', meterId: 'meter-1', value: 1520, readingDate: '2024-03-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-3', meterId: 'meter-1', value: 1810, readingDate: '2024-04-01', source: 'manual', createdBy: 'field-tech-1' },
  { id: 'read-4', meterId: 'meter-1', value: 2150, readingDate: '2024-05-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-5', meterId: 'meter-1', value: 2580, readingDate: '2024-06-01', source: 'smart-meter', createdBy: 'system' },

  // Connection 2 - Water (John Smith - Main Residence)
  { id: 'read-6', meterId: 'meter-2', value: 125.5, readingDate: '2024-02-01', source: 'manual', createdBy: 'field-tech-1' },
  { id: 'read-7', meterId: 'meter-2', value: 142.3, readingDate: '2024-03-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-8', meterId: 'meter-2', value: 158.7, readingDate: '2024-04-01', source: 'manual', createdBy: 'field-tech-1' },
  { id: 'read-9', meterId: 'meter-2', value: 189.2, readingDate: '2024-05-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-10', meterId: 'meter-2', value: 215.8, readingDate: '2024-06-01', source: 'manual', createdBy: 'field-tech-1' },

  // Connection 3 - Electricity (John Smith - Vacation Home)
  { id: 'read-11', meterId: 'meter-3', value: 450, readingDate: '2024-03-01', source: 'manual', createdBy: 'field-tech-3' },
  { id: 'read-12', meterId: 'meter-3', value: 520, readingDate: '2024-04-01', source: 'manual', createdBy: 'field-tech-3' },
  { id: 'read-13', meterId: 'meter-3', value: 890, readingDate: '2024-05-01', source: 'manual', createdBy: 'field-tech-3' },
  { id: 'read-14', meterId: 'meter-3', value: 1250, readingDate: '2024-06-01', source: 'manual', createdBy: 'field-tech-3' },

  // Connection 4 - Electricity (Sarah Johnson)
  { id: 'read-15', meterId: 'meter-4', value: 780, readingDate: '2024-03-01', source: 'manual', createdBy: 'field-tech-1' },
  { id: 'read-16', meterId: 'meter-4', value: 1050, readingDate: '2024-04-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-17', meterId: 'meter-4', value: 1320, readingDate: '2024-05-01', source: 'manual', createdBy: 'field-tech-1' },
  { id: 'read-18', meterId: 'meter-4', value: 1590, readingDate: '2024-06-01', source: 'smart-meter', createdBy: 'system' },

  // Connection 5 - Water (Sarah Johnson)
  { id: 'read-19', meterId: 'meter-5', value: 45.2, readingDate: '2024-03-01', source: 'manual', createdBy: 'field-tech-1' },
  { id: 'read-20', meterId: 'meter-5', value: 62.8, readingDate: '2024-04-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-21', meterId: 'meter-5', value: 78.5, readingDate: '2024-05-01', source: 'manual', createdBy: 'field-tech-1' },
  { id: 'read-22', meterId: 'meter-5', value: 95.1, readingDate: '2024-06-01', source: 'manual', createdBy: 'field-tech-2' },

  // Connection 6 - Electricity (Michael Brown - Property 1)
  { id: 'read-23', meterId: 'meter-6', value: 2500, readingDate: '2024-04-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-24', meterId: 'meter-6', value: 3200, readingDate: '2024-05-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-25', meterId: 'meter-6', value: 3950, readingDate: '2024-06-01', source: 'smart-meter', createdBy: 'system' },

  // Connection 8 - Water (Michael Brown - Property 3)
  { id: 'read-26', meterId: 'meter-7', value: 89.5, readingDate: '2024-04-01', source: 'manual', createdBy: 'field-tech-1' },
  { id: 'read-27', meterId: 'meter-7', value: 112.3, readingDate: '2024-05-01', source: 'manual', createdBy: 'field-tech-1' },
  { id: 'read-28', meterId: 'meter-7', value: 135.7, readingDate: '2024-06-01', source: 'manual', createdBy: 'field-tech-1' },

  // Connection 9 - Electricity (Emily Davis - Disconnected) - Old readings
  { id: 'read-29', meterId: 'meter-8', value: 5600, readingDate: '2023-12-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-30', meterId: 'meter-8', value: 5890, readingDate: '2024-01-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-31', meterId: 'meter-8', value: 6150, readingDate: '2024-02-01', source: 'manual', createdBy: 'field-tech-1' },
  { id: 'read-32', meterId: 'meter-8', value: 6380, readingDate: '2024-03-01', source: 'manual', createdBy: 'field-tech-1' },

  // Connection 10 - Electricity (Robert Wilson)
  { id: 'read-33', meterId: 'meter-9', value: 320, readingDate: '2024-05-01', source: 'manual', createdBy: 'field-tech-3' },
  { id: 'read-34', meterId: 'meter-9', value: 580, readingDate: '2024-06-01', source: 'manual', createdBy: 'field-tech-3' },

  // Connection 11 - Water (Robert Wilson)
  { id: 'read-35', meterId: 'meter-10', value: 28.5, readingDate: '2024-05-01', source: 'manual', createdBy: 'field-tech-3' },
  { id: 'read-36', meterId: 'meter-10', value: 45.2, readingDate: '2024-06-01', source: 'manual', createdBy: 'field-tech-3' },

  // Connection 12 - Electricity (Jennifer Martinez - Business)
  { id: 'read-37', meterId: 'meter-11', value: 15000, readingDate: '2024-03-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-38', meterId: 'meter-11', value: 18500, readingDate: '2024-04-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-39', meterId: 'meter-11', value: 22100, readingDate: '2024-05-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-40', meterId: 'meter-11', value: 25800, readingDate: '2024-06-01', source: 'smart-meter', createdBy: 'system' },

  // Connection 13 - Gas (Jennifer Martinez - Business)
  { id: 'read-41', meterId: 'meter-12', value: 450, readingDate: '2024-03-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-42', meterId: 'meter-12', value: 520, readingDate: '2024-04-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-43', meterId: 'meter-12', value: 580, readingDate: '2024-05-01', source: 'manual', createdBy: 'field-tech-2' },
  { id: 'read-44', meterId: 'meter-12', value: 645, readingDate: '2024-06-01', source: 'manual', createdBy: 'field-tech-2' },

  // Connection 14 - Electricity (David Anderson)
  { id: 'read-45', meterId: 'meter-13', value: 250, readingDate: '2024-06-01', source: 'manual', createdBy: 'field-tech-1' },
];

// Meter history for tracking replacements
export const meterHistory = [
  {
    id: 'hist-1',
    connectionId: 'conn-1',
    meterId: 'meter-1',
    action: 'installed',
    date: '2024-01-25',
    performedBy: 'field-tech-1',
    notes: 'Initial meter installation',
  },
  {
    id: 'hist-2',
    connectionId: 'conn-6',
    meterId: 'meter-old-1',
    action: 'removed',
    date: '2024-04-15',
    performedBy: 'field-tech-2',
    notes: 'Meter malfunction - replaced',
    finalReading: 2100,
  },
  {
    id: 'hist-3',
    connectionId: 'conn-6',
    meterId: 'meter-6',
    action: 'installed',
    date: '2024-04-15',
    performedBy: 'field-tech-2',
    notes: 'Replacement meter installed',
    initialReading: 0,
  },
];

// Helper functions to get related data
export const getCustomerConnections = (customerId) =>
  connections.filter(c => c.customerId === customerId);

export const getCustomerLocations = (customerId) =>
  locations.filter(l => l.customerId === customerId);

export const getConnectionMeter = (connectionId) =>
  meters.find(m => m.connectionId === connectionId);

export const getMeterReadings = (meterId) =>
  readings.filter(r => r.meterId === meterId).sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate));

export const getLatestReading = (meterId) => {
  const meterReadings = getMeterReadings(meterId);
  return meterReadings.length > 0 ? meterReadings[0] : null;
};

export const getUtility = (utilityId) =>
  utilities.find(u => u.id === utilityId);

export const getLocation = (locationId) =>
  locations.find(l => l.id === locationId);

export const getCustomer = (customerId) =>
  customers.find(c => c.id === customerId);

export const getConnection = (connectionId) =>
  connections.find(c => c.id === connectionId);

export const getAvailableMeters = () =>
  meters.filter(m => m.status === 'available');

// Calculate consumption between two readings
export const calculateConsumption = (currentValue, previousValue, rolloverValue = 99999) => {
  if (currentValue >= previousValue) {
    return currentValue - previousValue;
  }
  // Handle rollover
  return (rolloverValue - previousValue) + currentValue;
};
