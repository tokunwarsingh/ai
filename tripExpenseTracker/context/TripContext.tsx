import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native'; // Import Text component for loading indicator

// Define Trip type
export interface Trip {
  id: string;
  name: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  members: string[]; // User IDs associated with the trip (initialize as empty array)
}

// Define Trip context type
interface TripContextType {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTrip: (tripId: string, updatedTrip: Partial<Trip>) => void;
  deleteTrip: (tripId: string) => void;
  getTripById: (tripId: string) => Trip | undefined;
}

// Create the context
const TripContext = createContext<TripContextType | undefined>(undefined);

// Create the provider component
interface TripProviderProps {
  children: ReactNode;
}

const TRIP_STORAGE_KEY = 'trips';

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true); // To manage loading state for initial load

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const storedTrips = await AsyncStorage.getItem(TRIP_STORAGE_KEY);
        if (storedTrips) {
          // Parse dates correctly
          const parsedTrips: Trip[] = JSON.parse(storedTrips).map((trip: Trip) => ({
            ...trip,
            startDate: trip.startDate ? new Date(trip.startDate) : undefined,
            endDate: trip.endDate ? new Date(trip.endDate) : undefined,
          }));
          setTrips(parsedTrips);
        }
      } catch (error) {
        console.error('Failed to load trips from AsyncStorage', error);
      } finally {
        setLoading(false);
      }
    };
    loadTrips();
  }, []);

  useEffect(() => {
    const saveTrips = async () => {
      if (!loading) { // Only save after initial load
        try {
          await AsyncStorage.setItem(TRIP_STORAGE_KEY, JSON.stringify(trips));
        } catch (error) {
          console.error('Failed to save trips to AsyncStorage', error);
        }
      }
    };
    saveTrips();
  }, [trips, loading]); // Save whenever trips change

  const addTrip = (tripData: Omit<Trip, 'id'>) => {
    const newTrip: Trip = {
      id: Math.random().toString(), // Mock ID
      ...tripData,
    };
    setTrips(prevTrips => [...prevTrips, newTrip]);
  };

  const updateTrip = (tripId: string, updatedTripData: Partial<Trip>) => {
    setTrips(prevTrips =>
      prevTrips.map(trip =>
        trip.id === tripId ? { ...trip, ...updatedTripData } : trip
      )
    );
  };

  const deleteTrip = (tripId: string) => {
    setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
  };

  const getTripById = (tripId: string) => {
    return trips.find(trip => trip.id === tripId);
  };

  if (loading) {
    return <Text>Loading trips...</Text>; // Or a loading spinner
  }

  return (
    <TripContext.Provider value={{ trips, addTrip, updateTrip, deleteTrip, getTripById }}>
      {children}
    </TripContext.Provider>
  );
};

// Custom hook to use the trip context
export const useTrips = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
};