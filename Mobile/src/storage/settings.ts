import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = '@utility_app:settings';

export interface AppSettings {
  apiBaseUrl: string;
  useMockApi: boolean;
  autoSync: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  apiBaseUrl: 'https://api.example.com/v1',
  useMockApi: true,
  autoSync: true,
};

/**
 * Get app settings
 */
export async function getSettings(): Promise<AppSettings> {
  try {
    const data = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!data) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch (error) {
    console.error('Failed to get settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Save app settings
 */
export async function saveSettings(settings: Partial<AppSettings>): Promise<void> {
  try {
    const current = await getSettings();
    const updated = { ...current, ...settings };
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save settings:', error);
    throw error;
  }
}

/**
 * Reset settings to defaults
 */
export async function resetSettings(): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
  } catch (error) {
    console.error('Failed to reset settings:', error);
    throw error;
  }
}
