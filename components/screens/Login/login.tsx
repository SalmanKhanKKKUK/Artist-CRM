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
  View
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

const Login: React.FC<LoginProps> = ({ onNavigateToHome, onNavigateToMainHome, onNavigateToDashboard }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

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
          <Text style={styles.title}>Login</Text>
          
          {/* 2. Image Width increased to match Welcome Page feel */}
          <Image 
            source={require('../../../assets/homeimages/welcomepagepic.png')}
            style={styles.topImage}
            resizeMode="contain"
          />
          
          <View style={styles.formContainer}>
            
            {/* 3. Inputs are now wider because of reduced side padding */}
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="email"
              containerStyle={[styles.inputContainer, styles.fullWidthInput]}
              size="large"
              variant="outlined"
            />

            {/* Gap between inputs */}
            <View style={styles.inputGap} />

            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Password"
              secureTextEntry={true}
              leftIcon="lock"
              onToggleSecure={() => setShowPassword(!showPassword)}
              containerStyle={[styles.inputContainer, styles.fullWidthInput]}
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
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* 4. Login button only */}
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
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    alignItems: 'center',
    paddingTop: 20,
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
  inputContainer: {
    marginBottom: 15,
  },
  fullWidthInput: {
    width: '100%',
  },
  inputGap: {
    height: 5,
  },
  customInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#FAFAFA',
  },
  customTextInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  eyeIconContainer: {
    padding: 5,
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
  socialText: {
    marginVertical: 2,
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
  socialGap: {
    width: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginTop: 10,
  },
});

export default Login;