import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NavHeader from '../../common/Buttons/NavHeader';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');
type IonIconName = React.ComponentProps<typeof Ionicons>['name'];

interface HistoryVisit {
  id: string;
  customer: string;
  service: string;
  tags: string[];
  notes: string;
  photos: string[];
  date: string;
  time: string;
}

const ViewHistory: React.FC = () => {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const clientName = Array.isArray(params.clientName) ? params.clientName[0] : params.clientName;
  const { colors, isDark } = useTheme();

  // 5 visits sample data
  const [historyData] = useState<HistoryVisit[]>([
    {
      id: 'v1',
      customer: clientName || "Salman Khan",
      service: "Full Hair Color",
      tags: ['Premium', 'Color'],
      notes: "Formula: 6.1 + 20vol. Client loved the shine.",
      photos: ['https://picsum.photos/400/500', 'https://picsum.photos/400/501'],
      date: "25 Jan 2026",
      time: "10:30 AM"
    },
    {
      id: 'v2',
      customer: clientName || "Salman Khan",
      service: "Beard Grooming",
      tags: ['Regular'],
      notes: "Simple trim with peppermint oil treatment.",
      photos: ['https://picsum.photos/400/503'],
      date: "10 Jan 2026",
      time: "11:00 AM"
    },
    {
      id: 'v3',
      customer: clientName || "Salman Khan",
      service: "Skin Facial",
      tags: ['Skincare'],
      notes: "Deep cleansing facial. Recommended moisturizer.",
      photos: ['https://picsum.photos/400/504'],
      date: "28 Dec 2025",
      time: "02:15 PM"
    },
    {
      id: 'v4',
      customer: clientName || "Salman Khan",
      service: "Standard Haircut",
      tags: ['Fade', 'Regular'],
      notes: "High fade with textured top. Sharp finish.",
      photos: ['https://picsum.photos/400/505', 'https://picsum.photos/400/506'],
      date: "15 Dec 2025",
      time: "04:45 PM"
    },
    {
      id: 'v5',
      customer: clientName || "Salman Khan",
      service: "Hair Styling",
      tags: ['Party Look'],
      notes: "Wedding styling. High hold wax used.",
      photos: ['https://picsum.photos/400/507'],
      date: "01 Dec 2025",
      time: "06:00 PM"
    }
  ]);

  // Set the first card (v1) as opened by default
  const [expandedSection, setExpandedSection] = useState<string | null>('v1');

  const toggleSection = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <LinearGradient colors={colors.bgGradient} style={styles.gradientContainer}>
      <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />

        <NavHeader title="Most Recent History !" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        >
          {historyData.map((visit, index) => (
            <React.Fragment key={visit.id}>
              {/* --- Show More Title after the first card --- */}
              {index === 1 && (
                <View style={styles.showMoreContainer}>
                  <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                  <Text style={[styles.showMoreText, { color: colors.text }]}>Show More Previous Visits</Text>
                  <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                </View>
              )}

              <View style={[styles.card, { backgroundColor: "#FFFFFF", borderColor: colors.border, shadowColor: colors.shadow }]}>
                {/* --- Compact Header --- */}
                <TouchableOpacity
                  style={[styles.cardHeader, { backgroundColor: "#FFFFFF" }]}
                  onPress={() => toggleSection(visit.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.headerTitleRow}>
                    <MaterialCommunityIcons name="calendar-clock" size={20} color={colors.primary} />
                    <View>
                      <Text style={[styles.cardTitle, { color: "#1E293B" }]}>{visit.service}</Text>
                      <Text style={[styles.cardDate, { color: "#94A3B8" }]}>{visit.date} • {visit.time}</Text>
                    </View>
                  </View>

                  <Ionicons
                    name={(expandedSection === visit.id ? 'chevron-up' : 'chevron-down') as IonIconName}
                    size={18}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>

                {expandedSection === visit.id && (
                  <View style={[styles.cardBody, { borderTopColor: colors.border }]}>

                    {/* 1. Client Info */}
                    <View style={styles.infoSection}>
                      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Client Name</Text>
                      <View style={[styles.badge, { backgroundColor: isDark ? colors.border : '#ECFDF5' }]}>
                        <Ionicons name="person" size={14} color={isDark ? colors.text : "#10B981"} />
                        <Text style={[styles.badgeText, { color: isDark ? colors.text : '#065F46' }]}>{visit.customer}</Text>
                      </View>
                    </View>

                    {/* 2. Tags */}
                    <View style={styles.infoSection}>
                      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Tags</Text>
                      <View style={styles.chipsRow}>
                        {visit.tags.map((tag, i) => (
                          <View key={`${visit.id}-tag-${i}`} style={[styles.tagChip, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            <Text style={[styles.tagChipText, { color: colors.textSecondary }]}>#{tag}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    {/* 3. Notes */}
                    <View style={styles.infoSection}>
                      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Formula & Notes</Text>
                      <View style={[styles.notesBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
                        <Text style={[styles.notesText, { color: colors.text }]}>{visit.notes}</Text>
                      </View>
                    </View>

                    {/* 4. Photos Gallery */}
                    <View style={styles.infoSection}>
                      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Visit Photos</Text>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.photoScrollContent}
                      >
                        {visit.photos.map((uri, i) => (
                          <View key={`${visit.id}-img-${i}`} style={[styles.imageWrapper, { backgroundColor: colors.border }]}>
                            <Image source={{ uri }} style={styles.uploadedImg} />
                          </View>
                        ))}
                      </ScrollView>
                    </View>

                  </View>
                )}
              </View>
            </React.Fragment>
          ))}
        </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#FFFFFF',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  cardDate: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  cardBody: {
    padding: 14,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  infoSection: {
    marginTop: 12,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '600',
  },
  photoScrollContent: {
    gap: 10,
    paddingRight: 10,
  },
  imageWrapper: {
    width: width * 0.4,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
  },
  uploadedImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tagChipText: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
  },
  notesBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notesText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
  },
  // New Show More Styles
  showMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default ViewHistory;