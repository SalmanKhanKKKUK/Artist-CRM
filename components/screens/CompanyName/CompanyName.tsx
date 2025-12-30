import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
 
import Profile from '../Profile/Profile';

const { height } = Dimensions.get('window');

const CompanyName = ({ onBack }: { onBack?: () => void }) => {
  
  const [showProfile, setShowProfile] = useState(false);
  console.log('CompanyName component rendered');
  if (showProfile) {
    return <Profile onBack={() => setShowProfile(false)} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Black Header - 15vh height */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => onBack?.()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>COMPANY NAME</Text>
      </View>
      
      {/* Bottom White Content */}
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          {/* Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>Company Name:</Text>
              <Text style={styles.cardValue}>Saglinks</Text>
            </View>
          </View>

          {/* Optional link to open Profile */}
          <View style={{ width: '100%', maxWidth: 400, marginTop: 12 }}>
            <TouchableOpacity
              accessibilityRole="link"
              onPress={() => setShowProfile(true)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={styles.linkRow}
            >
              <MaterialCommunityIcons name="link-variant" size={16} color="#1E90FF" style={{ marginRight: 6 }} />
              <Text style={styles.linkText}>www.acmecorp.com</Text>
            </TouchableOpacity>
          </View>

        
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    height: height * 0.15,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  backText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  cardValue: {
    fontSize: 16,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    marginTop: 8,
    color: '#1E90FF',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
});

export default CompanyName;
