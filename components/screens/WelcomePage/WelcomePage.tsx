import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'

import DynamicButton from '../../common/Buttons/DynamicButton'
import PlusButton from '../../common/Buttons/PlusButton'

import Login from '../Login/login'
import Signup from '../Signup/Signup'

const WelcomePage = ({ onLoginSuccess }: { onLoginSuccess?: () => void }) => {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'login' | 'signup' | 'home'>('welcome')

  const renderPage = () => {
    switch(currentPage) {
      case 'login':
        return <Login onBack={() => setCurrentPage('welcome')} onNavigateToHome={() => onLoginSuccess?.()} onNavigateToMainHome={() => onLoginSuccess?.()} />
      case 'signup':
        return <Signup onBack={() => setCurrentPage('welcome')} onNavigateToLogin={() => setCurrentPage('welcome')} onNavigateToHome={() => onLoginSuccess?.()} onNavigateToMainHome={() => onLoginSuccess?.()} />
      case 'home':
        return 
      default:
        return (
          <>
            {/* Top Image */}
            <Image 
              source={require('../../../assets/homeimages/welcomepagepic.png')}
              style={styles.topImage}
              resizeMode="contain"
            />
            
            {/* Welcome Title */}
            <Text style={styles.welcomeTitle}>Welcome Back!</Text>
            
            {/* Description */}
            <Text style={styles.description}>
              Welcome to &quot;Artist-CRM&quot; where you can manage your client data
            </Text>
            
            {/* Login Button */}
            <DynamicButton 
              text="Login"
              onPress={() => setCurrentPage('login')}
              backgroundColor="#5152B3"
              textColor="white"
              borderRadius={25}
              width="100%"
              height={50}
            />
            
            {/* Gap between buttons */}
            <View style={styles.buttonGap} />
            
            {/* Signup Button */}
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
            
            {/* Signin text */}
            <Text style={styles.signinText}>Login using</Text>
            
            {/* Social Buttons */}
            <View style={styles.socialContainer}>
              <PlusButton 
                onPress={() => console.log('Google button clicked')}
                size={50}
                backgroundColor="#DB4437"
                iconSize={24}
                iconName="google"
                iconColor="white"
              />
              
              <View style={styles.socialGap} />
              
              <PlusButton 
                onPress={() => console.log('Facebook button clicked')}
                size={50}
                backgroundColor="#4267B2"
                iconSize={24}
                iconName="facebook"
                iconColor="white"
              />
            </View>
          </>
        )
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {renderPage()}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 120,
  },
  topImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginTop: 10,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
   
  },
  signinText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  buttonGap: {
    height: 10,
  },
  socialGap: {
    width: 20,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  homeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5152B3',
    marginBottom: 15,
    textAlign: 'center',
  },
  homeSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
})

export default WelcomePage
