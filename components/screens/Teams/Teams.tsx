import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Reusable components imports
import InfoCard from '../../common/Cards/InfoCard';
import ImageDesCard from '../../common/Cards/ImageDesCard';
import DetailCard from '../../common/Cards/DetailCard';
import DynamicButton from '../../common/Buttons/DynamicButton';

const { width } = Dimensions.get('window');

interface TeamsProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
}

const Teams: React.FC<TeamsProps> = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'roles'>('members');

  return (
    <SafeAreaView 
      style={styles.masterContainer} 
      edges={['top', 'bottom']}
    >
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.flexOne}
      >
        <View style={styles.innerContainer}>
          <View style={styles.headerRow}>
             <Text style={styles.title}>
               Our Team
             </Text>
          </View>
          
          <Image 
            source={require('../../../assets/homeimages/welcomepagepic.png') as any}
            style={styles.topImage}
            resizeMode="contain"
          />

          <View style={styles.tabWrapper}>
            <DynamicButton
              text="Members"
              onPress={() => setActiveTab('members')}
              backgroundColor={activeTab === 'members' ? '#FFFFFF' : 'transparent'}
              textColor={activeTab === 'members' ? '#5152B3' : '#94A3B8'}
              fontSize={14}
              fontWeight="600"
              borderRadius={20}
              paddingVertical={10}
              elevation={activeTab === 'members' ? 2 : 0}
              containerStyle={styles.tabButton}
            />
            
            <DynamicButton
              text="Roles"
              onPress={() => setActiveTab('roles')}
              backgroundColor={activeTab === 'roles' ? '#FFFFFF' : 'transparent'}
              textColor={activeTab === 'roles' ? '#5152B3' : '#94A3B8'}
              fontSize={14}
              fontWeight="600"
              borderRadius={20}
              paddingVertical={10}
              elevation={activeTab === 'roles' ? 2 : 0}
              containerStyle={styles.tabButton}
            />
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            style={styles.scrollBox}
            contentContainerStyle={styles.scrollContent}
            bounces={false} // Extra bouncy scrolling ko khatam karne ke liye
          >
            {activeTab === 'members' ? (
              <View style={styles.contentFadeIn}>
                <ImageDesCard
                  imageSource={{ uri: 'https://i.pravatar.cc/150?u=1' }}
                  title="Ahmad Ali"
                  description="Senior Stylist - Active"
                  backgroundColor="#F8FAFC"
                  containerStyle={styles.cardMargin}
                />
                <ImageDesCard
                  imageSource={{ uri: 'https://i.pravatar.cc/150?u=2' }}
                  title="Sara Khan"
                  description="Color Expert - Active"
                  backgroundColor="#F8FAFC"
                  containerStyle={styles.cardMargin}
                />
                <InfoCard
                  title="Team Capacity"
                  description="Currently 85% of staff is active today."
                  backgroundColor="#F8FAFC"
                  containerStyle={styles.cardMargin}
                />
                <ImageDesCard
                  imageSource={{ uri: 'https://i.pravatar.cc/150?u=3' }}
                  title="Zeeshan Malik"
                  description="Manager - On Leave"
                  backgroundColor="#F8FAFC"
                />
              </View>
            ) : (
              <View style={styles.contentFadeIn}>
                <DetailCard
                  title="ADMIN ROLE"
                  name="System Admin"
                  phone="Full Access"
                  email="All modules Enabled"
                  birthday="N/A"
                  containerStyle={styles.cardMargin}
                />
                <InfoCard
                  title="Stylist Permissions"
                  description="Can view history, create visits, and update notes."
                  backgroundColor="#F8FAFC"
                  containerStyle={styles.cardMargin}
                />
                <InfoCard
                  title="Assistant Permissions"
                  description="Can view schedule and basic client info."
                  backgroundColor="#F8FAFC"
                />
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flexOne: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  topImage: {
    width: width * 0.6,
    height: 120,
    marginBottom: 15,
  },
  tabWrapper: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 25,
    padding: 5,
    marginBottom: 20,
    width: '100%',
  },
  tabButton: {
    flex: 1,
  },
  scrollBox: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 40, // Navigation bar ke liye space chora hai
  },
  contentFadeIn: {
    width: '100%',
  },
  cardMargin: {
    marginBottom: 15,
  },
});

export default Teams;