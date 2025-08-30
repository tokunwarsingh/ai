import { StyleSheet } from 'react-native';
import { Colors } from './Colors'; // Import Colors

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.light.text,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: Colors.light.secondary,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: Colors.light.light,
    color: Colors.light.text,
  },
  buttonContainer: {
    marginTop: 15,
    width: '100%',
  },
  textButton: {
    color: Colors.light.primary,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  // Add more global styles as needed
});