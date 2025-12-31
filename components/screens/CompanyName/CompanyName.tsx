import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicButton from '../../common/Buttons/DynamicButton';
import Input from '../../common/Inputs/Input';

const { height: screenHeight } = Dimensions.get('window');

const CompanyName = ({ 
  onBack, 
  onNavigateToProfile, 
  onNavigateToSignup 
}: { 
  onBack?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToSignup?: () => void;
}) => {
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  console.log('CompanyName component rendered');

  const handleSubmit = () => {
    console.log('CompanyName: Submit button pressed');
    console.log('Company Name:', companyName);
    console.log('Website:', website);
    console.log('onNavigateToProfile function:', !!onNavigateToProfile);
    
    if (onNavigateToProfile) {
      console.log('Calling onNavigateToProfile...');
      onNavigateToProfile();
    } else {
      console.log('onNavigateToProfile is not available');
    }
  };

  const handleCancel = () => {
    if (onNavigateToSignup) {
      onNavigateToSignup();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Company Details</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Company Form */}
          <View style={styles.formContainer}>
            {/* Company Name Input */}
            <Input
              label="Company Name"
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="Enter your company name"
              leftIcon="office-building"
            />

            {/* Website Input */}
            <Input
              label="Website"
              value={website}
              onChangeText={setWebsite}
              placeholder="Enter your website (optional)"
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="web"
            />

            {/* Submit Buttons */}
            <View style={styles.buttonContainer}>
              <DynamicButton
                text="Submit"
                onPress={handleSubmit}
                backgroundColor="#FFD700"
                textColor="#000"
                borderRadius={10}
                paddingVertical={15}
                paddingHorizontal={20}
                fontSize={18}
                fontWeight="bold"
                width="48%"
              />
              
              <DynamicButton
                text="Cancel"
                onPress={handleCancel}
                backgroundColor="#333"
                textColor="#fff"
                borderRadius={10}
                paddingVertical={15}
                paddingHorizontal={20}
                fontSize={18}
                fontWeight="600"
                borderWidth={1}
                borderColor="#666"
                width="48%"
              />
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
    backgroundColor: '#fff',
  },
  titleContainer: {
    backgroundColor: '#000',
    height: screenHeight * 0.2, // 20vh height
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 15,
  },
});

export default CompanyName;
