import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors'; // Import Colors
import { GlobalStyles } from '../constants/Styles'; // Import GlobalStyles
import { Trip, useTrips } from '../context/TripContext';

const TripsListScreen = () => {
  const { trips, deleteTrip } = useTrips();
  const router = useRouter();

  const renderTripItem = ({ item }: { item: Trip }) => (
    <View style={styles.tripItemContainer}>
      <TouchableOpacity onPress={() => router.push(`/trips/${item.id}`)}>
        <Text style={styles.tripName}>{item.name}</Text>
        {item.startDate && (
          <Text style={{ color: Colors.light.text }}>{item.startDate.toLocaleDateString()}</Text>
        )}
      </TouchableOpacity>
      <View style={styles.actionsContainer}>
        <Button title="Edit" onPress={() => router.push(`/trips/${item.id}/edit`)} color={Colors.light.secondary} />
        <Button title="Delete" onPress={() => deleteTrip(item.id)} color={Colors.light.danger} />
      </View>
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen options={{ title: 'My Trips', headerRight: () => (
        <Button onPress={() => router.push('/trips/create')} title="Add Trip" color={Colors.light.primary} />
      )}} />
      
      {trips.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No trips yet. Add your first trip!</Text>
          <Button title="Add Trip" onPress={() => router.push('/trips/create')} color={Colors.light.primary} />
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
  // Reusing GlobalStyles.container
  listContent: {
    padding: 10,
  },
  tripItemContainer: {
    backgroundColor: Colors.light.light,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2, // for Android shadow
    boxShadow: `0px 1px 1.41px ${Colors.light.light}80`, // Added 80 for 0.2 opacity
  },
  tripName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // Add some space between buttons
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.light.secondary,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default TripsListScreen;
