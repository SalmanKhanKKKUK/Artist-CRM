import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
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

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];
type IonIconName = React.ComponentProps<typeof Ionicons>['name'];

interface NewVisitProps {
  onBack: () => void;
  onNavigateToWelcome?: () => void;
}

const NewVisit: React.FC<NewVisitProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  
  // States
  const [expandedSection, setExpandedSection] = useState<string | null>('customer');
  const [customerSearch, setCustomerSearch] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Color']);
  const [notes, setNotes] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleServiceToggle = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName) ? prev.filter(s => s !== serviceName) : [...prev, serviceName]
    );
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map(asset => asset.uri);
      setImages(prev => [...prev, ...selectedUris]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <LinearGradient colors={THEME_COLORS.bgGradient} style={styles.gradientContainer}>
      <SafeAreaView style={styles.masterContainer} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        <NavHeader title="Add New Visit !" showProfileIcon={false}>
          <TouchableOpacity onPress={onBack} activeOpacity={0.8}>
            <LinearGradient
              colors={THEME_COLORS.buttonGradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.saveHeaderBtn}
            >
              <Text style={styles.saveBtnText}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>
        </NavHeader>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
          style={styles.flexOne}
        >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.scrollContent, { paddingBottom: 50 + insets.bottom }]}
            keyboardShouldPersistTaps="handled"
          >
            
            {/* 1. CUSTOMER SECTION */}
            <View style={styles.card}>
              <TouchableOpacity style={styles.cardHeader} onPress={() => toggleSection('customer')}>
                <View style={styles.headerTitleRow}>
                  <Ionicons name="person-outline" size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>Customer</Text>
                </View>
                <Ionicons name={(expandedSection === 'customer' ? "chevron-up" : "chevron-down") as IonIconName} size={20} color="#94A3B8" />
              </TouchableOpacity>
              
              {expandedSection === 'customer' && (
                <View style={styles.cardBody}>
                  <Input
                    value={customerSearch}
                    onChangeText={(val: string) => setCustomerSearch(val)}
                    placeholder="Select customer..."
                    leftIcon="account-search"
                    containerStyle={styles.fullWidthInput}
                    variant="outlined"
                  />
                  <TouchableOpacity style={styles.addLink}>
                    <Text style={styles.addLinkText}>+ Add New Customer</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* 2. SERVICES SECTION */}
            <View style={styles.card}>
              <TouchableOpacity style={styles.cardHeader} onPress={() => toggleSection('services')}>
                <View style={styles.headerTitleRow}>
                  <MaterialCommunityIcons name={"content-cut" as MaterialIconName} size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>Services</Text>
                </View>
                <Ionicons name={(expandedSection === 'services' ? "chevron-up" : "chevron-down") as IonIconName} size={20} color="#94A3B8" />
              </TouchableOpacity>
              
              {expandedSection === 'services' && (
                <View style={styles.cardBody}>
                  {['Haircut', 'Hair Coloring', 'Styling', 'Treatment'].map((item) => {
                    const isSelected = selectedServices.includes(item);
                    return (
                      <TouchableOpacity key={item} style={styles.serviceItem} onPress={() => handleServiceToggle(item)}>
                        <MaterialCommunityIcons 
                          name={isSelected ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"} 
                          size={24} 
                          color={isSelected ? "#5152B3" : "#CBD5E1"} 
                        />
                        <Text style={[styles.serviceText, isSelected && styles.selectedText]}>{item}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>

            {/* 3. TAGS SECTION */}
            <View style={styles.card}>
              <TouchableOpacity style={styles.cardHeader} onPress={() => toggleSection('tags')}>
                <View style={styles.headerTitleRow}>
                  <MaterialCommunityIcons name="tag-outline" size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>Tags</Text>
                </View>
                <Ionicons name={(expandedSection === 'tags' ? "chevron-up" : "chevron-down") as IonIconName} size={20} color="#94A3B8" />
              </TouchableOpacity>
              
              {expandedSection === 'tags' && (
                <View style={styles.cardBody}>
                  <TextInput style={styles.tagInput} placeholder="Add custom tags..." placeholderTextColor="#94A3B8" />
                  <View style={styles.tagsRow}>
                    {['Bleach', 'Toner', 'Color', 'Style'].map(t => {
                      const isSelected = selectedTags.includes(t);
                      return (
                        <TouchableOpacity 
                          key={t} 
                          style={[styles.tagBadge, isSelected && styles.selectedTagBadge]} 
                          onPress={() => handleTagToggle(t)}
                        >
                          <Text style={[styles.tagBadgeText, isSelected && styles.selectedTagBadgeText]}>{t}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}
            </View>

            {/* 4. NOTES SECTION */}
            <View style={styles.card}>
              <TouchableOpacity style={styles.cardHeader} onPress={() => toggleSection('notes')}>
                <View style={styles.headerTitleRow}>
                  <MaterialCommunityIcons name="notebook-outline" size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>Notes</Text>
                </View>
                <Ionicons name={(expandedSection === 'notes' ? "chevron-up" : "chevron-down") as IonIconName} size={20} color="#94A3B8" />
              </TouchableOpacity>
              
              {expandedSection === 'notes' && (
                <View style={styles.cardBody}>
                  <TextInput
                    style={styles.textArea}
                    placeholder="Write Technical Formulas / Notes..."
                    multiline
                    value={notes}
                    onChangeText={(val: string) => setNotes(val)}
                  />
                </View>
              )}
            </View>

            {/* 5. VISIT PHOTOS SECTION */}
            <View style={styles.card}>
              <TouchableOpacity style={styles.cardHeader} onPress={() => toggleSection('photos')}>
                <View style={styles.headerTitleRow}>
                  <Ionicons name="images-outline" size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>Visit Photos</Text>
                </View>
                <Ionicons name={(expandedSection === 'photos' ? "chevron-up" : "chevron-down") as IonIconName} size={20} color="#94A3B8" />
              </TouchableOpacity>
              
              {expandedSection === 'photos' && (
                <View style={styles.cardBody}>
                  <View style={styles.photoGrid}>
                    <TouchableOpacity style={styles.addPhotoBox} onPress={handleImagePick}>
                      <MaterialCommunityIcons name="camera-plus" size={30} color="#5152B3" />
                      <Text style={styles.addPhotoText}>Add Photo</Text>
                    </TouchableOpacity>
                    {images.map((uri, index) => (
                      <View key={index} style={styles.imageWrapper}>
                        <Image source={{ uri }} style={styles.uploadedImg} />
                        <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(index)}>
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
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  serviceText: {
    fontSize: 15,
    color: '#475569',
    fontWeight: '500',
  },
  selectedText: {
    color: '#1E293B',
    fontWeight: '700',
  },
});

export default NewVisit;