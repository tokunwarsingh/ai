import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useTrips } from '../../../context/TripContext'; // Adjust path as needed
import { useExpenses, Expense } from '../../../context/ExpenseContext'; // Assuming ExpenseContext is in /context and import Expense type
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'; // For navigation and route params
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // For navigation prop typing
import { exportExpensesToExcel } from '../../../utils/ExcelExport'; // Import the export function

// Define the type for navigation params for this screen
type ExpensesListRouteParams = {
  tripId: string;
};

// Define the type for the item in the FlatList
interface ExpenseItemProps {
  item: Expense;
}

const ExpensesListScreen = () => {
  const { tripId } = useLocalSearchParams<ExpensesListRouteParams>();
  const { getTripById } = useTrips();
  const { expenses, deleteExpense } = useExpenses();
  const router = useRouter();

  // Filter expenses for the current trip
  const tripExpenses = expenses.filter(expense => expense.tripId === tripId);

  const handleExport = async () => {
    if (currentTrip) {
      await exportExpensesToExcel(tripExpenses, currentTrip.name);
    } else {
      alert('Cannot export: Trip not found.');
    }
  };

  const renderExpenseItem = ({ item }: ExpenseItemProps) => (
    <View style={styles.expenseItemContainer}>
      <View>
        <Text style={styles.expenseDescription}>{item.description}</Text>
        <Text>Amount: ${item.amount.toFixed(2)}</Text>
        <Text>Date: {item.date.toLocaleDateString()}</Text>
        {item.category && <Text>Category: {item.category}</Text>}
      </View>
      <View style={styles.actionsContainer}>
        <Button title="Edit" onPress={() => router.push(`/trips/${tripId}/expenses/${item.id}/edit`)} />
        <Button title="Delete" onPress={() => deleteExpense(item.id)} color="red" />
      </View>
    </View>
  );

  const currentTrip = getTripById(tripId);

  if (!currentTrip) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Expenses', headerRight: () => (
          <Button title="Add Expense" onPress={() => router.push(`/trips/${tripId}/expenses/create`)} color="#007bff" />
        )}} />
        <Text>Trip not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: `${currentTrip.name} Expenses`,
        headerRight: () => (
          <View style={styles.headerButtons}>
            <Button title="Add Expense" onPress={() => router.push(`/trips/${tripId}/expenses/create`)} color="#007bff" />
            <Button title="Export" onPress={handleExport} color="#28a745" />
          </View>
        )
      }} />
      
      {tripExpenses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No expenses for this trip yet. Add your first expense!</Text>
          <Button title="Add Expense" onPress={() => router.push(`/trips/${tripId}/expenses/create`)} />
        </View>
      ) : (
        <FlatList
          data={tripExpenses}
          renderItem={renderExpenseItem}
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
  expenseItemContainer: {
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
  expenseDescription: {
    fontSize: 16,
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
  headerButtons: {
    flexDirection: 'row',
    gap: 10, // Add some space between buttons
  },
});

export default ExpensesListScreen;