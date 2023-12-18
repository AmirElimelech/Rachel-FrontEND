import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { styles } from './LoginScreenStyle';

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
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Rachel</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text
        style={styles.signupText}
        onPress={() => navigation.navigate('Signup')} // Replace with your signup screen navigation
      >
        Don't have an account? Sign up now
      </Text>
    </View>
  );
};

export default LoginScreen;