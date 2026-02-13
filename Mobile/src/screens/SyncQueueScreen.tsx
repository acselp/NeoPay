import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, QueuedReading } from '../models/types';
import { useOfflineSync } from '../hooks/useOfflineSync';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { Card, Button, Badge } from '../components/common';
import { formatDateTime, formatNumber } from '../utils/formatters';

type SyncQueueNavigationProp = StackNavigationProp<RootStackParamList, 'SyncQueue'>;

interface Props {
  navigation: SyncQueueNavigationProp;
}

export function SyncQueueScreen({ navigation }: Props) {
  const { isOnline } = useNetworkStatus();
  const {
    queuedReadings,
    isSyncing,
    syncQueue,
    clearAllQueued,
    removeQueued,
  } = useOfflineSync();

  const handleSync = async () => {
    if (!isOnline) {
      Alert.alert('Offline', 'Cannot sync while offline. Please check your connection.');
      return;
    }

    const result = await syncQueue();
    if (result) {
      Alert.alert(
        'Sync Complete',
        `Synced: ${result.successCount}\nFailed: ${result.failCount}`
      );
    }
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All',
      'Are you sure you want to delete all pending readings? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: clearAllQueued,
        },
      ]
    );
  };

  const handleRemoveItem = (item: QueuedReading) => {
    Alert.alert(
      'Remove Reading',
      'Are you sure you want to remove this pending reading?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeQueued(item.clientGeneratedId),
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: QueuedReading }) => (
    <Card style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemValue}>{formatNumber(item.value)}</Text>
        {item.lastError && <Badge text="Failed" variant="danger" />}
      </View>

      {item.connectionInfo && (
        <View style={styles.itemInfo}>
          <Text style={styles.itemCustomer}>{item.connectionInfo.customerName}</Text>
          <Text style={styles.itemLocation}>{item.connectionInfo.locationLabel}</Text>
          <Text style={styles.itemMeter}>Meter: {item.connectionInfo.meterSerial}</Text>
        </View>
      )}

      <View style={styles.itemMeta}>
        <Text style={styles.itemTimestamp}>
          Reading time: {formatDateTime(item.timestamp)}
        </Text>
        <Text style={styles.itemQueued}>
          Queued: {formatDateTime(item.queuedAt)}
        </Text>
        {item.retryCount > 0 && (
          <Text style={styles.itemRetries}>Retries: {item.retryCount}</Text>
        )}
        {item.lastError && (
          <Text style={styles.itemError}>Error: {item.lastError}</Text>
        )}
      </View>

      <Button
        title="Remove"
        variant="outline"
        size="small"
        onPress={() => handleRemoveItem(item)}
        style={styles.removeButton}
      />
    </Card>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No Pending Readings</Text>
      <Text style={styles.emptyText}>
        All readings have been synced successfully.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <View style={[styles.statusBar, isOnline ? styles.online : styles.offline]}>
        <Text style={styles.statusText}>
          {isOnline ? 'Online' : 'Offline'} - {queuedReadings.length} pending
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={queuedReadings}
        renderItem={renderItem}
        keyExtractor={(item) => item.clientGeneratedId}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
      />

      {/* Actions */}
      {queuedReadings.length > 0 && (
        <View style={styles.actions}>
          <Button
            title="Sync Now"
            onPress={handleSync}
            loading={isSyncing}
            disabled={!isOnline}
            style={styles.syncButton}
          />
          <Button
            title="Clear All"
            variant="danger"
            onPress={handleClearAll}
            style={styles.clearButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  statusBar: {
    padding: 12,
    alignItems: 'center',
  },
  online: {
    backgroundColor: '#34C759',
  },
  offline: {
    backgroundColor: '#FF3B30',
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  itemCard: {
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  itemInfo: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  itemCustomer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemLocation: {
    fontSize: 14,
    color: '#666',
  },
  itemMeter: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  itemMeta: {
    marginBottom: 12,
  },
  itemTimestamp: {
    fontSize: 12,
    color: '#666',
  },
  itemQueued: {
    fontSize: 12,
    color: '#999',
  },
  itemRetries: {
    fontSize: 12,
    color: '#FF9500',
    marginTop: 4,
  },
  itemError: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
  },
  removeButton: {
    alignSelf: 'flex-start',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    gap: 12,
  },
  syncButton: {
    flex: 2,
  },
  clearButton: {
    flex: 1,
  },
});

export default SyncQueueScreen;
