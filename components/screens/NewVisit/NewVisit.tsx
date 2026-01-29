import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useRef } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  LayoutAnimation,
  UIManager,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME_COLORS } from '@/constants/Colors';
import { useRouter } from 'expo-router';

import NavHeader from '../../common/Buttons/NavHeader';
import Input from '../../common/Inputs/Input';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');
type IonIconName = React.ComponentProps<typeof Ionicons>['name'];

interface Customer {
  id: string;
  name: string;
  phone: string;
}

interface NewVisitProps {
  onBack: () => void;
  onNavigateToWelcome?: () => void;
}

const CUSTOMERS_DATA: Customer[] = [
  { id: '1', name: 'Ahmad Ali', phone: '0300-1234567' },
  { id: '2', name: 'Sara Khan', phone: '0312-7654321' },
  { id: '3', name: 'Zeenat Malik', phone: '0345-1122334' },
  { id: '4', name: 'Hamza Sheikh', phone: '0321-9988776' },
  { id: '5', name: 'Danish Ahmed', phone: '0333-5544332' },
];

const NewVisit: React.FC<NewVisitProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // --- Main Sections State ---
  const [expandedSection, setExpandedSection] = useState<string | null>('customer');

  // --- Customer States ---
  const [customerSearch, setCustomerSearch] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // --- Services States ---
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceSearch, setServiceSearch] = useState<string>('');
  const [allServices, setAllServices] = useState<string[]>(['Haircut', 'Hair Coloring', 'Styling', 'Treatment', 'Shaving', 'Facial']);

  // --- Tags States ---
  const [selectedTags, setSelectedTags] = useState<string[]>(['Color']);
  const [tagSearch, setTagSearch] = useState<string>('');
  const [allTags, setAllTags] = useState<string[]>(['Bleach', 'Toner', 'Color', 'Style', 'Premium']);

  // --- Notes & Photos States ---
  const [notes, setNotes] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);

  // --- UI States ---
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(-150)).current;

  // --- Filter Functions ---
  const filteredCustomers = CUSTOMERS_DATA.filter(c =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.phone.includes(customerSearch)
  );

  const filteredServices = allServices.filter(s =>
    s.toLowerCase().includes(serviceSearch.toLowerCase()) && !selectedServices.includes(s)
  );

  const filteredTags = allTags.filter(t =>
    t.toLowerCase().includes(tagSearch.toLowerCase()) && !selectedTags.includes(t)
  );

  // --- Handlers ---
  const toggleSection = (section: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleAddItem = (val: string, type: 'service' | 'tag') => {
    const trimmedVal = val.trim();
    if (!trimmedVal) return;
    
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (type === 'service') {
      if (!selectedServices.includes(trimmedVal)) {
        setSelectedServices([...selectedServices, trimmedVal]);
        if (!allServices.includes(trimmedVal)) {
          setAllServices([...allServices, trimmedVal]);
        }
      }
      setServiceSearch('');
    } else {
      if (!selectedTags.includes(trimmedVal)) {
        setSelectedTags([...selectedTags, trimmedVal]);
        if (!allTags.includes(trimmedVal)) {
          setAllTags([...allTags, trimmedVal]);
        }
      }
      setTagSearch('');
    }
  };

  const removeChip = (val: string, type: 'service' | 'tag') => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (type === 'service') {
      setSelectedServices(selectedServices.filter(s => s !== val));
    } else {
      setSelectedTags(selectedTags.filter(t => t !== val));
    }
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showTopSuccessLoader();
    }, 1500);
  };

  const showTopSuccessLoader = () => {
    setShowSuccess(true);
    Animated.spring(slideAnim, { toValue: 60, useNativeDriver: true, bounciness: 10 }).start();
    setTimeout(() => {
      Animated.timing(slideAnim, { toValue: -150, duration: 400, useNativeDriver: true }).start(() => {
        setShowSuccess(false);
        onBack();
      });
    }, 2000);
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsMultipleSelection: true 
    });
    if (!result.canceled) {
      setImages(prev => [...prev, ...result.assets.map(a => a.uri)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <LinearGradient colors={THEME_COLORS.bgGradient} style={styles.gradientContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {showSuccess && (
        <Animated.View style={[styles.successNotification, { transform: [{ translateY: slideAnim }] }]}>
          <MaterialCommunityIcons name="check-circle" size={24} color="#FFFFFF" />
          <View>
            <Text style={styles.successTitle}>Success!</Text>
            <Text style={styles.successMessage}>Visit details saved successfully.</Text>
          </View>
        </Animated.View>
      )}

      <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
        <NavHeader title="Add New Visit !" showProfileIcon={false}>
          <TouchableOpacity onPress={handleSave} activeOpacity={0.8} disabled={loading}>
            <LinearGradient colors={THEME_COLORS.buttonGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.saveHeaderBtn}>
              {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.saveBtnText}>Save</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </NavHeader>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flexOne}>
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={[styles.scrollContent, { paddingBottom: 50 + insets.bottom }]} 
            keyboardShouldPersistTaps="handled"
          >
            
            {/* 1. CUSTOMER SECTION - UNCHANGED */}
            <View style={[styles.card, { zIndex: 3000 }]}>
              <TouchableOpacity style={styles.cardHeader} onPress={() => toggleSection('customer')}>
                <View style={styles.headerTitleRow}>
                  <Ionicons name="person-outline" size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>Customer</Text>
                </View>
                <Ionicons name={(expandedSection === 'customer' ? 'chevron-up' : 'chevron-down') as IonIconName} size={20} color="#94A3B8" />
              </TouchableOpacity>
              {expandedSection === 'customer' && (
                <View style={styles.cardBody}>
                  <View style={styles.inputWrapper}>
                    <Input value={customerSearch} onChangeText={(val: string) => { setCustomerSearch(val); if (selectedCustomer) setSelectedCustomer(null); }} placeholder="Search by name or phone..." leftIcon="account-search" variant="outlined" />
                    {customerSearch.length > 0 && !selectedCustomer && filteredCustomers.length > 0 && (
                      <View style={styles.dropdownMenu}>
                        <ScrollView style={{ maxHeight: 200 }} keyboardShouldPersistTaps="handled">
                          {filteredCustomers.map(c => (
                            <TouchableOpacity key={c.id} style={styles.suggestionItem} onPress={() => { setSelectedCustomer(c); setCustomerSearch(c.name); }}>
                              <MaterialCommunityIcons name="account-circle" size={22} color="#64748B" />
                              <View><Text style={styles.itemTitle}>{c.name}</Text><Text style={styles.itemSub}>{c.phone}</Text></View>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                  {selectedCustomer && (
                    <View style={styles.selectedBadge}>
                      <Ionicons name="checkmark-circle" size={18} color="#10B981" />
                      <Text style={styles.selectedBadgeText}>Selected: {selectedCustomer.name}</Text>
                      <TouchableOpacity onPress={() => setSelectedCustomer(null)} style={{ marginLeft: 'auto' }}><Ionicons name="close-circle" size={18} color="#64748B" /></TouchableOpacity>
                    </View>
                  )}
                  <TouchableOpacity style={styles.addLink} onPress={() => router.push('/(tabs)/add-clients' as any)}><Text style={styles.addLinkText}>+ Add New Customer</Text></TouchableOpacity>
                </View>
              )}
            </View>

            {/* 2. SERVICES SECTION - NO FIXED TITLES, SEARCH & ADD ONLY */}
            <View style={[styles.card, { zIndex: 2000 }]}>
              <TouchableOpacity style={styles.cardHeader} onPress={() => toggleSection('services')}>
                <View style={styles.headerTitleRow}>
                  <MaterialCommunityIcons name="content-cut" size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>Services</Text>
                </View>
                <Ionicons name={(expandedSection === 'services' ? 'chevron-up' : 'chevron-down') as IonIconName} size={20} color="#94A3B8" />
              </TouchableOpacity>
              {expandedSection === 'services' && (
                <View style={styles.cardBody}>
                  <View style={styles.chipsRow}>
                    {selectedServices.map(s => (
                      <TouchableOpacity key={s} style={styles.chip} onPress={() => removeChip(s, 'service')}><Text style={styles.chipText}>{s} ✕</Text></TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.inputWrapper}>
                    <Input value={serviceSearch} onChangeText={setServiceSearch} placeholder="Search or add service..." leftIcon="plus-circle-outline" variant="outlined" />
                    {serviceSearch.length > 0 && (
                      <View style={styles.dropdownMenu}>
                        <TouchableOpacity style={styles.suggestionItem} onPress={() => handleAddItem(serviceSearch, 'service')}>
                          <Ionicons name="add-circle" size={22} color="#5152B3" />
                          <Text style={styles.itemTitle}>Add {serviceSearch}</Text>
                        </TouchableOpacity>
                        {filteredServices.map(s => (
                          <TouchableOpacity key={s} style={styles.suggestionItem} onPress={() => handleAddItem(s, 'service')}><Text style={styles.itemTitle}>{s}</Text></TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>

            {/* 3. TAGS SECTION - NO FIXED TITLES, SEARCH & ADD ONLY */}
            <View style={[styles.card, { zIndex: 1000 }]}>
              <TouchableOpacity style={styles.cardHeader} onPress={() => toggleSection('tags')}>
                <View style={styles.headerTitleRow}>
                  <MaterialCommunityIcons name="tag-outline" size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>Tags</Text>
                </View>
                <Ionicons name={(expandedSection === 'tags' ? 'chevron-up' : 'chevron-down') as IonIconName} size={20} color="#94A3B8" />
              </TouchableOpacity>
              {expandedSection === 'tags' && (
                <View style={styles.cardBody}>
                  <View style={styles.chipsRow}>
                    {selectedTags.map(t => (
                      <TouchableOpacity key={t} style={[styles.chip, styles.tagChip]} onPress={() => removeChip(t, 'tag')}><Text style={[styles.chipText, styles.tagChipText]}>{t} ✕</Text></TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.inputWrapper}>
                    <Input value={tagSearch} onChangeText={setTagSearch} placeholder="Add custom tags..." leftIcon="tag-plus-outline" variant="outlined" />
                    {tagSearch.length > 0 && (
                      <View style={styles.dropdownMenu}>
                        <TouchableOpacity style={styles.suggestionItem} onPress={() => handleAddItem(tagSearch, 'tag')}>
                          <Ionicons name="add-circle" size={22} color="#5152B3" />
                          <Text style={styles.itemTitle}>Add {tagSearch}</Text>
                        </TouchableOpacity>
                        {filteredTags.map(t => (
                          <TouchableOpacity key={t} style={styles.suggestionItem} onPress={() => handleAddItem(t, 'tag')}><Text style={styles.itemTitle}>{t}</Text></TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>

            {/* 4. NOTES SECTION - UNCHANGED */}
            <View style={styles.card}>
              <TouchableOpacity style={styles.cardHeader} onPress={() => toggleSection('notes')}>
                <View style={styles.headerTitleRow}><MaterialCommunityIcons name="notebook-outline" size={20} color="#5152B3" /><Text style={styles.cardTitle}>Notes</Text></View>
                <Ionicons name={(expandedSection === 'notes' ? 'chevron-up' : 'chevron-down') as IonIconName} size={20} color="#94A3B8" />
              </TouchableOpacity>
              {expandedSection === 'notes' && <View style={styles.cardBody}><TextInput style={styles.textArea} placeholder="Technical formulas/Notes..." placeholderTextColor="#94A3B8" multiline value={notes} onChangeText={setNotes} /></View>}
            </View>

            {/* 5. PHOTOS SECTION - UNCHANGED */}
            <View style={styles.card}>
              <TouchableOpacity style={styles.cardHeader} onPress={() => toggleSection('photos')}>
                <View style={styles.headerTitleRow}><Ionicons name="images-outline" size={20} color="#5152B3" /><Text style={styles.cardTitle}>Visit Photos</Text></View>
                <Ionicons name={(expandedSection === 'photos' ? 'chevron-up' : 'chevron-down') as IonIconName} size={20} color="#94A3B8" />
              </TouchableOpacity>
              {expandedSection === 'photos' && (
                <View style={styles.cardBody}>
                  <View style={styles.photoGrid}>
                    <TouchableOpacity style={styles.addPhotoBox} onPress={handleImagePick}><MaterialCommunityIcons name="camera-plus" size={30} color="#5152B3" /><Text style={styles.addPhotoText}>Add Photo</Text></TouchableOpacity>
                    {images.map((uri, i) => (
                      <View key={i} style={styles.imageWrapper}><Image source={{ uri }} style={styles.uploadedImg} /><TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(i)}><Ionicons name="close-circle" size={20} color="#EF4444" /></TouchableOpacity></View>
                    ))}
                  </View>
                </View>
              )}
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
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
  flexOne: { 
    flex: 1 
  },
  scrollContent: { 
    paddingHorizontal: 20, 
    paddingTop: 10 
  },
  saveHeaderBtn: { 
    paddingHorizontal: 20, 
    paddingVertical: 6, 
    borderRadius: 20, 
    elevation: 3 
  },
  saveBtnText: { 
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  card: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#F1F5F9',
    elevation: 2 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 18, 
    alignItems: 'center' 
  },
  headerTitleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12 
  },
  cardTitle: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#1E293B' 
  },
  cardBody: { 
    padding: 18, 
    paddingTop: 0, 
    borderTopWidth: 1, 
    borderTopColor: '#F8FAFC' 
  },
  inputWrapper: { 
    position: 'relative', 
    width: '100%', 
    marginTop: 10 
  },
  dropdownMenu: { 
    position: 'absolute', 
    top: 60, 
    left: 0, 
    right: 0, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 15, 
    elevation: 8, 
    zIndex: 9999, 
    borderWidth: 1, 
    borderColor: '#E2E8F0', 
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1 
  },
  suggestionItem: { 
    padding: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F1F5F9', 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10 
  },
  itemTitle: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#1E293B' 
  },
  itemSub: { 
    fontSize: 12, 
    color: '#64748B' 
  },
  chipsRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 8, 
    marginVertical: 10 
  },
  chip: { 
    backgroundColor: '#F5F3FF', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#DDD6FE', 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  chipText: { 
    color: '#5152B3', 
    fontSize: 12, 
    fontWeight: '600' 
  },
  tagChip: { 
    backgroundColor: '#F1F5F9', 
    borderColor: '#E2E8F0' 
  },
  tagChipText: { 
    color: '#64748B' 
  },
  selectedBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#ECFDF5', 
    padding: 10, 
    borderRadius: 10, 
    marginTop: 10, 
    gap: 8 
  },
  selectedBadgeText: { 
    fontSize: 13, 
    color: '#065F46', 
    fontWeight: '600' 
  },
  addLink: { 
    marginTop: 12 
  },
  addLinkText: { 
    color: '#5152B3', 
    fontSize: 13, 
    fontWeight: '700' 
  },
  textArea: { 
    borderWidth: 1, 
    borderColor: '#E2E8F0', 
    borderRadius: 15, 
    padding: 15, 
    height: 120, 
    textAlignVertical: 'top', 
    marginTop: 12,
    backgroundColor: '#F8FAFC',
    fontSize: 14,
    color: '#334155' 
  },
  photoGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 12, 
    marginTop: 15 
  },
  addPhotoBox: { 
    width: (width - 100) / 2, 
    height: 110, 
    borderWidth: 1.5, 
    borderColor: '#5152B3', 
    borderStyle: 'dashed', 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#F5F3FF' 
  },
  addPhotoText: { 
    fontSize: 13, 
    color: '#5152B3', 
    marginTop: 8, 
    fontWeight: '700' 
  },
  imageWrapper: { 
    width: (width - 100) / 2, 
    height: 110, 
    position: 'relative' 
  },
  uploadedImg: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 18 
  },
  removeBtn: { 
    position: 'absolute', 
    top: -6, 
    right: -6, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    elevation: 3 
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
});

export default NewVisit;