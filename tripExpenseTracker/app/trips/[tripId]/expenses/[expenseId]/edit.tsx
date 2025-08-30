import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useTrips } from '@//context/TripContext'; // Adjust path as needed
import { useExpenses, Expense } from '@//context/ExpenseContext'; // Adjust path as needed
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

// Define route params type
type EditExpenseRouteParams = {
  tripId: string;
  expenseId: string;
};

const EditExpenseScreen = () => {
  const { tripId, expenseId } = useLocalSearchParams<EditExpenseRouteParams>();
  const { getTripById } = useTrips();
  const { getExpenseById, updateExpense } = useExpenses();
  const router = useRouter();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const currentTrip = getTripById(tripId);
  const expenseToEdit = getExpenseById(expenseId);

  useEffect(() => {
    if (expenseToEdit) {
      setDescription(expenseToEdit.description);
      setAmount(expenseToEdit.amount.toString());
      setDate(expenseToEdit.date);
      setCategory(expenseToEdit.category || '');
    }
  }, [expenseToEdit]);

  const handleUpdateExpense = () => {
    const parsedAmount = parseFloat(amount);
    if (description.trim() && !isNaN(parsedAmount) && currentTrip && expenseToEdit) {
      updateExpense(expenseId, {
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
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  if (!currentTrip) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Edit Expense' }} />
        <Text>Trip not found.</Text>
      </View>
    );
  }

  if (!expenseToEdit) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Edit Expense' }} />
        <Text>Expense not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Edit Expense for ${currentTrip.name}` }} />
      
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

      <Button title="Update Expense" onPress={handleUpdateExpense} />
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

export default EditExpenseScreen;