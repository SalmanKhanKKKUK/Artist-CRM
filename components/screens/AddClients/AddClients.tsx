import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  BackHandler,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME_COLORS } from '@/constants/Colors';

// Component Imports
import Input from '../../common/Inputs/Input';
import DynamicButton from '../../common/Buttons/DynamicButton';
import NavHeader from '../../common/Buttons/NavHeader';

interface AddClientsProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
}

const AddClients: React.FC<AddClientsProps> = ({ onBack }) => {
  const [title, setTitle] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [socialLink, setSocialLink] = useState<string>('');

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const backAction = () => {
      if (onBack) {
        onBack();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [onBack]);

  const handleSave = () => {
    console.log('Client Saved:', { title, name, phone, email, socialLink });
    if (onBack) onBack();
  };

  return (
    <LinearGradient
      colors={THEME_COLORS.bgGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.masterContainer} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        <NavHeader title="Add New Client !">
          <DynamicButton 
            text="Save"
            onPress={handleSave}
            backgroundColor="transparent"
            textColor="#5152B3"
            paddingVertical={8}
            paddingHorizontal={5}
            fontSize={18}
            fontWeight="bold"
          />
        </NavHeader>

        <KeyboardAvoidingView
          // behavior 'padding' typing ke waqt view ko push karta hai
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flexOne}
          // keyboardVerticalOffset ko 20-40 ke darmiyan rakhne se "halka sa" scroll hota hai
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 20}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            // iOS par keyboard ke sath insets ko auto adjust karne ke liye
            automaticallyAdjustKeyboardInsets={true}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom + 20 } 
            ]}
          >
            <View style={styles.formContainer}>
              
              <Text style={styles.label}>Title</Text>
              <Input
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. CEO / Manager"
                leftIcon="briefcase"
                containerStyle={styles.fullWidthInput}
                size="large"
                variant="outlined"
              />

              <View style={styles.sectionGap} />

              <Text style={styles.label}>Client Name</Text>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Enter full name"
                leftIcon="account"
                containerStyle={styles.fullWidthInput}
                size="large"
                variant="outlined"
              />

              <View style={styles.sectionGap} />

              <Text style={styles.label}>Phone Number</Text>
              <Input
                value={phone}
                onChangeText={setPhone}
                placeholder="e.g. +1 234 567 890"
                keyboardType="phone-pad"
                leftIcon="phone"
                containerStyle={styles.fullWidthInput}
                size="large"
                variant="outlined"
              />

              <View style={styles.sectionGap} />

              <Text style={styles.label}>Email Address</Text>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="client@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon="email"
                containerStyle={styles.fullWidthInput}
                size="large"
                variant="outlined"
              />

              <View style={styles.sectionGap} />

              <Text style={styles.label}>Social Links</Text>
              <Input
                value={socialLink}
                onChangeText={setSocialLink}
                placeholder="@username or profile link"
                leftIcon="instagram"
                containerStyle={styles.fullWidthInput}
                size="large"
                variant="outlined"
              />

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  masterContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  flexOne: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  formContainer: {
    width: '100%',
  },
  fullWidthInput: {
    width: '100%',
  },
  sectionGap: {
    height: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5152B3', 
    marginBottom: 8,
    marginLeft: 5,
  },
});

export default AddClients;