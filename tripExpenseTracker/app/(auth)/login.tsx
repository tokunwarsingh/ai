import { Link, Stack } from 'expo-router'; // For navigation if needed within the screen
import React, { useState } from 'react';
import { Button, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Colors } from '../../constants/Colors'; // Import Colors
import { GlobalStyles } from '../../constants/Styles'; // Import GlobalStyles
import { useAuth } from '../../context/AuthContext'; // Assuming AuthContext is in /context

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Password not used in mock login, but good to have
  const [isAdmin, setIsAdmin] = useState(false); // State for role selection
  const { login } = useAuth();

  const handleLogin = () => {
    if (username.trim()) {
      login(username, isAdmin ? 'admin' : 'user');
    }
  };

  return (
    <View style={GlobalStyles.container} testID="login-screen">
      <Stack.Screen options={{ title: 'Login', headerShown: false }} /> {/* Hide header for login screen */}
      <Text style={GlobalStyles.title}>Login to Trip Tracker</Text>
      
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

      <View style={styles.roleContainer}>
        <Text style={{ color: Colors.light.text }}>Are you an Admin?</Text>
        <Switch
          trackColor={{ false: Colors.light.secondary, true: Colors.light.primary }}
          thumbColor={isAdmin ? Colors.light.primary : Colors.light.light}
          ios_backgroundColor={Colors.light.secondary}
          onValueChange={() => setIsAdmin(previousState => !previousState)}
          value={isAdmin}
          testID="admin-switch"
        />
      </View>

      <Button title="Login" onPress={handleLogin} testID="login-button" color={Colors.light.primary} />
      
      {/* Registration link */}
      <View style={styles.registerContainer}>
        <Text style={{ color: Colors.light.text }}>Don't have an account? </Text>
        <Link href="/(auth)/register" asChild>
          <Pressable>
            <Text style={GlobalStyles.textButton}>Register here.</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Reusing GlobalStyles.container and GlobalStyles.title
  // Reusing GlobalStyles.input
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default LoginScreen;