import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard, // Keyboard import kiya logic ke liye
  BackHandler
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicButton from '../../common/Buttons/DynamicButton';
import Input from '../../common/Inputs/Input';

const { width } = Dimensions.get('window');

interface CompanyNameProps {
  onBack?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToSignup?: () => void;
}

const CompanyName: React.FC<CompanyNameProps> = ({ 
  onNavigateToProfile,
  onBack 
}) => {
  const [companyName, setCompanyName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); // Scroll control state

  // Back handler aur Keyboard logic
  useEffect(() => {
    const backAction = () => {
      if (onBack) onBack();
      return true;
    };

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [onBack]);

  const handleSubmit = () => {
    if (onNavigateToProfile) {
      onNavigateToProfile();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.mainContainer}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={isKeyboardVisible} // Typing par scroll enable hoga
          bounces={isKeyboardVisible}
        >
          <View style={styles.innerContainer}>
            
            {/* Image top par (Signup size) */}
            <Image 
              source={require('../../../assets/homeimages/welcomepagepic.png')}
              style={styles.topImage}
              resizeMode="contain"
            />

            {/* Title image ke neeche */}
            <Text style={styles.title}>Company Name</Text>
            
            <View style={styles.formContainer}>
              <Input
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="Company Name"
                leftIcon={"domain" as any} 
                containerStyle={[styles.inputContainer, styles.fullWidthInput, styles.roundedInput]}
                size="large"
                variant="outlined"
              />

              <View style={styles.inputGap} />

              <Input
                value={website}
                onChangeText={setWebsite}
                placeholder="Website (Optional)"
                keyboardType="url"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={"web" as any} 
                containerStyle={[styles.inputContainer, styles.fullWidthInput, styles.roundedInput]}
                size="large"
                variant="outlined"
              />

              <View style={styles.buttonGap} />

              <View style={styles.buttonWrapper}>
                <DynamicButton
                  text="Submit"
                  onPress={handleSubmit}
                  backgroundColor="#5152B3"
                  textColor="#fff"
                  borderRadius={25}
                  width="100%"
                />
              </View>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', // Normal state mein centered rahega (Fixed look)
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
  topImage: {
    width: width * 0.85, // Signup page wala exact size
    height: 180, 
    marginBottom: 15,
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
  roundedInput: {
    borderRadius: 25,
  },
  inputGap: {
    height: 10, // Signup page wala gap
  },
  buttonGap: {
    height: 20,
  },
  buttonWrapper: { 
    width: '100%',
    marginBottom: 10,
  },
});

export default CompanyName;