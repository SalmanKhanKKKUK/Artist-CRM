import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
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
import { SafeAreaView } from "react-native-safe-area-context";

// Reusable Components
import DynamicButton from "../../common/Buttons/DynamicButton";
import InfoCard from "../../common/Cards/InfoCard";
import Setting from "../Setting/Setting";

const { width } = Dimensions.get('window');

interface ProfileProps {
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const [showSetting, setShowSetting] = useState<boolean>(false);

  // Data States
  const [email] = useState<string>("aqibshoaib@gmail.com");
  const [phone, setPhone] = useState<string>("3118298343");

  // UI States for Modals
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [tempValue, setTempValue] = useState<string>("");

  // Load Saved Data on Mount
  useEffect(() => {
    const loadStoredPhone = async () => {
      try {
        const savedPhone = await AsyncStorage.getItem('user_phone');
        if (savedPhone !== null) {
          setPhone(savedPhone);
        }
      } catch (error: any) {
        console.error("Failed to load phone number:", error.message);
      }
    };
    loadStoredPhone();
  }, []);

  // Save Data to Phone Memory
  const persistPhone = async (val: string) => {
    try {
      await AsyncStorage.setItem('user_phone', val);
    } catch (error: any) {
      console.error("Failed to save phone number:", error.message);
    }
  };

  // Hardware Back Button Logic
  useEffect(() => {
    const backAction = (): boolean => {
      if (showSetting) {
        setShowSetting(false);
        return true;
      } else {
        onBack();
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [showSetting, onBack]);

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
    persistPhone(tempValue); // Save to storage
    setEditModalVisible(false);
  };

  if (showSetting) {
    return <Setting onBack={() => setShowSetting(false)} />;
  }

  return (
    <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flexOne}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <Text style={styles.titleText}>Profile</Text>

            <Image
              source={require('../../../assets/homeimages/logo.png')}
              style={styles.topImage}
              resizeMode="contain"
            />

            <View style={styles.formContainer}>
              <View style={styles.profileHeader}>
                <Text style={styles.profileName}>Aqib Shoaib</Text>
                <Text style={styles.profileBusiness}>Saloon Hair</Text>
              </View>

              <View style={styles.infoWrapper}>
                {/* Email Card - 3 Dots removed */}
                <InfoCard
                  title="Email"
                  description={email}
                  backgroundColor="#F8FAFC"
                  borderRadius={20}
                  margin={0}
                  elevation={0}
                  containerStyle={styles.cardBorder}
                />

                {/* Phone Card with Edit only 3 dots */}
                <View style={styles.cardWithMenu}>
                  <InfoCard
                    title="Phone"
                    description={phone}
                    backgroundColor="#F8FAFC"
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

                <TouchableOpacity onPress={() => setShowSetting(true)}>
                  <View style={styles.clickableWrapper}>
                    <InfoCard
                      title="Settings"
                      description="App preferences and security"
                      backgroundColor="#F8FAFC"
                      borderRadius={20}
                      margin={0}
                      elevation={0}
                      containerStyle={styles.cardBorder}
                    />
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" style={styles.chevronIcon} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log("Billing Clicked")}>
                  <View style={styles.clickableWrapper}>
                    <InfoCard
                      title="Manage Billing"
                      description="Subscription and payments"
                      backgroundColor="#F8FAFC"
                      borderRadius={20}
                      margin={0}
                      elevation={0}
                      containerStyle={styles.cardBorder}
                    />
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" style={styles.chevronIcon} />
                  </View>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                  <DynamicButton
                    text="Logout"
                    onPress={() => Alert.alert('Logout', 'Are you sure?', [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Logout', onPress: () => onBack(), style: 'destructive' }
                    ])}
                    backgroundColor="#5152B3"
                    textColor="#FFFFFF"
                    borderRadius={25}
                    width="100%"
                    paddingVertical={14}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Pop-up Menu - Only Edit */}
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

      {/* Edit Modal */}
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
    paddingBottom: 45,
  },
  innerContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  topImage: {
    width: width * 0.8,
    height: 140,
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileBusiness: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 2,
  },
  infoWrapper: {
    gap: 12,
  },
  cardBorder: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  clickableWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  chevronIcon: {
    position: 'absolute',
    right: 15,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
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