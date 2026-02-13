import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../models/types';
import { Card, Input, Button } from '../components/common';
import { getSettings, saveSettings, resetSettings, AppSettings } from '../storage/settings';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useSyncStore } from '../hooks/useOfflineSync';

type SettingsNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface Props {
  navigation: SettingsNavigationProp;
}

export function SettingsScreen({ navigation }: Props) {
  const { isOnline } = useNetworkStatus();
  const { pendingCount } = useSyncStore();

  const [settings, setSettings] = useState<AppSettings>({
    apiBaseUrl: '',
    useMockApi: true,
    autoSync: true,
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const loaded = await getSettings();
    setSettings(loaded);
    setIsDirty(false);
  };

  const handleChange = (key: keyof AppSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveSettings(settings);
      setIsDirty(false);
      Alert.alert('Success', 'Settings saved. Restart the app for changes to take effect.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to defaults?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetSettings();
            await loadSettings();
            Alert.alert('Success', 'Settings reset to defaults');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Status */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Network</Text>
            <View style={[styles.statusIndicator, isOnline ? styles.online : styles.offline]}>
              <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
            </View>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Pending Uploads</Text>
            <Text style={styles.statusValue}>{pendingCount}</Text>
          </View>
        </Card>

        {/* API Configuration */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>API Configuration</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Use Mock API</Text>
              <Text style={styles.settingDescription}>
                Use built-in mock data instead of a real backend
              </Text>
            </View>
            <Switch
              value={settings.useMockApi}
              onValueChange={(value) => handleChange('useMockApi', value)}
              trackColor={{ false: '#DDD', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {!settings.useMockApi && (
            <Input
              label="API Base URL"
              placeholder="https://api.example.com/v1"
              value={settings.apiBaseUrl}
              onChangeText={(value) => handleChange('apiBaseUrl', value)}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
            />
          )}
        </Card>

        {/* Sync Settings */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Sync Settings</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Auto Sync</Text>
              <Text style={styles.settingDescription}>
                Automatically sync readings when online
              </Text>
            </View>
            <Switch
              value={settings.autoSync}
              onValueChange={(value) => handleChange('autoSync', value)}
              trackColor={{ false: '#DDD', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Card>

        {/* About */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Build</Text>
            <Text style={styles.aboutValue}>Development</Text>
          </View>
        </Card>

        {/* Actions */}
        <View style={styles.actions}>
          {isDirty && (
            <Button
              title="Save Changes"
              onPress={handleSave}
              loading={isSaving}
              style={styles.saveButton}
            />
          )}
          <Button
            title="Reset to Defaults"
            variant="outline"
            onPress={handleReset}
            style={styles.resetButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusLabel: {
    fontSize: 16,
    color: '#333',
  },
  statusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  online: {
    backgroundColor: '#34C759',
  },
  offline: {
    backgroundColor: '#FF3B30',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#999',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  aboutLabel: {
    fontSize: 14,
    color: '#666',
  },
  aboutValue: {
    fontSize: 14,
    color: '#333',
  },
  actions: {
    marginTop: 16,
    gap: 12,
  },
  saveButton: {
    width: '100%',
  },
  resetButton: {
    width: '100%',
  },
});

export default SettingsScreen;
