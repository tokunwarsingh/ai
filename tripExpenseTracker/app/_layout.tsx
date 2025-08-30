import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { useEffect } from 'react'; // Re-add React and useEffect
import AsyncStorage from '@react-native-async-storage/async-storage'; // Re-add AsyncStorage
import { Button } from 'react-native'; // Re-add Button

import { useColorScheme } from '@/hooks/useColorScheme'; // Assuming this hook is correctly set up
import { AuthProvider, useAuth } from '../context/AuthContext'; // Import AuthProvider and useAuth
import { TripProvider } from '../context/TripContext'; // Import TripProvider
import { ExpenseProvider } from '../context/ExpenseContext'; // Import ExpenseProvider
import { Colors } from '../constants/Colors'; // Import Colors for theming
// HomeScreen and AuthScreen are now handled by file-based routing, no need to import them here for Stack.Screen component prop

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}

function RootLayoutContent() {
  const { isAuthenticated, user, logout } = useAuth(); // Also get user and logout for debugging

  // Debugging useEffect
  useEffect(() => {
    console.log('Auth Status - isAuthenticated:', isAuthenticated);
    console.log('Auth Status - User:', user);
    if (isAuthenticated) {
      console.log('Auth Status: Rendering (app) group.');
    } else {
      console.log('Auth Status: Rendering (auth) group.');
    }
  }, [isAuthenticated, user]);

  const handleClearStorage = async () => {
    try {
      await AsyncStorage.clear();
      logout(); // Log out after clearing storage
      alert('AsyncStorage cleared and logged out!');
    } catch (error) {
      console.error('Failed to clear AsyncStorage', error);
    }
  };

  return (
    <TripProvider>
      <ExpenseProvider>
        {isAuthenticated ? (
          <Stack>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          </Stack>
        ) : (
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        )}
        {/* Temporary button for debugging AsyncStorage */}
        <Button title="Clear AsyncStorage & Logout" onPress={handleClearStorage} />
      </ExpenseProvider>
    </TripProvider>
  );
}
