import { THEME_COLORS } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NavHeader from '../../common/Buttons/NavHeader';
import ImageDesCard from '../../common/Cards/ImageDesCard';

interface ViewHistoryProps {
  onBack?: () => void;
}

const ViewHistory: React.FC<ViewHistoryProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();

  // Sir's Requirement: Most Recent 5 Visits Data
  const recentVisits = [
    { id: 1, name: "Salman Khan", service: "Professional Haircut", date: "14 Jan 2026", time: "10:30 AM", img: 'https://i.pravatar.cc/150?u=1', notes: "Fade cut with beard trim." },
    { id: 2, name: "Salman Khan", service: "Beard Styling", date: "01 Jan 2026", time: "11:00 AM", img: 'https://i.pravatar.cc/150?u=1', notes: "Simple trim." },
    { id: 3, name: "Salman Khan", service: "Hair Color", date: "15 Dec 2025", time: "02:00 PM", img: 'https://i.pravatar.cc/150?u=1', notes: "Dark brown shade." },
    { id: 4, name: "Salman Khan", service: "Facial", date: "30 Nov 2025", time: "05:30 PM", img: 'https://i.pravatar.cc/150?u=1', notes: "Gold facial pack." },
    { id: 5, name: "Salman Khan", service: "Haircut", date: "10 Nov 2025", time: "12:15 PM", img: 'https://i.pravatar.cc/150?u=1', notes: "Trim only." },
  ];

  const mainVisit = recentVisits[0]; 

  return (
    <LinearGradient 
      colors={THEME_COLORS.bgGradient} 
      style={styles.gradientContainer}
    >
      <SafeAreaView 
        style={styles.masterContainer} 
        edges={['top', 'bottom']}
      >
        <StatusBar 
          barStyle="dark-content" 
          backgroundColor="transparent" 
          translucent 
        />
        
        <NavHeader title="View History Details" />
        
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={[
            styles.listContent, 
            { paddingBottom: 60 + insets.bottom }
          ]}
        >
          {/* Main Profile Card */}
          {mainVisit && (
            <View style={styles.profileCard}>
              <Image 
                source={{ uri: mainVisit.img }} 
                style={styles.profileImg} 
              />
              <Text style={styles.clientName}>{mainVisit.name}</Text>
              <View style={styles.recentBadge}>
                <Text style={styles.recentBadgeText}>Latest Visit Information</Text>
              </View>
              
              <View style={styles.mainVisitDetails}>
                 <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="content-cut" size={18} color="#5152B3" />
                    <Text style={styles.detailValue}>{mainVisit.service}</Text>
                 </View>
                 <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="calendar-clock" size={18} color="#5152B3" />
                    <Text style={styles.detailValue}>{mainVisit.date} | {mainVisit.time}</Text>
                 </View>
              </View>
            </View>
          )}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Last 5 Recent Visits</Text>
            <View style={styles.lineDivider} />
          </View>

          {/* History List Without Price Tag */}
          <View style={styles.historyList}>
            {recentVisits.map((item) => (
              <View key={item.id.toString()} style={styles.cardWrapper}>
                <ImageDesCard 
                  imageSource={{ uri: item.img }} 
                  title={item.service} 
                  description={`${item.date} | ${item.time}\n${item.notes}`} 
                  backgroundColor="#FFFFFF" 
                  containerStyle={styles.cardItem} 
                  titleStyle={styles.cardTitleText} 
                />
                {/* Price tag removed from here */}
              </View>
            ))}
          </View>

          {/* Bottom Button removed as requested */}

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
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 25,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  profileImg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  clientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  recentBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 15,
  },
  recentBadgeText: {
    color: '#0284C7',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  mainVisitDetails: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 15,
    gap: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailValue: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#5152B3',
    textTransform: 'uppercase',
  },
  lineDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  historyList: {
    gap: 5,
  },
  cardWrapper: {
    position: 'relative',
    justifyContent: 'center',
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
  cardTitleText: {
    color: '#5152B3',
    fontWeight: 'bold',
  },
});

export default ViewHistory;