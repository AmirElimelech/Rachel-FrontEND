
// export default LoginScreen;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import { styles } from './LoginScreenStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.248:8000/Api/login/', {
        username,
        password
      });
      navigation.navigate('Home', { username: response.data.username });
      
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
          {/* Logo Image */}
          <Image
            source={require('../assets/RachelLOGO.png')}
            style={styles.logo} // You might need to adjust the style
          />
        
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

            <View style={styles.passwordFieldContainer}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <MaterialIcons
                name={isPasswordVisible ? "visibility-off" : "visibility"}
                size={25}
                color="#6E6E6E"
              />
            </TouchableOpacity>
          </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
        <Text style={styles.nonClickableText}>
            Forgot your password?
        </Text>
        <Text style={styles.clickableText} onPress={() => navigation.navigate('ResetPassword')}>
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




