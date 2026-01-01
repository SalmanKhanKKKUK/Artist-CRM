import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicButton from '../../common/Buttons/DynamicButton';
import Input from '../../common/Inputs/Input';

// 1. Props interface define kiya taake TS error na aaye
interface LoginProps {
  onBack: () => void;
  onNavigateToSignup?: () => void;
  onNavigateToHome?: () => void;
}

// 2. State ke liye error interface
interface LoginErrors {
  email?: string;
  password?: string;
}

const Login: React.FC<LoginProps> = ({ onBack, onNavigateToSignup, onNavigateToHome }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<LoginErrors>({});

  const validateEmail = (text: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleImageUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  const handleLogin = () => {
    const newErrors: LoginErrors = {};
    
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

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={false} />
      
      <View style={styles.mainWrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login</Text>
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
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.formSection}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={styles.formContainer}>
              <Input
                label="Enter Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon="email"
                error={errors.email}
              />

              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                leftIcon="lock"
                error={errors.password}
              />

              <View style={styles.authLinksContainer}>
                <TouchableOpacity style={styles.linkButton}>
                  <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkButton} onPress={onNavigateToSignup}>
                  <Text style={styles.linkText}>Sign Up</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonContainer}>
                <DynamicButton
                  text="Login"
                  onPress={handleLogin}
                  backgroundColor="#FFD700"
                  textColor="#000"
                  borderRadius={10}
                  width="48%"
                />
                
                <DynamicButton
                  text="Cancel"
                  onPress={() => onNavigateToHome?.()}
                  backgroundColor="#333"
                  textColor="#fff"
                  borderRadius={10}
                  width="48%"
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    backgroundColor: '#000',
    paddingTop: 20,
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
    paddingTop: 10,
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
    width: 116,
    height: 116,
    borderRadius: 58,
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
  formSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 25,
    paddingBottom: 50,
  },
  formContainer: {
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
    marginTop: 10,
    marginBottom: 20,
  },
  linkButton: {
    padding: 5,
  },
  linkText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Login;