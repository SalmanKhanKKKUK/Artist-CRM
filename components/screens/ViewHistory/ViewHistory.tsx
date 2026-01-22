import { THEME_COLORS } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import NavHeader from '../../common/Buttons/NavHeader'

interface ViewHistoryProps {
  onBack?: () => void;
}

const ViewHistory: React.FC<ViewHistoryProps> = ({ onBack }) => {
  return (
    <LinearGradient colors={THEME_COLORS.bgGradient} style={styles.gradientContainer}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        <NavHeader title="View History Details">
          {/* Header content if needed */}
        </NavHeader>
        
        <View style={styles.content}>
          <Text style={styles.title}>View History Details</Text>
          <Text style={styles.subtitle}>This is where the detailed history view will be displayed</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
})

export default ViewHistory
