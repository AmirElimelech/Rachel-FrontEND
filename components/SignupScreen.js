import axios from 'axios';
import { styles } from './SignupScreenStyle';
import { ImageBackground } from 'react-native';
import { CheckBox } from 'react-native-elements';
import React, { useState, useEffect, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {
    View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert
  } from 'react-native';





  

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
  const categorySelectRef = useRef(null);
  const languageSelectRef = useRef(null);
  const intentionSelectRef = useRef(null);
  const [cities, setCities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [intentions, setIntentions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentStep, setCurrentStep] = useState(0); 
  const [userType, setUserType] = useState('civilian');
  const [showTermsPage, setShowTermsPage] = useState(true);
  const [isShelterStep, setIsShelterStep] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isTypeSelected, setIsTypeSelected] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isDecidingShelter, setIsDecidingShelter] = useState(false);
  const [isTosBottomReached, setIsTosBottomReached] = useState(false);

  





  const steps = ['Terms of Service', 'User Type', 'Registration Details'];

  const CustomSelectedIcon = () => (
    <MaterialIcons name="add-box" size={25} color="#6E6E6E" />
    );  

  const ProgressIndicator = ({ currentStep, steps }) => {
    return (
      <View style={styles.progressContainer}>
        {steps.map((step, index) => (
          <View key={step} style={[styles.stepDot, currentStep >= index && styles.activeStepDot]} />
        ))}
      </View>
    );
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  
  const idTypeChoices = [
    { label: 'Chose your ID type', value: '' },
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
                if (error.response && error.response.status === 404) {
                    // Handle 404 error - No cities found for the selected country
                    setCities([]);
                } else {
                    console.error('Error fetching cities:', error);
                }
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
        // Special handling for multi-select fields (arrays)
        if (name === 'intentions' || name === 'support_provider_categories' || name === 'languages_spoken') {
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        }
        // Special handling for the password field
        else if (name === 'password1') {
        setPasswordStrength(evaluatePasswordStrength(value));
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        }
        // Handle ID type change and set country_of_issue for specific types
        else if (name === 'id_type') {
        const isIsraeliIdOrPassport = value === 'passport' || value === 'israeli_id';
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
            country_of_issue: isIsraeliIdOrPassport ? '101' : prevFormData.country_of_issue
        }));
        } 
        // For all other fields, update the value as usual
        else {
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        }
    };

    


    const handleNext = () => {
    setIsTypeSelected(true);
    if (userType === 'support_provider') {
        setIsDecidingShelter(true);
    }
    };

    const evaluatePasswordStrength = (password) => {
        let strength = 0;
        const lengthCriteria = password.length >= 8;
        const lowercaseCriteria = /[a-z]/.test(password);
        const uppercaseCriteria = /[A-Z]/.test(password);
        const numberCriteria = /\d/.test(password);
        const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const consecutiveCriteria = !/(\w)\1{2,}/.test(password); // Checks for 3 or more consecutive characters
        const commonPatternCriteria = !/password|123456|qwerty/.test(password); // Example of common patterns to avoid
    
        if (lengthCriteria) strength += 1;
        if (lowercaseCriteria && uppercaseCriteria) strength += 1;
        if (numberCriteria) strength += 1;
        if (specialCharCriteria) strength += 1;
        if (consecutiveCriteria && commonPatternCriteria) strength += 1;
    
        return strength; // Returns a number between 0 and 5
    };


      const PasswordStrengthIndicator = ({ strength }) => {
        let backgroundColor;
        let text;
      
        switch (strength) {
          case 0:
            backgroundColor = 'transparent';
            text = '';
            break;
          case 1:
            backgroundColor = 'red';
            text = 'Very Weak';
            break;
          case 2:
            backgroundColor = 'orange';
            text = 'Weak';
            break;
          case 3:
            backgroundColor = 'yellow';
            text = 'Medium';
            break;
          case 4:
            backgroundColor = 'lightgreen';
            text = 'Strong';
            break;
          case 5:
            backgroundColor = 'green';
            text = 'Very Strong';
            break;
          default:
            backgroundColor = 'transparent';
            text = '';
        }
      
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <View style={{ width: `${(strength / 5) * 50}%`, height: 7, backgroundColor, borderRadius: 2.5 }} />
            <Text style={{ marginLeft: 10 }}>{text}</Text>
          </View>
        );
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
      Alert.alert('Signup Successful', `Welcome, ${response.data.user.username}! Please wait for Administrator to Activate your account`);
      navigation.navigate('Login');  
    } catch (error) {
      Alert.alert('Signup Failed', error.response?.data.error || error.message);
    }
  };


  const formatLabel = (fieldName) => {
    // Replace underscores with spaces and capitalize each word
    return fieldName
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
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

    const onTermsAcceptanceChange = () => {
        setTermsAccepted(!termsAccepted);
        handleChange('terms_accepted', !termsAccepted);
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
            onPress={onTermsAcceptanceChange}
            containerStyle={{ opacity: isTosBottomReached ? 1 : 0 }}
            disabled={!isTosBottomReached}
            />
  
        <TouchableOpacity
            style={[styles.button, { opacity: termsAccepted && isTosBottomReached ? 1 : 0 }]}
            disabled={!termsAccepted || !isTosBottomReached}
            onPress={() => {
                setShowTermsPage(false);
                setCurrentStep(1); // Move to the next step (User Type Selection)
            }}
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
                onPress={() => {
                    handleNext();
                    setCurrentStep(2); // Move to the next step (Registration Details)
                }}
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
        
        <View style={styles.passwordFieldContainer}>
        <TextInput
            placeholder="Password"
            value={formData.password1}
            onChangeText={(text) => handleChange('password1', text)}
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



        {formData.password1.length > 0 && <PasswordStrengthIndicator strength={passwordStrength} />}

  
        <View style={styles.passwordFieldContainer}>
        <TextInput
            placeholder="Confirm Password"
            value={formData.password2}
            onChangeText={(text) => handleChange('password2', text)}
            secureTextEntry={!isPasswordVisible} e
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

        {/* First Name Input */}
        <TextInput
            placeholder="First Name"
            value={formData.first_name}
            onChangeText={(text) => handleChange('first_name', text)}
            style={styles.input}
        />

        {/* Last Name Input */}
        <TextInput
            placeholder="Last Name"
            value={formData.last_name}
            onChangeText={(text) => handleChange('last_name', text)}
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

        {/* Conditionally render Country of Issue Picker */}
        {formData.id_type === 'other' && (
            <Picker
            selectedValue={formData.country_of_issue}
            onValueChange={(itemValue) => handleChange('country_of_issue', itemValue)}
            style={styles.picker}
            >
            {countries.map((country, index) => (
                <Picker.Item key={index} label={country.name} value={country.id} />
            ))}
            </Picker>
        )}
  
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
            <Picker.Item label="Choose Country" value="" />
            {countries.map((country, index) => (
                <Picker.Item key={index} label={country.name} value={country.id} />
            ))}
        </Picker>

        {formData.country && formData.country !== '' && (
            cities.length > 0 ? (
                <Picker
                    selectedValue={formData.city}
                    onValueChange={(itemValue) => handleChange('city', itemValue)}
                    style={styles.picker}
                >
                    {cities.map((city, index) => (
                        <Picker.Item key={index} label={city.name} value={city.id} />
                    ))}
                </Picker>
            ) : (
                <Text>No cities available for the selected country.</Text>
            )
        )}
        

  
        {/* Profile Picture Upload */}
        {/* Implement this based on how you handle file uploads in React Native */}
      </>
    );
  };
  
  
  
  const renderMultiSelectField = (selectedItems, items, fieldName, placeholderText) => {

    let selectRef;
    if (fieldName === 'intentions') {
        selectRef = intentionSelectRef;
    } else if (fieldName === 'support_provider_categories') {
        selectRef = categorySelectRef;
    } else if (fieldName === 'languages_spoken') {
        selectRef = languageSelectRef;
    }

    return (
        <View style={styles.multiSelectFieldContainer}>
            <TouchableOpacity onPress={() => selectRef.current._toggleSelector()}>
                <Text style={styles.multiSelectFieldText}>{placeholderText}</Text>
            </TouchableOpacity>


            <SectionedMultiSelect
            ref={selectRef}
            items={items.map(item => ({
                name: item.human_readable_name || item.name,
                id: item.id
            }))}
            uniqueKey="id"
            selectText={`Select ${fieldName}`}
            showDropDowns={true}
            onSelectedItemsChange={(selectedItems) => handleChange(fieldName, selectedItems)}
            selectedItems={selectedItems}
            IconRenderer={Icon}
            selectedIconComponent={<CustomSelectedIcon />}
            hideSelect={true}
            styles={{
                modalWrapper: styles.multiSelectMainWrapper,
                selectToggle: styles.multiSelectDropdown,
                itemText: styles.multiSelectText,
                selectedItem: styles.multiSelectItem,
                searchTextInput: styles.searchTextInput,
                confirmButton: styles.confirmButton,
            }}
            />
        </View>
    );
};

  
  const renderCivilianForm = () => {


    return (
      <>
        {renderCommonFields()}
  
        {/* Gender Picker */}
        <Picker
        
          selectedValue={formData.gender}
          onValueChange={(itemValue) => handleChange('gender', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Gender" value="" />
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
  
    {renderMultiSelectField(formData.intentions, intentions, 'intentions', 'What are your main intentions for using the app?')}


      </>
    );
  };
  
  
  const renderSupportProviderForm = () => {
    return (
      <>
        {renderCommonFields()}

        {renderMultiSelectField(formData.support_provider_categories, categories, 'support_provider_categories', 'Select Categories')}


     
   
        {/* Additional Info Input */}
        <TextInput
          placeholder="Additional Information"
          value={formData.additional_info}
          onChangeText={(text) => handleChange('additional_info', text)}
          style={styles.input}
        />
  
        {/* Kosher Checkbox */}
        <CheckBox
          title='Kosher Services ?'
          checked={formData.kosher}
          onPress={() => handleChange('kosher', !formData.kosher)}
        />
  
        {/* Accessible Facilities Checkbox */}
        <CheckBox
          title='Accessible Facilities ?'
          checked={formData.accessible_facilities}
          onPress={() => handleChange('accessible_facilities', !formData.accessible_facilities)}
        />

        {/* Looking to Earn Checkbox */}
        <CheckBox
            title='Looking to Earn ?'
            checked={formData.looking_to_earn}
            onPress={() => handleChange('looking_to_earn', !formData.looking_to_earn)}
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
        {renderMultiSelectField(formData.languages_spoken, languages, 'languages_spoken', 'Select Languages')}
        




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
        <ProgressIndicator currentStep={currentStep} steps={steps} />
        <View style={styles.card}>
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
