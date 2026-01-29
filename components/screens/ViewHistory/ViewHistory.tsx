import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME_COLORS } from '@/constants/Colors';
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

  const [historyData] = useState<HistoryVisit[]>([
    {
      id: 'v1',
      customer: clientName || "Salman Khan",
      service: "Full Hair Color",
      tags: ['Premium', 'Color'],
      notes: "Formula: 6.1 + 20vol. Client loved the shine.",
      photos: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=11'],
      date: "25 Jan 2026",
      time: "10:30 AM"
    },
    {
      id: 'v2',
      customer: clientName || "Salman Khan",
      service: "Beard Grooming",
      tags: ['Regular'],
      notes: "Simple trim with peppermint oil.",
      photos: ['https://i.pravatar.cc/150?u=12'],
      date: "10 Jan 2026",
      time: "11:00 AM"
    },
    {
      id: 'v3',
      customer: clientName || "Salman Khan",
      service: "Classic Haircut",
      tags: ['Fade'],
      notes: "Skin fade with textured top.",
      photos: ['https://i.pravatar.cc/150?u=13'],
      date: "28 Dec 2025",
      time: "02:00 PM"
    },
    {
      id: 'v4',
      customer: clientName || "Salman Khan",
      service: "Facial Therapy",
      tags: ['VIP'],
      notes: "Hydra facial performed. Skin was dry.",
      photos: ['https://i.pravatar.cc/150?u=14'],
      date: "15 Dec 2025",
      time: "05:30 PM"
    },
    {
      id: 'v5',
      customer: clientName || "Salman Khan",
      service: "Quick Trim",
      tags: ['Basic'],
      notes: "Only sides cleaned up.",
      photos: ['https://i.pravatar.cc/150?u=15'],
      date: "01 Dec 2025",
      time: "12:15 PM"
    }
  ]);

  const [expandedSection, setExpandedSection] = useState<string | null>('v1');

  const toggleSection = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <LinearGradient colors={THEME_COLORS.bgGradient} style={styles.gradientContainer}>
      <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        <NavHeader title="Most Recent History !" />

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        >
          {historyData.map((visit) => (
            <View key={visit.id} style={styles.card}>
              {/* Card Header */}
              <TouchableOpacity 
                style={styles.cardHeader} 
                onPress={() => toggleSection(visit.id)}
              >
                <View style={styles.headerTitleRow}>
                  <MaterialCommunityIcons name="history" size={20} color="#5152B3" />
                  <Text style={styles.cardTitle}>{visit.date} - {visit.service}</Text>
                </View>
                <Ionicons 
                  name={(expandedSection === visit.id ? 'chevron-up' : 'chevron-down') as IonIconName} 
                  size={20} 
                  color="#94A3B8" 
                />
              </TouchableOpacity>

              {expandedSection === visit.id && (
                <View style={styles.cardBody}>
                  
                  {/* 1. Customer Name [cite: 59, 64] */}
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionLabel}>Client Name</Text>
                    <View style={styles.badge}>
                      <Ionicons name="person" size={16} color="#10B981" />
                      <Text style={styles.badgeText}>{visit.customer}</Text>
                    </View>
                  </View>

                  {/* 2. Service [cite: 68, 76] */}
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionLabel}>Service Provided</Text>
                    <View style={styles.serviceBox}>
                      <MaterialCommunityIcons name="content-cut" size={16} color="#5152B3" />
                      <Text style={styles.serviceText}>{visit.service}</Text>
                    </View>
                  </View>

                  {/* 3. Tags [cite: 76] */}
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionLabel}>Quick Tags</Text>
                    <View style={styles.chipsRow}>
                      {(visit.tags || []).map((tag, index) => (
                        <View key={`${visit.id}-tag-${index}`} style={styles.tagChip}>
                          <Text style={styles.tagChipText}>#{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* 4. Notes / Formula [cite: 33, 70, 76] */}
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionLabel}>Formula & Notes</Text>
                    <View style={styles.notesBox}>
                      <Text style={styles.notesText}>{visit.notes}</Text>
                    </View>
                  </View>

                  {/* 5. Visit Photos [cite: 36, 69, 76] */}
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionLabel}>Visit Photos</Text>
                    <View style={styles.photoGrid}>
                      {(visit.photos || []).map((uri, index) => (
                        <View key={`${visit.id}-img-${index}`} style={styles.imageWrapper}>
                          <Image source={{ uri }} style={styles.uploadedImg} />
                        </View>
                      ))}
                    </View>
                  </View>

                </View>
              )}
            </View>
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    overflow: 'hidden',
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
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  cardBody: {
    padding: 18,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  infoSection: {
    marginTop: 15,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748B',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 10,
    borderRadius: 12,
    gap: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 13,
    color: '#065F46',
    fontWeight: '600',
  },
  serviceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    padding: 10,
    borderRadius: 12,
    gap: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  serviceText: {
    fontSize: 13,
    color: '#5152B3',
    fontWeight: '600',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tagChipText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  notesBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notesText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
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
});

export default ViewHistory;