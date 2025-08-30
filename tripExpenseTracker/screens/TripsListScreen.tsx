import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useTrips, Trip } from '../context/TripContext'; // Assuming TripContext is in /context
import { Stack, useRouter } from 'expo-router'; // For navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // For navigation prop typing

// Define the type for navigation params
type TripsListNavigationProp = NativeStackNavigationProp<
  {
    TripDetail: { tripId: string };
    EditTrip: { tripId: string };
    CreateTrip: undefined;
  },
  'TripDetail' // Default route name
>;

// Define the type for the item in the FlatList
interface TripItemProps {
  item: Trip;
}

const TripsListScreen = () => {
  const { trips, deleteTrip } = useTrips();
  const router = useRouter(); // Use useRouter from expo-router

  const renderTripItem = ({ item }: TripItemProps) => (
    <View style={styles.tripItemContainer}>
      <TouchableOpacity onPress={() => router.push(`/tripDetail/${item.id}`)}>
        <Text style={styles.tripName}>{item.name}</Text>
        {item.startDate && (
          <Text>{item.startDate.toLocaleDateString()}</Text>
        )}
      </TouchableOpacity>
      <View style={styles.actionsContainer}>
        <Button title="Edit" onPress={() => router.push(`/editTrip/${item.id}`)} />
        <Button title="Delete" onPress={() => deleteTrip(item.id)} color="red" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'My Trips', headerRight: () => (
        <Button onPress={() => router.push('/createTrip')} title="Add Trip" color="#007bff" />
      )}} />
      
      {trips.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No trips yet. Add your first trip!</Text>
          <Button title="Add Trip" onPress={() => router.push('/createTrip')} />
        </View>
      ) : (
        <FlatList
          data={trips}
          renderItem={renderTripItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 10,
  },
  tripItemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  tripName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default TripsListScreen;