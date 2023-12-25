import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styles } from './HomePageStyle'; // Adjust this path to your styles

const HomePage = ({ route }) => {
  // Extract the username passed from the LoginScreen
  const { username } = route.params;

  return (
    <ImageBackground
      source={require('../assets/background.png')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome, {username}</Text>
     
      </View>
    </ImageBackground>
  );
};

export default HomePage;
