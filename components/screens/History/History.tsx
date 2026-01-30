import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  GestureResponderEvent,
  Image,
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
import { useTheme } from '@/contexts/ThemeContext';
import NavHeader from '../../common/Buttons/NavHeader';
import HistoryCard from '../../common/Cards/HistoryCard';
import FilterInput, { FilterSection } from '../../common/Inputs/FilterInput';
import SearchInput from '../../common/Inputs/SearchInput';

const { width } = Dimensions.get('window');

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
  const { colors, isDark } = useTheme();

  const defaultHistory: HistoryItem[] = [
    {
      id: 1,
      customer: {
        name: "Ahmad Ali",
        phone: "0300-1234567",
        img: 'https://i.pravatar.cc/150?u=1'
      },
      services: ["Haircut", "Shaving"],
      tags: ["Regular", "Premium"],
      notes: "Prefer shorter sides, sharp fade.",
      photos: ["https://picsum.photos/200/300", "https://picsum.photos/200/301"],
      date: "14 Jan 2026",
      time: "10:30 AM"
    },
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
  const [tempPhone, setTempPhone] = useState<string>("");
  const [tempService, setTempService] = useState<string>("");
  const [tempTags, setTempTags] = useState<string>("");
  const [tempNotes, setTempNotes] = useState<string>("");
  const [tempPhotos, setTempPhotos] = useState<string[]>([]); // Array for multiple photos

  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number }>({ top: 0, right: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(-150)).current;

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
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setHistoryItems(parsedData.slice(0, 10));
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
      await AsyncStorage.setItem('permanently_deleted_history', JSON.stringify(updatedList.slice(0, 10)));
    } catch (err) {
      console.error("Error saving storage", err);
    }
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true
    });

    if (!result.canceled) {
      setTempPhotos(prev => [...prev, ...result.assets.map(a => a.uri)]);
    }
  };

  const removeImage = (index: number) => {
    setTempPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleOpenMenu = (event: GestureResponderEvent, item: HistoryItem) => {
    const { pageY } = event.nativeEvent;
    setMenuPosition({ top: pageY - 10, right: 40 });
    setSelectedId(item.id);
    setTempName(item.customer.name);
    setTempPhone(item.customer.phone);
    setTempService(item.services.join(', '));
    setTempTags(item.tags.join(', '));
    setTempNotes(item.notes || "");
    setTempPhotos(item.photos || []); // Load existing photos into temp state
    setMenuVisible(true);
  };

  const handleSaveEdit = () => {
    if (selectedId === null) return;
    const updated = historyItems.map((item) =>
      item.id === selectedId
        ? {
          ...item,
          customer: { ...item.customer, name: tempName, phone: tempPhone },
          services: tempService.split(',').map(s => s.trim()).filter(s => s.length > 0),
          tags: tempTags.split(',').map(t => t.trim()).filter(t => t.length > 0),
          notes: tempNotes,
          photos: tempPhotos // Save updated array
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

  const filteredData = historyItems
    .filter((item) => {
      if (!item || !item.customer) return false;
      const query = searchText.toLowerCase();
      const nameMatch = (item.customer.name || "").toLowerCase().includes(query);
      const phoneMatch = (item.customer.phone || "").includes(query);
      const serviceMatch = (item.services || []).some(s => s.toLowerCase().includes(query));
      const notesMatch = (item.notes || "").toLowerCase().includes(query);
      const tagsMatch = (item.tags || []).some(t => t.toLowerCase().includes(query));
      const searchMatch = nameMatch || phoneMatch || serviceMatch || notesMatch || tagsMatch;

      const categoryMatch = activeFilters.category_filter
        ? (item.services || []).some(s => s.includes(activeFilters.category_filter))
        : true;

      const dateMatch = activeFilters.date_filter
        ? (item.date || "").includes(activeFilters.date_filter)
        : true;

      const tagMatch = activeFilters.tag_filter
        ? (item.tags || []).some(t => t.includes(activeFilters.tag_filter))
        : true;

      return searchMatch && categoryMatch && dateMatch && tagMatch;
    })
    .slice(0, 10);

  const showTopSuccessLoader = () => {
    setShowSuccess(true);
    Animated.spring(slideAnim, {
      toValue: Platform.OS === 'android' ? 50 : 60,
      useNativeDriver: true,
      bounciness: 10
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -150,
        duration: 400,
        useNativeDriver: true
      }).start(() => {
        setShowSuccess(false);
        if (onNavigateToNewVisit) onNavigateToNewVisit();
      });
    }, 2000);
  };

  const handleNewVisitPress = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showTopSuccessLoader();
    }, 1500);
  };

  return (
    <LinearGradient colors={colors.bgGradient} style={styles.gradientContainer}>
      <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />

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
            <LinearGradient
              colors={THEME_COLORS.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.newVisitHeaderBtn}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.newVisitBtnText}>New Visit</Text>
              )}
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
              <HistoryCard
                customer={item.customer}
                services={item.services}
                tags={item.tags}
                notes={item.notes}
                photos={item.photos}
                date={item.date}
                time={item.time}
                onPress={() => router.push('/(tabs)/view-history' as any)}
                containerStyle={[styles.cardItem, { borderColor: colors.border }]}
                backgroundColor="#FFFFFF"
              />
              <TouchableOpacity
                style={styles.actionButton}
                onPress={(e) => handleOpenMenu(e, item)}
              >
                <MaterialCommunityIcons name="dots-vertical" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* --- Options Menu Modal --- */}
        <Modal visible={menuVisible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.modalOverlayDimmed}>
              <View style={[styles.menuPopup, { top: menuPosition.top, right: menuPosition.right, backgroundColor: colors.card }]}>
                <TouchableOpacity style={styles.menuItem} onPress={handleViewDetails}>
                  <MaterialCommunityIcons name="eye" size={20} color={colors.textSecondary} />
                  <Text style={[styles.menuText, { color: colors.text }]}>View</Text>
                </TouchableOpacity>
                <View style={styles.menuSeparator} />
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuVisible(false);
                    setEditModalVisible(true);
                  }}
                >
                  <MaterialCommunityIcons name="pencil" size={20} color={colors.primary} />
                  <Text style={[styles.menuText, { color: colors.text }]}>Edit</Text>
                </TouchableOpacity>
                <View style={styles.menuSeparator} />
                <TouchableOpacity style={styles.menuItem} onPress={handleDeleteItem}>
                  <MaterialCommunityIcons name="delete" size={20} color="#EF4444" />
                  <Text style={[styles.menuText, { color: colors.text }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* --- Edit Visit Modal --- */}
        <Modal visible={editModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlayCenterDark}>
            <View style={[styles.editPopup, { backgroundColor: colors.card }]}>
              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <Text style={[styles.editTitle, { color: colors.text }]}>Edit Visit Info</Text>

                {/* Multiple Photo Grid - Similar to NewVisit */}
                <View style={styles.photoGrid}>
                  <TouchableOpacity style={[styles.addPhotoBox, { backgroundColor: colors.background, borderColor: colors.primary }]} onPress={handleImagePick}>
                    <MaterialCommunityIcons name="camera-plus" size={24} color={colors.primary} />
                    <Text style={[styles.addPhotoText, { color: colors.primary }]}>Add Photo</Text>
                  </TouchableOpacity>

                  {tempPhotos.map((uri, i) => (
                    <View key={i} style={styles.imageWrapper}>
                      <Image source={{ uri }} style={styles.uploadedImg} />
                      <TouchableOpacity
                        style={[styles.removeBtn, { backgroundColor: colors.card }]}
                        onPress={() => removeImage(i)}
                      >
                        <Ionicons name="close-circle" size={20} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Client Name</Text>
                  <TextInput
                    style={[styles.inputField, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                    value={tempName}
                    onChangeText={setTempName}
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Phone Number</Text>
                  <TextInput
                    style={[styles.inputField, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                    value={tempPhone}
                    onChangeText={setTempPhone}
                    keyboardType="phone-pad"
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Services (comma separated)</Text>
                  <TextInput
                    style={[styles.inputField, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                    value={tempService}
                    onChangeText={setTempService}
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Tags (comma separated)</Text>
                  <TextInput
                    style={[styles.inputField, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                    value={tempTags}
                    onChangeText={setTempTags}
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Notes</Text>
                  <TextInput
                    style={[styles.inputField, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text, height: 80, textAlignVertical: 'top' }]}
                    value={tempNotes}
                    onChangeText={setTempNotes}
                    multiline={true}
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveBtn} onPress={handleSaveEdit}>
                    <Text style={styles.saveBtnText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

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
      </SafeAreaView>
    </LinearGradient>
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
  newVisitHeaderBtn: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
    minWidth: 85,
    alignItems: 'center',
    justifyContent: 'center'
  },
  newVisitBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13
  },
  searchFixedWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    zIndex: 10
  },
  searchBar: {
    width: '100%',
    marginBottom: 0
  },
  listContent: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  cardOuterWrapper: {
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 15
  },
  cardItem: {
    marginBottom: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2 },
      android: { elevation: 2 }
    })
  },
  actionButton: {
    position: 'absolute',
    right: 15,
    top: 30,
    padding: 10,
    zIndex: 10
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
    gap: 12
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 10
  },
  menuText: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500'
  },
  editPopup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '92%',
    maxHeight: '85%',
    padding: 20,
    elevation: 10
  },
  editTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#1E293B'
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
    justifyContent: 'center'
  },
  addPhotoBox: {
    width: 80,
    height: 80,
    borderWidth: 1.5,
    borderColor: '#5152B3',
    borderStyle: 'dashed',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F3FF'
  },
  addPhotoText: {
    fontSize: 10,
    color: '#5152B3',
    marginTop: 4,
    fontWeight: '700'
  },
  imageWrapper: {
    width: 80,
    height: 80,
    position: 'relative'
  },
  uploadedImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15
  },
  removeBtn: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3
  },
  inputGroup: {
    marginBottom: 12,
    width: '100%'
  },
  inputLabel: {
    color: '#64748B',
    marginBottom: 4,
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 4
  },
  inputField: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#F8FAFC',
    color: '#1E293B'
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 20,
    marginTop: 15,
    paddingBottom: 10
  },
  cancelBtnText: {
    color: '#94A3B8',
    fontWeight: 'bold',
    fontSize: 15
  },
  saveBtn: {
    backgroundColor: '#5152B3',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15
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
    gap: 12
  },
  successTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  successMessage: {
    color: '#E0F2FE',
    fontSize: 12
  },
});

export default History;