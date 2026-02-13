import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../models/types';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';
import ConnectionListScreen from '../screens/ConnectionListScreen';
import ConnectionDetailScreen from '../screens/ConnectionDetailScreen';
import AddReadingScreen from '../screens/AddReadingScreen';
import SyncQueueScreen from '../screens/SyncQueueScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Utility Reader' }}
        />
        <Stack.Screen
          name="BarcodeScanner"
          component={BarcodeScannerScreen}
          options={{ title: 'Scan Meter' }}
        />
        <Stack.Screen
          name="ConnectionList"
          component={ConnectionListScreen}
          options={{ title: 'Find Connection' }}
        />
        <Stack.Screen
          name="ConnectionDetail"
          component={ConnectionDetailScreen}
          options={{ title: 'Connection' }}
        />
        <Stack.Screen
          name="AddReading"
          component={AddReadingScreen}
          options={{ title: 'Add Reading' }}
        />
        <Stack.Screen
          name="SyncQueue"
          component={SyncQueueScreen}
          options={{ title: 'Pending Uploads' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
