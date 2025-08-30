import React, { useState } from 'react'; // Added useState for potential future use
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext'; // Adjust path as needed

// Define type for mock user data
interface MockUser {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

// Mock user data for admin panel
const mockUsers: MockUser[] = [
  { id: 'user1', username: 'Alice', role: 'user' },
  { id: 'user2', username: 'Bob', role: 'admin' },
  { id: 'user3', username: 'Charlie', role: 'user' },
];

const AdminUsersScreen = () => {
  const router = useRouter();
  const { user: currentUser } = useAuth(); // Get current user for context

  const renderUserItem = ({ item }: { item: MockUser }) => ( // Added type for item
    <View style={styles.userItemContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.role}>Role: {item.role}</Text>
      {/* Add buttons for managing user roles or details */}
      <Button title="Manage" onPress={() => alert('Managing user ' + item.username)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Manage Users' }} />
      <Text style={styles.title}>User Management</Text>
      {currentUser && <Text style={styles.adminInfo}>Admin: {currentUser.username}</Text>}

      <FlatList
        data={mockUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
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
  adminInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  userItemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 14,
    color: '#555',
  },
});

export default AdminUsersScreen;