import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { THEME_COLORS } from '@/constants/Colors';
import NavButton from '../../common/Buttons/NavButton';
import NavHeader from '../../common/Buttons/NavHeader';
import ImageDesCard from '../../common/Cards/ImageDesCard';
import InfoCard from '../../common/Cards/InfoCard';

// Strictly defined Interface for zero TypeScript errors

interface DashboardProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Handlers for Navigation
  // Note: 'dashboard' is effectively "home" or null in the old logic
  const handleHomePress = () => {
    // Already on dashboard, do nothing or scroll to top
  };

  const handleNewVisitPress = () => {
    router.push('/(tabs)/new-visit');
  };

  const handleHistoryPress = () => {
    router.push('/(tabs)/history');
  };

  const handleTeamsPress = () => {
    router.push('/(tabs)/teams');
  };

  const handleAddClientsPress = () => {
    router.push('/(tabs)/add-clients');
  };

  const handleProfilePress = () => {
    router.push('/(tabs)/profile' as any);
  };

  const visitData = [
    { id: 1, title: "John Doe", img: require('../../../assets/images/icon.png') },
    { id: 2, title: "Smith Alex", img: require('../../../assets/images/favicon.png') },
    { id: 3, title: "Mike Ross", img: require('../../../assets/images/splash-icon.png') },
    { id: 4, title: "Wilson tel", img: require('../../../assets/images/react-logo.png') },
    { id: 5, title: "Harvey Specter", img: require('../../../assets/images/icon.png') },
    { id: 6, title: "Donna Paul", img: require('../../../assets/images/favicon.png') },
    { id: 7, title: "Louis Litt", img: require('../../../assets/images/splash-icon.png') },
    { id: 8, title: "Rachel Zane", img: require('../../../assets/images/react-logo.png') },
    { id: 9, title: "Jessica P.", img: require('../../../assets/images/icon.png') },
    { id: 10, title: "Daniel H.", img: require('../../../assets/images/favicon.png') },
  ];

  return (
    <LinearGradient
      colors={THEME_COLORS.bgGradient}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        <NavHeader title="Dashboard !" showProfileIcon={false}>
          <TouchableOpacity onPress={handleProfilePress}>
            <LinearGradient
              colors={THEME_COLORS.buttonGradient}
              style={styles.profileGradientIcon}
            >

              <Ionicons name="person" size={18} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </NavHeader>
        <ScrollView

          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.mainScroll,
            { paddingBottom: 100 + insets.bottom }
          ]}

        >

          <View style={styles.statsContainer}>
            <InfoCard
              title="56"
              description="Total Clients"
              backgroundColor="#FFFFFF"
              titleColor="#1E293B"
              descriptionColor="#94A3B8"
              titleSize={26}
              margin={0}
              elevation={0}
              containerStyle={styles.premiumInfoCard}
            />

            <InfoCard
              title="10"
              description="Active Clients"
              backgroundColor="#FFFFFF"
              titleColor="#313867"
              descriptionColor="#94A3B8"
              titleSize={26}
              margin={0}
              elevation={0}
              containerStyle={styles.premiumInfoCard}
            />
          </View>



          <View style={styles.sectionHeadingWrapper}>
            <Text style={styles.sectionTitle}>Recent Visits</Text>
            <TouchableOpacity onPress={handleHistoryPress}>
              <LinearGradient
                colors={THEME_COLORS.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.historyGradientBtn}
              >

                <Text style={styles.seeAllText}>View History</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>



          <View style={styles.visitGrid}>
            {[0, 2, 4, 6, 8].map((startIndex) => (
              <View key={startIndex} style={styles.row}>
                {visitData.slice(startIndex, startIndex + 2).map((item) => (

                  <ImageDesCard
                    key={item.id}
                    imageSource={item.img}
                    title={item.title}
                    description="Last visit: 2 days ago"
                    backgroundColor="#FFFFFF"
                    titleStyle={styles.visitTitle}
                    descriptionStyle={styles.visitDesc}
                    cardMargin={0}
                    cardPadding={12}
                    imageSize={40}
                    elevation={0}
                    containerStyle={styles.visitCardBorder}
                  />

                ))}
              </View>
            ))}
          </View>
        </ScrollView>


        {/* --- BOTTOM NAVIGATION BAR --- */}
        <View style={[
          styles.bottomNavContainer,
          {
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
            height: 65 + insets.bottom
          }
        ]}>
          <View style={styles.navBar}>
            <NavButton
              label="Home"
              icon={<MaterialCommunityIcons name="home-variant" size={24} />}
              isActive={true}
              onClick={handleHomePress}
            />

            <NavButton
              label="New Visit"
              icon={<MaterialCommunityIcons name="calendar-plus" size={24} />}
              isActive={false}
              onClick={handleNewVisitPress}
            />

            <View style={styles.plusActionWrapper}>
              <TouchableOpacity onPress={handleAddClientsPress} activeOpacity={0.8}>
                <LinearGradient
                  colors={THEME_COLORS.buttonGradient}
                  style={styles.plusGradientBtn}
                >
                  <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <NavButton
              label="History"
              icon={<MaterialCommunityIcons name="history" size={24} />}
              isActive={false}
              onClick={handleHistoryPress}
            />

            <NavButton
              label="Teams"
              icon={<FontAwesome5 name="users" size={20} />}
              isActive={false}
              onClick={handleTeamsPress}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>

  );

};



// ================= STYLES (Properly Organized) =================

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  mainScroll: {
    paddingHorizontal: 20,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginTop: 5,
  },

  profileGradientIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  premiumInfoCard: {
    width: '47.5%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },

  sectionHeadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5152B3',
  },

  historyGradientBtn: {
    paddingHorizontal: 15,
    paddingVertical: 6, // Slightly increased for better tap area
    borderRadius: 25,    // Changed to 25 to make it fully rounded
  },

  seeAllText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },

  visitGrid: {
    gap: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },

  visitCardBorder: {
    width: '48.2%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  visitTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
    textTransform: "uppercase",
    marginTop: 8,
    textAlign: 'center',
  },

  visitDesc: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
    textAlign: 'center',
  },

  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingTop: 10,
    zIndex: 1000,
    // Subtle Black Shadow at the Top
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -4, // Pushes shadow to the top
    },

    shadowOpacity: 0.08, // Very subtle as requested
    shadowRadius: 5,
    elevation: 20,      // Required for Android shadow
  },

  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
  },

  plusActionWrapper: {
    marginTop: -55,
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 35,
    // Matching shadow for the center button cutout
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -2,
    },

    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 5,
  },

  plusGradientBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Dashboard;