import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Keyboard,
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
import { useTheme } from '@/contexts/ThemeContext';
import NavHeader from '../../common/Buttons/NavHeader';
import Input from '../../common/Inputs/Input';

const { width } = Dimensions.get('window');

interface AddClientsProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
}

const AddClients: React.FC<AddClientsProps> = ({ onBack }) => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  
  // State Management
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Animation & Scroll Refs
  const slideAnim = useRef(new Animated.Value(-150)).current;
  const scrollRef = useRef<ScrollView>(null);

  // Keyboard Event Listener
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ y: 0, animated: true });
      }
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  // Handlers
  const showTopSuccessLoader = () => {
    setShowSuccess(true);
    Animated.spring(slideAnim, {
      toValue: Platform.OS === 'android' ? 50 : 60,
      useNativeDriver: true,
      bounciness: 10,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -150,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setShowSuccess(false);
        if (onBack) onBack();
      });
    }, 2000);
  };

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
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showTopSuccessLoader();
    }, 1500);
  };

  // Theme-based Dynamic Values
  const dynamicInputStyle = { color: colors.text };
  const dynamicBackground = { backgroundColor: isDark ? "#1e293b" : "#FFFFFF" };
  const dynamicBorder = { borderColor: colors.border };
  const labelColor = { color: colors.text };
  const textColorSecondary = { color: colors.textSecondary };
  
  // Dark Mode Specific Fixes
  const focusColor = isDark ? "#FFFFFF" : "#5152B3";
  const placeholderColor = isDark ? "#FFFFFF" : colors.textSecondary;

  return (
    <LinearGradient colors={colors.bgGradient} style={styles.gradientContainer}>
      <StatusBar 
        barStyle={isDark ? "light-content" : "dark-content"} 
        backgroundColor="transparent" 
        translucent 
      />

      {/* Success Notification */}
      {showSuccess && (
        <Animated.View style={[styles.successNotification, { transform: [{ translateY: slideAnim }] }]}>
          <MaterialCommunityIcons name="check-circle" size={24} color="#FFFFFF" />
          <View>
            <Text style={styles.successTitle}>Success!</Text>
            <Text style={styles.successMessage}>Client saved successfully.</Text>
          </View>
        </Animated.View>
      )}

      <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
        <NavHeader title="Add New Customer !" titleColor={isDark ? "#FFFFFF" : "#5152B3"}>
          <TouchableOpacity onPress={handleSave} activeOpacity={0.8} disabled={loading}>
            <LinearGradient
              colors={THEME_COLORS.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveHeaderBtn}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.saveBtnText}>Save</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </NavHeader>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flexOne}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 20}
        >
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            <TouchableOpacity 
              activeOpacity={1} 
              onPress={Keyboard.dismiss} 
              style={styles.innerContainer}
            >
              {/* Photo Section */}
              <View style={styles.photoSection}>
                <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
                  <View style={[styles.imageCircle, dynamicBackground, dynamicBorder]}>
                    {image ? (
                      <Image source={{ uri: image }} style={styles.profileImage} />
                    ) : (
                      <MaterialCommunityIcons name="account-outline" size={60} color={colors.primary} />
                    )}
                    <View style={[styles.plusIconWrapper, { backgroundColor: colors.primary, borderColor: colors.card }]}>
                      <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
                    </View>
                  </View>
                </TouchableOpacity>
                <Text style={[styles.addPhotoText, textColorSecondary]}>Add profile photo</Text>
              </View>

              {/* Form Section */}
              <View style={styles.formContainer}>
                <Text style={[styles.inputLabel, labelColor]}>Client Name</Text>
                <Input
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter full name"
                  placeholderTextColor={placeholderColor}
                  containerStyle={styles.fullWidthInput}
                  size="large"
                  variant="outlined"
                  inputStyle={dynamicInputStyle}
                  backgroundColor={dynamicBackground.backgroundColor}
                  borderColor={dynamicBorder.borderColor}
                  focusBorderColor={focusColor}
                />

                <View style={styles.sectionGap} />

                <Text style={[styles.inputLabel, labelColor]}>Phone Number</Text>
                <Input
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Contact Number...."
                  placeholderTextColor={placeholderColor}
                  keyboardType="phone-pad"
                  containerStyle={styles.fullWidthInput}
                  size="large"
                  variant="outlined"
                  inputStyle={dynamicInputStyle}
                  backgroundColor={dynamicBackground.backgroundColor}
                  borderColor={dynamicBorder.borderColor}
                  focusBorderColor={focusColor}
                />

                <View style={styles.sectionGap} />

                <Text style={[styles.inputLabel, labelColor]}>Email Address</Text>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email address"
                  placeholderTextColor={placeholderColor}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  containerStyle={styles.fullWidthInput}
                  size="large"
                  variant="outlined"
                  inputStyle={dynamicInputStyle}
                  backgroundColor={dynamicBackground.backgroundColor}
                  borderColor={dynamicBorder.borderColor}
                  focusBorderColor={focusColor}
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

// --- Stylesheet ---
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
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 25,
    paddingTop: 40, 
  },
  innerContainer: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 40,
  },
  saveHeaderBtn: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 35,
  },
  imageWrapper: {
    position: 'relative',
  },
  imageCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  plusIconWrapper: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  addPhotoText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  formContainer: {
    width: '100%',
  },
  fullWidthInput: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 2,
  },
  sectionGap: {
    height: 18,
  },
  successNotification: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    zIndex: 9999,
    elevation: 10,
    gap: 12,
  },
  successTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successMessage: {
    color: '#E0F2FE',
    fontSize: 12,
  },
});

export default AddClients;