import React, { useEffect, useState } from 'react';
import {
  BackHandler,
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
  onNavigateToProfile,
  onBack 
}) => {
  const [companyName, setCompanyName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  useEffect(() => {
    const backAction = () => {
      if (onBack) onBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [onBack]);

  const handleSubmit = () => {
    if (onNavigateToProfile) {
      onNavigateToProfile();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Professional Fixed Logic:*/}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.mainContainer}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false} 
          bounces={false}
        >
          <View style={styles.innerContainer}>
            
            {/* Top Section */}
            <View style={styles.topSection}>
              <Image 
                source={require('../../../assets/homeimages/logo.png')}
                style={styles.topImage}
                resizeMode="contain"
              />
              <Text style={styles.title}>Company Name</Text>
              <Text style={styles.subTitle}>Tell us about your business</Text>
            </View>

            {/* Form Section: Fixed in its place */}
            <View style={styles.formContainer}>
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
                leftIcon={"web" as any} 
                containerStyle={styles.fullWidthInput}
                size="large"
                variant="outlined"
              />

              <View style={styles.buttonGap} />

              <DynamicButton
                text="Submit"
                onPress={handleSubmit}
                backgroundColor="#5152B3"
                textColor="#fff"
                borderRadius={25}
                width="100%"
              />
            </View>

            {/* Bottom spacer hidden to keep design tight */}
            <View style={styles.footerSpacer} />
            
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
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  topSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: height * 0.05,
  },
  topImage: {
    width: width * 0.75,
    height: height * 0.22,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#313867',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 5,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: height * 0.05,
  },
  fullWidthInput: {
    width: '100%',
  },
  inputGap: {
    height: 10,
  },
  buttonGap: {
    height: 20,
  },
  footerSpacer: {
    height: 70,
  },
});

export default CompanyName;