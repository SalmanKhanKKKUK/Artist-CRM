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
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Component Imports
import Input from '../../common/Inputs/Input';
import DynamicButton from '../../common/Buttons/DynamicButton';

const { width } = Dimensions.get('window');

interface AddClientsProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
}

const AddClients: React.FC<AddClientsProps> = ({ onBack }) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  return (
    <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexOne}
        // Keyboard offset ko adjust kiya hai taake scroll perfect ho
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          // flexGrow: 1 se layout fixed rehta hai aur keyboard aane par scrollable ho jata hai
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          // Isse scrolling smoother hoti hai jab typing start ho
          automaticallyAdjustContentInsets={false}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Add Client</Text>

            <Image
              source={require('../../../assets/homeimages/welcomepagepic.png')}
              style={styles.topImage}
              resizeMode="contain"
            />

            <View style={styles.formContainer}>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Client Name"
                leftIcon="account"
                containerStyle={styles.roundedInput}
                size="large"
                variant="outlined"
              />

              <View style={styles.inputGap} />

              <Input
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                leftIcon="phone"
                containerStyle={styles.roundedInput}
                size="large"
                variant="outlined"
              />

              <View style={styles.inputGap} />

              <Input
                value={instagram}
                onChangeText={setInstagram}
                placeholder="Instagram Handle"
                leftIcon="instagram"
                containerStyle={styles.roundedInput}
                size="large"
                variant="outlined"
              />

              <View style={styles.inputGap} />

              <Text style={styles.label}>Allergies / Notes </Text>
              
              <TextInput
                style={styles.textArea}
                value={notes}
                onChangeText={setNotes}
                placeholder="Enter general notes or Allergies..."
                placeholderTextColor="#94A3B8"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />

              <View style={styles.buttonContainer}>
                <DynamicButton
                  text="Save Client"
                  onPress={() => console.log('Client Saved')}
                  backgroundColor="#5152B3"
                  textColor="#FFFFFF"
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
  masterContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flexOne: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'ios' ? 120 : 60, // Extra space taake button hide na ho
  },
  innerContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  topImage: {
    width: width * 0.75,
    height: 140,
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
  },
  roundedInput: {
    width: '100%',
    borderRadius: 25,
  },
  inputGap: {
    height: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginLeft: 5,
  },
  textArea: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    padding: 15,
    height: 100,
    color: '#333',
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    // Button ke niche munasib space taake scroll perfect khatam ho
    paddingBottom: 20, 
  },
});

export default AddClients;