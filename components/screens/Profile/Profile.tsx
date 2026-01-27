import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

import { useSmartBackHandler } from "../../../hooks/useSmartBackHandler";
// Reusable Components
import InfoCard from "../../common/Cards/InfoCard";
import NavHeader from "../../common/Buttons/NavHeader";
import { THEME_COLORS } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface ProfileProps {
  onBack?: () => void; // Made optional to prevent crashes if not passed
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();

  // Data States
  const [email] = useState<string>("aqibshoaib@gmail.com");
  const [phone, setPhone] = useState<string>("3118298343");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // UI States
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [tempValue, setTempValue] = useState<string>("");

  // Single Selection Mode
  const [selectedMode, setSelectedMode] = useState<'active' | 'dark' | 'light'>('active');

  // Load Saved Data
  useEffect(() => {
    const loadStoredPhone = async () => {
      try {
        const savedPhone = await AsyncStorage.getItem('user_phone');
        if (savedPhone !== null) setPhone(savedPhone);
      } catch (error: any) {
        console.error("Failed to load phone number:", error.message);
      }
    };
    loadStoredPhone();
  }, []);

  // Save Data
  const persistPhone = async (val: string) => {
    try {
      await AsyncStorage.setItem('user_phone', val);
    } catch (error: any) {
      console.error("Failed to save phone number:", error.message);
    }
  };

  // Image Picker Logic
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Image picker error:", error);
    }
  };

  // Smart Back Handler - Added Guard Clause
  useSmartBackHandler(() => {
    if (onBack) {
      onBack();
    }
  });

  const handleOpenPhoneMenu = (): void => {
    setTempValue(phone);
    setMenuVisible(true);
  };

  const handleEditInitiate = (): void => {
    setMenuVisible(false);
    setEditModalVisible(true);
  };

  const handleSaveEdit = (): void => {
    setPhone(tempValue);
    persistPhone(tempValue);
    setEditModalVisible(false);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => onBack && onBack(), style: 'destructive' }
    ]);
  };

  return (
    <LinearGradient
      colors={THEME_COLORS.bgGradient}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        <NavHeader title="Profile" showProfileIcon={false}>
          <TouchableOpacity onPress={handleLogout} activeOpacity={0.8}>
            <LinearGradient
              colors={THEME_COLORS.buttonGradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.logoutBtn}
            >
              <MaterialCommunityIcons name="logout" size={20} color="#FFFFFF" style={{ marginRight: 5 }} />
              <Text style={styles.logoutText}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </NavHeader>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flexOne}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: 60 + insets.bottom } // Dynamic padding like Teams.tsx
            ]}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.innerContainer}>

              {/* Profile Header Info */}
              <View style={styles.profileHeader}>
                <View style={styles.photoSection}>
                  <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
                    <View style={styles.imageCircle}>
                      {profileImage ? (
                        <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                      ) : (
                        <MaterialCommunityIcons name="account-outline" size={60} color="#5152B3" />
                      )}
                      <View style={styles.plusIconWrapper}>
                        <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.addPhotoText}>Tap to change photo</Text>
                </View>

                <Text style={styles.profileName}>Aqib Shoaib</Text>
                <Text style={styles.profileBusiness}>Artist CRM</Text>
              </View>

              <View style={styles.infoWrapper}>
                {/* Email Card */}
                <InfoCard
                  title="Email"
                  description={email}
                  backgroundColor="#FFFFFF"
                  borderRadius={20}
                  margin={0}
                  elevation={0}
                  containerStyle={styles.cardBorder}
                />

                {/* Phone Card with Menu */}
                <View style={styles.cardWithMenu}>
                  <InfoCard
                    title="Phone"
                    description={phone}
                    backgroundColor="#FFFFFF"
                    borderRadius={20}
                    margin={0}
                    elevation={0}
                    containerStyle={styles.cardBorder}
                  />
                  <TouchableOpacity
                    style={styles.threeDotButton}
                    onPress={handleOpenPhoneMenu}
                  >
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="#64748B" />
                  </TouchableOpacity>
                </View>

                {/* Grid Buttons */}
                <View style={styles.gridContainer}>
                  {/* Active */}
                  <TouchableOpacity
                    style={[styles.gridButton, selectedMode === 'active' ? styles.gridButtonActive : {}]}
                    onPress={() => setSelectedMode('active')}
                  >
                    <MaterialCommunityIcons
                      name="check-circle-outline"
                      size={24}
                      color={selectedMode === 'active' ? "#FFFFFF" : "#5152B3"}
                    />
                    <Text style={[styles.gridButtonText, selectedMode === 'active' ? { color: '#FFFFFF' } : {}]}>Active</Text>
                  </TouchableOpacity>

                  {/* Dark */}
                  <TouchableOpacity
                    style={[styles.gridButton, selectedMode === 'dark' ? styles.gridButtonActive : {}]}
                    onPress={() => setSelectedMode('dark')}
                  >
                    <MaterialCommunityIcons
                      name="weather-night"
                      size={24}
                      color={selectedMode === 'dark' ? "#FFFFFF" : "#5152B3"}
                    />
                    <Text style={[styles.gridButtonText, selectedMode === 'dark' ? { color: '#FFFFFF' } : {}]}>Dark</Text>
                  </TouchableOpacity>

                  {/* Light */}
                  <TouchableOpacity
                    style={[styles.gridButton, selectedMode === 'light' ? styles.gridButtonActive : {}]}
                    onPress={() => setSelectedMode('light')}
                  >
                    <MaterialCommunityIcons
                      name="weather-sunny"
                      size={24}
                      color={selectedMode === 'light' ? "#FFFFFF" : "#5152B3"}
                    />
                    <Text style={[styles.gridButtonText, selectedMode === 'light' ? { color: '#FFFFFF' } : {}]}>Light</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Modal Logic (Menu & Edit) */}
        <Modal visible={menuVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.menuPopup}>
                <TouchableOpacity style={styles.menuItem} onPress={handleEditInitiate}>
                  <MaterialCommunityIcons name="pencil" size={20} color="#5152B3" />
                  <Text style={styles.menuText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal visible={editModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.editPopup}>
              <Text style={styles.editTitle}>Edit Phone</Text>
              <TextInput
                style={styles.inputField}
                value={tempValue}
                onChangeText={setTempValue}
                keyboardType="phone-pad"
                autoFocus
              />
              <View style={styles.editActions}>
                <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSaveEdit}>
                  <Text style={styles.saveBtnText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    flexGrow: 1,
    paddingHorizontal: 15, // Matched Teams.tsx
    paddingTop: 5,         // Matched Teams.tsx
  },
  innerContainer: {
    width: '100%',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 0, // Reset margin top to align closer like Teams list
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 15,
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
  avatarImage: {
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
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  profileBusiness: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 2,
  },
  infoWrapper: {
    gap: 15,
  },
  cardBorder: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardWithMenu: {
    position: 'relative',
    justifyContent: 'center',
  },
  threeDotButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
    zIndex: 10,
  },
  // Grid Styles
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  gridButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    gap: 8,
  },
  gridButtonActive: {
    backgroundColor: '#5152B3',
    borderColor: '#5152B3',
  },
  gridButtonText: {
    color: '#5152B3',
    fontWeight: '600',
    fontSize: 13,
  },
  // Logout Styles
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuPopup: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: 120,
    paddingVertical: 5,
    position: 'absolute',
    right: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    gap: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  editPopup: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '85%',
    padding: 20,
    alignItems: 'center',
  },
  editTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  inputField: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  cancelBtnText: {
    color: '#64748B',
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: '#5152B3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveBtnText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Profile;