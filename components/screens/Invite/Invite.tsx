import { THEME_COLORS } from '@/constants/Colors';
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
  const insets = useSafeAreaInsets();

  // Android Hardware Back Button logic (Same as Teams/CompanyName)
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

  const handleInviteSubmit = () => {
    console.log('Inviting Email:', email);
  };

  return (
    <LinearGradient
      colors={THEME_COLORS.bgGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
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
              {/* Logo Section */}
              <Image
                source={require('../../../assets/homeimages/logo.png')}
                style={styles.topImage}
                resizeMode="contain"
              />

              <Text style={styles.title}>Invite Team</Text>

              <Text style={styles.subTitle}>
                Invite team members to join your salon and{"\n"}manage business together.
              </Text>

              <View style={styles.formContainer}>
                {/* Email Input */}
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

                {/* Reduced Gap between Input and Button */}
                <View style={styles.compactGap} />

                {/* Invite Button */}
                <TouchableOpacity
                  onPress={handleInviteSubmit}
                  style={styles.buttonWrapper}
                >
                  <LinearGradient
                    colors={THEME_COLORS.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.buttonText}>Send Invitation</Text>
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
    height: 15, // Gap reduced from 30 to 15
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
    fontWeight: 'bold',
  },
});

export default Invite;