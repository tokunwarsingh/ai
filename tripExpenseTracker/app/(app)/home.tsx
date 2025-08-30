import { useRouter } from 'expo-router'; // Import useRouter for navigation
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors'; // Import Colors
import { GlobalStyles } from '../../constants/Styles'; // Import GlobalStyles
import { useAuth } from '../../context/AuthContext'; // Import useAuth to check user role

const HomeScreen = () => {
  const router = useRouter();
  const { user, logout } = useAuth(); // Get user and logout function

  const handleViewTrips = () => {
    router.push('/(app)/trips'); // Navigate to the trips list screen
  };

  const handleAdminPanel = () => {
    router.push('/(app)/admin' as any); // Navigate to the admin panel
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.username || 'User'}!</Text>
      {user && user.role === 'admin' && (
        <Text style={styles.roleText}>Role: Admin</Text>
      )}
      
      <View style={GlobalStyles.buttonContainer}>
        <Button title="View My Trips" onPress={handleViewTrips} color={Colors.light.primary} />
      </View>
      
      {/* Admin Panel Button - only visible to admins */}
      {user && user.role === 'admin' && (
        <View style={GlobalStyles.buttonContainer}>
          <Button title="Admin Panel" onPress={handleAdminPanel} color={Colors.light.info} />
        </View>
      )}

      <View style={GlobalStyles.buttonContainer}>
        <Button title="Logout" onPress={logout} color={Colors.light.danger} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Reusing GlobalStyles.container
  welcomeText: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  roleText: {
    fontSize: 16,
    color: Colors.light.secondary,
    marginBottom: 30,
  },
});

export default HomeScreen;