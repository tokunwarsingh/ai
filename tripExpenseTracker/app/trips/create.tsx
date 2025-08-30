import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTrips } from '../../context/TripContext'; // Adjust path as needed
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { GlobalStyles } from '../../constants/Styles'; // Import GlobalStyles
import {Colors } from '../../constants/Colors'; // Import Colors

const CreateTripScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const { addTrip } = useTrips();
  const router = useRouter();

  const handleAddTrip = () => {
    if (name.trim()) {
      addTrip({
        name: name.trim(),
        description: description.trim() || undefined,
        startDate: startDate,
        endDate: endDate,
        members: [], // Provide an empty array for members
      });
      router.back(); // Go back to the previous screen (trips list)
    } else {
      alert('Please enter a trip name.');
    }
  };

  const onStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const showStartDatepicker = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatepicker = () => {
    setShowEndDatePicker(true);
  };

  return (
    <View style={GlobalStyles.container}>
      <Stack.Screen options={{ title: 'Create New Trip' }} />
      
      <TextInput
        style={GlobalStyles.input}
        placeholder="Trip Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={GlobalStyles.input}
        placeholder="Description (Optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      
      <View style={styles.datePickerContainer}>
        <Text style={{ color: Colors.light.text }}>Start Date: {startDate.toLocaleDateString()}</Text>
        <Button onPress={showStartDatepicker} title="Select Start Date" color={Colors.light.secondary} />
        {showStartDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onStartDateChange}
          />
        )}
      </View>

      <View style={styles.datePickerContainer}>
        <Text style={{ color: Colors.light.text }}>End Date: {endDate.toLocaleDateString()}</Text>
        <Button onPress={showEndDatepicker} title="Select End Date" color={Colors.light.secondary} />
        {showEndDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onEndDateChange}
          />
        )}
      </View>

      <Button title="Create Trip" onPress={handleAddTrip} color={Colors.light.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  // Reusing GlobalStyles.container and GlobalStyles.input
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
});

export default CreateTripScreen;