import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { BackHandler, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlusButton from '../../common/Buttons/PlusButton';
import ImageDesCard from '../../common/Cards/ImageDesCard';
import InfoCard from '../../common/Cards/InfoCard';
import History from '../History/History';
import NewVisit from '../NewVisit/NewVisit';
import Teams from '../Teams/Teams';

const Dashboard = ({ onBack, onNavigateToNewVisit, onNavigateToWelcome }: { onBack?: () => void; onNavigateToNewVisit?: () => void; onNavigateToWelcome?: () => void }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState<'newVisit' | 'history' | 'teams' | null>(null);

  // Proper BackHandler logic to prevent exiting to Welcome page from sub-screens
  useEffect(() => {
    const backAction = () => {
      if (currentScreen !== null) {
        setCurrentScreen(null); // Back to Dashboard
        return true;
      }
      if (onBack) {
        onBack(); // Back to Welcome
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [currentScreen, onBack]);

  const handleNewVisitPress = () => {
    setCurrentScreen('newVisit');
  };

  const handleHistoryPress = () => {
    setCurrentScreen('history');
  };

  const handleTeamsPress = () => {
    setCurrentScreen('teams');
  };

  const renderNavItem = (id: string, iconName: any, label: string) => {
    const isActive = activeTab === id;
    const activeColor = "#5152B3";
    const inactiveColor = "#CBD5E1";

    return (
      <TouchableOpacity 
        style={styles.navIconContainer} 
        onPress={() => {
          if (id === 'add-visit') {
            handleNewVisitPress();
          } else if (id === 'history') {
            handleHistoryPress();
          } else if (id === 'team') {
            handleTeamsPress();
          } else {
            setActiveTab(id);
          }
        }}
      >
        <Ionicons 
          name={isActive ? iconName.replace('-outline', '') : iconName} 
          size={24} 
          color={isActive ? activeColor : inactiveColor} 
        />
        <Text style={[styles.navLabel, { color: isActive ? activeColor : inactiveColor }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === 'newVisit' ? (
        <NewVisit onBack={() => setCurrentScreen(null)} onNavigateToWelcome={onNavigateToWelcome} />
      ) : currentScreen === 'history' ? (
        <History onBack={() => setCurrentScreen(null)} onNavigateToWelcome={onNavigateToWelcome} />
      ) : currentScreen === 'teams' ? (
        <Teams onBack={() => setCurrentScreen(null)} onNavigateToWelcome={onNavigateToWelcome} />
      ) : (
        <>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          
          <View style={styles.header}>
            <View style={styles.brandWrapper}>
              <Text style={styles.brandTitle}>ARTIST-CRM</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.avatarMini}>
                <Ionicons name="person" size={18} color="#5152B3" />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainScroll}>
            <Text style={styles.mainGreeting}>Dashboard !</Text>
            
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
                <Text style={styles.seeAllText}>View History</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.visitGrid}>
              <View style={styles.row}>
                <ImageDesCard 
                  imageSource={require('../../../assets/images/icon.png')}
                  title="John Doe"
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
                <ImageDesCard 
                  imageSource={require('../../../assets/images/favicon.png')}
                  title="Smith Alex"
                  description="Last visit: 3 days ago"
                  backgroundColor="#FFFFFF"
                  titleStyle={styles.visitTitle}
                  descriptionStyle={styles.visitDesc}
                  cardMargin={0}
                  cardPadding={12}
                  imageSize={40}
                  elevation={0}
                  containerStyle={styles.visitCardBorder}
                />
              </View>

              <View style={styles.row}>
                <ImageDesCard 
                  imageSource={require('../../../assets/images/splash-icon.png')}
                  title="Mike Ross"
                  description="Last visit: 5 days ago"
                  backgroundColor="#FFFFFF"
                  titleStyle={styles.visitTitle}
                  descriptionStyle={styles.visitDesc}
                  cardMargin={0}
                  cardPadding={12}
                  imageSize={40}
                  elevation={0}
                  containerStyle={styles.visitCardBorder}
                />
                <ImageDesCard 
                  imageSource={require('../../../assets/images/react-logo.png')}
                  title="Wilson tel"
                  description="Last visit: 1 week ago"
                  backgroundColor="#FFFFFF"
                  titleStyle={styles.visitTitle}
                  descriptionStyle={styles.visitDesc}
                  cardMargin={0}
                  cardPadding={12}
                  imageSize={40}
                  elevation={0}
                  containerStyle={styles.visitCardBorder}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottomNavContainer}>
            <View style={styles.navBar}>
              {renderNavItem('home', 'home-outline', 'Home')}
              {renderNavItem('add-visit', 'location-outline', 'New Visit')}
              
              <View style={styles.plusActionWrapper}>
                <PlusButton 
                  onPress={() => console.log('Plus pressed')}
                  iconName="plus"
                  iconColor="#FFFFFF"
                  backgroundColor="#5152B3"
                  size={58}
                  iconSize={28}
                  style={styles.plusShadowFree} 
                />
              </View>

              {renderNavItem('history', 'time-outline', 'History')}
              {renderNavItem('team', 'people-outline', 'Teams')}
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    height: 70,
  },
  brandWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#5152B3',
    letterSpacing: -0.5,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarMini: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mainScroll: {
    paddingHorizontal: 25,
    paddingBottom: 120,
  },
  mainGreeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#5152B3',
    marginTop: 10,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  premiumInfoCard: {
    width: '47.5%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    paddingVertical: 20,
  },
  sectionHeadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5152B3',
  },
  seeAllText: {
    fontSize: 14,
    color: '#5152B3',
    fontWeight: '500',
  },
  visitGrid: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 5,
  },
  visitCardBorder: {
    width: '48.2%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingBottom: 20,
    height: 120,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  navIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '600',
  },
  plusActionWrapper: {
    marginTop: -55,
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 35,
  },
  plusShadowFree: {
    shadowOpacity: 0,
    elevation: 0,
  }
});

export default Dashboard;