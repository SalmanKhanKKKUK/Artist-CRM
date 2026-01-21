import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import {
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
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { THEME_COLORS } from '@/constants/Colors';
import NavHeader from '../../common/Buttons/NavHeader';
import ImageDesCard from '../../common/Cards/ImageDesCard';
import FilterInput, { FilterSection } from '../../common/Inputs/FilterInput';
import SearchInput from '../../common/Inputs/SearchInput';

// Define the shape of a single history item
interface HistoryItem {
  id: number;
  name: string;
  service: string;
  date: string;
  time: string;
  img: string;
}

interface HistoryProps {
  onBack?: () => void;
  onNavigateToNewVisit?: () => void;
}

const History: React.FC<HistoryProps> = ({ onBack, onNavigateToNewVisit }) => {
  const insets = useSafeAreaInsets();

  // 1. Initial Default Data
  const defaultHistory: HistoryItem[] = [
    { id: 1, name: "Ahmad Ali", service: "Haircut", date: "14 Jan 2026", time: "10:30 AM", img: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: "Sara Khan", service: "Color Expert", date: "12 Jan 2026", time: "02:15 PM", img: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: "Zeenat Malik", service: "Manager", date: "10 Jan 2026", time: "09:00 AM", img: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: "Hamza Sheikh", service: "Styling", date: "08 Jan 2026", time: "04:45 PM", img: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: "Danish Ahmed", service: "Haircut", date: "05 Jan 2026", time: "11:20 AM", img: 'https://i.pravatar.cc/150?u=5' },
    { id: 6, name: "Zoya Malik", service: "Senior Artist", date: "04 Jan 2026", time: "01:00 PM", img: 'https://i.pravatar.cc/150?u=6' },
    { id: 7, name: "Bilal Khan", service: "Hair Specialist", date: "03 Jan 2026", time: "10:00 AM", img: 'https://i.pravatar.cc/150?u=7' },
    { id: 8, name: "Mariam Aziz", service: "Makeup Artist", date: "02 Jan 2026", time: "12:30 PM", img: 'https://i.pravatar.cc/150?u=8' },
    { id: 9, name: "Usman Pirzada", service: "Barber", date: "01 Jan 2026", time: "03:15 PM", img: 'https://i.pravatar.cc/150?u=9' },
    { id: 10, name: "Ayesha Omer", service: "Skin Expert", date: "30 Dec 2025", time: "11:45 AM", img: 'https://i.pravatar.cc/150?u=10' },
  ];

  // 2. States with Explicit Types
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(defaultHistory);
  const [searchText, setSearchText] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [tempName, setTempName] = useState<string>("");
  const [tempService, setTempService] = useState<string>("");
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number }>({ top: 0, right: 0 });

  // 3. Filter Sections Setup
  const filterSections: FilterSection[] = [
    {
      id: 'category_filter',
      title: 'Filter By Category',
      options: [
        { label: 'Haircut', value: 'Haircut' },
        { label: 'Color Expert', value: 'Color Expert' },
        { label: 'Styling', value: 'Styling' },
        { label: 'Manager', value: 'Manager' },
      ],
    },
    {
      id: 'tag_filter',
      title: 'Filter By Tags',
      options: [
        { label: 'VIP', value: 'vip' },
        { label: 'Regular', value: 'regular' },
        { label: 'New Client', value: 'new' },
      ],
    },
  ];

  // 4. Persistence Logic
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const savedString = await AsyncStorage.getItem('permanently_deleted_history');
        if (savedString) {
          const parsedData: HistoryItem[] = JSON.parse(savedString);
          setHistoryItems(parsedData);
        }
      } catch (err) {
        console.log("Error loading storage", err);
      }
    };
    loadHistory();
  }, []);

  const persistHistory = async (updatedList: HistoryItem[]) => {
    try {
      await AsyncStorage.setItem('permanently_deleted_history', JSON.stringify(updatedList));
    } catch (err) {
      console.log("Error saving storage", err);
    }
  };

  // 5. Functional Filter Logic
  const filteredData = historyItems.filter((item) => {
    const searchMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const categoryMatch = activeFilters.category_filter 
      ? item.service === activeFilters.category_filter 
      : true;
    return searchMatch && categoryMatch;
  });

  // Handlers
  const handleOpenMenu = (event: any, item: HistoryItem) => {
    const { pageY } = event.nativeEvent;
    setMenuPosition({ top: pageY - 10, right: 40 });
    setSelectedId(item.id);
    setTempName(item.name);
    setTempService(item.service);
    setMenuVisible(true);
  };

  const handleDeleteItem = () => {
    if (selectedId === null) return;
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this visit record?",
      [
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
      ]
    );
  };

  const handleSaveEdit = () => {
    if (selectedId === null) return;
    const updated = historyItems.map((item) =>
      item.id === selectedId ? { ...item, name: tempName, service: tempService } : item
    );
    setHistoryItems(updated);
    persistHistory(updated);
    setEditModalVisible(false);
  };

  return (
    <LinearGradient colors={THEME_COLORS.bgGradient} style={styles.gradientContainer}>
      <SafeAreaView style={styles.masterContainer} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        <NavHeader title="Our All History !">
          <TouchableOpacity onPress={onNavigateToNewVisit} activeOpacity={0.8}>
            <LinearGradient
              colors={THEME_COLORS.buttonGradient}
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 0 }}
              style={styles.newVisitHeaderBtn}
            >
              <Text style={styles.newVisitBtnText}>New Visit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </NavHeader>

        <View style={styles.searchFixedWrapper}>
          <SearchInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search history..."
            showFilterIcon={true}
            onFilterIconPress={() => setIsFilterVisible(true)}
            containerStyle={styles.searchBar}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listContent, { paddingBottom: 80 + insets.bottom }]}
        >
          {filteredData.map((item) => (
            <View key={item.id} style={styles.cardOuterWrapper}>
              <ImageDesCard
                imageSource={{ uri: item.img }}
                title={item.name}
                description={`${item.service}\n${item.date} | ${item.time}`}
                backgroundColor="#FFFFFF"
                containerStyle={styles.cardItem}
                titleStyle={styles.cardTitleText}
              />
              <TouchableOpacity
                style={styles.actionButton}
                onPress={(event) => handleOpenMenu(event, item)}
              >
                <MaterialCommunityIcons name="dots-vertical" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <FilterInput
          isVisible={isFilterVisible}
          onClose={() => setIsFilterVisible(false)}
          sections={filterSections}
          onApply={(selections) => {
            setActiveFilters(selections);
            setIsFilterVisible(false);
          }}
          onReset={() => setActiveFilters({})}
          title="Search Filters"
        />

        {/* Edit Modal Logic */}
        <Modal visible={editModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlayCenterDark}>
            <View style={styles.editPopup}>
              <Text style={styles.editTitle}>Edit Visit Info</Text>
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

        {/* Dots Menu Modal */}
        <Modal visible={menuVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.modalOverlayDimmed}>
              <View style={[styles.menuPopup, { top: menuPosition.top, right: menuPosition.right }]}>
                <TouchableOpacity style={styles.menuItem} onPress={() => {setMenuVisible(false); setEditModalVisible(true)}}>
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
  newVisitHeaderBtn: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
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
    marginBottom: 0,
  },
  cardItem: {
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

export default History;