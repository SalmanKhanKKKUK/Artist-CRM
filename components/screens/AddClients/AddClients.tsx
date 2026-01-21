import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Expo Image Picker
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { THEME_COLORS } from '@/constants/Colors';
import NavHeader from '../../common/Buttons/NavHeader';
import Input from '../../common/Inputs/Input';

interface AddClientsProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
}

const AddClients: React.FC<AddClientsProps> = ({ onBack }) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

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

  // Image Picker Logic
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    console.log('Client Saved:', { name, phone, email, image });
    if (onBack) onBack();
  };

  return (
    <LinearGradient
      colors={THEME_COLORS.bgGradient}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.masterContainer} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        {/* History Style Header with Linear Background Button */}
        <NavHeader title="Add New Client !">
          <TouchableOpacity onPress={handleSave} activeOpacity={0.8}>
            <LinearGradient
              colors={THEME_COLORS.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveHeaderBtn}
            >
              <Text style={styles.saveBtnText}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>
        </NavHeader>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flexOne}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom + 20 }
            ]}
          >
            {/* Profile Photo Section (As per Image) */}
            <View style={styles.photoSection}>
              <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
                <View style={styles.imageCircle}>
                  {image ? (
                    <Image source={{ uri: image }} style={styles.profileImage} />
                  ) : (
                    <MaterialCommunityIcons name="account-outline" size={60} color="#5152B3" />
                  )}
                  <View style={styles.plusIconWrapper}>
                    <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
                  </View>
                </View>
              </TouchableOpacity>
              <Text style={styles.addPhotoText}>Add profile photo</Text>
            </View>

            <View style={styles.formContainer}>
              {/* Client Name Input */}
              <Text style={styles.inputLabel}>Client Name</Text>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Enter full name"
                containerStyle={styles.fullWidthInput}
                size="large"
                variant="outlined"
              />

              <View style={styles.sectionGap} />

              {/* Phone Number Input */}
              <Text style={styles.inputLabel}>Phone Number</Text>
              <Input
                value={phone}
                onChangeText={setPhone}
                placeholder="Contact Number...."
                keyboardType="phone-pad"
                containerStyle={styles.fullWidthInput}
                size="large"
                variant="outlined"
              />

              <View style={styles.sectionGap} />

              {/* Email Input */}
              <Text style={styles.inputLabel}>Email Address</Text>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
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

// ================= STYLES (Properly Organized) =================
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
  saveHeaderBtn: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  // Profile Photo Styles
  photoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  imageWrapper: {
    position: 'relative',
  },
  imageCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  plusIconWrapper: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#5152B3',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  addPhotoText: {
    marginTop: 10,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  // Form Styles
  formContainer: {
    width: '100%',
  },
  fullWidthInput: {
    width: '100%',
    marginBottom: 5,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
    marginLeft: 2,
  },
  sectionGap: {
    height: 20,
  },
});

export default AddClients;