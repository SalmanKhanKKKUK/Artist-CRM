import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Switch,
  Modal,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import { THEME_COLORS } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import NavHeader from '../../common/Buttons/NavHeader';
import Input from '../../common/Inputs/Input';

const Notifications: React.FC = () => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // --- UI States ---
  const [showFeature, setShowFeature] = useState(true);
  const [isFeatureContentVisible, setIsFeatureContentVisible] = useState(true);
  
  // --- Form States ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState<string[]>([]);

  // --- Modal States ---
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'delete' | 'success' | 'error'>('success');

  // Screen focus logic to ensure card is visible
  useFocusEffect(
    useCallback(() => {
      setShowFeature(true);
      setIsFeatureContentVisible(true);
    }, [])
  );

  // --- Image Picker Functionality ---
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    
    if (!result.canceled) {
      const selectedUris = result.assets.map(asset => asset.uri);
      setImages([...images, ...selectedUris]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // --- Action Handlers ---
  const openDeleteModal = () => {
    setModalType('delete');
    setIsModalVisible(true);
  };

  const handleSubmit = () => {
    // Validation Check: If fields are empty
    if (!name.trim() || !email.trim()) {
      setModalType('error');
      setIsModalVisible(true);
    } else {
      setModalType('success');
      setIsModalVisible(true);
    }
  };

  const handleModalConfirm = () => {
    if (modalType === 'delete') {
      setShowFeature(false);
    } else if (modalType === 'success') {
      // Clear form on success
      setName("");
      setEmail("");
      setImages([]);
    }
    setIsModalVisible(false);
  };

  return (
    <LinearGradient colors={colors.bgGradient} style={styles.gradientContainer}>
      <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
        <StatusBar 
          barStyle={isDark ? "light-content" : "dark-content"} 
          backgroundColor="transparent" 
          translucent 
        />

        <NavHeader 
          title="Supports !" 
          showProfileIcon={false} 
          titleColor={isDark ? "#FFFFFF" : "#5152B3"} 
        />

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={[styles.scrollBody, { paddingBottom: insets.bottom + 50 }]}
          keyboardShouldPersistTaps="handled"
        >
          
          {/* Section 1: Queries Header */}
          <View style={styles.headerSection}>
            <Text style={[styles.queriesTitle, { color: colors.text }]}>Your Queries</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
              <Text style={styles.issueLink}>
                Are you facing any issue or want more about app?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Section 2: Submit Button */}
          <View style={styles.submitButtonRow}>
            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
              <LinearGradient
                colors={THEME_COLORS.buttonGradient}
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 0 }}
                style={styles.roundedBtn}
              >
                <Text style={styles.btnText}>Submit Request</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Section 3: New Feature Card */}
          {showFeature && (
            <View style={[styles.featureCard, { 
              backgroundColor: isDark ? "#1e293b" : "#FFFFFF", 
              borderColor: colors.border 
            }]}>
              <View style={styles.cardInternalFlex}>
                <View style={styles.cardContentSide}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>New Feature</Text>
                  
                  {isFeatureContentVisible ? (
                    <View style={styles.descWrapper}>
                      <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>• Automatic performance tracking.</Text>
                      <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>• Instant premium alerts.</Text>
                    </View>
                  ) : (
                    <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>Description hidden.</Text>
                  )}
                </View>

                {/* Icons: Toggle Top, Delete Bottom */}
                <View style={styles.iconVerticalStack}>
                  <TouchableOpacity onPress={() => setIsFeatureContentVisible(!isFeatureContentVisible)}>
                    <MaterialCommunityIcons 
                      name={isFeatureContentVisible ? "eye-outline" : "eye-off-outline"} 
                      size={22} 
                      color={isDark ? "#FFFFFF" : colors.primary} 
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={openDeleteModal}>
                    <MaterialCommunityIcons name="delete-outline" size={22} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Section 4: Form Fields */}
          <View style={[styles.formCard, { 
            backgroundColor: isDark ? "#1e293b" : "#FFFFFF", 
            borderColor: colors.border 
          }]}>
             <Text style={[styles.inputLabel, { color: colors.text }]}>Name</Text>
             <Input 
                value={name} 
                onChangeText={setName} 
                placeholder="Enter name" 
                backgroundColor={isDark ? "#0f172a" : "#F8FAFC"} 
                borderColor={colors.border} 
                containerStyle={styles.fieldMargin} 
              />

             <Text style={[styles.inputLabel, { color: colors.text }]}>Email Address</Text>
             <Input 
                value={email} 
                onChangeText={setEmail} 
                placeholder="Enter email" 
                backgroundColor={isDark ? "#0f172a" : "#F8FAFC"} 
                borderColor={colors.border} 
                containerStyle={styles.fieldMargin} 
              />

             <Text style={[styles.inputLabel, { color: colors.text }]}>Attachments (Multiple)</Text>
             <View style={styles.imageGridRow}>
                <TouchableOpacity 
                  style={[styles.addImageBox, { borderColor: colors.border }]} 
                  onPress={pickImages}
                >
                   <MaterialCommunityIcons name="camera-plus-outline" size={24} color={colors.primary} />
                   <Text style={styles.addImageText}>Add</Text>
                </TouchableOpacity>

                {images.map((uri, index) => (
                  <View key={index} style={styles.imgThumbnailWrapper}>
                    <Image source={{ uri }} style={styles.thumbnailImg} />
                    <TouchableOpacity 
                      style={styles.deleteBadge} 
                      onPress={() => removeImage(index)}
                    >
                      <Ionicons name="close-circle" size={18} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                ))}
             </View>
          </View>
        </ScrollView>

        {/* --- Custom Themed Alert Modal --- */}
        <Modal visible={isModalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={[styles.alertPopup, { backgroundColor: isDark ? "#1e293b" : "#FFFFFF" }]}>
              <Text style={[styles.alertTitle, { color: modalType === 'error' ? '#EF4444' : colors.text }]}>
                {modalType === 'delete' ? 'Confirm Delete' : modalType === 'error' ? 'Required !' : 'Request Received'}
              </Text>
              <Text style={[styles.alertBody, { color: colors.textSecondary }]}>
                {modalType === 'delete' ? 'Are you sure you want to remove this?' : 
                 modalType === 'error' ? 'Please fill your name and email first.' : 
                 'Your query has been submitted! We will contact you soon.'}
              </Text>
              
              <View style={styles.modalButtonContainer}>
                {modalType === 'delete' && (
                  <TouchableOpacity style={styles.cancelLink} onPress={() => setIsModalVisible(false)}>
                    <Text style={{ color: colors.textSecondary, fontWeight: '700' }}>Cancel</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={[styles.confirmBtn, { backgroundColor: modalType === 'success' ? colors.primary : '#EF4444' }]}
                  onPress={modalType === 'error' ? () => setIsModalVisible(false) : handleModalConfirm}
                >
                  <Text style={styles.confirmBtnText}>{modalType === 'delete' ? 'Delete' : 'OK'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </LinearGradient>
  );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  masterContainer: {
    flex: 1,
  },
  scrollBody: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  queriesTitle: {
    fontSize: 24,
    fontWeight: '900',
  },
  issueLink: {
    color: '#5152B3',
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 8,
    textAlign: 'center',
  },
  submitButtonRow: {
    alignItems: 'flex-end',
    marginVertical: 20,
  },
  roundedBtn: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 4,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  featureCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
  },
  cardInternalFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContentSide: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  descWrapper: {
    gap: 4,
  },
  featureDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  iconVerticalStack: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    gap: 15,
  },
  formCard: {
    borderRadius: 25,
    borderWidth: 1,
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  fieldMargin: {
    marginBottom: 18,
  },
  imageGridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  addImageBox: {
    width: 65,
    height: 65,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  imgThumbnailWrapper: {
    width: 65,
    height: 65,
    position: 'relative',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  deleteBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertPopup: {
    width: '85%',
    padding: 25,
    borderRadius: 25,
    elevation: 20,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  alertBody: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 25,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
    alignItems: 'center',
  },
  cancelLink: {
    padding: 10,
  },
  confirmBtn: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 15,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Notifications;