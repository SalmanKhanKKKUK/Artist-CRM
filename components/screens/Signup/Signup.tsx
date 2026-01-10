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

import DynamicButton from '../../common/Buttons/DynamicButton'; // DynamicButton Import kiya
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
          {/* Title at top */}
          <Text style={styles.title}>Signup</Text>
          
          {/* Image in middle */}
          <Image 
            source={require('../../../assets/homeimages/welcomepagepic.png')}
            style={styles.middleImage}
            resizeMode="contain"
          />
          
          {/* Form view at bottom */}
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
                <Text style={styles.optionText}>I agree to Term & Services</Text>
              </TouchableOpacity>
              
              
            </View>

            <View style={styles.buttonContainer}>
              {/* DynamicButton used with exact original styling */}
              <DynamicButton
                text="Signup"
                onPress={() => onNavigateToCompanyName?.()}
                backgroundColor="#5152B3"
                textColor="#fff"
                paddingVertical={12}
                borderRadius={25}
                fontSize={16}
                fontWeight="bold"
                width="100%"
              />
            </View>

            <Text style={styles.socialText}>Signup using</Text>
            
            <View style={styles.socialContainer}>
              <PlusButton 
                onPress={() => {}}
                size={50}
                backgroundColor="#DB4437"
                iconSize={24}
                iconName="google"
                iconColor="white"
              />
              <View style={styles.socialGap} />
              <PlusButton 
                onPress={() => {}}
                size={50}
                backgroundColor="#4267B2"
                iconSize={24}
                iconName="facebook"
                iconColor="white"
              />
            </View>
            <TouchableOpacity onPress={onNavigateToLogin}>
                <Text style={styles.forgotText}>Already have an Account?</Text>
              </TouchableOpacity>
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
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  middleImage: {
    flex: 1,
    width: width * 0.75,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  fullWidthInput: {
    width: '100%',
  },
  inputGap: {
    height: 10, 
  },
  roundedInput: {
    borderRadius: 25,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%', 
    marginBottom: 15,
    marginTop: 15,
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
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 5,
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