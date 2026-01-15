import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Component Imports
import Input from '../../common/Inputs/Input';
import DynamicButton from '../../common/Buttons/DynamicButton';
import NavHeader from '../../common/Buttons/NavHeader';

interface AddClientsProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
}

const AddClients: React.FC<AddClientsProps> = ({ onBack }) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const insets = useSafeAreaInsets();

  const handleSave = () => {
    console.log('Client Saved:', { name, phone, instagram, email });
    if (onBack) onBack();
  };

  return (
    <SafeAreaView style={styles.masterContainer} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* NavHeader exact Dashboard ki position par rahega kar diya gaya hai. */}
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
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flexOne}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 10 + insets.bottom } 
          ]}
        >
          <View style={styles.formContainer}>
            
            <Text style={styles.label}>Client Name</Text>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Enter full name"
              leftIcon="account"
              containerStyle={[styles.fullWidthInput, styles.roundedInput]}
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
              containerStyle={[styles.fullWidthInput, styles.roundedInput]}
              size="large"
              variant="outlined"
            />

            <View style={styles.sectionGap} />

            <Text style={styles.label}>Instagram Handle</Text>
            <Input
              value={instagram}
              onChangeText={setInstagram}
              placeholder="@username"
              leftIcon="instagram"
              containerStyle={[styles.fullWidthInput, styles.roundedInput]}
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
              containerStyle={[styles.fullWidthInput, styles.roundedInput]}
              size="large"
              variant="outlined"
            />

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: '#F1F3F5',
  },
  flexOne: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  formContainer: {
    width: '100%',
  },
  fullWidthInput: {
    width: '100%',
  },
  roundedInput: {
    borderRadius: 25, 
  },
  sectionGap: {
    height: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5152B3', 
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default AddClients;