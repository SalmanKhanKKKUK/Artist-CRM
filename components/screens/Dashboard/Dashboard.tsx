import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PlusButton from '../../common/Buttons/PlusButton'
import ImageDesCard from '../../common/Cards/ImageDesCard'
import InfoCard from '../../common/Cards/InfoCard'

const Dashboard = ({ onBack }: { onBack?: () => void }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Top Navigation / Header */}
      <View style={styles.header}>
        <View style={styles.brandWrapper}>
          <Text style={styles.brandTitle}>ARTIST-CRM</Text>
          {/* Status Dot Removed */}
        </View>
        <TouchableOpacity style={styles.profileButton}>
          {/* Notification Icon Removed */}
          <View style={styles.avatarMini}>
            <Ionicons name="person" size={18} color="#5152B3" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainScroll}>
        <Text style={styles.mainGreeting}>Welcome!</Text>
        
        {/* Stats Section - Clean Cards */}
        <View style={styles.statsContainer}>
          <InfoCard 
            title="56" 
            description="Total Clients"
            backgroundColor="#FFFFFF"
            titleColor="#1E293B"
            descriptionColor="#94A3B8"
            titleSize={26}
            margin={0}
            elevation={0} // Shadow removed
            shadowOpacity={0} // Shadow removed
            containerStyle={styles.premiumInfoCard}
          />
          <InfoCard 
            title="10" 
            description="Active Now"
            backgroundColor="#FFFFFF"
            titleColor="#313867"
            descriptionColor="#94A3B8"
            titleSize={26}
            margin={0}
            elevation={0} // Shadow removed
            shadowOpacity={0} // Shadow removed
            containerStyle={styles.premiumInfoCard}
          />
        </View>

        {/* Recent Visits Section */}
        <View style={styles.sectionHeadingWrapper}>
          <Text style={styles.sectionTitle}>Recent Visits</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>View History</Text></TouchableOpacity>
        </View>
        
        {/* Grid with 4 ImageDesCards */}
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
              imageSize={35}
              elevation={0} // Shadow removed
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
              imageSize={35}
              elevation={0} // Shadow removed
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
              imageSize={35}
              elevation={0} // Shadow removed
              containerStyle={styles.visitCardBorder}
            />
            <ImageDesCard 
              imageSource={require('../../../assets/images/react-logo.png')}
              title="Wilson King"
              description="Last visit: 1 week ago"
              backgroundColor="#FFFFFF"
              titleStyle={styles.visitTitle}
              descriptionStyle={styles.visitDesc}
              cardMargin={0}
              cardPadding={12}
              imageSize={35}
              elevation={0} // Shadow removed
              containerStyle={styles.visitCardBorder}
            />
          </View>
        </View>

      </ScrollView>

      {/* Ultra-Clean Bottom Tab Bar (No Shadow) */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navIcon}><Ionicons name="home-sharp" size={24} color="#CBD5E1" /></TouchableOpacity>
          <TouchableOpacity style={styles.navIcon}><Ionicons name="settings-outline" size={24} color="#CBD5E1" /></TouchableOpacity>
          
          <View style={styles.plusActionWrapper}>
            <PlusButton 
              onPress={() => console.log('Plus pressed')}
              iconName="plus"
              iconColor="#FFFFFF"
              backgroundColor="#5152B3"
              size={58}
              iconSize={28}
              // elevation={0} // Internal Shadow removed
              style={styles.plusShadowFree} 
            />
          </View>

          <TouchableOpacity style={styles.navIcon}><Ionicons name="time-outline" size={24} color="#CBD5E1" /></TouchableOpacity>
          <TouchableOpacity style={styles.navIcon}><Ionicons name="people-outline" size={24} color="#CBD5E1" /></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    gap: 12,
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
  },
  visitTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  visitDesc: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: 25,
    height: 90,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  navIcon: {
    padding: 10,
  },
  plusActionWrapper: {
    marginTop: -50,
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 35,
    // Shadow properties removed to make it flat
  },
  plusShadowFree: {
    shadowOpacity: 0,
    elevation: 0,
  }
})

export default Dashboard