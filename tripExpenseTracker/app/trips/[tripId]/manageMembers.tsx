import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useTrips, Trip } from '../../../context/TripContext'; // Adjust path as needed
import { useAuth } from '../../../context/AuthContext'; // Adjust path as needed

// Define route params type
type ManageMembersRouteParams = {
  tripId: string;
};

// Define type for a member (simplified for now)
interface Member {
  id: string;
  username: string;
}

const ManageTripMembersScreen = () => {
  const { tripId } = useLocalSearchParams<ManageMembersRouteParams>();
  const { getTripById, updateTrip } = useTrips();
  const { user: currentUser } = useAuth(); // Get current logged-in user
  const router = useRouter();

  const [newMemberUsername, setNewMemberUsername] = useState('');
  const [currentMembers, setCurrentMembers] = useState<Member[]>([]); // State to hold members for display

  const trip = getTripById(tripId);

  // Initialize currentMembers when the component mounts or trip data changes
  React.useEffect(() => {
    if (trip && trip.members) {
      // In a real app, you'd fetch user details based on IDs
      // For now, we'll just use mock members if available, or empty if not
      const mockMembers = trip.members.map(memberId => ({ id: memberId, username: `User ${memberId.substring(0, 4)}` }));
      setCurrentMembers(mockMembers);
    }
  }, [trip]);

  const handleAddMember = () => {
    if (newMemberUsername.trim() && trip) {
      // Mock: In a real app, you'd search for a user by username and add their ID
      const newMemberId = `mock-id-${Math.random().toString()}`; // Mock ID
      const updatedMembers = [...(trip.members || []), newMemberId];
      
      updateTrip(tripId, { members: updatedMembers });
      setCurrentMembers([...currentMembers, { id: newMemberId, username: newMemberUsername.trim() }]); // Update local state for display
      setNewMemberUsername(''); // Clear input
      Alert.alert('Success', 'Member added successfully!');
    } else if (!newMemberUsername.trim()) {
      Alert.alert('Error', 'Please enter a username to add.');
    } else {
      Alert.alert('Error', 'Trip not found or invalid input.');
    }
  };

  const renderMemberItem = ({ item }: { item: Member }) => (
    <View style={styles.memberItemContainer}>
      <Text style={styles.memberName}>{item.username}</Text>
      {/* Add remove member button if current user is admin or trip owner */}
      <Button title="Remove" color="red" onPress={() => Alert.alert('Not implemented', 'Removing members is not yet implemented.')} />
    </View>
  );

  if (!trip) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Manage Members' }} />
        <Text>Trip not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Manage Members for ${trip.name}` }} />
      
      <Text style={styles.sectionTitle}>Current Members</Text>
      {currentMembers.length === 0 ? (
        <Text style={styles.noMembersText}>No members added yet.</Text>
      ) : (
        <FlatList
          data={currentMembers}
          renderItem={renderMemberItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}

      <View style={styles.addMemberContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter username to add"
          value={newMemberUsername}
          onChangeText={setNewMemberUsername}
          autoCapitalize="none"
        />
        <Button title="Add Member" onPress={handleAddMember} />
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  list: {
    marginBottom: 20,
  },
  memberItemContainer: {
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
  memberName: {
    fontSize: 16,
    color: '#333',
  },
  addMemberContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  noMembersText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default ManageTripMembersScreen;