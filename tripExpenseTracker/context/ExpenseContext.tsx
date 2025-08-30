import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native'; // Import Text component for loading indicator

// Define Expense type
export interface Expense {
  id: string;
  tripId: string; // Link to the trip
  userId: string; // Link to the user who incurred the expense
  description: string;
  amount: number;
  date: Date;
  category?: string;
}

// Define Expense context type
interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (expenseId: string, updatedExpense: Partial<Expense>) => void;
  deleteExpense: (expenseId: string) => void;
  getExpensesByTrip: (tripId: string) => Expense[];
  getExpenseById: (expenseId: string) => Expense | undefined;
}

// Create the context
const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// Create the provider component
interface ExpenseProviderProps {
  children: ReactNode;
}

const EXPENSE_STORAGE_KEY = 'expenses';

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true); // To manage loading state for initial load

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem(EXPENSE_STORAGE_KEY);
        if (storedExpenses) {
          // Parse dates correctly
          const parsedExpenses: Expense[] = JSON.parse(storedExpenses).map((expense: Expense) => ({
            ...expense,
            date: new Date(expense.date),
          }));
          setExpenses(parsedExpenses);
        }
      } catch (error) {
        console.error('Failed to load expenses from AsyncStorage', error);
      } finally {
        setLoading(false);
      }
    };
    loadExpenses();
  }, []);

  useEffect(() => {
    const saveExpenses = async () => {
      if (!loading) { // Only save after initial load
        try {
          await AsyncStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(expenses));
        } catch (error) {
          console.error('Failed to save expenses to AsyncStorage', error);
        }
      }
    };
    saveExpenses();
  }, [expenses, loading]); // Save whenever expenses change

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      id: Math.random().toString(), // Mock ID
      ...expenseData,
    };
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
  };

  const updateExpense = (expenseId: string, updatedExpenseData: Partial<Expense>) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === expenseId ? { ...expense, ...updatedExpenseData } : expense
      )
    );
  };

  const deleteExpense = (expenseId: string) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== expenseId));
  };

  const getExpensesByTrip = (tripId: string) => {
    return expenses.filter(expense => expense.tripId === tripId);
  };

  const getExpenseById = (expenseId: string) => {
    return expenses.find(expense => expense.id === expenseId);
  };

  if (loading) {
    return <Text>Loading expenses...</Text>; // Or a loading spinner
  }

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, updateExpense, deleteExpense, getExpensesByTrip, getExpenseById }}>
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook to use the expense context
export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};