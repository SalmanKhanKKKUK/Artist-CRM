import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicButton from '../../common/Buttons/DynamicButton';
import Input from '../../common/Inputs/Input';

type SignupProps = {
  onBack: () => void;
  onNavigateToCompanyName?: () => void;
  onNavigateToLogin?: () => void;
};

const Signup = ({ onBack, onNavigateToCompanyName, onNavigateToLogin }: SignupProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

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

  return (
    // 1. SafeAreaView ko Black background diya taake status bar area black ho jaye
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* 2. StatusBar ko translucent false aur light-content rakha taake icons white hon */}
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={false} />
      
      {/* Main Content wrapper */}
      <View style={styles.mainWrapper}>
        
        {/* Black Header Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign Up</Text>
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

        {/* White Form Section */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.formSection}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={styles.formContainer}>
              <Input label="Full Name" value={fullName} onChangeText={setFullName} placeholder="Enter your full name" leftIcon="account" />
              <Input label="Email" value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" autoCapitalize="none" leftIcon="email" />
              <Input label="Password" value={password} onChangeText={setPassword} placeholder="Enter password" secureTextEntry leftIcon="lock" />
              <Input label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm password" secureTextEntry leftIcon="lock" />

              <View style={styles.buttonContainer}>
                <DynamicButton text="Sign Up" onPress={() => onNavigateToCompanyName?.()} backgroundColor="#FFD700" textColor="#000" width="48%" />
                <DynamicButton text="Cancel" onPress={() => onNavigateToLogin?.()} backgroundColor="#333" textColor="#fff" width="48%" />
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
    backgroundColor: '#000000', // Yeh status bar area ko black rakhega
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Body white rahegi
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
    marginTop: -20, // Rounded top overlap
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
});

export default Signup;