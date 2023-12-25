import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // Get the window dimensions

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width, // Use the full width of the screen
    height: height, // Use the full height of the screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    alignSelf: 'center', 
    marginTop: 30,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#d6d6d6',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  button: {
    backgroundColor: '#6E6E6E',
    borderRadius: 5,
    width: '100%',
    paddingVertical: 12,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  
});
