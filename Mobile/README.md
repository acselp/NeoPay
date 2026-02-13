# Utility Reader - Mobile App

A React Native (Expo) mobile application for capturing utility meter consumption readings. Built for fast data entry, offline-first operation, and strong validation.

## Features

- **Barcode Scanning**: Scan meter barcodes (EAN, Code128, QR) to quickly find meters
- **Connection Search**: Search by customer name, address, connection ID, or meter serial
- **Offline-First**: Readings are queued locally when offline and synced when connected
- **Validation**: Comprehensive validation with warnings for:
  - Readings lower than previous (requires reason)
  - Unusually high consumption (requires confirmation)
  - Potential meter rollover detection
- **Consumption Calculation**: Automatic calculation with multiplier support

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: React Query + Zustand
- **Navigation**: React Navigation (Stack)
- **Storage**: AsyncStorage
- **Networking**: Axios
- **Offline Detection**: @react-native-community/netinfo

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)
- Expo Go app on your mobile device (for testing)

### Installation

```bash
# Clone the repository
cd Mobile

# Install dependencies
npm install

# Start the development server
npm start
```

### Running on Device/Emulator

```bash
# Start Expo development server
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator (macOS only)
npm run ios
```

To test on a physical device:
1. Install the Expo Go app from Play Store/App Store
2. Scan the QR code shown in the terminal

## Project Structure

```
src/
├── api/                    # API layer
│   ├── client.ts          # Axios instance with interceptors
│   ├── endpoints.ts       # API endpoint definitions
│   ├── index.ts           # Exports
│   └── mock/              # Mock API implementation
│       ├── data.ts        # Mock data
│       └── handlers.ts    # Mock request handlers
├── components/            # Reusable components
│   ├── common/           # Basic UI components
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── LoadingSpinner.tsx
│   ├── ConnectionCard.tsx
│   └── SyncBanner.tsx
├── hooks/                 # Custom React hooks
│   ├── useConnections.ts
│   ├── useMeters.ts
│   ├── useNetworkStatus.ts
│   ├── useOfflineSync.ts
│   └── useReadings.ts
├── models/               # TypeScript types & validation
│   ├── types.ts
│   └── validation.ts
├── navigation/           # Navigation setup
│   └── AppNavigator.tsx
├── screens/              # Screen components
│   ├── AddReadingScreen.tsx
│   ├── BarcodeScannerScreen.tsx
│   ├── ConnectionDetailScreen.tsx
│   ├── ConnectionListScreen.tsx
│   ├── HomeScreen.tsx
│   ├── SettingsScreen.tsx
│   └── SyncQueueScreen.tsx
├── storage/              # Local storage utilities
│   ├── queue.ts
│   └── settings.ts
├── utils/                # Utility functions
│   ├── formatters.ts
│   └── uuid.ts
└── config.ts             # App configuration
```

## Configuration

### API Configuration

Edit `src/config.ts` to configure the API:

```typescript
export const config = {
  // Set to true to use mock API (default)
  USE_MOCK_API: true,

  // API Base URL for real backend
  API_BASE_URL: 'https://api.example.com/v1',

  // Mock API delay in milliseconds
  MOCK_API_DELAY: 300,

  // Validation thresholds
  HIGH_CONSUMPTION_MULTIPLIER: 5,
  HIGH_CONSUMPTION_ABSOLUTE: 10000,
};
```

### Runtime Settings

Settings can also be changed at runtime via the Settings screen:
- Toggle between mock and real API
- Configure API base URL
- Enable/disable auto-sync

## API Contract

The app expects a REST JSON API with these endpoints:

### Authentication
```
POST /auth/login
Body: { username, password }
Response: { token, expiresAt }
```

### Meters
```
GET /meters/by-barcode/{barcode}
GET /meters/{id}
GET /meters/{id}/last-reading
```

### Connections
```
GET /connections?query=...&status=active
GET /connections/{id}
```

### Readings
```
POST /readings
Body: {
  clientGeneratedId: "uuid",
  meterId: 123,
  timestamp: "ISO8601",
  value: 12345.6,
  source: "mobile",
  note: "optional",
  exceptionReason: "optional"
}
```

## Offline Queue

When offline or when submissions fail:

1. Readings are stored locally in AsyncStorage
2. A sync banner shows pending count
3. Auto-retry attempts occur when connectivity is restored
4. Manual sync available via Sync Queue screen
5. `clientGeneratedId` ensures idempotent submissions

### Queue Storage Format

```typescript
interface QueuedReading {
  clientGeneratedId: string;
  meterId: number;
  timestamp: string;
  value: number;
  source: 'mobile';
  note?: string;
  exceptionReason?: string;
  queuedAt: string;
  retryCount: number;
  lastError?: string;
  connectionInfo?: {
    customerName: string;
    locationLabel: string;
    meterSerial: string;
  };
}
```

## Validation Rules

### Reading Validation

1. **Numeric value required**: Must be a valid positive number
2. **Lower than last reading**:
   - Shows warning dialog
   - Requires reason text if proceeding
3. **Unusually high consumption**:
   - Triggers if consumption > 5x average OR > absolute threshold
   - Requires confirmation to proceed
4. **Potential rollover**:
   - Detected when last reading is > 90% of max and new reading is < 10%
   - Shows informational warning

### Consumption Calculation

```
consumption = (newValue - lastValue) * multiplier

// For rollover:
consumption = ((maxValue - lastValue) + newValue) * multiplier
```

## Mock Data

The mock API includes realistic test data:

- **5 Customers**: John Smith, ABC Corporation, Maria Garcia, Tech Solutions Inc., Robert Johnson
- **8 Connections**: Mix of Active/Inactive/Suspended statuses
- **Multiple Utilities**: Electricity, Gas, Water
- **Varied Meters**: Different digit counts (5, 6, 7) and multipliers (1, 10, 100)
- **Historical Readings**: Some meters have reading history, some are new

### Test Barcodes

For testing the barcode scanner flow:
- `1234567890123` - John Smith Electricity meter
- `1234567890124` - John Smith Gas meter
- `9876543210001` - Robert Johnson Electricity (new meter, no readings)

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Troubleshooting

### Camera Permission

If barcode scanning doesn't work:
1. Check that camera permission is granted in device settings
2. Restart the app after granting permission

### Network Issues

If readings aren't syncing:
1. Check the Sync Queue screen for error messages
2. Verify API URL in Settings
3. Check device network connectivity
4. Try manual "Sync Now" button

### Mock API

To quickly test without a backend:
1. Ensure `USE_MOCK_API: true` in config.ts
2. Use the test barcodes listed above
3. Mock API has 10% random failure rate to test offline queueing

## License

Private - All rights reserved
