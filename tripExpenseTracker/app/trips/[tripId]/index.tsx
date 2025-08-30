import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useTrips } from '../../../context/TripContext'; // Adjust path as needed
import { GlobalStyles } from '../../../constants/Styles'; // Import GlobalStyles
import {Colors} from '../../../constants/Colors'; // Import Colors

// Define route params type
type TripDetailRouteParams = {
  tripId: string;
};

const TripDetailScreen = () => {
  const { tripId } = useLocalSearchParams<TripDetailRouteParams>();
  const { getTripById } = useTrips();
  const router = useRouter();

  const trip = getTripById(tripId);

  if (!trip) {
    return (
      <View style={GlobalStyles.container}>
        <Stack.Screen options={{ title: 'Trip Details' }} />
        <Text style={{ color: Colors.light.text }}>Trip not found.</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen options={{ title: trip.name }} />
      <Text style={styles.tripName}>{trip.name}</Text>
      {trip.description && <Text style={styles.tripDescription}>{trip.description}</Text>}
      {trip.startDate && <Text style={{ color: Colors.light.text }}>Start Date: {trip.startDate.toLocaleDateString()}</Text>}
      {trip.endDate && <Text style={{ color: Colors.light.text }}>End Date: {trip.endDate.toLocaleDateString()}</Text>}

      <View style={GlobalStyles.buttonContainer}>
        <Button title="View Expenses" onPress={() => router.push(`/trips/${tripId}/expenses`)} color={Colors.light.primary} />
      </View>
      <View style={GlobalStyles.buttonContainer}>
        <Button title="Edit Trip" onPress={() => router.push(`/trips/${tripId}/edit`)} color={Colors.light.secondary} />
      </View>
      {/* Button to manage members */}
      <View style={GlobalStyles.buttonContainer}>
        <Button title="Manage Members" onPress={() => router.push(`/trips/${tripId}/manageMembers`)} color={Colors.light.info} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Reusing GlobalStyles.container
  tripName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.light.text,
  },
  tripDescription: {
    fontSize: 16,
    color: Colors.light.secondary,
    marginBottom: 15,
  },
  // Reusing GlobalStyles.buttonContainer
});

export default TripDetailScreen;