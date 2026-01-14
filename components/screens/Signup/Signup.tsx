import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  BackHandler,
  Keyboard, // Keyboard import kiya
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import DynamicButton from '../../common/Buttons/DynamicButton';
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
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); // Scroll control ke liye state

  // Android Back Button aur Keyboard handling
  useEffect(() => {
    const backAction = () => {
      onBack();
      return true;
    };

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // Typing ke waqt scroll enable
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // Keyboard band hone par wapas fixed
    });

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [onBack]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.mainContainer}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={isKeyboardVisible} // Sirf typing ke waqt scroll hoga
          bounces={isKeyboardVisible}
        >
          <View style={styles.innerContainer}>
            
            <Image 
              source={require('../../../assets/homeimages/welcomepagepic.png')}
              style={styles.middleImage}
              resizeMode="contain"
            />

            <Text style={styles.title}>Signup</Text>
            
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
                <DynamicButton
                  text="Signup"
                  onPress={() => onNavigateToCompanyName?.()}
                  backgroundColor="#5152B3"
                  textColor="#fff"
                  borderRadius={25}
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

              <TouchableOpacity onPress={onNavigateToLogin} style={styles.loginLinkContainer}>
                <Text style={styles.optionText}>Already have an Account? </Text>
                <Text style={styles.forgotText}>Login</Text>
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
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    paddingVertical: 20, 
    paddingHorizontal: 20, 
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  middleImage: {
    width: width * 0.85, 
    height: 180, 
    marginBottom: 0,
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
    height: 10, 
  },
  roundedInput: {
    borderRadius: 25,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '98%', 
    marginBottom: 15,
    marginTop: 15,
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
  socialText: {
    marginVertical: 5,
    color: '#888',
    fontSize: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginTop: 5,
  },
  socialGap: {
    width: 10,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  }
});

export default Signup;