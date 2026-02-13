import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../models/types';
import { useConnection } from '../hooks/useConnections';
import { useMeter, useLastReading } from '../hooks/useMeters';
import { useSubmitReading } from '../hooks/useReadings';
import { validateReading, calculateConsumption, parseReadingInput } from '../models/validation';
import { Card, Button, LoadingSpinner, Input } from '../components/common';
import { formatNumber, formatDateTime, getUtilityUnit } from '../utils/formatters';

type AddReadingNavigationProp = StackNavigationProp<RootStackParamList, 'AddReading'>;
type AddReadingRouteProp = RouteProp<RootStackParamList, 'AddReading'>;

interface Props {
  navigation: AddReadingNavigationProp;
  route: AddReadingRouteProp;
}

export function AddReadingScreen({ navigation, route }: Props) {
  const { connectionId, meterId, fromBarcode } = route.params;

  // Data fetching
  const { data: connection, isLoading: connectionLoading } = useConnection(connectionId);
  const { data: meter, isLoading: meterLoading } = useMeter(meterId);
  const { data: lastReadingData, isLoading: readingLoading } = useLastReading(meterId);

  // Form state
  const [value, setValue] = useState('');
  const [timestamp, setTimestamp] = useState(new Date());
  const [note, setNote] = useState('');
  const [exceptionReason, setExceptionReason] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  // Submit mutation
  const submitMutation = useSubmitReading();

  const isLoading = connectionLoading || meterLoading || readingLoading;
  const lastReading = lastReadingData?.reading;
  const avgConsumption = lastReadingData?.averageConsumption;

  // Validation
  const validation = useMemo(() => {
    const parsedValue = parseReadingInput(value);
    if (parsedValue === null || !meter) {
      return null;
    }

    return validateReading({
      newValue: parsedValue,
      meter,
      lastReading: lastReading || null,
      averageConsumption: avgConsumption,
    });
  }, [value, meter, lastReading, avgConsumption]);

  // Consumption calculation
  const consumption = useMemo(() => {
    const parsedValue = parseReadingInput(value);
    if (parsedValue === null || !lastReading || !meter) {
      return null;
    }

    return calculateConsumption(parsedValue, lastReading.value, meter.multiplier, meter.digits);
  }, [value, lastReading, meter]);

  const handleSubmit = async () => {
    const parsedValue = parseReadingInput(value);

    if (parsedValue === null) {
      Alert.alert('Invalid Reading', 'Please enter a valid numeric reading value.');
      return;
    }

    if (!validation) return;

    // Check for warnings that require confirmation
    const warningsWithConfirmation = validation.warnings.filter(w => w.requiresConfirmation);
    const warningsWithReason = validation.warnings.filter(w => w.requiresReason);

    // If there's a warning requiring reason and no reason provided, show modal
    if (warningsWithReason.length > 0 && !exceptionReason.trim() && !showReasonModal) {
      setShowReasonModal(true);
      return;
    }

    // If there are warnings requiring confirmation, show alert
    if (warningsWithConfirmation.length > 0 && !pendingSubmit) {
      const warningMessages = warningsWithConfirmation.map(w => w.message).join('\n\n');

      Alert.alert(
        'Confirm Reading',
        warningMessages,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Submit Anyway',
            onPress: () => {
              setPendingSubmit(true);
              handleSubmit();
            },
          },
        ]
      );
      return;
    }

    // Submit the reading
    try {
      const result = await submitMutation.mutateAsync({
        meterId,
        value: parsedValue,
        timestamp: timestamp.toISOString(),
        note: note.trim() || undefined,
        exceptionReason: exceptionReason.trim() || undefined,
        connectionInfo: connection && meter ? {
          customerName: connection.customerName,
          locationLabel: connection.locationLabel,
          meterSerial: meter.serialNumber,
        } : undefined,
      });

      const message = result.queued
        ? 'Reading saved offline and will sync when connected.'
        : 'Reading submitted successfully.';

      Alert.alert('Success', message, [
        {
          text: 'OK',
          onPress: () => {
            if (fromBarcode) {
              navigation.popToTop();
            } else {
              navigation.goBack();
            }
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to submit reading');
    } finally {
      setPendingSubmit(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newTimestamp = new Date(timestamp);
      newTimestamp.setFullYear(selectedDate.getFullYear());
      newTimestamp.setMonth(selectedDate.getMonth());
      newTimestamp.setDate(selectedDate.getDate());
      setTimestamp(newTimestamp);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newTimestamp = new Date(timestamp);
      newTimestamp.setHours(selectedTime.getHours());
      newTimestamp.setMinutes(selectedTime.getMinutes());
      setTimestamp(newTimestamp);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner message="Loading..." />
      </SafeAreaView>
    );
  }

  if (!connection || !meter) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Connection or meter not found</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Connection Context */}
        <Card style={styles.contextCard}>
          <Text style={styles.customerName}>{connection.customerName}</Text>
          <Text style={styles.location}>{connection.locationLabel}</Text>
          <View style={styles.contextRow}>
            <Text style={styles.contextLabel}>{connection.utilityName}</Text>
            <Text style={styles.contextValue}>Meter: {meter.serialNumber}</Text>
          </View>
        </Card>

        {/* Last Reading */}
        {lastReading && (
          <Card style={styles.lastReadingCard}>
            <View style={styles.lastReadingHeader}>
              <Text style={styles.sectionLabel}>Last Reading</Text>
            </View>
            <View style={styles.lastReadingContent}>
              <Text style={styles.lastReadingValue}>
                {formatNumber(lastReading.value)}
              </Text>
              <Text style={styles.lastReadingDate}>
                {formatDateTime(lastReading.timestamp)}
              </Text>
            </View>
          </Card>
        )}

        {/* Reading Input */}
        <Card style={styles.inputCard}>
          <Text style={styles.sectionLabel}>New Reading</Text>
          <TextInput
            style={styles.valueInput}
            value={value}
            onChangeText={setValue}
            placeholder="Enter reading"
            placeholderTextColor="#CCC"
            keyboardType="decimal-pad"
            autoFocus
          />

          {/* Validation errors */}
          {validation && validation.errors.length > 0 && (
            <View style={styles.errorBox}>
              {validation.errors.map((error, index) => (
                <Text key={index} style={styles.errorMessage}>
                  {error}
                </Text>
              ))}
            </View>
          )}

          {/* Warnings */}
          {validation && validation.warnings.length > 0 && (
            <View style={styles.warningBox}>
              {validation.warnings.map((warning, index) => (
                <Text key={index} style={styles.warningMessage}>
                  {warning.message}
                </Text>
              ))}
            </View>
          )}

          {/* Consumption */}
          {consumption !== null && (
            <View style={styles.consumptionRow}>
              <Text style={styles.consumptionLabel}>Consumption:</Text>
              <Text style={styles.consumptionValue}>
                {formatNumber(Math.round(consumption * 100) / 100)}{' '}
                {getUtilityUnit(connection.utilityName)}
              </Text>
            </View>
          )}
        </Card>

        {/* Timestamp */}
        <Card style={styles.timestampCard}>
          <Text style={styles.sectionLabel}>Reading Time</Text>
          <View style={styles.timestampButtons}>
            <TouchableOpacity
              style={styles.timestampButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.timestampButtonLabel}>Date</Text>
              <Text style={styles.timestampButtonValue}>
                {timestamp.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timestampButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.timestampButtonLabel}>Time</Text>
              <Text style={styles.timestampButtonValue}>
                {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Note */}
        <Card style={styles.noteCard}>
          <Text style={styles.sectionLabel}>Note (Optional)</Text>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder="Add a note..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
          />
        </Card>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <Button
          title="Submit Reading"
          onPress={handleSubmit}
          size="large"
          loading={submitMutation.isPending}
          disabled={!value || !!(validation && !validation.isValid)}
          style={styles.submitButton}
        />
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={timestamp}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={timestamp}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}

      {/* Exception Reason Modal */}
      <Modal visible={showReasonModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Provide Reason</Text>
            <Text style={styles.modalText}>
              The reading is lower than the last recorded value. Please provide a
              reason for this reading.
            </Text>
            <Input
              placeholder="Enter reason..."
              value={exceptionReason}
              onChangeText={setExceptionReason}
              multiline
              numberOfLines={3}
              containerStyle={styles.reasonInput}
            />
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => {
                  setShowReasonModal(false);
                  setExceptionReason('');
                }}
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="Submit"
                onPress={() => {
                  setShowReasonModal(false);
                  setPendingSubmit(true);
                  handleSubmit();
                }}
                disabled={!exceptionReason.trim()}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  contextCard: {
    marginBottom: 16,
    backgroundColor: '#007AFF',
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  contextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contextLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  contextValue: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  lastReadingCard: {
    marginBottom: 16,
  },
  lastReadingHeader: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  lastReadingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  lastReadingValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  lastReadingDate: {
    fontSize: 12,
    color: '#999',
  },
  inputCard: {
    marginBottom: 16,
  },
  valueInput: {
    fontSize: 48,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
  },
  errorBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
  },
  errorMessage: {
    color: '#D32F2F',
    fontSize: 14,
  },
  warningBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
  },
  warningMessage: {
    color: '#E65100',
    fontSize: 14,
  },
  consumptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  consumptionLabel: {
    fontSize: 14,
    color: '#666',
  },
  consumptionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timestampCard: {
    marginBottom: 16,
  },
  timestampButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  timestampButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  timestampButtonLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  timestampButtonValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  noteCard: {
    marginBottom: 16,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 80,
    textAlignVertical: 'top',
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
  submitButton: {
    width: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  reasonInput: {
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
  },
});

export default AddReadingScreen;
