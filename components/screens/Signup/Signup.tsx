import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import PlusButton from '../../common/Buttons/PlusButton';
import Input from '../../common/Inputs/Input';

const { width } = Dimensions.get('window');

type SignupProps = {
  onBack: () => void;
  onNavigateToCompanyName?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToMainHome?: () => void;
};

const Signup = ({ onBack, onNavigateToCompanyName, onNavigateToLogin }: SignupProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.mainContainer}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Signup</Text>
          
          <Image 
            source={require('../../../assets/homeimages/welcomepagepic.png')}
            style={styles.topImage}
            resizeMode="contain"
          />
          
          <View style={styles.formContainer}>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="email"
              containerStyle={[styles.inputContainer, styles.fullWidthInput, styles.roundedInput]}
              size="large"
              variant="outlined"
            />

            {/* Gap kam kar diya gaya hai */}
            <View style={styles.inputGap} />

            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Password"
              secureTextEntry={true}
              leftIcon="lock"
              containerStyle={[styles.inputContainer, styles.fullWidthInput, styles.roundedInput]}
              size="large"
              variant="outlined"
            />

            <View style={styles.inputGap} />

            <Input
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={true}
              leftIcon="lock"
              containerStyle={[styles.inputContainer, styles.fullWidthInput, styles.roundedInput]}
              size="large"
              variant="outlined"
            />

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
              
              <TouchableOpacity onPress={onNavigateToLogin}>
                <Text style={styles.forgotText}>Already an Account?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => onNavigateToCompanyName?.()}
                style={styles.signupButton}
              >
                <Text style={styles.signupButtonText}>Signup</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.socialText}>Signup using</Text>
            
            <View style={styles.socialContainer}>
              <PlusButton 
                onPress={() => {}}
                size={45} // Size thora kam kiya taake space bache
                backgroundColor="#DB4437"
                iconSize={20}
                iconName="google"
                iconColor="white"
              />
              <View style={styles.socialGap} />
              <PlusButton 
                onPress={() => {}}
                size={45}
                backgroundColor="#4267B2"
                iconSize={20}
                iconName="facebook"
                iconColor="white"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5, 
    paddingBottom: 20,
    paddingHorizontal: 20, 
    width: '100%',
  },
  title: {
    fontSize: 28, // Font size thora kam kiya
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: Platform.OS === 'android' ? 0 : 5,
  },
  topImage: {
    width: width * 0.75, // Image width kam ki
    height: 150, // Image height kam ki
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  fullWidthInput: {
    width: '100%',
  },
  inputGap: {
    height: 0, 
  },
  roundedInput: {
    borderRadius: 25,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%', 
    marginBottom: 15,
    marginTop: 0,
    
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  forgotText: {
    fontSize: 13,
    color: '#5152B3',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: '#5152B3',
    paddingVertical: 12, // Vertical padding kam ki
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signupButtonText: {
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold'
  },
  socialText: {
    marginVertical: 3,
    color: '#888',
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginTop: 10,
  },
  socialGap: {
    width: 10,
  },
});

export default Signup;