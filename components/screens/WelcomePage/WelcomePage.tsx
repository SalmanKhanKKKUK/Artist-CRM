import React, { useState } from 'react';
import { 
  Image, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  Dimensions 
} from 'react-native';

import DynamicButton from '../../common/Buttons/DynamicButton';
import PlusButton from '../../common/Buttons/PlusButton';

import CompanyName from '../CompanyName/CompanyName';
import Login from '../Login/login';
import Signup from '../Signup/Signup';

const { width } = Dimensions.get('window');

const WelcomePage = ({ onLoginSuccess }: { onLoginSuccess?: () => void }) => {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'login' | 'signup' | 'companyname' | 'home'>('welcome');

  const handleArtistCRMPress = () => {
    console.log('Artist-CRM link pressed');
  };

  const renderPageContent = () => {
    switch(currentPage) {
      case 'login':
        return (
          <Login 
            onBack={() => setCurrentPage('welcome')} 
            onNavigateToDashboard={() => onLoginSuccess?.()} 
          />
        );
      case 'signup':
        return (
          <Signup 
            onBack={() => setCurrentPage('welcome')} 
            onNavigateToLogin={() => setCurrentPage('login')} 
            onNavigateToCompanyName={() => setCurrentPage('companyname')} 
          />
        );
      case 'companyname':
        return (
          <CompanyName 
            onNavigateToProfile={() => onLoginSuccess?.()} 
          />
        );
      default:
        return (
          <View style={styles.content}>
            <Image 
              source={require('../../../assets/homeimages/welcomepagepic.png')}
              style={styles.topImage}
              resizeMode="contain"
            />
            
            <Text style={styles.welcomeTitle}>Welcome Back!</Text>
            
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                  Welcome to{' '}
                  <Text style={styles.artistCRMText} onPress={handleArtistCRMPress}>
                    ARTIST-CRM
                  </Text>
                  {' '}where you can manage your client data
                </Text>
            </View>
            
            <DynamicButton 
              text="Login"
              onPress={() => setCurrentPage('login')}
              backgroundColor="#5152B3"
              textColor="white"
              borderRadius={25}
              width="100%"
              height={50}
            />
            
            <View style={styles.buttonGap} />
            
            <DynamicButton 
              text="Signup"
              onPress={() => setCurrentPage('signup')}
              backgroundColor="transparent"
              textColor="#5152B3"
              borderRadius={25}
              width="100%"
              borderWidth={2}
              borderColor="#5152B3"
              height={50}
            />
            
            <Text style={styles.signinText}>Login using</Text>
            
            <View style={styles.socialContainer}>
              <PlusButton 
                onPress={() => {}}
                size={50}
                backgroundColor="#DB4437"
                iconName="google"
                iconColor="white"
              />
              <View style={styles.socialGap} />
              <PlusButton 
                onPress={() => {}}
                size={50}
                backgroundColor="#4267B2"
                iconName="facebook"
                iconColor="white"
              />
            </View>
          </View>
        );
    }
  }

  return (
    <View style={styles.container}>
      {/* StatusBar ab transparent hai aur koi gap nahi aayega */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {currentPage === 'welcome' ? (
        <ScrollView 
          style={styles.container} 
          contentContainerStyle={styles.welcomeScrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {renderPageContent()}
        </ScrollView>
      ) : (
        // Login/Signup/CompanyName pages
        <View style={styles.pageWrapper}>
          {renderPageContent()}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 30,
  },
  pageWrapper: {
    flex: 1,
  },
  welcomeScrollContent: {
    // Welcome page ki padding kam kar di taake image top ke qareeb ho
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
    width: '100%',
  },
  topImage: {
    width: width * 0.6,
    height: 180,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  artistCRMText: {
    fontWeight: 'bold',
    color: '#5152B3',
    textDecorationLine: 'underline',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  signinText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  buttonGap: {
    height: 15,
  },
  socialGap: {
    width: 20,
  },
});

export default WelcomePage;