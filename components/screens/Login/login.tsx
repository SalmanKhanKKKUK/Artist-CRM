import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Input from '../../common/Inputs/Input';

const Login = ({ onBack }: { onBack: () => void }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dateVisited, setDateVisited] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    dateVisited?: string;
  }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const handleImageUpload = async () => {
    try {
      // Request permission
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setProfileImage(selectedImage.uri);
        Alert.alert('Success', 'Profile image uploaded successfully!');
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };

  const handleSaveClient = () => {
    const newErrors: {
      fullName?: string;
      phoneNumber?: string;
      email?: string;
      dateVisited?: string;
    } = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!dateVisited.trim()) {
      newErrors.dateVisited = 'Date of visit is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    Alert.alert('Success', 'Client saved successfully!');
  };

  const handleCancel = () => {
    onBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Title Section */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Add New Client</Text>
          </View>

          {/* Camera Section */}
          <View style={styles.cameraContainer}>
            <TouchableOpacity onPress={handleImageUpload} style={styles.cameraButton}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.cameraPlaceholder}>
                  <MaterialCommunityIcons name="camera" size={50} color="#FFD700" />
                  <Text style={styles.cameraText}>Upload Photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Client Form */}
          <View style={styles.formContainer}>
            {/* Full Name Input */}
            <Input
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              leftIcon="account"
              error={errors.fullName}
            />

            {/* Phone Number Input */}
            <Input
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              leftIcon="phone"
              error={errors.phoneNumber}
            />

            {/* Email Address Input */}
            <Input
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="email"
              error={errors.email}
            />

            {/* Date of Visited Input */}
            <Input
              label="Date of Visit"
              value={dateVisited}
              onChangeText={setDateVisited}
              placeholder="MM/DD/YYYY"
              keyboardType="numeric"
              maxLength={10}
              leftIcon="calendar"
              error={errors.dateVisited}
            />

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveClient}>
                <Text style={styles.saveButtonText}>Save Client</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  titleContainer: {
    backgroundColor: '#000',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cameraContainer: {
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 20,
    paddingBottom: 30,
  },
  cameraButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    color: '#FFD700',
    fontSize: 12,
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 15,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Login;
