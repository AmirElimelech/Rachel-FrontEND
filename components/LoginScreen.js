
// export default LoginScreen;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { styles } from './LoginScreenStyle';
import { ImageBackground } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.248:8000/Api/login/', {
        username,
        password
      });
      alert(`Login Successful! Token: ${response.data.token}`);
      // You can navigate to another screen or store the token as needed
    } catch (error) {
      // Check if the error response is defined and has a data property
      if (error.response && error.response.data) {
        if (error.response.data.error) {
          alert('Login Failed: ' + error.response.data.error);
        } else {
          // Handle other types of error responses (if any)
          alert('Login Failed: ' + JSON.stringify(error.response.data));
        }
      } else {
        // Handle cases where the error response is not defined
        alert('Login Failed: ' + error.message);
      }
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
      <View style={styles.card}>
        {/* Logo placeholder - replace with <Image> if you have a logo */}
        <Text style={styles.logo}>Rachel</Text>
        
        {/* Username Input */}
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="off"
          keyboardType="default"
        />

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}  
          autoCompleteType="off"
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
        <Text style={styles.nonClickableText}>
            Forgot your password?
        </Text>
        <Text style={styles.clickableText} onPress={() => navigation.navigate('Signup')}>
            {' '}Reset password
        </Text>
        </Text>

        <Text style={styles.signupText}>
        <Text style={styles.nonClickableText}>
            Don't have an account?
        </Text>
        <Text style={styles.clickableText} onPress={() => navigation.navigate('Signup')}>
            {' '}Sign up
        </Text>
        </Text>
        <Text
          style={styles.clickableText} onPress={() => navigation.navigate('Contactus')}>
          Contact us
        </Text>
      </View>
    </KeyboardAvoidingView>
  </ImageBackground>
);
};

export default LoginScreen;




