import React, { useEffect, useState } from 'react';
import { BackHandler, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import NavButton from '../../common/Buttons/NavButton';
import PlusButton from '../../common/Buttons/PlusButton';
import ImageDesCard from '../../common/Cards/ImageDesCard';
import InfoCard from '../../common/Cards/InfoCard';
import NavHeader from '../../common/Buttons/NavHeader'; 
import AddClients from '../AddClients/AddClients';
import History from '../History/History';
import NewVisit from '../NewVisit/NewVisit';
import Profile from '../Profile/Profile';
import Teams from '../Teams/Teams';

const Dashboard = ({ onBack, onNavigateToNewVisit, onNavigateToWelcome }: { onBack?: () => void; onNavigateToNewVisit?: () => void; onNavigateToWelcome?: () => void }) => {
  const [currentScreen, setCurrentScreen] = useState<'newVisit' | 'history' | 'teams' | 'addClients' | 'profile' | null>(null);
  
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const backAction = () => {
      if (currentScreen !== null) {
        setCurrentScreen(null);
        return true;
      }
      if (onBack) {
        onBack();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [currentScreen, onBack]);

  const handleHomePress = () => setCurrentScreen(null);
  const handleNewVisitPress = () => setCurrentScreen('newVisit');
  const handleHistoryPress = () => setCurrentScreen('history');
  const handleTeamsPress = () => setCurrentScreen('teams');
  const handleAddClientsPress = () => setCurrentScreen('addClients');
  const handleProfilePress = () => setCurrentScreen('profile');

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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {currentScreen === 'newVisit' ? (
        <NewVisit onBack={() => setCurrentScreen(null)} onNavigateToWelcome={onNavigateToWelcome} />
      ) : currentScreen === 'history' ? (
        <History onBack={() => setCurrentScreen(null)} onNavigateToWelcome={onNavigateToWelcome} />
      ) : currentScreen === 'teams' ? (
        <Teams onBack={() => setCurrentScreen(null)} onNavigateToWelcome={onNavigateToWelcome} />
      ) : currentScreen === 'addClients' ? (
        <AddClients onBack={() => setCurrentScreen(null)} onNavigateToWelcome={onNavigateToWelcome} />
      ) : currentScreen === 'profile' ? (
        <Profile onBack={() => setCurrentScreen(null)} />
      ) : (
        <>
          <NavHeader 
            title="Dashboard !" 
            showProfileIcon={false} 
          >
             <TouchableOpacity onPress={handleProfilePress}>
                <Text style={{ fontSize: 20 }}>👤</Text> 
             </TouchableOpacity>
          </NavHeader>

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={[
              styles.mainScroll, 
              { paddingBottom: 50 + insets.bottom } 
            ]}
          >
            <View style={[statsStyles.statsContainer, { marginTop: 10 }]}>
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
              
              {/* Sirf yahan background apply kiya gaya hai */}
              <TouchableOpacity onPress={handleHistoryPress} style={styles.historyBtnBackground}>
                <Text style={styles.seeAllText}>View History</Text>
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
        </>
      )}

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
            icon={<Text style={{fontSize: 22}}>🏠</Text>} 
            isActive={currentScreen === null}
            onClick={handleHomePress}
          />
          <NavButton 
            label="New Visit"
            icon={<Text style={{fontSize: 22}}>📍</Text>} 
            isActive={currentScreen === 'newVisit'}
            onClick={handleNewVisitPress}
          />
          <View style={styles.plusActionWrapper}>
            <PlusButton 
              onPress={handleAddClientsPress}
              iconName="plus"
              iconColor="#FFFFFF"
              backgroundColor="#A855F7" 
              size={58}
              iconSize={28}
              style={styles.plusShadowFree} 
            />
          </View>
          <NavButton 
            label="History"
            icon={<Text style={{fontSize: 22}}>🕒</Text>} 
            isActive={currentScreen === 'history'}
            onClick={handleHistoryPress}
          />
          <NavButton 
            label="Teams"
            icon={<Text style={{fontSize: 22}}>👥</Text>} 
            isActive={currentScreen === 'teams'}
            onClick={handleTeamsPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const statsStyles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F5',
  },
  mainScroll: {
    paddingHorizontal: 25,
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
  // New style for View History background
  historyBtnBackground: {
    backgroundColor: '#1e3ea8ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  seeAllText: {
    fontSize: 14,
    color: '#d3d3daff',
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
  },
  plusShadowFree: {
    shadowOpacity: 0,
    elevation: 0,
  }
});

export default Dashboard;