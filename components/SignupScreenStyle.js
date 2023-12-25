import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop:10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(200, 211, 211, 0.8)',
    borderRadius: 5,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },

  // Add styles for MultiSelect component
  multiSelectContainer: {
    marginBottom: 20,
    borderWidth: 1, // Temporary, for debugging
    borderColor: 'red', // Temporary, for debugging
},
  multiSelectText: {
    color: '#000', // Adjust text color as needed
  },
  multiSelectItem: {
    backgroundColor: '#FFF', // Adjust item background color as needed
  },
  searchInputStyle: {
    color: '#000', // Adjust search input text color as needed
  },
  selectTextPlaceholder: {
    color: '#888', // Adjust placeholder text color as needed
  },
  multiSelectMainWrapper: {
    height: 200, // Adjust the height as needed for better visibility
    marginBottom: 20,
  },
  
  multiSelectDropdown: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },

  termsContainer: {
    padding: 10,
    // Add more styling as needed
  },
  termsScrollView: {
    maxHeight:400, // Adjust the height as needed
    // Add more styling as needed
  },
  termsText: {
    // Styling for the terms text
  },

  shelterDecisionContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  
  shelterDecisionButtons: {
    flexDirection: 'row',
    justifyContent: 'center', // Ensures the buttons are centered
    marginTop: 10,
  },
  
  decisionButton: {
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
    marginHorizontal: 10, // Adds horizontal space between buttons
  },
  
  yesButton: {
    backgroundColor: '#4CAF50', // Example green color
  },
  
  noButton: {
    backgroundColor: '#F44336', // Example red color
  },
  

});