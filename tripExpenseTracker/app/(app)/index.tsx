import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function AppIndex() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/home');
      }
    } else {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, user]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );
}