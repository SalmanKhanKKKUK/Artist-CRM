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
    <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* NavHeader with Save Button */}
      <NavHeader title="Add Client">
        <DynamicButton 
          text="Save"
          onPress={handleSave}
          backgroundColor="#5152B3"
          textColor="#FFFFFF"
          borderRadius={20}
          paddingVertical={8}
          paddingHorizontal={20}
          fontSize={14}
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
            { paddingBottom: 20 + insets.bottom } 
          ]}
        >
          <View style={styles.formContainer}>
            
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

            <Text style={styles.label}>Instagram Handle</Text>
            <Input
              value={instagram}
              onChangeText={setInstagram}
              placeholder="@username"
              leftIcon="instagram"
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

            

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  sectionGap: {
    height: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    marginLeft: 5,
  },
});

export default AddClients;