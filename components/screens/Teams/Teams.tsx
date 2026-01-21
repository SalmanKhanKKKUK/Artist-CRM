import { THEME_COLORS } from '@/constants/Colors';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Removed DynamicButton import to fix unused import error
import NavHeader from '../../common/Buttons/NavHeader';
import ImageDesCard from '../../common/Cards/ImageDesCard';

interface TeamMember {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface TeamsProps {
  onBack?: () => void;
  onNavigateToInvite?: () => void;
}

const Teams: React.FC<TeamsProps> = ({ onBack, onNavigateToInvite }) => {
  const insets = useSafeAreaInsets();

  const defaultTeams: TeamMember[] = [
    { id: '1', title: "Ahmad Ali", description: "Senior Stylist - Active", image: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', title: "Sara Khan", description: "Color Expert - Active", image: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', title: "Zeenat Malik", description: "Manager - Active", image: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', title: "Hamza Sheikh", description: "Junior Stylist - Active", image: 'https://i.pravatar.cc/150?u=4' },
    { id: '5', title: "Danish Ahmed", description: "Assistant - Active", image: 'https://i.pravatar.cc/150?u=5' },
    { id: '6', title: "Zoya Malik", description: "Senior Artist - Active", image: 'https://i.pravatar.cc/150?u=6' },
    { id: '7', title: "Bilal Khan", description: "Hair Specialist - Active", image: 'https://i.pravatar.cc/150?u=7' },
    { id: '8', title: "Mariam Aziz", description: "Makeup Artist - Active", image: 'https://i.pravatar.cc/150?u=8' },
    { id: '9', title: "Usman Pirzada", description: "Barber - Active", image: 'https://i.pravatar.cc/150?u=9' },
    { id: '10', title: "Ayesha Omer", description: "Skin Expert - Active", image: 'https://i.pravatar.cc/150?u=10' },
  ];

  const [teams, setTeams] = useState<TeamMember[]>(defaultTeams);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState<string>("");
  const [tempDesc, setTempDesc] = useState<string>("");
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number }>({ top: 0, right: 0 });

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const savedData = await AsyncStorage.getItem('permanently_saved_teams');
        if (savedData !== null) {
          const parsedData = JSON.parse(savedData) as TeamMember[];
          if (parsedData.length >= 8) {
            setTeams(parsedData);
          }
        }
      } catch (error) {
        console.error("Failed to load teams:", error);
      }
    };
    loadTeams();
  }, []);

  const persistTeams = async (updatedTeams: TeamMember[]) => {
    try {
      await AsyncStorage.setItem('permanently_saved_teams', JSON.stringify(updatedTeams));
    } catch (error) {
      console.error("Failed to save teams:", error);
    }
  };

  const handleOpenMenu = (event: any, member: TeamMember) => {
    const { pageY } = event.nativeEvent;
    setMenuPosition({ top: pageY - 10, right: 40 });
    setSelectedId(member.id);
    setTempTitle(member.title);
    setTempDesc(member.description);
    setMenuVisible(true);
  };

  const handleEditInitiate = () => {
    setMenuVisible(false);
    setTimeout(() => setEditModalVisible(true), 100);
  };

  const handleToggleStatus = () => {
    const updated = teams.map((item: TeamMember) => {
      if (item.id === selectedId) {
        const isCurrentlyActive = item.description.toLowerCase().includes("active") && !item.description.toLowerCase().includes("deactive");
        const baseDesc = item.description.split(" - ")[0];
        const newStatus = isCurrentlyActive ? "Deactive" : "Active";
        return { ...item, description: `${baseDesc} - ${newStatus}` };
      }
      return item;
    });
    setTeams(updated);
    persistTeams(updated);
    setMenuVisible(false);
  };

  const handleSaveEdit = () => {
    const updated = teams.map((item: TeamMember) => 
      item.id === selectedId ? { ...item, title: tempTitle, description: tempDesc } : item
    );
    setTeams(updated);
    persistTeams(updated);
    setEditModalVisible(false);
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this member?",
      [
        { text: "Cancel", style: "cancel", onPress: () => setMenuVisible(false) },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            const filtered = teams.filter((item: TeamMember) => item.id !== selectedId);
            setTeams(filtered);
            persistTeams(filtered);
            setMenuVisible(false);
          } 
        }
      ]
    );
  };

  const isSelectedActive = teams.find(t => t.id === selectedId)?.description.toLowerCase().includes("active") && 
                           !teams.find(t => t.id === selectedId)?.description.toLowerCase().includes("deactive");

  return (
    <LinearGradient
      colors={THEME_COLORS.bgGradient}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        <NavHeader title=" Meet Our Team !">
          <TouchableOpacity onPress={() => onNavigateToInvite?.()} activeOpacity={0.8}>
            <LinearGradient
              colors={THEME_COLORS.buttonGradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.inviteHeaderBtn}
            >
              <Text style={styles.inviteBtnText}>Invite</Text>
            </LinearGradient>
          </TouchableOpacity>
        </NavHeader>

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={[styles.mainScroll, { paddingBottom: 60 + insets.bottom }]}
        >
          <View style={styles.contentFadeIn}>
            {teams.map((member) => (
              <View key={member.id} style={styles.cardWrapper}>
                <ImageDesCard
                  imageSource={{ uri: member.image }}
                  title={member.title}
                  description={member.description}
                  backgroundColor="#FFFFFF"
                  containerStyle={styles.cardMargin}
                />
                <TouchableOpacity 
                  style={styles.threeDotButton} 
                  onPress={(event) => handleOpenMenu(event, member)}
                >
                  <MaterialCommunityIcons name="dots-vertical" size={24} color="#64748B" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Pop-up Menu */}
      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlayDimmed}>
            <View style={[styles.menuPopup, { top: menuPosition.top, right: menuPosition.right }]}>
              <TouchableOpacity style={styles.menuItem} onPress={handleEditInitiate}>
                <MaterialCommunityIcons name="pencil" size={20} color="#5152B3" />
                <Text style={styles.menuText}>Edit</Text>
              </TouchableOpacity>
              
              <View style={styles.menuSeparator} />

              <TouchableOpacity style={styles.menuItem} onPress={handleToggleStatus}>
                <MaterialCommunityIcons 
                  name={isSelectedActive ? "close-circle-outline" : "check-circle-outline"} 
                  size={20} 
                  color={isSelectedActive ? "#F59E0B" : "#10B981"} 
                />
                <Text style={styles.menuText}>{isSelectedActive ? "Deactive" : "Active"}</Text>
              </TouchableOpacity>

              <View style={styles.menuSeparator} />
              
              <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
                <MaterialCommunityIcons name="delete" size={20} color="#EF4444" />
                <Text style={styles.menuText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Edit Modal */}
      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlayCenterDark}>
          <View style={styles.editPopup}>
            <Text style={styles.editTitle}>Edit Team Member</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput style={styles.inputField} value={tempTitle} onChangeText={setTempTitle} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Designation</Text>
              <TextInput style={styles.inputField} value={tempDesc} onChangeText={setTempDesc} />
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveEdit}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

// ================= STYLES (Properly Organized) =================
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  inviteHeaderBtn: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  inviteBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  mainScroll: {
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  contentFadeIn: {
    width: '100%',
  },
  cardWrapper: {
    position: 'relative',
    marginBottom: 0,
  },
  cardMargin: {
    marginBottom: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  threeDotButton: {
    position: 'absolute',
    right: 15,
    top: 30,
    padding: 10,
    zIndex: 10,
  },
  modalOverlayDimmed: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalOverlayCenterDark: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuPopup: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 140,
    paddingVertical: 5,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
  },
  editPopup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '85%',
    padding: 24,
    elevation: 10,
  },
  editTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E293B',
  },
  inputGroup: {
    marginBottom: 15,
    width: '100%',
  },
  inputLabel: {
    color: '#64748B',
    marginBottom: 6,
    fontWeight: '600',
    fontSize: 14,
  },
  inputField: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#F8FAFC',
    color: '#1E293B',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 10,
  },
  cancelBtnText: {
    color: '#94A3B8',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: '#5152B3',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Teams;