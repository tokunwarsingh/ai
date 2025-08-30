import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Text } from 'react-native'; // Import Text component
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define user types
interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

// Define Auth context type
interface AuthContextType {
  user: User | null;
  login: (username: string, role: 'admin' | 'user') => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
interface AuthProviderProps {
  children: ReactNode;
}

const USER_STORAGE_KEY = 'currentUser';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // To manage loading state for initial load

  useEffect(() => {
    const loadUser = async () => {
      try {
        // For development, clear storage to always show login initially
        if (__DEV__) {
          await AsyncStorage.removeItem(USER_STORAGE_KEY);
        }

        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user from AsyncStorage', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (username: string, role: 'admin' | 'user') => {
    const newUser: User = {
      id: Math.random().toString(), // Mock ID
      username,
      role,
    };
    setUser(newUser);
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } catch (error) {
      console.error('Failed to save user to AsyncStorage', error);
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to remove user from AsyncStorage', error);
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  if (loading) {
    return <Text>Loading authentication...</Text>; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};