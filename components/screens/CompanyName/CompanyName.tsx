import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Input from '../../common/Inputs/Input';

const { width } = Dimensions.get('window');

type IconNames = keyof typeof MaterialCommunityIcons.glyphMap;

interface CompanyNameProps {
  onBack?: () => void;
  onNavigateToProfile?: () => void;
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
    <LinearGradient
      colors={['#f3e8ff', '#fae8ff']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        
        <KeyboardAvoidingView 
          // Typing ke waqt halka sa scroll up karne ke liye offset add kiya hai
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 20}
          style={styles.container}
        >
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            // scrollEnabled ko true rakha hai taake keyboard ane par view move ho sake
          >
            <View style={styles.innerContainer}>
              
              <Image 
                source={require('../../../assets/homeimages/logo.png')}
                style={styles.topImage}
                resizeMode="contain"
              />

              <Text style={styles.title}>Company Details</Text>
              
              <Text style={styles.subTitle}>
                Please provide your company information to{"\n"}continue
              </Text>
              
              <View style={styles.formContainer}>
                <Input
                  value={companyName}
                  onChangeText={(text: string) => setCompanyName(text)}
                  placeholder="Company Name"
                  leftIcon={"domain" as IconNames} 
                  containerStyle={[styles.inputContainer, styles.roundedInput]}
                  size="large"
                  variant="outlined"
                />

                <View style={styles.inputGap} />

                <Input
                  value={website}
                  onChangeText={(text: string) => setWebsite(text)}
                  placeholder="Website URL"
                  keyboardType="url"
                  autoCapitalize="none"
                  leftIcon={"web" as IconNames} 
                  containerStyle={[styles.inputContainer, styles.roundedInput]}
                  size="large"
                  variant="outlined"
                />

                <View style={styles.buttonGap} />

                <TouchableOpacity 
                  onPress={handleSubmit}
                  style={styles.buttonWrapper}
                >
                  <LinearGradient
                    colors={['#7459FF', '#9D71FD']} 
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>

              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: { 
    flex: 1 
  },
  safeArea: {
    flex: 1 
  },
  container: {
    flex: 1 
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: { 
    flexGrow: 1,
    justifyContent: 'center' 
  },
  innerContainer: {
    alignItems: 'center',
    paddingVertical: 30, 
    paddingHorizontal: 20, 
    width: '100%',
  },
  topImage: {
    width: width * 0.85,
    height: 180,
    marginBottom: 5
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: { 
    width: '100%',
    alignItems: 'center'
  },
  inputContainer: {
    width: '100%' 
  },
  roundedInput: {
    borderRadius: 25,
    backgroundColor: '#FFFFFF' 
  },
  inputGap: { 
    height: 15 
  },
  buttonGap: {
    height: 30,
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 3,
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { 
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default CompanyName;