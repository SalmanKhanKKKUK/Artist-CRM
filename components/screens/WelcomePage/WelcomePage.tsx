import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Login from '../Login/login'
import Signup from '../Signup/Signup'

// TypeScript interfaces
interface CustomButtonProps {
  title: string
  onPress: () => void
  backgroundColor: string
  borderColor: string
  textColor: string
}

interface SocialButtonProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap
  onPress: () => void
  backgroundColor: string
}

// Reusable Button Component
const CustomButton = ({ title, onPress, backgroundColor, borderColor, textColor }: CustomButtonProps) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor, borderColor }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  )
}

// Reusable Social Button Component
const SocialButton = ({ icon, onPress, backgroundColor }: SocialButtonProps) => {
  return (
    <TouchableOpacity 
      style={[styles.socialButton, { backgroundColor }]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={icon} size={24} color="white" />
    </TouchableOpacity>
  )
}

const WelcomePage = () => {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'login' | 'signup'>('welcome')

  const renderPage = () => {
    switch(currentPage) {
      case 'login':
        return <Login onBack={() => setCurrentPage('welcome')} onNavigateToHome={() => setCurrentPage('welcome')} />
      case 'signup':
        return <Signup onBack={() => setCurrentPage('welcome')} onNavigateToLogin={() => setCurrentPage('welcome')} />
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
            <CustomButton 
              title="Login"
              onPress={() => setCurrentPage('login')}
              backgroundColor="#5152B3"
              borderColor="transparent"
              textColor="white"
            />
            
            {/* Signup Button */}
            <CustomButton 
              title="Signup"
              onPress={() => setCurrentPage('signup')}
              backgroundColor="transparent"
              borderColor="#5152B3"
              textColor="#5152B3"
            />
            
            {/* Signin text */}
            <Text style={styles.signinText}>Sign in using</Text>
            
            {/* Social Buttons */}
            <View style={styles.socialContainer}>
              <SocialButton 
                icon="google"
                onPress={() => console.log('Google button clicked')}
                backgroundColor="#DB4437"
              />
              <SocialButton 
                icon="facebook"
                onPress={() => console.log('Facebook button clicked')}
                backgroundColor="#4267B2"
              />
              <SocialButton 
                icon="linkedin"
                onPress={() => console.log('LinkedIn button clicked')}
                backgroundColor="#0077B5"
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
    marginTop: 30,
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
    marginBottom: 15,
  },
})

export default WelcomePage
