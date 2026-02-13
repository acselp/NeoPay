import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../models/types';
import { api } from '../api';
import { Button, LoadingSpinner } from '../components/common';

type BarcodeScannerNavigationProp = StackNavigationProp<RootStackParamList, 'BarcodeScanner'>;

interface Props {
  navigation: BarcodeScannerNavigationProp;
}

export function BarcodeScannerScreen({ navigation }: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: BarCodeScannerResult) => {
    if (scanned || isLoading) return;

    setScanned(true);
    setIsLoading(true);

    try {
      // Look up the meter by barcode
      const meter = await api.getMeterByBarcode(data);

      if (!meter) {
        Alert.alert(
          'Meter Not Found',
          `No meter found with barcode: ${data}`,
          [
            {
              text: 'Try Again',
              onPress: () => {
                setScanned(false);
                setIsLoading(false);
              },
            },
            {
              text: 'Search Manually',
              onPress: () => {
                navigation.replace('ConnectionList', { initialQuery: data });
              },
            },
          ]
        );
        return;
      }

      // Navigate to Add Reading with the meter info
      navigation.replace('AddReading', {
        connectionId: meter.assignedConnectionId,
        meterId: meter.id,
        fromBarcode: true,
      });
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message || 'Failed to look up meter',
        [
          {
            text: 'Try Again',
            onPress: () => {
              setScanned(false);
              setIsLoading(false);
            },
          },
          { text: 'Cancel', onPress: () => navigation.goBack() },
        ]
      );
    }
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner message="Requesting camera permission..." />
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.noPermission}>
          <Text style={styles.noPermissionText}>
            Camera permission is required to scan barcodes
          </Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 20 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoadingSpinner message="Looking up meter..." />
      ) : (
        <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scanner}
            barCodeTypes={[
              BarCodeScanner.Constants.BarCodeType.ean13,
              BarCodeScanner.Constants.BarCodeType.ean8,
              BarCodeScanner.Constants.BarCodeType.code128,
              BarCodeScanner.Constants.BarCodeType.code39,
              BarCodeScanner.Constants.BarCodeType.qr,
            ]}
          />

          <View style={styles.overlay}>
            <View style={styles.overlayTop} />
            <View style={styles.overlayMiddle}>
              <View style={styles.overlaySide} />
              <View style={styles.scanArea}>
                <View style={[styles.corner, styles.cornerTL]} />
                <View style={[styles.corner, styles.cornerTR]} />
                <View style={[styles.corner, styles.cornerBL]} />
                <View style={[styles.corner, styles.cornerBR]} />
              </View>
              <View style={styles.overlaySide} />
            </View>
            <View style={styles.overlayBottom}>
              <Text style={styles.instructions}>
                Position the barcode within the frame
              </Text>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scanner: {
    flex: 1,
  },
  noPermission: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#F5F5F5',
  },
  noPermissionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayMiddle: {
    flexDirection: 'row',
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scanArea: {
    width: 280,
    height: 180,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#FFFFFF',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
  },
  instructions: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BarcodeScannerScreen;
