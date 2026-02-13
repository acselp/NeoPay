import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Badge, getStatusVariant } from './common';
import { Connection, Meter } from '../models/types';

interface ConnectionCardProps {
  connection: Connection;
  meter?: Meter;
  onPress: () => void;
}

export function ConnectionCard({ connection, meter, onPress }: ConnectionCardProps) {
  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.customerName} numberOfLines={1}>
          {connection.customerName}
        </Text>
        <Badge
          text={connection.status}
          variant={getStatusVariant(connection.status)}
        />
      </View>

      <Text style={styles.location} numberOfLines={2}>
        {connection.locationLabel}
      </Text>

      <View style={styles.footer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Utility</Text>
          <Text style={styles.infoValue}>{connection.utilityName}</Text>
        </View>

        {meter && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Meter</Text>
            <Text style={styles.infoValue}>{meter.serialNumber}</Text>
          </View>
        )}

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>ID</Text>
          <Text style={styles.infoValue}>#{connection.id}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 12,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default ConnectionCard;
