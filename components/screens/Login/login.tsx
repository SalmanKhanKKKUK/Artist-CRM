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
  TouchableOpacity,
  View,
} from 'react-native';
import DynamicButton from '../../common/Buttons/DynamicButton';
import PlusButton from '../../common/Buttons/PlusButton';
import Input from '../../common/Inputs/Input';

const { width } = Dimensions.get('window');

interface LoginProps {
  onBack: () => void;
  onNavigateToSignup?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToMainHome?: () => void;
  onNavigateToDashboard?: () => void;
}

const Login: React.FC<LoginProps> = ({ 
  onNavigateToHome, 
  onNavigateToMainHome, 
  onNavigateToDashboard, 
  onBack 
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        // Yeh line ensure karegi ke scroll view top se start ho
        contentInsetAdjustmentBehavior="never" 
      >
        <View style={styles.innerContainer}>
          
          {/* Title - Ab yeh white gap ke niche nahi chhupay ga */}
          <Text style={styles.title}>Login</Text>
          
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
              placeholder="Passwords..."
              secureTextEntry={!showPassword}
              leftIcon="lock"
              rightIcon={showPassword ? "eye" : "eye-off"} 
              onRightIconPress={() => setShowPassword(!showPassword)}
              containerStyle={[styles.inputContainer, styles.fullWidthInput, styles.roundedInput]}
              size="large"
              variant="outlined"
            />

            <View style={styles.optionsRow}>
              <TouchableOpacity 
                style={styles.rememberMe}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <MaterialCommunityIcons 
                  name={rememberMe ? "checkbox-marked" : "checkbox-blank-outline"} 
                  size={22} 
                  color="#5152B3" 
                />
                <Text style={styles.optionText}>Remember me</Text>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <DynamicButton
                text="Login"
                onPress={() => onNavigateToDashboard?.()}
                backgroundColor="#5152B3"
                textColor="#fff"
                borderRadius={25}
                width="100%"
              />
            </View>

            <Text style={styles.socialText}>Login using</Text>
            
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
    marginTop: 50,
  },
  scrollView: {
    flex: 1,
    // ScrollView ko poori screen par phela diya
    marginTop: 0, 
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    alignItems: 'center',
    // Agar white gap hai to negative margin title ko upar le jayegi
    paddingTop: Platform.OS === 'ios' ? 40 : 10, 
    paddingBottom: 30,
    paddingHorizontal: 20, 
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    // Negative margin agar white background oper hai
    marginTop: Platform.OS === 'android' ? -5 : 0, 
  },
  topImage: {
    width: width * 0.85, 
    height: 180, 
    marginBottom: 15,
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
  roundedInput: {
    borderRadius: 25,
  },
  inputGap: {
    height: 10,
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

export default Login;