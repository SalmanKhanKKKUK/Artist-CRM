import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  PanResponder,
  Animated,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import { THEME_COLORS } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import NavHeader from '../../common/Buttons/NavHeader';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface QueryTicket {
  id: string;
  type: 'Visit Issue' | 'App Feedback';
  subject: string;
  status: 'In Progress' | 'Resolved' | 'Pending';
  date: string;
  description: string;
}

const Help: React.FC = () => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  // --- States ---
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<string[]>([]);

  // --- Animation Logic ---
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (showForm) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 25,
        stiffness: 150,
      }).start();
    }
  }, [showForm]);

  const closeForm = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShowForm(false);
      translateY.setValue(SCREEN_HEIGHT);
    });
  };

  // --- Swipe Gesture Logic ---
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150) {
          closeForm();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // --- Mock Data ---
  const [queries] = useState<QueryTicket[]>([
    {
      id: '1',
      type: 'Visit Issue',
      subject: 'Visit History Not Syncing',
      status: 'In Progress',
      date: 'Feb 06, 2026',
      description: 'I recently added a visit for Salman Khan but it is not appearing in history.',
    },
    {
      id: '2',
      type: 'App Feedback',
      subject: 'Dark Mode Improvement',
      status: 'Resolved',
      date: 'Feb 02, 2026',
      description: 'The contrast in dark mode is much better now. Thank you!',
    }
  ]);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.6,
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
    <LinearGradient colors={colors.bgGradient} style={styles.masterGradient}>
      <SafeAreaView style={styles.safeContainer} edges={['top']}>
        <StatusBar
          barStyle={isDark ? "light-content" : "dark-content"}
          backgroundColor="transparent"
          translucent
        />

        <NavHeader
          title="Help & Support !"
          showProfileIcon={false}
          titleColor={isDark ? "#FFFFFF" : "#5152B3"}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.mainScroll,
            { paddingBottom: insets.bottom + 100 }
          ]}
        >
          {/* Branding Section */}
          <View style={[
            styles.brandingCard,
            { backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(81, 82, 179, 0.08)" }
          ]}>
            <Text style={[styles.welcomeText, { color: colors.text }]}>
              Welcome to Support Center
            </Text>
            <Text style={[styles.subText, { color: colors.textSecondary }]}>
              Facing any issues with your visit records or team data?
            </Text>

            <TouchableOpacity activeOpacity={0.8} onPress={() => setShowForm(true)}>
              <LinearGradient
                colors={THEME_COLORS.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitBtn}
              >
                <MaterialCommunityIcons name="chat-plus" size={20} color="white" />
                <Text style={styles.submitBtnText}>Submit Request</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Queries List */}
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Your Queries
            </Text>
            <View style={[styles.countBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.countText}>{queries.length}</Text>
            </View>
          </View>

          {queries.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.ticketCard,
                {
                  backgroundColor: isDark ? "#1e293b" : "#FFFFFF",
                  borderColor: colors.border
                }
              ]}
            >
              <View style={styles.ticketTopRow}>
                <View style={[
                  styles.typeBadge,
                  { backgroundColor: item.type === 'Visit Issue' ? '#FEE2E2' : '#E0E7FF' }
                ]}>
                  <Text style={[
                    styles.typeBadgeText,
                    { color: item.type === 'Visit Issue' ? '#EF4444' : '#5152B3' }
                  ]}>
                    {item.type}
                  </Text>
                </View>
                <Text style={[
                  styles.statusIndicator,
                  { color: item.status === 'Resolved' ? '#10B981' : '#F59E0B' }
                ]}>
                  ● {item.status}
                </Text>
              </View>

              <Text style={[styles.ticketSubject, { color: colors.text }]}>
                {item.subject}
              </Text>
              <Text style={[styles.ticketDesc, { color: colors.textSecondary }]} numberOfLines={2}>
                {item.description}
              </Text>

              <View style={styles.ticketFooter}>
                <Text style={styles.dateLabel}>{item.date}</Text>
                <View style={styles.viewChatLink}>
                  <Text style={[styles.chatLinkText, { color: colors.primary }]}>
                    View Response
                  </Text>
                  <Ionicons name="chevron-forward" size={12} color={colors.primary} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- Submission Modal (Swipe-up Sheet) --- */}
        <Modal
          visible={showForm}
          transparent
          animationType="none"
          onRequestClose={closeForm}
        >
          <View style={styles.modalBackdrop}>
            <Pressable style={StyleSheet.absoluteFill} onPress={closeForm} />

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.keyboardView}
            >
              <Animated.View
                style={[
                  styles.modalSheet,
                  {
                    backgroundColor: isDark ? "#0f172a" : "#FFFFFF",
                    transform: [{ translateY }]
                  }
                ]}
              >
                {/* Swipe Handle Area */}
                <View {...panResponder.panHandlers} style={styles.swipeHandleArea}>
                  <View style={styles.modalHandle} />
                  <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, { color: colors.text }]}>
                      Submit Query
                    </Text>
                    <TouchableOpacity onPress={closeForm}>
                      <Ionicons name="close-circle" size={30} color="#94A3B8" />
                    </TouchableOpacity>
                  </View>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={styles.formScrollContent}
                >
                  <View style={styles.formBody}>
                    {/* Full Name Section */}
                    <Text style={styles.fieldLabel}>Full Name</Text>
                    <TextInput
                      style={[styles.fieldInput, { borderColor: colors.border, color: colors.text }]}
                      placeholder="Enter name...."
                      placeholderTextColor="#94A3B8"
                      value={name}
                      onChangeText={setName}
                    />

                    {/* Email Address Section */}
                    <Text style={styles.fieldLabel}>Email Address</Text>
                    <TextInput
                      style={[styles.fieldInput, { borderColor: colors.border, color: colors.text }]}
                      placeholder="email@example.com"
                      placeholderTextColor="#94A3B8"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />

                    {/* Message Section */}
                    <Text style={styles.fieldLabel}>Message / Feature Request</Text>
                    <TextInput
                      style={[styles.fieldArea, { borderColor: colors.border, color: colors.text }]}
                      multiline
                      placeholder="Describe your issue or request here..."
                      placeholderTextColor="#94A3B8"
                      value={message}
                      onChangeText={setMessage}
                    />

                    {/* Attachments Section */}
                    <Text style={styles.fieldLabel}>Attachments</Text>
                    <View style={styles.attachmentGrid}>
                      <TouchableOpacity
                        style={[styles.imageAddBtn, { borderColor: colors.primary }]}
                        onPress={pickImages}
                      >
                        <MaterialCommunityIcons name="camera-plus-outline" size={26} color={colors.primary} />
                        <Text style={[styles.addBtnText, { color: colors.primary }]}>Add Photo</Text>
                      </TouchableOpacity>

                      {images.map((img, i) => (
                        <View key={i} style={styles.thumbWrapper}>
                          <Image source={{ uri: img }} style={styles.thumbImage} />
                          <TouchableOpacity
                            style={styles.removeThumbBtn}
                            onPress={() => removeImage(i)}
                          >
                            <Ionicons name="close-circle" size={20} color="#EF4444" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>

                    <TouchableOpacity style={styles.submitFinalBtn} onPress={closeForm}>
                      <LinearGradient
                        colors={THEME_COLORS.buttonGradient}
                        style={styles.gradientFinal}
                      >
                        <Text style={styles.finalBtnText}>Submit to Admin</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </Animated.View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  masterGradient: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
  },
  mainScroll: {
    padding: 20,
  },
  brandingCard: {
    padding: 25,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 35,
    borderWidth: 1,
    borderColor: 'rgba(81, 82, 179, 0.1)',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
    fontWeight: '500',
  },
  submitBtn: {
    flexDirection: 'row',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 35,
    alignItems: 'center',
    gap: 12,
    elevation: 8,
    shadowColor: '#5152B3',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  submitBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    paddingLeft: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  countText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ticketCard: {
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  ticketTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  statusIndicator: {
    fontSize: 12,
    fontWeight: '800',
  },
  ticketSubject: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  ticketDesc: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 15,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  dateLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  viewChatLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chatLinkText: {
    fontSize: 13,
    fontWeight: '800',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 25,
    maxHeight: SCREEN_HEIGHT * 0.88,
    width: '100%',
  },
  swipeHandleArea: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    marginBottom: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
  },
  formScrollContent: {
    paddingBottom: 40,
  },
  formBody: {
    paddingBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 2,
  },
  fieldInput: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 15,
    fontSize: 15,
  },
  fieldArea: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 15,
    fontSize: 15,
    height: 120,
    textAlignVertical: 'top',
  },
  attachmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 5,
  },
  imageAddBtn: {
    width: 75,
    height: 75,
    borderRadius: 18,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(81, 82, 179, 0.03)',
  },
  addBtnText: {
    fontSize: 10,
    marginTop: 5,
    fontWeight: '800',
  },
  thumbWrapper: {
    width: 75,
    height: 75,
    position: 'relative',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  removeThumbBtn: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
  },
  submitFinalBtn: {
    marginTop: 40,
    marginBottom: 10,
  },
  gradientFinal: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
  },
  finalBtnText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default Help;