import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useSyncStore } from '../hooks/useOfflineSync';

interface SyncBannerProps {
  onPress?: () => void;
}

export function SyncBanner({ onPress }: SyncBannerProps) {
  const { isOnline } = useNetworkStatus();
  const { pendingCount, isSyncing } = useSyncStore();

  // Don't show banner if online and no pending items
  if (isOnline && pendingCount === 0) {
    return null;
  }

  const getBannerStyle = () => {
    if (!isOnline) return styles.offline;
    if (isSyncing) return styles.syncing;
    if (pendingCount > 0) return styles.pending;
    return styles.offline;
  };

  const getMessage = () => {
    if (!isOnline) {
      return pendingCount > 0
        ? `Offline - ${pendingCount} pending upload${pendingCount > 1 ? 's' : ''}`
        : 'Offline';
    }
    if (isSyncing) {
      return 'Syncing...';
    }
    if (pendingCount > 0) {
      return `${pendingCount} pending upload${pendingCount > 1 ? 's' : ''}`;
    }
    return 'Offline';
  };

  const content = (
    <View style={[styles.banner, getBannerStyle()]}>
      <Text style={styles.text}>{getMessage()}</Text>
      {pendingCount > 0 && isOnline && !isSyncing && (
        <Text style={styles.action}>Tap to sync</Text>
      )}
    </View>
  );

  if (onPress && pendingCount > 0) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  banner: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offline: {
    backgroundColor: '#FF3B30',
  },
  pending: {
    backgroundColor: '#FF9500',
  },
  syncing: {
    backgroundColor: '#007AFF',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  action: {
    color: '#FFFFFF',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});

export default SyncBanner;
