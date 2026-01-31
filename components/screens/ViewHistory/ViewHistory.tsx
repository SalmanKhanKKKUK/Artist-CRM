import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useState, useRef } from 'react';
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

  // Scroll Ref to control horizontal photo scrolling via icons
  const scrollRef = useRef<ScrollView>(null);

  // --- Sample Data State ---
  const [historyData] = useState<HistoryVisit[]>([
    {
      id: 'v1',
      customer: clientName || "Salman Khan",
      service: "Full Hair Color",
      tags: ['Premium', 'Color'],
      notes: "Formula: 6.1 + 20vol. Client loved the shine.",
      photos: [
        'https://picsum.photos/400/500', 
        'https://picsum.photos/400/501', 
        'https://picsum.photos/400/502', 
        'https://picsum.photos/400/503'
      ],
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

  // --- Accordion Logic ---
  const [expandedSection, setExpandedSection] = useState<string | null>('v1');

  const toggleSection = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === id ? null : id);
  };

  // --- Horizontal Scroll Logic ---
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollTo({ 
        x: scrollAmount, 
        animated: true 
      });
    }
  };

  return (
    <LinearGradient colors={colors.bgGradient} style={styles.gradientContainer}>
      <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
        <StatusBar 
          barStyle={isDark ? "light-content" : "dark-content"} 
          backgroundColor="transparent" 
          translucent 
        />

        <NavHeader title="Most Recent History !" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent, 
            { paddingBottom: insets.bottom + 20 }
          ]}
        >
          {historyData.map((visit, index) => (
            <React.Fragment key={visit.id}>
              
              {/* Divider after the first card */}
              {index === 1 && (
                <View style={styles.showMoreContainer}>
                  <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                  <Text style={[styles.showMoreText, { color: isDark ? colors.text : "black" }]}>
                    See More Previous Visits
                  </Text>
                  <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                </View>
              )}

              {/* Visit Card */}
              <View style={[
                styles.card, 
                { 
                  backgroundColor: isDark ? colors.card : "#FFFFFF", 
                  borderColor: colors.border 
                }
              ]}>
                
                {/* --- Card Header --- */}
                <TouchableOpacity
                  style={[
                    styles.cardHeader, 
                    { backgroundColor: isDark ? colors.card : "#FFFFFF" }
                  ]}
                  onPress={() => toggleSection(visit.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.headerTitleRow}>
                    <MaterialCommunityIcons name="calendar-clock" size={20} color={colors.primary} />
                    <View>
                      <Text style={[
                        styles.cardTitle, 
                        { color: isDark ? colors.text : "#1E293B" }
                      ]}>
                        {visit.service}
                      </Text>
                      <Text style={[styles.cardDate, { color: "#94A3B8" }]}>
                        {visit.date} • {visit.time}
                      </Text>
                    </View>
                  </View>
                  <Ionicons 
                    name={(expandedSection === visit.id ? 'chevron-up' : 'chevron-down') as IonIconName} 
                    size={18} 
                    color={colors.textSecondary} 
                  />
                </TouchableOpacity>

                {/* --- Expandable Body Section --- */}
                {expandedSection === visit.id && (
                  <View style={[styles.cardBody, { borderTopColor: colors.border }]}>
                    
                    {/* 1. Client Name Badge */}
                    <View style={styles.infoSection}>
                      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                        Client Name
                      </Text>
                      <View style={[
                        styles.badge, 
                        { backgroundColor: isDark ? colors.border : '#ECFDF5' }
                      ]}>
                        <Ionicons name="person" size={14} color={isDark ? colors.text : "#10B981"} />
                        <Text style={[
                          styles.badgeText, 
                          { color: isDark ? colors.text : '#065F46' }
                        ]}>
                          {visit.customer}
                        </Text>
                      </View>
                    </View>

                    {/* 2. Tags Section */}
                    <View style={styles.infoSection}>
                      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                        Tags
                      </Text>
                      <View style={styles.chipsRow}>
                        {visit.tags.map((tag, i) => (
                          <View 
                            key={i} 
                            style={[
                              styles.tagChip, 
                              { backgroundColor: isDark ? colors.border : colors.background, borderColor: colors.border }
                            ]}
                          >
                            <Text style={[styles.tagChipText, { color: colors.textSecondary }]}>
                              #{tag}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    {/* 3. Formula & Notes Section */}
                    <View style={styles.infoSection}>
                      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                        Formula & Notes
                      </Text>
                      <View style={[
                        styles.notesBox, 
                        { backgroundColor: isDark ? colors.border : colors.background, borderColor: colors.border }
                      ]}>
                        <Text style={[styles.notesText, { color: colors.text }]}>
                          {visit.notes}
                        </Text>
                      </View>
                    </View>

                    {/* 4. Visit Photos with Scrollable Icons */}
                    <View style={styles.infoSection}>
                      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                        Visit Photos
                      </Text>
                      <View style={styles.scrollWrapper}>
                        {/* Left Control Icon */}
                        <TouchableOpacity style={styles.scrollIcon} onPress={() => handleScroll('left')}>
                          <Ionicons name="chevron-back-circle" size={28} color={colors.primary} />
                        </TouchableOpacity>

                        <ScrollView
                          ref={scrollRef}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={styles.photoScrollContent}
                        >
                          {visit.photos.map((uri, i) => (
                            <View 
                              key={i} 
                              style={[
                                styles.imageWrapper, 
                                { backgroundColor: colors.border }
                              ]}
                            >
                              <Image source={{ uri }} style={styles.uploadedImg} />
                            </View>
                          ))}
                        </ScrollView>

                        {/* Right Control Icon */}
                        <TouchableOpacity style={styles.scrollIcon} onPress={() => handleScroll('right')}>
                          <Ionicons name="chevron-forward-circle" size={28} color={colors.primary} />
                        </TouchableOpacity>
                      </View>
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

// --- Stylesheet ---
const styles = StyleSheet.create({
  gradientContainer: { 
    flex: 1 
  },
  masterContainer: { 
    flex: 1, 
    backgroundColor: 'transparent' 
  },
  scrollContent: { 
    paddingHorizontal: 16, 
    paddingTop: 8 
  },
  card: { 
    borderRadius: 18, 
    marginBottom: 12, 
    borderWidth: 1, 
    elevation: 3, 
    overflow: 'hidden' 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 14 
  },
  headerTitleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10 
  },
  cardTitle: { 
    fontSize: 14, 
    fontWeight: '700' 
  },
  cardDate: { 
    fontSize: 11, 
    marginTop: 1 
  },
  cardBody: { 
    padding: 14, 
    paddingTop: 0, 
    borderTopWidth: 1 
  },
  infoSection: { 
    marginTop: 12 
  },
  sectionLabel: { 
    fontSize: 10, 
    fontWeight: '800', 
    marginBottom: 6, 
    textTransform: 'uppercase', 
    letterSpacing: 0.5 
  },
  badge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 8, 
    gap: 6, 
    alignSelf: 'flex-start' 
  },
  badgeText: { 
    fontSize: 12, 
    fontWeight: '600' 
  },
  scrollWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  scrollIcon: { 
    paddingHorizontal: 2 
  },
  photoScrollContent: { 
    gap: 10, 
    paddingVertical: 5 
  },
  imageWrapper: { 
    width: width * 0.35, 
    height: 110, 
    borderRadius: 12, 
    overflow: 'hidden' 
  },
  uploadedImg: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  },
  chipsRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 6 
  },
  tagChip: { 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6, 
    borderWidth: 1 
  },
  tagChipText: { 
    fontSize: 10, 
    fontWeight: '700' 
  },
  notesBox: { 
    borderRadius: 10, 
    padding: 10, 
    borderWidth: 1 
  },
  notesText: { 
    fontSize: 13, 
    lineHeight: 18 
  },
  showMoreContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 15, 
    gap: 10 
  },
  dividerLine: { 
    flex: 1, 
    height: 1 
  },
  showMoreText: { 
    fontSize: 14, 
    fontWeight: '700', 
    textTransform: 'uppercase', 
    letterSpacing: 1 
  },
});

export default ViewHistory;