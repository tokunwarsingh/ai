import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext'; // Adjust path as needed

const AdminPanelScreen = () => {
  const router = useRouter();
  const { user } = useAuth(); // Get current user to display info

  // Mock data for admin functionalities
  const adminFeatures = [
    { name: 'Manage Users', route: '/admin/users' },
    { name: 'Manage Trips', route: '/admin/trips' },
    { name: 'View Reports', route: '/admin/reports' },
  ];

  const handleFeaturePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Admin Panel' }} />
      <Text style={styles.title}>Admin Panel</Text>
      {user && <Text style={styles.userInfo}>Logged in as: {user.username} ({user.role})</Text>}

      <View style={styles.featuresContainer}>
        {adminFeatures.map((feature) => (
          <View key={feature.route} style={styles.buttonContainer}>
            <Button
              title={feature.name}
              onPress={() => handleFeaturePress(feature.route)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  userInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: 15,
    width: '100%',
  },
});

export default AdminPanelScreen;
