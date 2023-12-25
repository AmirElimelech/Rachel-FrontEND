import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import axios from 'axios';
import { styles } from './ResetPasswordScreenStyle'; // Adjust this path to your styles

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://192.168.1.248:8000/Api/reset_password_request/', { email });
      // Display the generic message received from the backend
      Alert.alert('Reset Password', response.data.message);
      navigation.navigate('Login');
    } catch (error) {
      // In case of a network or server error, handle it here
      Alert.alert('Error', 'Failed to process your request: ' + error.message);
    }
  };
  

  return (
    <ImageBackground
      source={require('../assets/background.png')} // Change this to the path of your image file
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.card}>
            <Text style={styles.title}>Forgot your password ?</Text>
            {/* Email Input */}
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {/* Reset Password Button */}
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ResetPasswordScreen;
