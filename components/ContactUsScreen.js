import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import { styles } from './ContactUsScreenStyle'; 


const ContactUsScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.1.248:8000/Api/contact_us/', {
        name,
        email,
        subject,
        message
      });
      Alert.alert('Message Sent', 'Your message has been sent successfully.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') } 
      ]);
      // Clear form or navigate away
    } catch (error) {
      Alert.alert('Error', 'Failed to send message: ' + error.message);
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
            {/* Name Input */}
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            {/* Email Input */}
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
            />
            {/* Subject Input */}
            <TextInput
              placeholder="Subject"
              value={subject}
              onChangeText={setSubject}
              style={styles.input}
            />
            {/* Message Input */}
            <TextInput
              placeholder="Your Message"
              value={message}
              onChangeText={setMessage}
              style={[styles.input, styles.messageInput]} // Add a specific style for the message input
              multiline
              numberOfLines={5} // Start with 5 lines
            />
            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ContactUsScreen;
