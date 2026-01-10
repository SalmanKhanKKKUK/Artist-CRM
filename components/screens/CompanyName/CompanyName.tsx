import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView 
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicButton from '../../common/Buttons/DynamicButton';
import Input from '../../common/Inputs/Input';

const { width, height } = Dimensions.get('window');

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
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={styles.innerContainer}>
            
            {/* Top Section: Title and Image */}
            <View style={styles.topSection}>
              <Text style={styles.title}>Company Name</Text>
              <Image 
                source={require('../../../assets/homeimages/welcomepagepic.png')}
                style={styles.topImage}
                resizeMode="contain"
              />
            </View>
            
            {/* Bottom Section: Inputs and Button */}
            <View style={styles.bottomSection}>
              <Input
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="Company Name"
                leftIcon={"domain" as any} 
                containerStyle={styles.fullWidthInput}
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
                containerStyle={styles.fullWidthInput}
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
    flexGrow: 1, // ScrollView ko height resize karne deta hai
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20, 
    paddingTop: 10,
    paddingBottom: 20, // Bottom se minimal space
    justifyContent: 'space-between', // Elements ko top aur bottom mein divide karta hai
  },
  topSection: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: Platform.OS === 'android' ? 10 : 5, 
  },
  topImage: {
    width: width * 0.95, 
    height: height * 0.45, // Image ki height ko bara rakha gaya hai
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20, // Image aur inputs ke beech thora gap
  },
  fullWidthInput: {
    width: '100%',
    borderRadius: 25,
  },
  inputGap: {
    height: 12, 
  },
  buttonGap: {
    height: 20,
  },
  buttonWrapper: { 
    width: '100%',
    marginBottom: 5, // Button ko bilkul bottom ke qareeb rakhne ke liye
  },
});

export default CompanyName;