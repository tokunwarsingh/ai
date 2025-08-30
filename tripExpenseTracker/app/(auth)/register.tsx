import { Link, Stack } from 'expo-router';
import React, { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../constants/Styles';
import { useAuth } from '../../context/AuthContext';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // For future role selection if needed
  const { register } = useAuth(); // Assuming a register function exists in AuthContext

  const handleRegister = () => {
    if (username.trim() && password.trim()) {
      // In a real app, you'd send username, password, and potentially isAdmin to your backend
      // For this mock, we'll just call a mock register function
      register(username, password, isAdmin ? 'admin' : 'user');
    }
  };

  return (
    <View style={GlobalStyles.container} testID="register-screen">
      <Stack.Screen options={{ title: 'Register', headerShown: false }} />
      <Text style={GlobalStyles.title}>Register for Trip Tracker</Text>
      
      <TextInput
        style={GlobalStyles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        testID="username-input"
      />

      <TextInput
        style={GlobalStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        testID="password-input"
      />

      {/* Role selection can be added here if needed for registration */}
      {/* <View style={styles.roleContainer}>
        <Text style={{ color: Colors.light.text }}>Register as Admin?</Text>
        <Switch
          trackColor={{ false: Colors.light.secondary, true: Colors.light.primary }}
          thumbColor={isAdmin ? Colors.light.primary : Colors.light.light}
          ios_backgroundColor={Colors.light.secondary}
          onValueChange={() => setIsAdmin(previousState => !previousState)}
          value={isAdmin}
          testID="admin-switch"
        />
      </View> */}

      <Button title="Register" onPress={handleRegister} testID="register-button" color={Colors.light.primary} />

      <View style={styles.loginContainer}>
        <Text style={{ color: Colors.light.text }}>Already have an account? </Text>
        <Link href="/(auth)/login" asChild>
          <Pressable>
            <Text style={GlobalStyles.textButton}>Login here.</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  // Add other styles if needed
});

export default RegisterScreen;