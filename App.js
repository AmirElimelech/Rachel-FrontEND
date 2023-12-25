import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import ContactUsScreen from './components/ContactUsScreen'; 
import ResetPasswordScreen from './components/ResetPasswordScreen';
import HomePage from './components/HomePage';




const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerBackground: () => (
            <Image
              source={require('./assets/background.png')}
              style={{ flex: 1, width: '100%' }}
              resizeMode="cover"
            />
          ),
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }}/>
        <Stack.Screen name="Contactus" component={ContactUsScreen} options={{ title: 'Contact Us' }}/>
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ title: 'Reset Password' }}/>
        <Stack.Screen name="Home" component={HomePage} options={{ title: 'Home' }}/>



        {/* Add other screens here as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
