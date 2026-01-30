import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
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
import { useTheme } from '@/contexts/ThemeContext';
import NavHeader from '../../common/Buttons/NavHeader';
import Input from '../../common/Inputs/Input';

interface AddClientsProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
}

const AddClients: React.FC<AddClientsProps> = ({ onBack }) => {
  const { colors, isDark } = useTheme();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  // States for Loading and Success Animation
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(-150)).current;

  const insets = useSafeAreaInsets();

  // BackHandler is now handled at route level via useSmartBackHandler hook

  const showTopSuccessLoader = () => {
    setShowSuccess(true);

    // Slide Down Animation (Same as Invite.tsx)
    Animated.spring(slideAnim, {
      toValue: Platform.OS === 'android' ? 50 : 60,
      useNativeDriver: true,
      bounciness: 10,
    }).start();

    // Hide after 2 seconds and navigate back to Dashboard
    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -150,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setShowSuccess(false);
        if (onBack) onBack(); // Automatically go to Dashboard
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

    // Simulating save logic
    setTimeout(() => {
      setLoading(false);
      showTopSuccessLoader();
    }, 1500);
  };

  return (
    <LinearGradient
      colors={colors.bgGradient}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />

      {/* Success Notification - Invite.tsx Design */}
      {showSuccess && (
        <Animated.View
          style={[
            styles.successNotification,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          <MaterialCommunityIcons name="check-circle" size={24} color="#FFFFFF" />
          <View>
            <Text style={styles.successTitle}>Success!</Text>
            <Text style={styles.successMessage}>Client saved successfully.</Text>
          </View>
        </Animated.View>
      )}

      <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
        <NavHeader title="Add New Customer !">
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
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 60}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom + 60 } // Extra padding so email is visible when typing
            ]}
          >
            <View style={styles.photoSection}>
              <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
                <View style={[styles.imageCircle, { backgroundColor: colors.background, borderColor: colors.border }]}>
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
              <Text style={[styles.addPhotoText, { color: colors.textSecondary }]}>Add profile photo</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Client Name</Text>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Enter full name"
                containerStyle={styles.fullWidthInput}
                size="large"
                variant="outlined"
                inputStyle={{ color: colors.text }}
                placeholderTextColor={colors.textSecondary}
              />

              <View style={styles.sectionGap} />

              <Text style={[styles.inputLabel, { color: colors.text }]}>Phone Number</Text>
              <Input
                value={phone}
                onChangeText={setPhone}
                placeholder="Contact Number...."
                keyboardType="phone-pad"
                containerStyle={styles.fullWidthInput}
                size="large"
                variant="outlined"
                inputStyle={{ color: colors.text }}
                placeholderTextColor={colors.textSecondary}
              />

              <View style={styles.sectionGap} />

              {/* Email Input Fix: Scrolling ensures this is visible */}
              <Text style={[styles.inputLabel, { color: colors.text }]}>Email Address</Text>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.fullWidthInput}
                size="large"
                variant="outlined"
                inputStyle={{ color: colors.text }}
                placeholderTextColor={colors.textSecondary}
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
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
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
    height: 10,
  },

  successNotification: {
    position: 'absolute',
    top: 0,
    left: 80,
    right: 20,
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 9999,
    elevation: 15,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
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