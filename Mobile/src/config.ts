// App Configuration
export const config = {
  // Set to true to use mock API instead of real backend
  USE_MOCK_API: false,

  // API Base URL - configure for your backend
  // For Android emulator use 10.0.2.2, for physical device use your machine's IP
  API_BASE_URL: 'http://10.0.2.2:8081/api/mobile',

  // Mock API delay in milliseconds (for realistic behavior)
  MOCK_API_DELAY: 300,

  // Validation thresholds
  HIGH_CONSUMPTION_MULTIPLIER: 5, // Alert if consumption > 5x average
  HIGH_CONSUMPTION_ABSOLUTE: 10000, // Alert if consumption > this value

  // Sync settings
  SYNC_RETRY_INTERVAL: 30000, // 30 seconds between auto-retry attempts
  MAX_SYNC_RETRIES: 3,
};

export default config;
