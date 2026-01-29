import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  GestureResponderEvent,
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
} from 'react-native';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { THEME_COLORS } from '@/constants/Colors';
import NavHeader from '../../common/Buttons/NavHeader';
import HistoryCard from '../../common/Cards/HistoryCard';
import ImageDesCard from '../../common/Cards/ImageDesCard'; // Keep for Edit Modal Preview
import FilterInput, { FilterSection } from '../../common/Inputs/FilterInput';
import SearchInput from '../../common/Inputs/SearchInput';

interface HistoryItem {
  id: number;
  customer: {
    name: string;
    phone: string;
    img?: string;
  };
  services: string[];
  tags: string[];
  notes?: string;
  photos?: string[];
  date: string;
  time: string;
}

interface HistoryProps {
  onBack?: () => void;
  onNavigateToNewVisit?: () => void;
}

const History: React.FC<HistoryProps> = ({ onNavigateToNewVisit }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const defaultHistory: HistoryItem[] = [
    {
      id: 1,
      customer: { name: "Ahmad Ali", phone: "0300-1234567", img: 'https://i.pravatar.cc/150?u=1' },
      services: ["Haircut", "Shaving"],
      tags: ["Regular", "Premium"],
      notes: "Prefer shorter sides, sharp fade.",
      photos: ["https://picsum.photos/200/300", "https://picsum.photos/200/301"],
      date: "14 Jan 2026",
      time: "10:30 AM"
    },
    {
      id: 2,
      customer: { name: "Sara Khan", phone: "0312-7654321", img: 'https://i.pravatar.cc/150?u=2' },
      services: ["Color Expert", "Styling"],
      tags: ["VIP", "Color"],
      notes: "Ash blonde toner used.",
      photos: [],
      date: "12 Jan 2026",
      time: "02:15 PM"
    },
    {
      id: 3,
      customer: { name: "Zeenat Malik", phone: "0345-1122334", img: 'https://i.pravatar.cc/150?u=3' },
      services: ["Facial", "Treatment"],
      tags: ["New"],
      notes: "Sensitive skin, use organic products.",
      photos: ["https://picsum.photos/200/302"],
      date: "10 Jan 2026",
      time: "09:00 AM"
    },
    {
      id: 4,
      customer: { name: "Hamza Sheikh", phone: "0321-9988776", img: 'https://i.pravatar.cc/150?u=4' },
      services: ["Styling", "Beard Trim"],
      tags: ["Regular"],
      notes: "",
      photos: ["https://picsum.photos/200/303", "https://picsum.photos/200/304", "https://picsum.photos/200/305"],
      date: "08 Jan 2026",
      time: "04:45 PM"
    },
    {
      id: 5,
      customer: { name: "Danish Ahmed", phone: "0333-5544332", img: 'https://i.pravatar.cc/150?u=5' },
      services: ["Haircut"],
      tags: ["Student"],
      notes: "Simple crew cut.",
      photos: [],
      date: "05 Jan 2026",
      time: "11:20 AM"
    },
    {
      id: 6,
      customer: { name: "Bilal Khan", phone: "0301-2233445", img: 'https://i.pravatar.cc/150?u=6' },
      services: ["Hair Coloring", "Treatment"],
      tags: ["VIP"],
      notes: "Keratin treatment session 1.",
      photos: ["https://picsum.photos/200/306"],
      date: "03 Jan 2026",
      time: "01:00 PM"
    },
    {
      id: 7,
      customer: { name: "Usman Ghani", phone: "0344-5566778", img: 'https://i.pravatar.cc/150?u=7' },
      services: ["Shaving", "Facial"],
      tags: ["Regular"],
      notes: "Hot towel shave.",
      photos: [],
      date: "01 Jan 2026",
      time: "06:30 PM"
    },
    {
      id: 8,
      customer: { name: "Hassan Raza", phone: "0322-8877665", img: 'https://i.pravatar.cc/150?u=8' },
      services: ["Styling"],
      tags: ["Wedding"],
      notes: "Groom styling package.",
      photos: ["https://picsum.photos/200/307", "https://picsum.photos/200/308"],
      date: "30 Dec 2025",
      time: "12:00 PM"
    },
    {
      id: 9,
      customer: { name: "Ali Ahmed", phone: "0311-9988770", img: 'https://i.pravatar.cc/150?u=9' },
      services: ["Haircut", "Beard Trim"],
      tags: ["New"],
      notes: "",
      photos: [],
      date: "28 Dec 2025",
      time: "10:00 AM"
    },
    {
      id: 10,
      customer: { name: "Fahad Mustafa", phone: "0333-1122339", img: 'https://i.pravatar.cc/150?u=10' },
      services: ["Facial"],
      tags: ["Sponsor"],
      notes: "Monthly facial routine.",
      photos: ["https://picsum.photos/200/309"],
      date: "25 Dec 2025",
      time: "03:45 PM"
    }
  ];

  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(defaultHistory);
  const [searchText, setSearchText] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Temporary edit states
  const [tempName, setTempName] = useState<string>("");
  const [tempService, setTempService] = useState<string>(""); // Comma separated for editing
  const [tempImg, setTempImg] = useState<string>("");

  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number }>({ top: 0, right: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(-150)).current;

  // Updated Filter Sections
  const filterSections: FilterSection[] = [
    {
      id: 'category_filter',
      title: 'Filter By Service',
      options: [
        { label: 'Haircut', value: 'Haircut' },
        { label: 'Color Expert', value: 'Color' },
        { label: 'Styling', value: 'Styling' },
        { label: 'Facial', value: 'Facial' },
      ],
    },
    {
      id: 'tag_filter',
      title: 'Filter By Tag',
      options: [
        { label: 'New Client', value: 'New' },
        { label: 'Regular', value: 'Regular' },
        { label: 'VIP', value: 'VIP' },
      ],
    },
    {
      id: 'date_filter',
      title: 'Filter By Date',
      options: [
        { label: 'Today', value: '14 Jan 2026' },
        { label: 'Jan 2026', value: 'Jan 2026' },
        { label: 'Old Records', value: '2025' },
      ],
    },
  ];

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const savedString = await AsyncStorage.getItem('permanently_deleted_history');
        if (savedString) {
          const parsedData = JSON.parse(savedString);
          // Check if data is an array and the first item has the new 'customer' property
          if (Array.isArray(parsedData) && parsedData.length > 0 && parsedData[0].customer) {
            setHistoryItems(parsedData);
          } else {
            // If old data format is detected, we ignore it and use defaultHistory
            // Optionally we could clear it: await AsyncStorage.removeItem('permanently_deleted_history');
            console.log("Old data format detected, using default new data.");
          }
        }
      } catch (err) {
        console.error("Error loading storage", err);
      }
    };
    loadHistory();
  }, []);

  const persistHistory = async (updatedList: HistoryItem[]) => {
    try {
      await AsyncStorage.setItem('permanently_deleted_history', JSON.stringify(updatedList));
    } catch (err) {
      console.error("Error saving storage", err);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setTempImg(result.assets[0].uri);
    }
  };

  const handleOpenMenu = (event: GestureResponderEvent, item: HistoryItem) => {
    const { pageY } = event.nativeEvent;
    setMenuPosition({ top: pageY - 10, right: 40 });
    setSelectedId(item.id);
    setTempName(item.customer.name);
    setTempService(item.services.join(', '));
    setTempImg(item.customer.img || '');
    setMenuVisible(true);
  };

  const handleSaveEdit = () => {
    if (selectedId === null) return;
    const updated = historyItems.map((item) =>
      item.id === selectedId
        ? {
          ...item,
          customer: { ...item.customer, name: tempName, img: tempImg },
          services: tempService.split(',').map(s => s.trim()).filter(s => s.length > 0)
        }
        : item
    );
    setHistoryItems(updated);
    persistHistory(updated);
    setEditModalVisible(false);
  };

  const handleViewDetails = () => {
    setMenuVisible(false);
    router.push('/(tabs)/view-history' as any);
  };

  const handleDeleteItem = () => {
    if (selectedId === null) return;
    Alert.alert("Confirm Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel", onPress: () => setMenuVisible(false) },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const filtered = historyItems.filter((item) => item.id !== selectedId);
          setHistoryItems(filtered);
          persistHistory(filtered);
          setMenuVisible(false);
        }
      }
    ]);
  };

  // Expanded Filter Logic matching new structure
  const filteredData = historyItems.filter((item) => {
    // Safety check for old data
    if (!item || !item.customer) return false;

    const name = item.customer.name || "";
    const phone = item.customer.phone || "";

    const searchMatch = name.toLowerCase().includes(searchText.toLowerCase()) ||
      phone.includes(searchText);

    const categoryMatch = activeFilters.category_filter
      ? (item.services || []).some(s => s.includes(activeFilters.category_filter))
      : true;

    const dateMatch = activeFilters.date_filter
      ? (item.date || "").includes(activeFilters.date_filter)
      : true;

    // Simplified custom tag logic for demo - in real app would match actual tags
    const tagMatch = activeFilters.tag_filter
      ? (item.tags || []).some(t => t.includes(activeFilters.tag_filter))
      : true;

    return searchMatch && categoryMatch && dateMatch && tagMatch;
  });

  const showTopSuccessLoader = () => {
    setShowSuccess(true);
    Animated.spring(slideAnim, { toValue: Platform.OS === 'android' ? 50 : 60, useNativeDriver: true, bounciness: 10 }).start();
    setTimeout(() => {
      Animated.timing(slideAnim, { toValue: -150, duration: 400, useNativeDriver: true }).start(() => {
        setShowSuccess(false);
        if (onNavigateToNewVisit) onNavigateToNewVisit();
      });
    }, 2000);
  };

  const handleNewVisitPress = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); showTopSuccessLoader(); }, 1500);
  };

  return (
    <LinearGradient colors={THEME_COLORS.bgGradient} style={styles.gradientContainer}>
      <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        {showSuccess && (
          <Animated.View style={[styles.successNotification, { transform: [{ translateY: slideAnim }] }]}>
            <MaterialCommunityIcons name="check-circle" size={24} color="#FFFFFF" />
            <View>
              <Text style={styles.successTitle}>Success!</Text>
              <Text style={styles.successMessage}>Loading new visit form...</Text>
            </View>
          </Animated.View>
        )}

        <NavHeader title="Our All History !">
          <TouchableOpacity onPress={handleNewVisitPress} activeOpacity={0.8} disabled={loading}>
            <LinearGradient colors={THEME_COLORS.buttonGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.newVisitHeaderBtn}>
              {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.newVisitBtnText}>New Visit</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </NavHeader>

        <View style={styles.searchFixedWrapper}>
          <SearchInput value={searchText} onChangeText={setSearchText} placeholder="Search history..." showFilterIcon={true} onFilterIconPress={() => setIsFilterVisible(true)} containerStyle={styles.searchBar} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.listContent, { paddingBottom: 80 + insets.bottom }]}>
          {filteredData.map((item) => (
            <View key={item.id} style={styles.cardOuterWrapper}>
              {/* Updated to use HistoryCard with new data structure */}
              <HistoryCard
                customer={item.customer}
                services={item.services}
                tags={item.tags}
                notes={item.notes}
                photos={item.photos}
                date={item.date}
                time={item.time}
                onPress={() => router.push('/(tabs)/view-history' as any)}
                containerStyle={styles.cardItem}
              />
              <TouchableOpacity style={styles.actionButton} onPress={(e) => handleOpenMenu(e, item)}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Modal visible={menuVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.modalOverlayDimmed}>
              <View style={[styles.menuPopup, { top: menuPosition.top, right: menuPosition.right }]}>
                <TouchableOpacity style={styles.menuItem} onPress={handleViewDetails}>
                  <MaterialCommunityIcons name="eye" size={20} color="#64748B" />
                  <Text style={styles.menuText}>View</Text>
                </TouchableOpacity>
                <View style={styles.menuSeparator} />
                <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); setEditModalVisible(true); }}>
                  <MaterialCommunityIcons name="pencil" size={20} color="#5152B3" />
                  <Text style={styles.menuText}>Edit</Text>
                </TouchableOpacity>
                <View style={styles.menuSeparator} />
                <TouchableOpacity style={styles.menuItem} onPress={handleDeleteItem}>
                  <MaterialCommunityIcons name="delete" size={20} color="#EF4444" />
                  <Text style={styles.menuText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal visible={editModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlayCenterDark}>
            <View style={styles.editPopup}>
              <Text style={styles.editTitle}>Edit Visit Info</Text>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity onPress={pickImage} activeOpacity={0.7}>
                  <View style={{ position: 'relative' }}>
                    <View style={styles.editImageContainer}>
                      {/* Used original helper card for preview consistency */}
                      <ImageDesCard imageSource={{ uri: tempImg }} title="" description="" containerStyle={styles.editImageStyle} />
                    </View>
                    <View style={styles.cameraIconContainer}>
                      <MaterialCommunityIcons name="camera" size={16} color="white" />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Client Name</Text>
                <TextInput style={styles.inputField} value={tempName} onChangeText={setTempName} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Service Provided</Text>
                <TextInput style={styles.inputField} value={tempService} onChangeText={setTempService} />
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

        <FilterInput isVisible={isFilterVisible} onClose={() => setIsFilterVisible(false)} sections={filterSections} onApply={(selections) => { setActiveFilters(selections); setIsFilterVisible(false); }} onReset={() => setActiveFilters({})} title="Search Filters" />
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
  newVisitHeaderBtn: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
    minWidth: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newVisitBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  searchFixedWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    zIndex: 10,
  },
  searchBar: {
    width: '100%',
    marginBottom: 0,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  cardOuterWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  cardItem: {
    marginBottom: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    ...Platform.select({ ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2 }, android: { elevation: 2 } }),
  },
  cardTitleText: {
    color: '#5152B3',
    fontWeight: 'bold',
  },
  actionButton: {
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
  editImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  editImageStyle: {
    width: 80,
    height: 80,
    margin: 0,
    padding: 0,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5152B3',
    borderRadius: 15,
    padding: 5,
    elevation: 5,
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
    marginLeft: 4,
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
    marginTop: 10,
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

export default History;