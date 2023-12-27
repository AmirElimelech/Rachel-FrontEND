import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ADD8E6',
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Card is now almost transparent
    borderRadius: 20, // Consistent rounded corners
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  logo: {
    width: 150, // Adjust as needed
    height: 100, // Adjust as needed
    resizeMode: 'contain', // Ensure the logo is scaled properly
    marginBottom: 30, // Space below the logo
    opacity: 0.7,
},

passwordFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#d6d6d6',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderTopLeftRadius: 10, // Match the border radius
    borderBottomLeftRadius: 10, // Match the border radius
    backgroundColor: 'transparent', // To avoid overriding the container's background
    borderWidth: 0, // Remove individual border from input
  },


  eyeIcon: {
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    width: '100%',
    marginBottom: 20, // Increase spacing between inputs
    borderWidth: 0.5, // Thinner border
    borderColor: '#d6d6d6', // Lighter border color
    borderRadius: 10, // Slightly rounded corners for a softer look
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16, // Slightly larger font for readability
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent input fields
  },
  button: {
    backgroundColor: '#6E6E6E',
    borderRadius: 5,
    width: '100%', // A moderate width for the button
    paddingVertical: 12,
    alignSelf: 'center', // Center the button in the card
    marginBottom: 20,
  },

  nonClickableText: {
    color: '#000', // Set the color you prefer
    marginTop: 20,
    fontSize: 16,
  },
  
  clickableText: {
    color: '#007aff', // Set the color you prefer
    marginTop: 10,
    fontSize: 16,
  },
  
  buttonText: {
    color: 'white',
    fontWeight: '600', // Bold but not too bold
    fontSize: 18, // Slightly larger font
    textAlign: 'center',
  },


  welcomeText: {
    fontSize: 28, // Slightly larger for impact
    fontWeight: 'light', // A lighter font weight for a cleaner look
    marginBottom: 30, // More space around the welcome text
    textAlign: 'center',
    color: '#000', // Pure black for contrast
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

});
