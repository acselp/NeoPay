import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../models/types';
import { SyncBanner } from '../components/SyncBanner';
import { useSyncStore } from '../hooks/useOfflineSync';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export function HomeScreen({ navigation }: Props) {
  const { pendingCount } = useSyncStore();

  return (
    <SafeAreaView style={styles.container}>
      <SyncBanner onPress={() => navigation.navigate('SyncQueue')} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Meter Reading</Text>
          <Text style={styles.subtitle}>
            Capture consumption readings quickly and reliably
          </Text>
        </View>

        <View style={styles.actions}>
          {/* Scan Barcode Button */}
          <TouchableOpacity
            style={[styles.actionButton, styles.scanButton]}
            onPress={() => navigation.navigate('BarcodeScanner')}
            activeOpacity={0.8}
          >
            <Text style={styles.actionIcon}>[ ]</Text>
            <Text style={styles.actionTitle}>Scan Barcode</Text>
            <Text style={styles.actionDescription}>
              Scan meter barcode to quickly add a reading
            </Text>
          </TouchableOpacity>

          {/* Find Connection Button */}
          <TouchableOpacity
            style={[styles.actionButton, styles.findButton]}
            onPress={() => navigation.navigate('ConnectionList', {})}
            activeOpacity={0.8}
          >
            <Text style={styles.actionIcon}>Q</Text>
            <Text style={styles.actionTitle}>Find Connection</Text>
            <Text style={styles.actionDescription}>
              Search by customer, address, or meter serial
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.settingsLink}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.settingsText}>Settings</Text>
          </TouchableOpacity>

          {pendingCount > 0 && (
            <TouchableOpacity
              style={styles.queueLink}
              onPress={() => navigation.navigate('SyncQueue')}
            >
              <Text style={styles.queueText}>
                {pendingCount} pending upload{pendingCount > 1 ? 's' : ''}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  actions: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  actionButton: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#007AFF',
  },
  findButton: {
    backgroundColor: '#5856D6',
  },
  actionIcon: {
    fontSize: 48,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  actionDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  settingsLink: {
    padding: 8,
  },
  settingsText: {
    color: '#007AFF',
    fontSize: 16,
  },
  queueLink: {
    padding: 8,
  },
  queueText: {
    color: '#FF9500',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomeScreen;
