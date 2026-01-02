import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { 
  Image, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Dimensions 
} from 'react-native';
import DynamicButton from '../../common/Buttons/DynamicButton';

const { width } = Dimensions.get('window');

interface LoginProps {
  onBack: () => void;
  onNavigateToSignup?: () => void;
  onNavigateToHome?: () => void;
}

const Login: React.FC<LoginProps> = ({ onNavigateToHome }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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

            {/* 4. Buttons also widened to match layout */}
            <View style={styles.buttonRow}>
              <View style={styles.buttonFlex}>
                <DynamicButton
                  text="Login"
                  onPress={() => console.log('Login')}
                  backgroundColor="#5152B3"
                  textColor="#fff"
                  borderRadius={25}
                />
              </View>
              <View style={styles.buttonFlex}>
                <DynamicButton
                  text="Cancel"
                  onPress={() => onNavigateToHome?.()}
                  backgroundColor="#5152B3"
                  textColor="#fff"
                  borderRadius={25}
                />
              </View>
            </View>

            <Text style={styles.socialText}>Login using</Text>
            
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialCircle}>
                <MaterialCommunityIcons name="google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialCircle}>
                <MaterialCommunityIcons name="facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
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
    marginVertical: 15,
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
});

export default Login;