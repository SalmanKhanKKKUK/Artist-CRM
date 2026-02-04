import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
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

import { THEME_COLORS } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import { useSmartBackHandler } from "../../../hooks/useSmartBackHandler";
import NavHeader from "../../common/Buttons/NavHeader";
import ImageDesCard from '../../common/Cards/ImageDesCard';
import InfoCard from "../../common/Cards/InfoCard";

// --- Interfaces ---
interface TeamMember {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ProfileProps {
  onBack?: () => void;
  onNavigateToInvite?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack, onNavigateToInvite }) => {
  const insets = useSafeAreaInsets();

  // --- Main Tabs State ---
  const [activeTab, setActiveTab] = useState<'profile' | 'teams'>('profile');

  // --- Profile Data States ---
  const [email] = useState<string>("aqibshoaib@gmail.com");
  const [phone, setPhone] = useState<string>("3118298343");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { themeMode, setThemeMode, colors, isDark } = useTheme();

  // --- Teams Data States ---
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);

  // --- Shared UI States ---
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [inviteModalVisible, setInviteModalVisible] = useState<boolean>(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState<string>("");

  const [tempValue, setTempValue] = useState<string>("");
  const [tempTitle, setTempTitle] = useState<string>("");
  const [tempDesc, setTempDesc] = useState<string>("");
  const [tempImg, setTempImg] = useState<string>("");
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // --- Animation States ---
  const slideAnim = useRef(new Animated.Value(-150)).current;
  const [showSuccess, setShowSuccess] = useState(false);

  // --- Data Loading Effect ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedPhone = await AsyncStorage.getItem('user_phone');
        if (savedPhone) setPhone(savedPhone);

        // Requirement: Always load these 5 cards on run
        const initialTeams = [
          {
            id: '1',
            title: "Ahmad Ali",
            description: "Senior Stylist - Active",
            image: 'https://i.pravatar.cc/150?u=1'
          },
          {
            id: '2',
            title: "Sara Khan",
            description: "Color Expert - Active",
            image: 'https://i.pravatar.cc/150?u=2'
          },
          {
            id: '3',
            title: "Zain Malik",
            description: "Barber - Active",
            image: 'https://i.pravatar.cc/150?u=3'
          },
          {
            id: '4',
            title: "Hina Shah",
            description: "Manager - Active",
            image: 'https://i.pravatar.cc/150?u=4'
          },
          {
            id: '5',
            title: "Omar Farooq",
            description: "Junior Stylist - Active",
            image: 'https://i.pravatar.cc/150?u=5'
          },
        ];
        setTeams(initialTeams);
        await AsyncStorage.setItem('permanently_saved_teams', JSON.stringify(initialTeams));
      } catch (error) {
        console.error("Load Data Error:", error);
      }
    };
    loadData();
  }, []);

  // --- Persistence Handlers ---
  const persistPhone = async (val: string) => {
    await AsyncStorage.setItem('user_phone', val);
  };

  const persistTeams = async (updatedTeams: TeamMember[]) => {
    await AsyncStorage.setItem('permanently_saved_teams', JSON.stringify(updatedTeams));
  };

  useSmartBackHandler(() => {
    if (onBack) onBack();
  });

  // --- Action Handlers ---
  const pickImage = async (type: 'profile' | 'team') => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'profile') {
        setProfileImage(result.assets[0].uri);
      } else {
        setTempImg(result.assets[0].uri);
      }
    }
  };

  const handleOpenPhoneMenu = (event: any) => {
    const { pageY } = event.nativeEvent;
    setMenuPosition({ top: pageY - 10, right: 40 });
    setTempValue(phone);
    setMenuVisible(true);
  };

  const handleOpenTeamMenu = (event: any, member: TeamMember) => {
    const { pageY } = event.nativeEvent;
    setMenuPosition({ top: pageY - 10, right: 40 });
    setSelectedTeamMember(member);
    setTempTitle(member.title);
    setTempDesc(member.description);
    setTempImg(member.image);
    setMenuVisible(true);
  };

  const handleEditInitiate = () => {
    setMenuVisible(false);
    setTimeout(() => setEditModalVisible(true), 100);
  };

  const handleSaveEdit = () => {
    if (activeTab === 'profile') {
      setPhone(tempValue);
      persistPhone(tempValue);
    } else {
      const updated = teams.map(item =>
        item.id === selectedTeamMember?.id
          ? { ...item, title: tempTitle, description: tempDesc, image: tempImg }
          : item
      );
      setTeams(updated);
      persistTeams(updated);
    }
    setEditModalVisible(false);
  };

  const handleToggleStatus = () => {
    if (!selectedTeamMember) return;
    const updated = teams.map(item => {
      if (item.id === selectedTeamMember.id) {
        const isActive = item.description.toLowerCase().includes("active") &&
          !item.description.toLowerCase().includes("deactive");
        const baseDesc = item.description.split(" - ")[0];
        return {
          ...item,
          description: `${baseDesc} - ${isActive ? "Deactive" : "Active"}`
        };
      }
      return item;
    });
    setTeams(updated);
    persistTeams(updated);
    setMenuVisible(false);
  };

  const handleDeleteTeam = () => {
    setDeleteModalVisible(true);
    setMenuVisible(false);
  };

  const confirmDeleteTeam = () => {
    const filtered = teams.filter(t => t.id !== selectedTeamMember?.id);
    setTeams(filtered);
    persistTeams(filtered);
    setDeleteModalVisible(false);
  };

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const handleSendInvitation = () => {
    if (!inviteEmail) {
      Alert.alert("Error", "Please enter an email address");
      return;
    }
    setInviteModalVisible(false);
    setInviteEmail("");

    setShowSuccess(true);
    Animated.spring(slideAnim, { toValue: 60, useNativeDriver: true, bounciness: 10 }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, { toValue: -150, duration: 400, useNativeDriver: true }).start(() => {
        setShowSuccess(false);
      });
    }, 2500);
  };

  const isSelectedActive = selectedTeamMember?.description.toLowerCase().includes("active") &&
    !selectedTeamMember?.description.toLowerCase().includes("deactive");

  return (
    <LinearGradient colors={colors.bgGradient} style={styles.gradientContainer}>
      <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        {/* Success Alert */}
        {showSuccess && (
          <Animated.View style={[styles.successNotification, { transform: [{ translateY: slideAnim }] }]}>
            <MaterialCommunityIcons name="check-circle" size={24} color="#FFFFFF" />
            <View>
              <Text style={styles.successTitle}>Success!</Text>
              <Text style={styles.successMessage}>Invitation sent successfully.</Text>
            </View>
          </Animated.View>
        )}

        <NavHeader title={activeTab === 'profile' ? "Profile" : "Team Members"} showProfileIcon={false}>
          {activeTab === 'profile' && (
            <TouchableOpacity onPress={handleLogout} activeOpacity={0.8}>
              <LinearGradient
                colors={THEME_COLORS.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.headerBtn}
              >
                <MaterialCommunityIcons name="logout" size={18} color="#FFFFFF" style={{ marginRight: 5 }} />
                <Text style={styles.headerBtnText}>Logout</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </NavHeader>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              {
                backgroundColor: activeTab === 'profile' && isDark ? "#1e293b" : colors.card,
                borderColor: colors.border
              },
              activeTab === 'profile' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('profile')}
          >
            <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
              My Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              {
                backgroundColor: activeTab === 'teams' && isDark ? "#1e293b" : colors.card,
                borderColor: colors.border
              },
              activeTab === 'teams' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('teams')}
          >
            <Text style={[styles.tabText, activeTab === 'teams' && styles.activeTabText]}>
              Our Team
            </Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flexOne}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom + (activeTab === 'profile' ? 80 : 40) }
            ]}
          >
            {activeTab === 'profile' ? (
              <View style={styles.innerContainer}>
                <View style={styles.profileHeader}>
                  <TouchableOpacity
                    onPress={() => pickImage('profile')}
                    style={[styles.imageCircle, { backgroundColor: colors.background, borderColor: colors.border }]}
                  >
                    {profileImage ? (
                      <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                    ) : (
                      <MaterialCommunityIcons name="account-outline" size={60} color={colors.primary} />
                    )}
                    <View style={[styles.plusIconWrapper, { backgroundColor: colors.primary, borderColor: colors.background }]}>
                      <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
                    </View>
                  </TouchableOpacity>
                  <Text style={[styles.profileName, { color: colors.text }]}>Aqib Shoaib</Text>
                  <Text style={[styles.profileBusiness, { color: colors.textSecondary }]}>Artist CRM</Text>
                </View>

                <View style={styles.infoWrapper}>
                  <InfoCard
                    title="Email"
                    description={email}
                    backgroundColor={themeMode === 'dark' || (themeMode === 'active' && isDark) ? "#1e293b" : "#FFFFFF"}
                    borderRadius={20}
                    containerStyle={[styles.cardBorder, { borderColor: colors.border }]}
                    titleColor={themeMode === 'dark' || (themeMode === 'active' && isDark) ? "#FFFFFF" : "#1E293B"}
                    descriptionColor="#64748B"
                  />

                  <View style={styles.cardWithMenu}>
                    <InfoCard
                      title="Phone"
                      description={phone}
                      backgroundColor={themeMode === 'dark' || (themeMode === 'active' && isDark) ? "#1e293b" : "#FFFFFF"}
                      borderRadius={20}
                      containerStyle={[styles.cardBorder, { borderColor: colors.border }]}
                      titleColor={themeMode === 'dark' || (themeMode === 'active' && isDark) ? "#FFFFFF" : "#1E293B"}
                      descriptionColor="#64748B"
                    />
                    <TouchableOpacity style={styles.threeDotButton} onPress={(e) => handleOpenPhoneMenu(e)}>
                      <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.gridContainer}>
                    {(['active', 'dark', 'light'] as const).map((mode) => (
                      <TouchableOpacity
                        key={mode}
                        style={[
                          styles.gridButton,
                          {
                            backgroundColor: themeMode === mode ? colors.primary : (isDark ? "#1e293b" : "#FFFFFF"),
                            borderColor: colors.border
                          },
                          themeMode === mode && { backgroundColor: colors.primary, borderColor: colors.primary }
                        ]}
                        onPress={() => setThemeMode(mode)}
                      >
                        <MaterialCommunityIcons
                          name={mode === 'active' ? "check-circle-outline" : mode === 'dark' ? "weather-night" : "weather-sunny"}
                          size={24}
                          color={themeMode === mode ? "#FFFFFF" : colors.primary}
                        />
                        <Text style={[
                          styles.gridButtonText,
                          { color: colors.primary },
                          themeMode === mode && { color: '#FFFFFF' }
                        ]}>
                          {mode === 'active' ? 'Auto' : mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.innerContainer}>
                <View style={styles.inviteSectionWrapper}>
                  <Text style={[styles.inviteInstructionText, { color: colors.textSecondary }]}>
                    Invite your team member
                  </Text>
                  <TouchableOpacity onPress={() => setInviteModalVisible(true)} activeOpacity={0.8}>
                    <LinearGradient
                      colors={THEME_COLORS.buttonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.headerBtn}
                    >
                      <MaterialCommunityIcons name="account-plus" size={18} color="#FFFFFF" style={{ marginRight: 5 }} />
                      <Text style={styles.headerBtnText}>Invite</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                {teams.map((member) => (
                  <View key={member.id} style={styles.teamCardWrapper}>
                    <ImageDesCard
                      imageSource={{ uri: member.image }}
                      title={member.title}
                      description={member.description}
                      backgroundColor={isDark ? "#1e293b" : "#FFFFFF"}
                      containerStyle={[styles.teamCard, { borderColor: colors.border }]}
                      titleStyle={{ color: isDark ? "#FFFFFF" : "#1E293B" }}
                      descriptionStyle={{ color: "#64748B" }}
                    />
                    <TouchableOpacity
                      style={styles.teamThreeDot}
                      onPress={(e) => handleOpenTeamMenu(e, member)}
                    >
                      <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>

        {/* --- Context Menu Modal --- */}
        <Modal visible={menuVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.modalOverlayDimmed}>
              <View style={[styles.menuPopup, { top: menuPosition.top, right: 40, backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}>
                <TouchableOpacity style={styles.menuItem} onPress={handleEditInitiate}>
                  <MaterialCommunityIcons name="pencil" size={20} color={colors.primary} />
                  <Text style={[styles.menuText, { color: colors.text }]}>Edit</Text>
                </TouchableOpacity>
                {activeTab === 'teams' && (
                  <>
                    <View style={[styles.menuSeparator, { backgroundColor: colors.border }]} />
                    <TouchableOpacity style={styles.menuItem} onPress={handleToggleStatus}>
                      <MaterialCommunityIcons
                        name={isSelectedActive ? "close-circle-outline" : "check-circle-outline"}
                        size={20}
                        color={isSelectedActive ? "#F59E0B" : "#10B981"}
                      />
                      <Text style={[styles.menuText, { color: colors.text }]}>
                        {isSelectedActive ? "Deactivate" : "Activate"}
                      </Text>
                    </TouchableOpacity>
                    <View style={[styles.menuSeparator, { backgroundColor: colors.border }]} />
                    <TouchableOpacity style={styles.menuItem} onPress={handleDeleteTeam}>
                      <MaterialCommunityIcons name="delete" size={20} color="#EF4444" />
                      <Text style={[styles.menuText, { color: colors.text }]}>Delete</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* --- Invite Modal --- */}
        <Modal visible={inviteModalVisible} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={() => setInviteModalVisible(false)}>
            <View style={styles.modalOverlayCenterDark}>
              <TouchableWithoutFeedback onPress={() => { }}>
                <View style={[styles.editPopup, { backgroundColor: colors.card }]}>
                  <Text style={[styles.editTitle, { color: colors.text }]}>Invite Team</Text>
                  <View style={styles.formBody}>
                    <View style={styles.inputGroup}>
                      <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Team Member Email</Text>
                      <TextInput
                        style={[styles.inputField, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                        placeholderTextColor={colors.textSecondary}
                        value={inviteEmail}
                        onChangeText={setInviteEmail}
                        keyboardType="email-address"
                        placeholder="Enter email address"
                        autoCapitalize="none"
                      />
                    </View>
                  </View>
                  <View style={styles.actionRowInvite}>
                    <TouchableOpacity style={styles.saveBtnFull} onPress={handleSendInvitation}>
                      <Text style={styles.saveBtnText}>Send Invitation</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* --- Logout Modal --- */}
        <Modal visible={logoutModalVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setLogoutModalVisible(false)}>
            <View style={styles.modalOverlayCenterDark}>
              <TouchableWithoutFeedback onPress={() => { }}>
                <View style={[styles.editPopup, { backgroundColor: colors.card, width: '80%' }]}>
                  <Text style={[styles.editTitle, { color: colors.text, marginBottom: 10 }]}>Confirm Logout</Text>
                  <Text style={{ color: colors.textSecondary, textAlign: 'center', marginBottom: 25, fontSize: 16 }}>
                    Are you sure you want to Logout
                  </Text>

                  <View style={styles.actionRow}>
                    <TouchableOpacity onPress={() => setLogoutModalVisible(false)}>
                      <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.saveBtn, { backgroundColor: '#EF4444' }]}
                      onPress={() => {
                        setLogoutModalVisible(false);
                        onBack?.();
                      }}
                    >
                      <Text style={styles.saveBtnText}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* --- Edit Modal --- */}
        <Modal visible={editModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlayCenterDark}>
            <View style={[styles.editPopup, { backgroundColor: colors.card }]}>
              <Text style={[styles.editTitle, { color: colors.text }]}>
                {activeTab === 'profile' ? "Update Phone" : "Edit Team Member"}
              </Text>
              {activeTab === 'teams' && (
                <View style={styles.formImageContainer}>
                  <TouchableOpacity onPress={() => pickImage('team')} activeOpacity={0.8}>
                    <View style={styles.formImageCircle}>
                      <Image source={{ uri: tempImg }} style={styles.formAvatar} />
                      <View style={styles.formCameraBadge}>
                        <MaterialCommunityIcons name="camera" size={16} color="white" />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.formChangeText}>Change Photo</Text>
                </View>
              )}
              <View style={styles.formBody}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
                    {activeTab === 'profile' ? "Phone Number" : "Full Name"}
                  </Text>
                  <TextInput
                    style={[styles.inputField, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                    placeholderTextColor={colors.textSecondary}
                    value={activeTab === 'profile' ? tempValue : tempTitle}
                    onChangeText={activeTab === 'profile' ? setTempValue : setTempTitle}
                    keyboardType={activeTab === 'profile' ? "phone-pad" : "default"}
                    placeholder={activeTab === 'profile' ? "Enter phone" : "Enter name"}
                  />
                </View>
                {activeTab === 'teams' && (
                  <View style={styles.inputGroup}>
                    <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Designation</Text>
                    <TextInput
                      style={[styles.inputField, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                      placeholderTextColor={colors.textSecondary}
                      value={tempDesc}
                      onChangeText={setTempDesc}
                      placeholder="e.g. Senior Artist"
                    />
                  </View>
                )}
              </View>
              <View style={styles.actionRow}>
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


        {/* --- Delete Team Modal --- */}
        <Modal visible={deleteModalVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setDeleteModalVisible(false)}>
            <View style={styles.modalOverlayCenterDark}>
              <TouchableWithoutFeedback onPress={() => { }}>
                <View style={[styles.editPopup, { backgroundColor: colors.card, width: '80%' }]}>
                  <Text style={[styles.editTitle, { color: colors.text, marginBottom: 10 }]}>Confirm Delete</Text>
                  <Text style={{ color: colors.textSecondary, textAlign: 'center', marginBottom: 25, fontSize: 16 }}>
                    Are you sure you want to delete this team member?
                  </Text>

                  <View style={styles.actionRow}>
                    <TouchableOpacity onPress={() => setDeleteModalVisible(false)}>
                      <Text style={styles.cancelBtnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.saveBtn, { backgroundColor: '#EF4444' }]}
                      onPress={confirmDeleteTeam}
                    >
                      <Text style={styles.saveBtnText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </SafeAreaView >
    </LinearGradient >
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1
  },
  masterContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  flexOne: {
    flex: 1
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 12,
    gap: 12
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeTabButton: {
    backgroundColor: '#5152B3',
    borderColor: '#5152B3'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B'
  },
  activeTabText: {
    color: '#FFFFFF'
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 15
  },
  innerContainer: {
    width: '100%',
    paddingRight: 5
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10
  },
  imageCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    position: 'relative'
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  plusIconWrapper: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#5152B3',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF'
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 10
  },
  profileBusiness: {
    fontSize: 15,
    color: '#64748B'
  },
  infoWrapper: {
    gap: 0,
    paddingHorizontal: 10,
    width: '100%',
  },
  cardBorder: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: '100%'
  },
  cardWithMenu: {
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
    
  },
  threeDotButton: {
    position: 'absolute',
    right: 0,
    padding: 10,
    zIndex: 10
  },
  teamCardWrapper: {
    position: 'relative',
    marginBottom: 0
  },
  teamCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  teamThreeDot: {
    position: 'absolute',
    right: 15,
    top: 25,
    padding: 10,
    zIndex: 10
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 5,
    width: '100%'
  },
  gridButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 1,
    gap: 5
  },
  gridButtonText: {
    fontSize: 12,
    fontWeight: '700'
  },
  modalOverlayDimmed: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalOverlayCenterDark: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuPopup: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 140,
    paddingVertical: 5,
    elevation: 8
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10
  },
  menuText: {
    fontSize: 15,
    color: '#334155'
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 10
  },
  editPopup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: '88%',
    padding: 24,
    elevation: 10
  },
  editTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 20
  },
  formImageContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  formImageCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#EEF2FF',
    position: 'relative'
  },
  formAvatar: {
    width: 84,
    height: 84,
    borderRadius: 42
  },
  formCameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5152B3',
    padding: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white'
  },
  formChangeText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
    fontWeight: '600'
  },
  formBody: {
    width: '100%',
    marginBottom: 10
  },
  inputGroup: {
    marginBottom: 18
  },
  inputLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
    fontWeight: '600'
  },
  inputField: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#F8FAFC',
    fontSize: 16,
    color: '#1E293B'
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 20,
    marginTop: 10
  },
  actionRowInvite: {
    marginTop: 10,
    alignItems: 'center'
  },
  cancelBtnText: {
    color: '#94A3B8',
    fontWeight: 'bold',
    fontSize: 16
  },
  saveBtn: {
    backgroundColor: '#5152B3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15,
    elevation: 2
  },
  saveBtnFull: {
    backgroundColor: '#5152B3',
    paddingVertical: 14,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center'
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  headerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  headerBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12
  },
  successNotification: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 20,
    zIndex: 9999,
    gap: 15,
    elevation: 10
  },
  successTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  successMessage: {
    color: '#E0F2FE',
    fontSize: 13
  },
  inviteSectionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 5
  },
  inviteInstructionText: {
    fontSize: 14,
    fontWeight: '600'
  },
});

export default Profile;