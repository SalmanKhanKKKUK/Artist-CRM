import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  TextInput
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { THEME_COLORS } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import NavHeader from '../../common/Buttons/NavHeader';

// Android LayoutAnimation enablement
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Interfaces ---
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface HelpSection {
  id: number;
  question: string;
  answer: string;
  icon: MaterialIconName;
  color: string;
}

const Notifications: React.FC = () => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  
  // --- States ---
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // --- Data ---
  const helpData: HelpSection[] = [
    {
      id: 1,
      question: "Managing Client History",
      answer: "Every visit is tracked in a 'Visual History' timeline. You can view past services, technical formulas, and transformation photos to provide a consistent experience.",
      icon: "history",
      color: "#6366F1"
    },
    {
      id: 2,
      question: "Offline Productivity",
      answer: "Work anywhere without worrying about internet. Your visits and client details are saved locally and will automatically sync once a connection is detected.",
      icon: "cloud-sync-outline",
      color: "#10B981"
    },
    {
      id: 3,
      question: "Smart Photo Storage",
      answer: "We optimize your work gallery by compressing high-resolution photos. This ensures fast performance without consuming excessive phone storage.",
      icon: "image-multiple-outline",
      color: "#F59E0B"
    },
    {
      id: 4,
      question: "Quick Client Contact",
      answer: "Need to confirm an appointment? Tap the WhatsApp icon next to any client name to instantly open a chat using their registered phone number.",
      icon: "whatsapp",
      color: "#25D366"
    },
    {
      id: 5,
      question: "Adding Formula Notes",
      answer: "Use the 'New Visit' module to record technical details. You can even use 'Quick Tags' like [Bleach] or [Toner] to speed up your note-taking.",
      icon: "notebook-edit-outline",
      color: "#EC4899"
    }
  ];

  // --- Handlers ---
  const toggleHelp = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredHelp = helpData.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient colors={colors.bgGradient} style={styles.gradientContainer}>
      <SafeAreaView style={styles.masterContainer} edges={['top']}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />

        {/* Updated Title */}
        <NavHeader title="Help & Support" showProfileIcon={false} />

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={[styles.scrollBody, { paddingBottom: insets.bottom + 90 }]}
          keyboardShouldPersistTaps="handled"
        >
          
          {/* --- 1. Search Section --- */}
          <View style={styles.searchSection}>
            <View style={[
              styles.searchBar, 
              { backgroundColor: isDark ? "#1e293b" : "#FFFFFF", borderColor: colors.border }
            ]}>
              <Ionicons name="search" size={20} color="#94A3B8" />
              <TextInput 
                placeholder="Search for help..."
                placeholderTextColor="#94A3B8"
                style={[styles.searchInput, { color: colors.text }]}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* --- 2. Informative Hero Card --- */}
          <View style={styles.contentPadding}>
            <LinearGradient
              colors={THEME_COLORS.buttonGradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.introCard}
            >
              <View style={styles.introTextWrapper}>
                <Text style={styles.introTitle}>Need Assistance?</Text>
                <Text style={styles.introSub}>
                  Explore our guides to master the Artist CRM and boost your workflow effortlessly.
                </Text>
              </View>
              <MaterialCommunityIcons 
                name="rocket-launch-outline" 
                size={70} 
                color="rgba(255,255,255,0.25)" 
                style={styles.rocketIcon} 
              />
            </LinearGradient>

            <Text style={[styles.sectionHeading, { color: isDark ? colors.text : "#1E293B" }]}>
              Frequently Asked Questions
            </Text>

            {/* --- 3. Accordion FAQ List --- */}
            {filteredHelp.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <View 
                  key={item.id} 
                  style={[
                    styles.helpCard, 
                    { 
                      backgroundColor: isDark ? "#1e293b" : "#FFFFFF", 
                      borderColor: isExpanded ? colors.primary : colors.border 
                    }
                  ]}
                >
                  <TouchableOpacity 
                    activeOpacity={0.7} 
                    onPress={() => toggleHelp(item.id)}
                    style={styles.helpHeader}
                  >
                    <View style={styles.iconTitleRow}>
                      <View style={[styles.iconCircle, { backgroundColor: `${item.color}15` }]}>
                        <MaterialCommunityIcons name={item.icon} size={22} color={item.color} />
                      </View>
                      <Text style={[styles.helpQuestion, { color: colors.text }]}>
                        {item.question}
                      </Text>
                    </View>
                    <Ionicons 
                      name={isExpanded ? "chevron-up" : "chevron-down"} 
                      size={18} 
                      color="#94A3B8" 
                    />
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={[styles.helpBody, { borderTopColor: colors.border }]}>
                      <Text style={[styles.helpAnswer, { color: colors.textSecondary }]}>
                        {item.answer}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

// --- Stylesheet Section ---
const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  masterContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollBody: {
    paddingTop: 10,
  },
  contentPadding: {
    paddingHorizontal: 20,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
      android: { elevation: 2 },
    }),
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  introCard: {
    borderRadius: 25,
    padding: 25,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 25,
    elevation: 5,
  },
  introTextWrapper: {
    flex: 1,
    zIndex: 1,
  },
  introTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  introSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
    fontWeight: '500',
  },
  rocketIcon: {
    position: 'absolute',
    right: -10,
    bottom: -15,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 15,
    marginTop: 5,
  },
  helpCard: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
    elevation: 1,
    overflow: 'hidden',
  },
  helpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  iconTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpQuestion: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  helpBody: {
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  helpAnswer: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
  },
});

export default Notifications;