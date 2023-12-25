import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { styles } from './SignupScreenStyle';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
import { ImageBackground } from 'react-native';


const SignupScreen = ({ navigation }) => {
  // State for common and specific fields
  const [formData, setFormData] = useState({
    // Common fields
    username: '',
    email: '',
    password1: '',
    password2: '',
    identification_number: '',
    id_type: '',
    country_of_issue: '',
    phone_number: '',
    terms_accepted: false,
    city: '',
    country: '',
    profile_picture: null,

    // Civilian specific fields
    gender: '',
    intentions: [],
    address: '',

    // Support Provider specific fields
    looking_to_earn: false,
    support_provider_categories: [],
    additional_info: '',
    kosher: false,
    accessible_facilities: false,
    service_hours: '',
    active_until: '',
    languages_spoken: [],

    // Shelter specific fields
    shelter_name: '',
    shelter_address: '',
    shelter_city: '',  // This might be an ID or object depending on your data structure
    shelter_country: '',  // This might be an ID or object
    shelter_latitude: '',
    shelter_longitude: '',
    shelter_capacity: '',
    shelter_is_active: false,  // Assuming a boolean for active/inactive status
    shelter_picture: null,  // For handling file upload in React Native
    shelter_support_provider: '',  // This might be an ID or object
  });


  // Additional state variables
  const [isTypeSelected, setIsTypeSelected] = useState(false);
  const [userType, setUserType] = useState('civilian');
  const [isShelterStep, setIsShelterStep] = useState(false);

  // State for dropdown data
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [intentions, setIntentions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsPage, setShowTermsPage] = useState(true);
  const [isTosBottomReached, setIsTosBottomReached] = useState(false);
  const [isShelterStepDecided, setIsShelterStepDecided] = useState(false);
  const [isDecidingShelter, setIsDecidingShelter] = useState(false);



  const idTypeChoices = [
    { label: 'Israeli ID', value: 'israeli_id' },
    { label: 'Passport', value: 'passport' },
    { label: 'Other Identification', value: 'other' },
  ];
  
  const genderChoices = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];


  // Fetch countries when component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://192.168.1.248:8000/Api/countries/');


        
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch cities when a country is selected
  useEffect(() => {
    const fetchCities = async () => {
      if (formData.country) {
        try {
          const response = await axios.get(`http://192.168.1.248:8000/Api/cities/?country_id=${formData.country}`);


          setCities(response.data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
    };

    if (formData.country) {
      fetchCities();
    }
  }, [formData.country]);


   // Fetch cities based on selected shelter country
   useEffect(() => {
    const fetchCitiesForShelter = async () => {
      if (formData.shelter_country) {
        try {
          const response = await axios.get(`http://192.168.1.248:8000/Api/cities/?country_id=${formData.shelter_country}`);
          setCities(response.data);
        } catch (error) {
          console.error('Error fetching cities for shelter:', error);
        }
      }
    };

    fetchCitiesForShelter();
  }, [formData.shelter_country]);







  useEffect(() => {
    const fetchIntentions = async () => {
      try {
        const response = await axios.get('http://192.168.1.248:8000/Api/intentions/');

        
        setIntentions(response.data);
      } catch (error) {
        console.error('Error fetching intentions:', error);
      }
    };
    fetchIntentions();

    // Fetch Languages
    const fetchLanguages = async () => {
        try {
            const response = await axios.get('http://192.168.1.248:8000/Api/languages/');
            setLanguages(response.data);
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
        };
        fetchLanguages();
    
        // Fetch Categories
        const fetchCategories = async () => {
        try {
            const response = await axios.get('http://192.168.1.248:8000/Api/categories/');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        };
        fetchCategories();

  }, []);


    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleUserTypeSelection = (type) => {
        setUserType(type);
        setIsTypeSelected(true);
        if (type === 'support_provider') {
          setIsDecidingShelter(true);
        } else {
          setIsDecidingShelter(false);
        }
      };
      

    const handleNext = () => {
    setIsTypeSelected(true);
    if (userType === 'support_provider') {
        setIsDecidingShelter(true);
    }
    };

    const renderShelterDecisionStep = () => {
        return (
          <View style={styles.shelterDecisionContainer}>
            <Text>Are you here to add a shelter?</Text>
            <View style={styles.shelterDecisionButtons}>
              <TouchableOpacity
                style={[styles.decisionButton, styles.yesButton]}
                onPress={() => {
                  setIsShelterStep(true);
                  setIsDecidingShelter(false);
                }}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.decisionButton, styles.noButton]}
                onPress={() => {
                  setIsShelterStep(false);
                  setIsDecidingShelter(false);
                }}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      };
      
      
  

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://192.168.1.248:8000/Api/register/', {
        user_type: userType,
        ...formData
      });
      Alert.alert('Signup Successful', `Welcome, ${response.data.user.username}!`);
      navigation.navigate('Login');  
    } catch (error) {
      Alert.alert('Signup Failed', error.response?.data.error || error.message);
    }
  };


  const renderTermsOfService = () => {
  
    const onScroll = ({ nativeEvent }) => {
      if (isCloseToBottom(nativeEvent)) {
        setIsTosBottomReached(true);
      }
    };
  
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    };
  
    return (
      <View style={styles.termsContainer}>
        <ScrollView 
          style={styles.termsScrollView} 
          onScroll={onScroll}
          scrollEventThrottle={400}
        >
          <Text style={styles.termsText}>
         Terms of Use Welcome to Waze! These Terms of Use (“Terms”) 
         govern your rights and obligations regarding the use of Waze’s 
         Software (“Software”) and service (both collectively referred 
         to as the “Service”) on the Internet or in cellular media. 
         These Terms constitute a fully binding agreement between Waze 
         Mobile Ltd. (including its affiliates and subsidiaries, “Waze” or “We”)
          the proprietor of all rights in and to the Service, and you. It is 
          therefore recommended that you carefully read these Terms. By using 
          the Waze Service, you signify your assent to these Terms; Waze’s privacy policy 
          (“Privacy Policy”); and Waze’s copyright policy (“Copyright Policy”) all of which 
          are an integral part of these Terms. If you do not agree to these Terms or any of 
          its parts, then you are prohibited and must refrain from using the Service. KEY POINTS 
          The following key points of the Terms are highlighted here for your convenience only. 
          These key points are not made in lieu of the full Terms and their presence in this section 
          does not mean that they are intended to supersede or override any other terms or conditions 
          provided by Waze.. Road information prevails. The information provided by the Service 
          is not intended to replace the information provided on the road, such as travel direction, 
          time based restrictions, lane restrictions, road blockades, traffic signs, traffic lights, 
          police instructions, etc. Cautious driving. Always drive vigilantly according to road 
          conditions and in accordance with traffic laws. It is strictly forbidden to send 
          traffic updates (such as updates on road accidents and traffic congestion), or 
          to non-verbally interact with the Service or use the Service in a non-verbal 
          manner for any purpose other than navigation while driving. Traffic 
          updates or non-verbal reports you want to submit to the Service 
          may only be sent after you have stopped your vehicle in an 
          appropriate location permitted by law. Alternatively, 
          such updates may be sent by a passenger other than 
          the driver, provided it does not interfere with 
          the due course of driving and does not 
          distract the driver’s attention to 
          the road. Non-continuous 
          updates.
          </Text>
        </ScrollView>
  
        <CheckBox
                title="I agree to the Terms of Service"
                checked={termsAccepted}
                onPress={() => setTermsAccepted(!termsAccepted)}
                containerStyle={{ opacity: isTosBottomReached ? 1 : 0.1 }}
                disabled={!isTosBottomReached}
            />
  
        <TouchableOpacity
          style={[styles.button, { opacity: termsAccepted && isTosBottomReached ? 1 : 0.1 }]}
          disabled={!termsAccepted || !isTosBottomReached}
          onPress={() => setShowTermsPage(false)}
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  
  const renderFormBasedOnSelection = () => {
    // Check if we should show the Terms of Service page
    if (showTermsPage) {
        return renderTermsOfService();
    }

    // User type selection step
    if (!isTypeSelected) {
        return (
            <>
                <Text style={styles.label}>Which user are you?</Text>
                <Picker
                    selectedValue={userType}
                    onValueChange={(itemValue) => setUserType(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Civilian" value="civilian" />
                    <Picker.Item label="Support Provider" value="support_provider" />
                </Picker>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleNext}
                    disabled={!userType}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </>
        );
    } else if (isDecidingShelter) {
        return renderShelterDecisionStep();
      } else if (userType === 'civilian') {
        return renderCivilianForm();
      } else if (userType === 'support_provider') {
        return isShelterStep ? renderShelterForm() : renderSupportProviderForm();
      }
    };
  
  
  const renderCommonFields = () => {
    return (
      <>
        {/* Username Input */}
        <TextInput
          placeholder="Username"
          value={formData.username}
          onChangeText={(text) => handleChange('username', text)}
          style={styles.input}
        />
  
        {/* Email Input */}
        <TextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          style={styles.input}
        />
  
        {/* Password Input */}
        <TextInput
          placeholder="Password"
          value={formData.password1}
          onChangeText={(text) => handleChange('password1', text)}
          secureTextEntry={true}
          style={styles.input}
        />
  
        {/* Confirm Password Input */}
        <TextInput
          placeholder="Confirm Password"
          value={formData.password2}
          onChangeText={(text) => handleChange('password2', text)}
          secureTextEntry={true}
          style={styles.input}
        />

        {/* ID Type Picker */}
        <Picker
          selectedValue={formData.id_type}
          onValueChange={(itemValue) => handleChange('id_type', itemValue)}
          style={styles.picker}
        >
          {idTypeChoices.map((choice, index) => (
            <Picker.Item key={index} label={choice.label} value={choice.value} />
          ))}
        </Picker>

        {/* Country of Issue Picker */}
        <Picker
          selectedValue={formData.country_of_issue}
          onValueChange={(itemValue) => handleChange('country_of_issue', itemValue)}
          style={styles.picker}
        >
          {countries.map((country, index) => (
            <Picker.Item key={index} label={country.name} value={country.id} />
          ))}
        </Picker>
  
        {/* Identification Number Input */}
        <TextInput
          placeholder="Identification Number"
          value={formData.identification_number}
          onChangeText={(text) => handleChange('identification_number', text)}
          style={styles.input}
        />
  

  
        {/* Phone Number Input */}
        <TextInput
          placeholder="Phone Number"
          value={formData.phone_number}
          onChangeText={(text) => handleChange('phone_number', text)}
          style={styles.input}
        />
  
        {/* Country Picker */}
        <Picker
          selectedValue={formData.country}
          onValueChange={(itemValue) => handleChange('country', itemValue)}
          style={styles.picker}
        >
          {countries.map((country, index) => (
            <Picker.Item key={index} label={country.name} value={country.id} />
          ))}
        </Picker>

        {/* City Picker */}
        <Picker
          selectedValue={formData.city}
          onValueChange={(itemValue) => handleChange('city', itemValue)}
          style={styles.picker}
        >
          {cities.map((city, index) => (
            <Picker.Item key={index} label={city.name} value={city.id} />
          ))}
        </Picker>
  

  
        {/* Profile Picture Upload */}
        {/* Implement this based on how you handle file uploads in React Native */}
      </>
    );
  };
  
  
  const renderCivilianForm = () => {
    return (
      <>
        {renderCommonFields()}
  
        {/* Gender Picker */}
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(itemValue) => handleChange('gender', itemValue)}
          style={styles.picker}
        >
          {genderChoices.map((choice, index) => (
            <Picker.Item key={index} label={choice.label} value={choice.value} />
          ))}
        </Picker>
  
        {/* Address Input */}
        <TextInput
          placeholder="Address"
          value={formData.address}
          onChangeText={(text) => handleChange('address', text)}
          style={styles.input}
        />
  
        {/* Intentions Selection */}
        <Text style={styles.label}>Intentions</Text>
        <SectionedMultiSelect
          items={intentions.map(intention => ({
            name: intention.human_readable_name, 
            id: intention.id 
          }))}
          uniqueKey="id"
          selectText="Select Intentions"
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={(selectedItems) => handleChange('intentions', selectedItems)}
          selectedItems={formData.intentions}
          IconRenderer={Icon}
        />
      </>
    );
  };
  
  
  const renderSupportProviderForm = () => {
    return (
      <>
        {renderCommonFields()}

        {/* Support Provider Categories MultiSelect */}
        <Text style={styles.label}>Support Provider Categories</Text>
        <SectionedMultiSelect
          items={categories.map(category => ({
            name: category.name, 
            id: category.id 
          }))}
          uniqueKey="id"
          selectText="Select Categories"
          onSelectedItemsChange={(selectedItems) => handleChange('support_provider_categories', selectedItems)}
          selectedItems={formData.support_provider_categories}
          IconRenderer={Icon}
        />
  
        {/* Support Provider specific fields */}
        <TextInput
          placeholder="Looking to Earn"
          value={formData.looking_to_earn.toString()}
          onChangeText={(text) => handleChange('looking_to_earn', text === 'true')}
          style={styles.input}
        />
  
        {/* Additional Info Input */}
        <TextInput
          placeholder="Additional Information"
          value={formData.additional_info}
          onChangeText={(text) => handleChange('additional_info', text)}
          style={styles.input}
        />
  
        {/* Kosher Checkbox */}
        <CheckBox
          title='Kosher'
          checked={formData.kosher}
          onPress={() => handleChange('kosher', !formData.kosher)}
        />
  
        {/* Accessible Facilities Checkbox */}
        <CheckBox
          title='Accessible Facilities'
          checked={formData.accessible_facilities}
          onPress={() => handleChange('accessible_facilities', !formData.accessible_facilities)}
        />
  
        {/* Service Hours Input */}
        <TextInput
          placeholder="Service Hours"
          value={formData.service_hours}
          onChangeText={(text) => handleChange('service_hours', text)}
          style={styles.input}
        />
  
        {/* Active Until Date Picker */}
        {/* You can integrate a date picker component here */}
        {/* ... */}
  
        {/* Languages Spoken MultiSelect */}
        <Text style={styles.label}>Languages Spoken</Text>
        <SectionedMultiSelect
          items={languages.map(language => ({
            name: language.name, 
            id: language.id 
          }))}
          uniqueKey="id"
          selectText="Select Languages"
          onSelectedItemsChange={(selectedItems) => handleChange('languages_spoken', selectedItems)}
          selectedItems={formData.languages_spoken}
          IconRenderer={Icon}
        />



      </>
    );
  };
  
  
  
  const renderShelterForm = () => {
    return (
      <>
        {renderCommonFields()}
  
        {/* Shelter specific fields */}
        <TextInput
          placeholder="Shelter Name"
          value={formData.shelterName}
          onChangeText={(text) => handleChange('shelterName', text)}
          style={styles.input}
        />
  
        <TextInput
          placeholder="Shelter Address"
          value={formData.shelterAddress}
          onChangeText={(text) => handleChange('shelterAddress', text)}
          style={styles.input}
        />
  
        {/* City Picker */}
        {/* ... Integrate your city picker component ... */}
  
        {/* Country Picker */}
        {/* ... Integrate your country picker component ... */}
  
        <TextInput
        placeholder="Latitude"
        value={formData.latitude ? formData.latitude.toString() : ''}
        onChangeText={(text) => handleChange('latitude', parseFloat(text))}
        keyboardType="numeric"
        style={styles.input}
        />
  
        <TextInput
        placeholder="Longitude"
        value={formData.longitude ? formData.longitude.toString() : ''}
        onChangeText={(text) => handleChange('longitude', parseFloat(text))}
        keyboardType="numeric"
        style={styles.input}
        />
        
        <TextInput
        placeholder="Capacity"
        value={formData.capacity ? formData.capacity.toString() : ''}
        onChangeText={(text) => handleChange('capacity', parseInt(text, 10))}
        keyboardType="numeric"
        style={styles.input}
        />
  

  
        {/* Picture Upload */}
        {/* ... Integrate your file upload component for shelter pictures ... */}
      </>
    );
  };
  

  const handleSubmitButtonPress = () => {
    let isValid = true;
  
    // Common field validations
    if (!formData.username || !formData.email || !formData.password1 || !formData.password2) {
      Alert.alert('Error', 'Please fill in all required fields.');
      isValid = false;
    }
    if (formData.password1 !== formData.password2) {
      Alert.alert('Error', 'Passwords do not match.');
      isValid = false;
    }
  
    // Additional validations based on user type
    if (userType === 'civilian') {
      if (!formData.gender || !formData.address || formData.intentions.length === 0) {
        Alert.alert('Error', 'Please complete all civilian fields.');
        isValid = false;
      }
    } else if (userType === 'support_provider' && !isShelterStep) {
      if (!formData.looking_to_earn || formData.support_provider_categories.length === 0) {
        Alert.alert('Error', 'Please complete all support provider fields.');
        isValid = false;
      }
    } else if (isShelterStep) {
      if (!formData.shelter_name || !formData.shelter_address || !formData.shelter_city || !formData.shelter_country || !formData.shelter_latitude || !formData.shelter_longitude || !formData.shelter_capacity) {
        Alert.alert('Error', 'Please complete all shelter fields.');
        isValid = false;
      }
    }
  
    // If all validations pass, proceed with the signup process
    if (isValid) {
      handleSignup();
    }
  };
  
  
  return (
    <ImageBackground
    source={require('../assets/background.png')} // Change this to the path of your image file
    style={styles.backgroundImage}
    >
    <ScrollView>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Sign Up</Text>
  
          {renderFormBasedOnSelection()}
  
          {/* Only show the 'SIGN UP' button when appropriate */}
          {isTypeSelected && !isDecidingShelter && (
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleSubmitButtonPress}
            >
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
          )}
  
          {/* Rest of your component's return logic */}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
    </ImageBackground>
  );
};

export default SignupScreen;
