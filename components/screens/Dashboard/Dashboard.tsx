import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PlusButton from '../../common/Buttons/PlusButton'
import ImageDesCard from '../../common/Cards/ImageDesCard'
import InfoCard from '../../common/Cards/InfoCard'

const Dashboard = ({ onBack }: { onBack?: () => void }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#313867" />
      <View style={styles.header}>
        <Text style={styles.title}>Artist-Crm</Text>
        <TouchableOpacity style={styles.userIcon}>
          <Ionicons name="person" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.welcomeTitle}>WELCOME!</Text>
        
        <View style={styles.cardsGrid}>
          <InfoCard 
            title="56" 
            description="Clients"
            backgroundColor="#2D2F50"
            titleColor="#FFFFFF"
            descriptionColor="#FFFFFF"
            containerStyle={{
              borderWidth: 1,
              borderColor: '#808080',
              width: '48%',
              minHeight: 80,
            }}
          />
          <InfoCard 
            title="10" 
            description="Active Clients"
            backgroundColor="#2D2F50"
            titleColor="#FFFFFF"
            descriptionColor="#FFFFFF"
            containerStyle={{
              borderWidth: 1,
              borderColor: '#808080',
              width: '48%',
              minHeight: 80,
            }}
          />
        </View>

        <Text style={styles.sectionTitle}>Recent Visits</Text>
        
        <View style={styles.cardsGrid}>
          <ImageDesCard 
            imageSource={require('../../../assets/images/icon.png')}
            title="John"
            description="Last visit: 2 days ago"
            backgroundColor="#2D2F50"
            titleStyle={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginBottom: 2 }}
            descriptionStyle={{ color: '#FFFFFF', fontSize: 12, fontWeight: '400', lineHeight: 14 }}
            cardMargin={0}
            cardPadding={15}
            containerStyle={{
              borderWidth: 1,
              borderColor: '#808080',
              width: '48%',
              height: 85,
              minHeight: 85,
            }}
            imageSize={30}
            imageBorderRadius={15}
          />
          <ImageDesCard 
            imageSource={require('../../../assets/images/favicon.png')}
            title="Smith"
            description="Last visit: 3 days ago"
            backgroundColor="#2D2F50"
            titleStyle={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginBottom: 2 }}
            descriptionStyle={{ color: '#FFFFFF', fontSize: 12, fontWeight: '400', lineHeight: 14 }}
            cardMargin={0}
            cardPadding={15}
            containerStyle={{
              borderWidth: 1,
              borderColor: '#808080',
              width: '48%',
              height: 85,
              minHeight: 85,
            }}
            imageSize={30}
            imageBorderRadius={15}
          />
        </View>
        
        <View style={[styles.cardsGrid, { marginTop: 10 }]}>
          <ImageDesCard 
            imageSource={require('../../../assets/images/splash-icon.png')}
            title="Mike"
            description="Last visit: 5 days ago"
            backgroundColor="#2D2F50"
            titleStyle={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginBottom: 2 }}
            descriptionStyle={{ color: '#FFFFFF', fontSize: 12, fontWeight: '400', lineHeight: 14 }}
            cardMargin={0}
            cardPadding={15}
            containerStyle={{
              borderWidth: 1,
              borderColor: '#808080',
              width: '48%',
              height: 85,
              minHeight: 85,
            }}
            imageSize={30}
            imageBorderRadius={15}
          />
          <ImageDesCard 
            imageSource={require('../../../assets/images/react-logo.png')}
            title="Wilson"
            description="Last visit: 1 week ago"
            backgroundColor="#2D2F50"
            titleStyle={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginBottom: 2 }}
            descriptionStyle={{ color: '#FFFFFF', fontSize: 12, fontWeight: '400', lineHeight: 14 }}
            cardMargin={0}
            cardPadding={15}
            containerStyle={{
              borderWidth: 1,
              borderColor: '#808080',
              width: '48%',
              height: 85,
              minHeight: 85,
            }}
            imageSize={30}
            imageBorderRadius={15}
          />
        </View>

        <View style={[styles.cardsGrid, { marginTop: 10 }]}>
          <ImageDesCard 
            imageSource={require('../../../assets/images/android-icon-foreground.png')}
            title="Alex"
            description="Last visit: 2 weeks ago"
            backgroundColor="#2D2F50"
            titleStyle={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginBottom: 2 }}
            descriptionStyle={{ color: '#FFFFFF', fontSize: 12, fontWeight: '400', lineHeight: 14 }}
            cardMargin={0}
            cardPadding={15}
            containerStyle={{
              borderWidth: 1,
              borderColor: '#808080',
              width: '48%',
              height: 85,
              minHeight: 85,
            }}
            imageSize={30}
            imageBorderRadius={15}
          />
          <ImageDesCard 
            imageSource={require('../../../assets/images/android-icon-background.png')}
            title="Emma"
            description="Last visit: 3 weeks ago"
            backgroundColor="#2D2F50"
            titleStyle={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginBottom: 2 }}
            descriptionStyle={{ color: '#FFFFFF', fontSize: 12, fontWeight: '400', lineHeight: 14 }}
            cardMargin={0}
            cardPadding={15}
            containerStyle={{
              borderWidth: 1,
              borderColor: '#808080',
              width: '48%',
              height: 85,
              minHeight: 85,
            }}
            imageSize={30}
            imageBorderRadius={15}
          />
        </View>
      </View>

      <View style={styles.menuSection}>
        <View style={styles.menuButtonsContainer}>
          <PlusButton 
            onPress={() => console.log('Home pressed')}
            iconName="home"
            iconColor="#808080"
            backgroundColor="transparent"
            size={50}
            iconSize={25}
            style={styles.transparentButton}
          />
          <PlusButton 
            onPress={() => console.log('Settings pressed')}
            iconName="cog"
            iconColor="#808080"
            backgroundColor="transparent"
            size={50}
            iconSize={25}
            style={styles.transparentButton}
          />
          <PlusButton 
            onPress={() => console.log('Plus pressed')}
            iconName="plus"
            iconColor="#FFFFFF"
            backgroundColor="#313867"
            size={70}
            iconSize={35}
          />
          <PlusButton 
            onPress={() => console.log('History pressed')}
            iconName="history"
            iconColor="#808080"
            backgroundColor="transparent"
            size={50}
            iconSize={25}
            style={styles.transparentButton}
          />
          <PlusButton 
            onPress={() => console.log('Team pressed')}
            iconName="account-group"
            iconColor="#808080"
            backgroundColor="transparent"
            size={50}
            iconSize={25}
            style={styles.transparentButton}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#5152B3',
    backgroundColor:"#2C3E50",
    marginTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIconText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  cardsGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 30,
    marginBottom: 15,
  },
  imageCardsContainer: {
    backgroundColor: '#000000',
    padding: 5,
    borderRadius: 8,
  },
  menuSection: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  menuButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  transparentButton: {
    borderRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
  },
  imageCcardsGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    marginBottom: 10,
  },
})

export default Dashboard
