import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Imported SafeAreaView from library
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
  onNavigateToProfile 
}) => {
  const [companyName, setCompanyName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  const handleSubmit = () => {
    console.log('Company Details submitted');
    if (onNavigateToProfile) {
      onNavigateToProfile();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.mainContainer}
      >
        {/* Fixed View instead of ScrollView to stop unnecessary scrolling and gaps */}
        <View style={styles.innerContainer}>
          
          <Text style={styles.title}>Company Name</Text>
          
          <Image 
            source={require('../../../assets/homeimages/welcomepagepic.png')}
            style={styles.topImage}
            resizeMode="contain"
          />
          
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

            {/* Gap ko 10 se kam karke 5 kar diya */}
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

            <View style={styles.buttonContainer}>
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
    paddingTop: 10, 
    paddingBottom: 20,
    paddingHorizontal: 20, 
    width: '100%',
  },
  title: {
    fontSize: 28, // Font size thora compact kiya
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: Platform.OS === 'android' ? 0 : 5, 
  },
  topImage: {
    width: width * 0.75, 
    height: 150, // Image height kam ki taake gap kam ho
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
  roundedInput: {
    borderRadius: 25,
  },
  inputGap: {
    height: 5, 
  },
  buttonGap: {
    height: 15,
  },
  buttonContainer: { 
    width: '100%',
    marginBottom: 10,
  },
});

export default CompanyName;