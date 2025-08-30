import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Button } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ExpenseProvider } from '../context/ExpenseContext';
import { TripProvider } from '../context/TripContext';

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
  const { isAuthenticated, user, logout } = useAuth();
    const router = useRouter();
  useEffect(() => {
    console.log('Auth Status - isAuthenticated (useEffect):', isAuthenticated);
    console.log('Auth Status - User (useEffect):', user);
     if (isAuthenticated) {
      if (user?.role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/home');
      }
    // } else {
    //   router.replace('/(auth)/login');
     }
  }, [isAuthenticated, user]);

  console.log('Auth Status - isAuthenticated (render):', isAuthenticated);
  console.log('Auth Status - User (render):', user);

  const handleClearStorage = async () => {
    try {
      await AsyncStorage.clear();
      logout();
      console.log('Auth Status - isAuthenticated (after logout):', isAuthenticated);
      console.log('Auth Status - User (after logout):', user);
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
