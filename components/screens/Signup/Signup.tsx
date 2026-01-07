import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
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

const Signup = ({ onBack, onNavigateToCompanyName, onNavigateToLogin, onNavigateToHome, onNavigateToMainHome }: SignupProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {/* 1. StatusBar ko translucent rakha hai taake extra gap na aaye */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          // 2. iOS/Android ke automatic padding adjustment ko disable kiya
          contentInsetAdjustmentBehavior="never"
          bounces={false}
        >
          <View style={styles.innerContainer}>
            {/* 3. Signup Title - Forced to the top edge */}
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
                  <Text style={styles.forgotText}>Already an  Account?</Text>
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
                  onPress={() => console.log('Google clicked')}
                  size={50}
                  backgroundColor="#DB4437"
                  iconSize={24}
                  iconName="google"
                  iconColor="white"
                />
                <View style={styles.socialGap} />
                <PlusButton 
                  onPress={() => console.log('Facebook clicked')}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 50,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    alignItems: 'center',
    // 4. Padding ko bilkul khatam kar diya taake title upar chipak jaye
    paddingTop: 0, 
    paddingBottom: 30,
    paddingHorizontal: 20, 
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    // 5. Negative margin use ki hai taake agar parent koi gap de raha hai to title upar chala jaye
    marginTop: Platform.OS === 'android' ? -10 : 10,
  },
  topImage: {
    width: width * 0.85, 
    height: 180, 
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 0,
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
  signupButton: {
    backgroundColor: '#5152B3',
    paddingVertical: 15,
    paddingHorizontal: 20,
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
    marginVertical: 5,
    color: '#888',
    fontSize: 15,
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