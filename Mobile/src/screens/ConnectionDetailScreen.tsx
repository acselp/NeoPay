import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../models/types';
import { useConnection } from '../hooks/useConnections';
import { useMeter, useLastReading } from '../hooks/useMeters';
import { Card, Badge, getStatusVariant, Button, LoadingSpinner } from '../components/common';
import { formatDateTime, formatNumber, getRelativeTime } from '../utils/formatters';

type ConnectionDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ConnectionDetail'>;
type ConnectionDetailRouteProp = RouteProp<RootStackParamList, 'ConnectionDetail'>;

interface Props {
  navigation: ConnectionDetailNavigationProp;
  route: ConnectionDetailRouteProp;
}

export function ConnectionDetailScreen({ navigation, route }: Props) {
  const { connectionId } = route.params;

  const { data: connection, isLoading: connectionLoading } = useConnection(connectionId);
  const { data: meter, isLoading: meterLoading } = useMeter(connection?.meterId);
  const { data: lastReadingData, isLoading: readingLoading } = useLastReading(connection?.meterId);

  const isLoading = connectionLoading || meterLoading || readingLoading;
  const lastReading = lastReadingData?.reading;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner message="Loading connection details..." />
      </SafeAreaView>
    );
  }

  if (!connection) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Connection not found</Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 20 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const handleAddReading = () => {
    if (meter) {
      navigation.navigate('AddReading', {
        connectionId: connection.id,
        meterId: meter.id,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Customer Info */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Customer</Text>
            <Badge
              text={connection.status}
              variant={getStatusVariant(connection.status)}
            />
          </View>
          <Text style={styles.customerName}>{connection.customerName}</Text>
          <Text style={styles.location}>{connection.locationLabel}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Connection ID:</Text>
            <Text style={styles.infoValue}>#{connection.id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Utility:</Text>
            <Text style={styles.infoValue}>{connection.utilityName}</Text>
          </View>
        </Card>

        {/* Meter Info */}
        {meter ? (
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>Meter</Text>
            <View style={styles.meterInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Serial Number:</Text>
                <Text style={styles.infoValue}>{meter.serialNumber}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Barcode:</Text>
                <Text style={styles.infoValue}>{meter.barcodeValue}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Digits:</Text>
                <Text style={styles.infoValue}>{meter.digits}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Multiplier:</Text>
                <Text style={styles.infoValue}>x{meter.multiplier}</Text>
              </View>
            </View>
          </Card>
        ) : (
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>Meter</Text>
            <Text style={styles.noData}>No meter assigned</Text>
          </Card>
        )}

        {/* Last Reading */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Last Reading</Text>
          {lastReading ? (
            <View>
              <View style={styles.lastReadingValue}>
                <Text style={styles.readingValue}>
                  {formatNumber(lastReading.value)}
                </Text>
                <Text style={styles.readingDate}>
                  {getRelativeTime(lastReading.timestamp)}
                </Text>
              </View>
              <Text style={styles.readingTimestamp}>
                {formatDateTime(lastReading.timestamp)}
              </Text>
              {lastReading.note && (
                <Text style={styles.readingNote}>Note: {lastReading.note}</Text>
              )}
            </View>
          ) : (
            <Text style={styles.noData}>No previous readings</Text>
          )}
        </Card>
      </ScrollView>

      {/* Add Reading Button */}
      {meter && connection.status === 'Active' && (
        <View style={styles.footer}>
          <Button
            title="Add Reading"
            onPress={handleAddReading}
            size="large"
            style={styles.addButton}
          />
        </View>
      )}

      {connection.status !== 'Active' && (
        <View style={styles.footer}>
          <Text style={styles.inactiveText}>
            Cannot add readings to {connection.status.toLowerCase()} connections
          </Text>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  meterInfo: {
    marginTop: 4,
  },
  lastReadingValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  readingValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
  },
  readingDate: {
    fontSize: 14,
    color: '#666',
  },
  readingTimestamp: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  readingNote: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
  },
  noData: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  addButton: {
    width: '100%',
  },
  inactiveText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

export default ConnectionDetailScreen;
