import { THEME_COLORS } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState, useRef } from 'react';
import {
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
  ActivityIndicator,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Reusable Component Imports
import Input from '../../common/Inputs/Input';

const { width } = Dimensions.get('window');
type IconNames = keyof typeof MaterialCommunityIcons.glyphMap;

interface InviteProps {
  onBack?: () => void;
}

const Invite: React.FC<InviteProps> = ({ onBack }) => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  
  const slideAnim = useRef(new Animated.Value(-150)).current;
  const insets = useSafeAreaInsets();

  // BackHandler is now handled at route level via useSmartBackHandler hook

  const showTopSuccessLoader = () => {
    setShowSuccess(true);
    
    // Drop down animation
    Animated.spring(slideAnim, {
      toValue: Platform.OS === 'android' ? 50 : 60,
      useNativeDriver: true,
      bounciness: 10,
    }).start();

    // Hide after 3 seconds
    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -150,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setShowSuccess(false));
    }, 3000);
  };

  const handleInviteSubmit = () => {
    console.log("Button Clicked!"); // Debugging point

    if (!email || email.trim() === '') {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Network request simulate karein
    setTimeout(() => {
      console.log("Invitation logic completed");
      setLoading(false);
      setEmail(''); 
      showTopSuccessLoader();
    }, 1500);
  };

  return (
    <LinearGradient
      colors={THEME_COLORS.bgGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      {/* Success Notification Bar */}
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
            <Text style={styles.successMessage}>Invitation sent successfully.</Text>
          </View>
        </Animated.View>
      )}

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flexOne}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollViewContent,
              { paddingBottom: insets.bottom + 20 }
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.innerContainer}>
              <Image
                source={require('../../../assets/homeimages/logo.png')}
                style={styles.topImage}
                resizeMode="contain"
              />

              <Text style={styles.title}>Invite Team</Text>

              <Text style={styles.subTitle}>
                Invite team members to join Artist-CRM {"\n"}and manage business together.
              </Text>

              <View style={styles.formContainer}>
                <Input
                  value={email}
                  onChangeText={(text: string) => setEmail(text)}
                  placeholder="Team Member's Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  leftIcon={"email-outline" as IconNames}
                  containerStyle={[styles.inputContainer, styles.roundedInput]}
                  size="large"
                  variant="outlined"
                />

                <View style={styles.compactGap} />

                {/* Main Submit Button */}
                <TouchableOpacity
                  onPress={handleInviteSubmit}
                  style={styles.buttonWrapper}
                  activeOpacity={0.8}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={THEME_COLORS.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <Text style={styles.buttonText}>Send Invitation</Text>
                    )}
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

// ================= STYLES (Clean & Expanded) =================
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  flexOne: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: '100%',
  },
  topImage: {
    width: width * 0.8,
    height: 160,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  roundedInput: {
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  compactGap: {
    height: 15,
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successNotification: {
    position: 'absolute',
    top: 0,
    left: 40,
    right: 60,
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
    shadowOffset: {
      width: 0,
      height: 5,
    },
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

export default Invite;