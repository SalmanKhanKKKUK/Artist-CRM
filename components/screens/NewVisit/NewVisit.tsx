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

import NavHeader from '../../common/Buttons/NavHeader';
import Input from '../../common/Inputs/Input';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

type IonIconName = React.ComponentProps<typeof Ionicons>['name'];

interface NewVisitProps {
  onBack: () => void;
  onNavigateToWelcome?: () => void;
}

const CUSTOMERS_DATA = [
  { id: '1', name: 'Ahmad Ali', phone: '0300-1234567' },
  { id: '2', name: 'Sara Khan', phone: '0312-7654321' },
  { id: '3', name: 'Zeenat Malik', phone: '0345-1122334' },
  { id: '4', name: 'Hamza Sheikh', phone: '0321-9988776' },
  { id: '5', name: 'Danish Ahmed', phone: '0333-5544332' },
];

const NewVisit: React.FC<NewVisitProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  
  // States
  const [expandedSection, setExpandedSection] = useState<string | null>('customer');
  const [customerSearch, setCustomerSearch] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceInput, setServiceInput] = useState<string>('');
  const [showAllServices, setShowAllServices] = useState<boolean>(false);
  
  const [selectedTags, setSelectedTags] = useState<string[]>(['Color']);
  const [tagInput, setTagInput] = useState<string>('');
  const [showAllTags, setShowAllTags] = useState<boolean>(false);
  
  const [notes, setNotes] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  
  // UI Animation States
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(-150)).current;

  const allServicesList = [
    'Haircut', 
    'Hair Coloring', 
    'Styling', 
    'Treatment', 
    'Shaving', 
    'Facial'
  ];

  const allTagsList = [
    'Bleach', 
    'Toner', 
    'Color', 
    'Style', 
    'Premium'
  ];

  const filteredCustomers = CUSTOMERS_DATA.filter(c => 
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
    c.phone.includes(customerSearch)
  );

  const toggleSection = (section: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleServiceToggle = (serviceName: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName) 
        : [...prev, serviceName]
    );
  };

  const addCustomService = () => {
    const trimmed = serviceInput.trim();
    if (trimmed && !selectedServices.includes(trimmed)) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setSelectedServices(prev => [...prev, trimmed]);
      setServiceInput('');
    }
  };

  const handleTagToggle = (tag: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const addCustomTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setSelectedTags(prev => [...prev, trimmed]);
      setTagInput('');
    }
  };

  const showTopSuccessLoader = () => {
    setShowSuccess(true);
    Animated.spring(slideAnim, {
      toValue: Platform.OS === 'android' ? 50 : 60,
      useNativeDriver: true,
      bounciness: 10,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -150,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setShowSuccess(false);
        onBack();
      });
    }, 2000);
  };

  const handleSave = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showTopSuccessLoader();
    }, 1500);
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      setImages(prev => [...prev, ...result.assets.map(asset => asset.uri)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <LinearGradient 
      colors={THEME_COLORS.bgGradient} 
      style={styles.gradientContainer}
    >
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent 
      />

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
            <Text style={styles.successMessage}>Visit details saved successfully.</Text>
          </View>
        </Animated.View>
      )}

      <SafeAreaView 
        style={styles.masterContainer} 
        edges={['bottom']}
      >
        <NavHeader title="Add New Visit !" showProfileIcon={false}>
          <TouchableOpacity 
            onPress={handleSave} 
            activeOpacity={0.8} 
            disabled={loading}
          >
            <LinearGradient
              colors={THEME_COLORS.buttonGradient}
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 0 }}
              style={styles.saveHeaderBtn}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.saveBtnText}>Save</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </NavHeader>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
          style={styles.flexOne}
        >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent, 
              { paddingBottom: 50 + insets.bottom }
            ]}
            keyboardShouldPersistTaps="handled"
          >
            
            {/* 1. CUSTOMER SECTION */}
            <View style={styles.card}>
              <TouchableOpacity 
                style={styles.cardHeader} 
                onPress={() => toggleSection('customer')}
              >
                <View style={styles.headerTitleRow}>
                  <Ionicons name="person-outline" size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>Customer</Text>
                </View>
                <Ionicons 
                  name={(expandedSection === 'customer' ? "chevron-up" : "chevron-down") as IonIconName} 
                  size={20} 
                  color="#94A3B8" 
                />
              </TouchableOpacity>
              
              {expandedSection === 'customer' && (
                <View style={styles.cardBody}>
                  <Input
                    value={customerSearch}
                    onChangeText={(val: string) => {
                      setCustomerSearch(val);
                      if(selectedCustomer) setSelectedCustomer(null);
                    }}
                    placeholder="Search by name or phone..."
                    leftIcon="account-search"
                    containerStyle={styles.fullWidthInput}
                    variant="outlined"
                  />
                  {customerSearch.length > 0 && !selectedCustomer && (
                    <View style={styles.suggestionBox}>
                      {filteredCustomers.map((c) => (
                        <TouchableOpacity 
                          key={c.id} 
                          style={styles.suggestionItem} 
                          onPress={() => { 
                            setSelectedCustomer(c); 
                            setCustomerSearch(c.name); 
                          }}
                        >
                          <MaterialCommunityIcons name="account-circle" size={22} color="#64748B" />
                          <View>
                            <Text style={styles.customerNameText}>{c.name}</Text>
                            <Text style={styles.customerPhoneText}>{c.phone}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  {selectedCustomer && (
                    <View style={styles.selectedCustomerBadge}>
                      <Ionicons name="checkmark-circle" size={18} color="#10B981" />
                      <Text style={styles.selectedCustomerText}>Selected: {selectedCustomer.name}</Text>
                    </View>
                  )}
                  <TouchableOpacity style={styles.addLink}>
                    <Text style={styles.addLinkText}>+ Add New Customer</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* 2. SERVICES SECTION - Fixed to behave like Tags */}
            <View style={styles.card}>
              <TouchableOpacity 
                style={styles.cardHeader} 
                onPress={() => toggleSection('services')}
              >
                <View style={styles.headerTitleRow}>
                  <MaterialCommunityIcons name="content-cut" size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>Services</Text>
                </View>
                <Ionicons 
                  name={(expandedSection === 'services' ? "chevron-up" : "chevron-down") as IonIconName} 
                  size={20} 
                  color="#94A3B8" 
                />
              </TouchableOpacity>
              
              {expandedSection === 'services' && (
                <View style={styles.cardBody}>
                  {/* Selected Services - Tag Style row */}
                  <View style={styles.tagsRow}>
                    {selectedServices.map(s => (
                      <TouchableOpacity 
                        key={s} 
                        style={[styles.tagBadge, styles.selectedTagBadge]} 
                        onPress={() => handleServiceToggle(s)}
                      >
                        <Text style={[styles.tagBadgeText, styles.selectedTagBadgeText]}>
                          {s} ✕
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <TextInput 
                    style={styles.tagInput} 
                    placeholder="Search or add service..." 
                    placeholderTextColor="#94A3B8"
                    value={serviceInput}
                    onChangeText={setServiceInput}
                    onSubmitEditing={addCustomService}
                  />
                  
                  <View style={styles.tagsRow}>
                    {(showAllServices ? allServicesList : allServicesList.slice(0, 5)).map((item) => {
                      if (selectedServices.includes(item)) return null;
                      return (
                        <TouchableOpacity 
                          key={item} 
                          style={styles.tagBadge} 
                          onPress={() => handleServiceToggle(item)}
                        >
                          <Text style={styles.tagBadgeText}>{item}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  
                  <TouchableOpacity 
                    onPress={() => setShowAllServices(!showAllServices)} 
                    style={styles.viewMoreBtn}
                  >
                    <Text style={styles.addLinkText}>
                      {showAllServices ? "- View Less" : "+ View More Services"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* 3. TAGS SECTION */}
            <View style={styles.card}>
              <TouchableOpacity 
                style={styles.cardHeader} 
                onPress={() => toggleSection('tags')}
              >
                <View style={styles.headerTitleRow}>
                  <MaterialCommunityIcons name="tag-outline" size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>Tags</Text>
                </View>
                <Ionicons 
                  name={(expandedSection === 'tags' ? "chevron-up" : "chevron-down") as IonIconName} 
                  size={20} 
                  color="#94A3B8" 
                />
              </TouchableOpacity>
              
              {expandedSection === 'tags' && (
                <View style={styles.cardBody}>
                  <View style={styles.tagsRow}>
                    {selectedTags.map(t => (
                      <TouchableOpacity 
                        key={t} 
                        style={[styles.tagBadge, styles.selectedTagBadge]} 
                        onPress={() => handleTagToggle(t)}
                      >
                        <Text style={[styles.tagBadgeText, styles.selectedTagBadgeText]}>
                          {t} ✕
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <TextInput 
                    style={styles.tagInput} 
                    placeholder="Add custom tags..." 
                    placeholderTextColor="#94A3B8" 
                    value={tagInput} 
                    onChangeText={setTagInput} 
                    onSubmitEditing={addCustomTag} 
                  />
                  <View style={styles.tagsRow}>
                    {(showAllTags ? allTagsList : allTagsList.slice(0, 5)).map(t => {
                      if (selectedTags.includes(t)) return null;
                      return (
                        <TouchableOpacity 
                          key={t} 
                          style={styles.tagBadge} 
                          onPress={() => handleTagToggle(t)}
                        >
                          <Text style={styles.tagBadgeText}>{t}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <TouchableOpacity 
                    onPress={() => setShowAllTags(!showAllTags)} 
                    style={styles.viewMoreBtn}
                  >
                    <Text style={styles.addLinkText}>
                      {showAllTags ? "- Show Less" : "+ Show More Tags"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* 4. NOTES SECTION */}
            <View style={styles.card}>
              <TouchableOpacity 
                style={styles.cardHeader} 
                onPress={() => toggleSection('notes')}
              >
                <View style={styles.headerTitleRow}>
                  <MaterialCommunityIcons name="notebook-outline" size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>Notes</Text>
                </View>
                <Ionicons 
                  name={(expandedSection === 'notes' ? "chevron-up" : "chevron-down") as IonIconName} 
                  size={20} 
                  color="#94A3B8" 
                />
              </TouchableOpacity>
              {expandedSection === 'notes' && (
                <View style={styles.cardBody}>
                  <TextInput 
                    style={styles.textArea} 
                    placeholder="Write Technical Formulas / Notes..." 
                    multiline 
                    value={notes} 
                    onChangeText={setNotes} 
                  />
                </View>
              )}
            </View>

            {/* 5. VISIT PHOTOS SECTION */}
            <View style={styles.card}>
              <TouchableOpacity 
                style={styles.cardHeader} 
                onPress={() => toggleSection('photos')}
              >
                <View style={styles.headerTitleRow}>
                  <Ionicons name="images-outline" size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>Visit Photos</Text>
                </View>
                <Ionicons 
                  name={(expandedSection === 'photos' ? "chevron-up" : "chevron-down") as IonIconName} 
                  size={20} 
                  color="#94A3B8" 
                />
              </TouchableOpacity>
              {expandedSection === 'photos' && (
                <View style={styles.cardBody}>
                  <View style={styles.photoGrid}>
                    <TouchableOpacity 
                      style={styles.addPhotoBox} 
                      onPress={handleImagePick}
                    >
                      <MaterialCommunityIcons name="camera-plus" size={30} color="#5152B3" />
                      <Text style={styles.addPhotoText}>Add Photo</Text>
                    </TouchableOpacity>
                    {images.map((uri, index) => (
                      <View key={index} style={styles.imageWrapper}>
                        <Image source={{ uri }} style={styles.uploadedImg} />
                        <TouchableOpacity 
                          style={styles.removeBtn} 
                          onPress={() => removeImage(index)}
                        >
                          <Ionicons name="close-circle" size={20} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  saveHeaderBtn: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#FFFFFF',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  cardBody: {
    padding: 18,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  fullWidthInput: {
    width: '100%',
    marginTop: 10,
  },
  suggestionBox: {
    marginTop: 5,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    maxHeight: 180,
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  customerNameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  customerPhoneText: {
    fontSize: 12,
    color: '#64748B',
  },
  selectedCustomerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    gap: 8,
  },
  selectedCustomerText: {
    fontSize: 13,
    color: '#065F46',
    fontWeight: '600',
  },
  addLink: {
    marginTop: 12,
    marginLeft: 5,
  },
  addLinkText: {
    color: '#5152B3',
    fontSize: 13,
    fontWeight: '700',
  },
  tagInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 15,
    padding: 12,
    fontSize: 14,
    color: '#334155',
    marginTop: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 15,
  },
  tagBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedTagBadge: {
    backgroundColor: '#F5F3FF',
    borderColor: '#5152B3',
  },
  tagBadgeText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  selectedTagBadgeText: {
    color: '#5152B3',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 15,
    padding: 15,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#334155',
    marginTop: 12,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 15,
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
    backgroundColor: '#F5F3FF',
  },
  addPhotoText: {
    fontSize: 13,
    color: '#5152B3',
    marginTop: 8,
    fontWeight: '700',
  },
  imageWrapper: {
    width: (width - 100) / 2,
    height: 110,
    position: 'relative',
  },
  uploadedImg: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
  },
  viewMoreBtn: {
    marginTop: 10,
    alignSelf: 'center',
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

export default NewVisit;