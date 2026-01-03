import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DynamicButton from '../../common/Buttons/DynamicButton';
import PlusButton from '../../common/Buttons/PlusButton';

const { width } = Dimensions.get('window');

type SignupProps = {
  onBack: () => void;
  onNavigateToCompanyName?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToMainHome?: () => void;
};

const Signup = ({ onBack, onNavigateToCompanyName, onNavigateToLogin, onNavigateToHome, onNavigateToMainHome }: SignupProps) => {
  // const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          
          {/* 1. Title stays at top */}
          <Text style={styles.title}>Signup</Text>
          
          {/* 2. Image Width increased to match Welcome Page feel */}
          <Image 
            source={require('../../../assets/homeimages/welcomepagepic.png')}
            style={styles.topImage}
            resizeMode="contain"
          />
          
          <View style={styles.formContainer}>
            
            {/* 3. Inputs are now wider because of reduced side padding */}
            {/* <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="account" size={20} color="#999" />
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                autoCapitalize="words"
                placeholderTextColor="#666"
              />
            </View> */}

            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="email" size={20} color="#999" />
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="lock" size={20} color="#999" />
              <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons name="lock" size={20} color="#999" />
              <TextInput
                style={styles.textInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                secureTextEntry
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.optionsRow}>
              <TouchableOpacity 
                style={styles.rememberMe}
                onPress={() => setAgreeTerms(!agreeTerms)}
              >
                <MaterialCommunityIcons 
                  name={agreeTerms ? "checkbox-marked" : "checkbox-blank-outline"} 
                  size={22} 
                  color="#5152B3" 
                />
                <Text style={styles.optionText}>I agree to terms</Text>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <Text style={styles.forgotText}>Already account?</Text>
              </TouchableOpacity>
            </View>

            {/* 4. Signup button only */}
            <View style={styles.buttonContainer}>
              <DynamicButton
                text="Signup"
                onPress={() => onNavigateToMainHome?.()}
                backgroundColor="#5152B3"
                textColor="#fff"
                borderRadius={25}
                width="100%"
              />
            </View>

            <Text style={styles.socialText}>Signup using</Text>
            
            <View style={styles.socialContainer}>
              <PlusButton 
                onPress={() => console.log('Google button clicked')}
                size={50}
                backgroundColor="#DB4437"
                iconSize={24}
                iconName="google"
                iconColor="white"
              />
              
              <View style={styles.socialGap} />
              
              <PlusButton 
                onPress={() => console.log('Facebook button clicked')}
                size={50}
                backgroundColor="#4267B2"
                iconSize={24}
                iconName="facebook"
                iconColor="white"
              />
            </View>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    // Reduced paddingHorizontal to 12 to make everything wider
    paddingHorizontal: 12, 
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  topImage: {
    // Increased from 0.7 to 0.85 for a much wider look like Welcome Page
    width: width * 0.85, 
    height: 180, 
    marginBottom: 15,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60, // Slightly taller for more presence
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15, 
    backgroundColor: '#FAFAFA',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%', // Stretching options to edges
    marginBottom: 25,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  forgotText: {
    fontSize: 14,
    color: '#5152B3',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 10,
  },
  buttonFlex: {
    flex: 1,
  },
  socialText: {
    marginVertical: 5,
    color: '#888',
    fontSize: 15,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 30,
  },
  socialCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginTop: 10,
  },
  socialGap: {
    width: 20,
  },
});

export default Signup;