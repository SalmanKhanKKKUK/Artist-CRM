import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicButton from '../../common/Buttons/DynamicButton';
import Input from '../../common/Inputs/Input';

const { height: screenHeight } = Dimensions.get('window');

// TypeScript interface define ki taake props error na aayein
interface CompanyNameProps {
  onBack?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToSignup?: () => void;
}

const CompanyName: React.FC<CompanyNameProps> = ({ 
  onBack, 
  onNavigateToProfile, 
  onNavigateToSignup 
}) => {
  const [companyName, setCompanyName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  const handleSubmit = () => {
    console.log('Company Details submitted');
    if (onNavigateToProfile) {
      onNavigateToProfile();
    }
  };

  const handleCancel = () => {
    if (onNavigateToSignup) {
      onNavigateToSignup();
    }
  };

  return (
    // 1. SafeAreaView ka background black kiya taake status bar area black rahe
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* 2. StatusBar configuration */}
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={false} />
      
      {/* Main content wrapper */}
      <View style={styles.mainWrapper}>
        
        {/* Black Header Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Company Details</Text>
        </View>

        {/* White Form Section */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.formSection}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
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
                  width="48%"
                />
                
                <DynamicButton
                  text="Cancel"
                  onPress={handleCancel}
                  backgroundColor="#333"
                  textColor="#fff"
                  borderRadius={10}
                  width="48%"
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000', // Status bar area black
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Body white
  },
  titleContainer: {
    backgroundColor: '#000',
    height: screenHeight * 0.2, // 20% of screen height
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  formSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -20, // Overlap curve effect
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },
  formContainer: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 15,
  },
});

export default CompanyName;