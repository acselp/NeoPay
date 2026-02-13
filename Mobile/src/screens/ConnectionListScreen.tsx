import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Connection } from '../models/types';
import { useConnectionSearch } from '../hooks/useConnections';
import { useMeter } from '../hooks/useMeters';
import { ConnectionCard } from '../components/ConnectionCard';
import { LoadingSpinner } from '../components/common';

type ConnectionListNavigationProp = StackNavigationProp<RootStackParamList, 'ConnectionList'>;
type ConnectionListRouteProp = RouteProp<RootStackParamList, 'ConnectionList'>;

interface Props {
  navigation: ConnectionListNavigationProp;
  route: ConnectionListRouteProp;
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Connection item with meter data
function ConnectionListItem({
  connection,
  onPress,
}: {
  connection: Connection;
  onPress: () => void;
}) {
  const { data: meter } = useMeter(connection.meterId);

  return (
    <ConnectionCard
      connection={connection}
      meter={meter || undefined}
      onPress={onPress}
    />
  );
}

export function ConnectionListScreen({ navigation, route }: Props) {
  const [searchQuery, setSearchQuery] = useState(route.params?.initialQuery || '');
  const [statusFilter, setStatusFilter] = useState<'Active' | 'all'>('Active');

  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: connections, isLoading, error, refetch } = useConnectionSearch({
    query: debouncedQuery,
    status: statusFilter,
  });

  const handleConnectionPress = useCallback(
    (connection: Connection) => {
      navigation.navigate('ConnectionDetail', { connectionId: connection.id });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Connection }) => (
      <ConnectionListItem
        connection={item}
        onPress={() => handleConnectionPress(item)}
      />
    ),
    [handleConnectionPress]
  );

  const renderEmpty = () => {
    if (isLoading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No connections found</Text>
        <Text style={styles.emptyText}>
          {searchQuery
            ? `No results for "${searchQuery}"`
            : 'No active connections available'}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search customer, address, meter..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
      </View>

      {/* Status Filter */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            statusFilter === 'Active' && styles.filterButtonActive,
          ]}
          onPress={() => setStatusFilter('Active')}
        >
          <Text
            style={[
              styles.filterText,
              statusFilter === 'Active' && styles.filterTextActive,
            ]}
          >
            Active Only
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            statusFilter === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setStatusFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              statusFilter === 'all' && styles.filterTextActive,
            ]}
          >
            All Status
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading connections</Text>
          <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </TouchableOpacity>
        </View>
      ) : isLoading && !connections ? (
        <LoadingSpinner message="Loading connections..." />
      ) : (
        <FlatList
          data={connections || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    padding: 12,
  },
  retryText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default ConnectionListScreen;
