import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicButton from '../../common/Buttons/DynamicButton';
import Input from '../../common/Inputs/Input';

const Login = ({ onBack, onNavigateToSignup, onNavigateToHome }: { 
  onBack: () => void;
  onNavigateToSignup?: () => void;
  onNavigateToHome?: () => void;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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


  const handleLogin = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    Alert.alert('Success', 'Login successful!');
  };

  const handleCancel = () => {
    console.log('Cancel button pressed - going to Home page');
    if (onNavigateToHome) {
      onNavigateToHome();
    }
  };

  const handleSignupClick = () => {
    if (onNavigateToSignup) {
      onNavigateToSignup();
    }
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
            <Text style={styles.title}>Login</Text>
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


          {/* Login Form */}
          <View style={styles.formContainer}>
            {/* Email Input */}
            <Input
              label="Enter Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="email"
              error={errors.email}
            />

            {/* Password Input */}
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              leftIcon="lock"
              error={errors.password}
            />

            {/* Forgot Password and Sign Up */}
            <View style={styles.authLinksContainer}>
              <TouchableOpacity style={styles.linkButton}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.linkButton} onPress={handleSignupClick}>
                <Text style={styles.linkText}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* Login Buttons */}
            <View style={styles.buttonContainer}>
              <DynamicButton
                text="Login"
                onPress={handleLogin}
                backgroundColor="#FFD700"
                textColor="#000"
                borderRadius={10}
                paddingVertical={15}
                paddingHorizontal={20}
                fontSize={18}
                fontWeight="bold"
                width="48%"
              />
              
              <DynamicButton
                text="Cancel"
                onPress={handleCancel}
                backgroundColor="#333"
                textColor="#fff"
                borderRadius={10}
                paddingVertical={15}
                paddingHorizontal={20}
                fontSize={18}
                fontWeight="600"
                borderWidth={1}
                borderColor="#666"
                width="48%"
              />
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
  authLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  linkButton: {
    flex: 1,
    alignItems: 'center',
  },
  linkText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
  },
  });

export default Login;
