import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ADD8E6',
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',  // White background for inputs
  },
  button: {
    borderRadius: 10, // Reduced rounded edges
    backgroundColor: '#97C8EB', // Slightly darker than the background
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android
    alignSelf: 'center', // Center the button
    paddingHorizontal: 30, // Horizontal padding for button size
    paddingVertical: 10, // Vertical padding
  },
  buttonText: {
    color: 'white', // White text color for the button
    textAlign: 'center',
  },
  signupText: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white', // White color for the welcome text
  },
});