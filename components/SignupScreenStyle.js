import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop:10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    paddingRight: 40, // Right padding to prevent text from going under the icon
    flex: 1,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },



  picker: {
    width: '100%',
    borderRadius: 6, 
    borderWidth: 0.5, 
    borderColor: '#d1d1d1', 
    marginBottom:20,

  
    
  },

  button: {
    backgroundColor: '#6E6E6E',
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


  searchInputStyle: {
    color: '#000', // Adjust search input text color as needed
  },
  selectTextPlaceholder: {
    color: '#888', // Adjust placeholder text color as needed
  },


multiSelectMainWrapper: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15, // Rounded corners for the modal
  },
  
  multiSelectDropdown: {
    backgroundColor: '#ffffff', // White background for the dropdown
    paddingVertical: 12, // Vertical padding for dropdown
    paddingHorizontal: 15, // Horizontal padding for dropdown
    borderRadius: 6, // Rounded corners for the dropdown
    borderWidth: 1, // Border for the dropdown
    borderColor: '#d1d1d1', // Light gray border color
    marginBottom: 10, // Margin bottom
  },

  multiSelectText: {
    color: '#333333', // Darker text for better readability
    fontSize: 16, // Slightly larger text
  },

  multiSelectItem: {
    backgroundColor: '#ffffff', // White background for each item
    borderBottomWidth: 1, // Border bottom for each item
    borderBottomColor: '#e6e6e6', // Light gray border bottom color
    paddingVertical: 10, // Vertical padding for items
  },

  searchTextInput: {
    backgroundColor: '#ffffff', // White background for search input
    borderColor: '#cccccc', // Light gray border color
    borderWidth: 1, // Border width for search input
    borderRadius: 10, // Rounded corners for search input
    padding: 10, // Padding for search input
    marginRight: 5,
    fontSize: 16, // Font size
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

  inputIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  passwordFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#d6d6d6',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'transparent', 
    borderWidth: 0, // Remove border
  },

  
  eyeIcon: {
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  
  yesButton: {
    backgroundColor: '#4CAF50', // Example green color
  },
  
  noButton: {
    backgroundColor: '#F44336', // Example red color
  },

progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  stepDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeStepDot: {
    backgroundColor: '#6E6E6E',
    width: 15, 
    height: 10,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4, 
  },




//   new 

multiSelectFieldContainer: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#d6d6d6',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 15,
  },
  multiSelectFieldText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10, // Space between the label and the chosen items
  },
  chosenItemsContainer: {
    marginTop: 5, // Space between the touchable area and the chosen items
  },
  chosenItemsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8, // Increased spacing between label and items
  },
  chosenItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5, // Added to separate items
  },

  

  
  

});