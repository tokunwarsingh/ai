import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useTrips } from '../../../../context/TripContext'; // Adjust path as needed
import { useExpenses } from '../../../../context/ExpenseContext'; // Adjust path as needed
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'; // Import DateTimePickerEvent

// Define route params type
type CreateExpenseRouteParams = {
  tripId: string;
};

const CreateExpenseScreen = () => {
  const { tripId } = useLocalSearchParams<CreateExpenseRouteParams>();
  const { addExpense } = useExpenses();
  const { getTripById } = useTrips();
  const router = useRouter();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const currentTrip = getTripById(tripId);

  const handleAddExpense = () => {
    const parsedAmount = parseFloat(amount);
    if (description.trim() && !isNaN(parsedAmount) && currentTrip) {
      addExpense({
        tripId: tripId,
        userId: 'mock-user-id', // Placeholder, will be dynamic later
        description: description.trim(),
        amount: parsedAmount,
        date: date,
        category: category.trim() || undefined,
      });
      router.back(); // Go back to the previous screen (expenses list)
    } else {
      alert('Please enter a valid description and amount.');
    }
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Keep picker visible on iOS until dismissed
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Add Expense for ${currentTrip?.name || 'Trip'}` }} />
      
      <TextInput
        style={styles.input}
        placeholder="Expense Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      
      <View style={styles.datePickerContainer}>
        <Text>Date: {date.toLocaleDateString()}</Text>
        <Button onPress={showDatepicker} title="Select Date" />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Category (Optional)"
        value={category}
        onChangeText={setCategory}
      />

      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
});

export default CreateExpenseScreen;