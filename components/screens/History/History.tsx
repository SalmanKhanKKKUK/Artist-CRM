import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Reusable components imports
import InfoCard from '../../common/Cards/InfoCard';
import ImageDesCard from '../../common/Cards/ImageDesCard';
import DetailCard from '../../common/Cards/DetailCard';
import PreferCard from '../../common/Cards/PreferCard';
import DynamicButton from '../../common/Buttons/DynamicButton';

const { width } = Dimensions.get('window');

interface HistoryProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
}

const History: React.FC<HistoryProps> = () => {
  const [activeTab, setActiveTab] = useState<'activity' | 'details'>('activity');

  return (
    <SafeAreaView 
      style={styles.masterContainer} 
      edges={['top', 'bottom']}
    >
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.flexOne}
      >
        <View style={styles.innerContainer}>
          <View style={styles.headerRow}>
             <Text style={styles.title}>
               Client History
             </Text>
          </View>
          
          <Image 
            source={require('../../../assets/homeimages/welcomepagepic.png') as any}
            style={styles.topImage}
            resizeMode="contain"
          />

          <View style={styles.tabWrapper}>
            <DynamicButton
              text="Activity"
              onPress={() => setActiveTab('activity')}
              backgroundColor={activeTab === 'activity' ? '#FFFFFF' : 'transparent'}
              textColor={activeTab === 'activity' ? '#5152B3' : '#94A3B8'}
              fontSize={14}
              fontWeight="600"
              borderRadius={20}
              paddingVertical={10}
              elevation={activeTab === 'activity' ? 2 : 0}
              containerStyle={styles.flexOne}
            />
            
            <DynamicButton
              text="Details"
              onPress={() => setActiveTab('details')}
              backgroundColor={activeTab === 'details' ? '#FFFFFF' : 'transparent'}
              textColor={activeTab === 'details' ? '#5152B3' : '#94A3B8'}
              fontSize={14}
              fontWeight="600"
              borderRadius={20}
              paddingVertical={10}
              elevation={activeTab === 'details' ? 2 : 0}
              containerStyle={styles.flexOne}
            />
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            style={styles.scrollBox}
            contentContainerStyle={styles.scrollContent}
            bounces={false} // Extra scrolling aur bounce rokne ke liye
          >
            {activeTab === 'activity' ? (
              <View style={styles.contentFadeIn}>
                <InfoCard
                  title="Service: Full Color"
                  description="Price: 500PKR"
                  backgroundColor="#F8FAFC"
                  containerStyle={styles.cardMargin}
                />
                
                <View style={styles.historyImagesRow}>
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: 'https://picsum.photos/150/150' }} style={styles.historyImg} />
                    <View style={styles.imageOverlay}>
                      <Text style={styles.overlayText}>Before</Text>
                    </View>
                  </View>
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: 'https://picsum.photos/152/152' }} style={styles.historyImg} />
                    <View style={styles.imageOverlay}>
                      <Text style={styles.overlayText}>After</Text>
                    </View>
                  </View>
                </View>

                <InfoCard
                  title="Dec, 1, 2025"
                  description="[bleech root] [s toner] [violet ash]"
                  backgroundColor="#F8FAFC"
                  containerStyle={styles.cardMargin}
                />

                <ImageDesCard
                  imageSource={{ uri: 'https://picsum.photos/80/80' }}
                  title="Service Summary"
                  description="Client was very happy with the violet ash result."
                  backgroundColor="#F8FAFC"
                />
              </View>
            ) : (
              <View style={styles.contentFadeIn}>
                <DetailCard
                  title="PERSONAL DETAILS"
                  name="Salman Khan"
                  phone="+92 300 1234567"
                  email="salman@gmail.com"
                  birthday="Jan 15, 1990"
                  containerStyle={styles.cardMargin}
                />
                
                <PreferCard
                  title="Preferences"
                  allergies="No allergies"
                  favoriteStyle="Modern Classic"
                  notes="Prefers appointments on weekends."
                />

                <View style={styles.gap20} />

                <ImageDesCard
                  imageSource={{ uri: 'https://picsum.photos/81/81' }}
                  title="Consultation Notes"
                  description="Skin sensitivity test passed on Dec 2025."
                  backgroundColor="#F8FAFC"
                />
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flexOne: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  topImage: {
    width: width * 0.6,
    height: 120,
    marginBottom: 15,
  },
  tabWrapper: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 25,
    padding: 5,
    marginBottom: 20,
    width: '100%',
  },
  scrollBox: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 40, // Dashboard ke gap ke liye munasib padding
  },
  contentFadeIn: {
    width: '100%',
  },
  cardMargin: {
    marginBottom: 15,
  },
  historyImagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  imageWrapper: {
    width: '48%',
    height: 110,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  historyImg: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(81, 82, 179, 0.8)',
    paddingVertical: 4,
    alignItems: 'center',
  },
  overlayText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  gap20: {
    height: 20,
  },
});

export default History;