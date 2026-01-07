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
  View
} from 'react-native';
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
    <View style={styles.container}>
      {/* StatusBar configuration */}
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
          contentInsetAdjustmentBehavior="never"
          bounces={false}
        >
          <View style={styles.innerContainer}>
            
            {/* Title - Mazeed upar shift kiya gaya hai */}
            <Text style={styles.title}>Company Details</Text>
            
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     // backgroundColor: '#FFFFFF',
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
    // Padding mazeed kam kar di (Android par sirf 5 units StatusBar ke upar)
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 5 : 40, 
    paddingBottom: 20,
    paddingHorizontal: 20, 
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: 0, 
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