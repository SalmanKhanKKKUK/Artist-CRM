import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import DynamicButton from '../../common/Buttons/DynamicButton';
import DetailCard from '../../common/Cards/DetailCard';
import ImageDesCard from '../../common/Cards/ImageDesCard';
import InfoCard from '../../common/Cards/InfoCard';
import PreferCard from '../../common/Cards/PreferCard';
import NewVisit from '../NewVisit/NewVisit';

interface AboutProps {
  onBack?: () => void;
  clientName?: string;
  showHistory?: boolean;
}

const About: React.FC<AboutProps> = ({ onBack, clientName = "Client", showHistory = false }) => {
  const [activeSection, setActiveSection] = useState<'default' | 'history' | 'info'>('history');
  const [showNewVisit, setShowNewVisit] = useState(false);

  const handleHistoryPress = () => {
    setActiveSection('history');
    console.log('History button pressed');
  };

  const handleInfoPress = () => {
    setActiveSection('info');
    console.log('Info button pressed');
  };

  const handleNewVisitPress = () => {
    setShowNewVisit(true);
    console.log('New Visit button pressed - navigating to NewVisit');
  };

  const handleNewVisitBack = () => {
    setShowNewVisit(false);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      {showNewVisit ? (
        <NewVisit 
          onBack={handleNewVisitBack}
          clientName="Salman Khan"
        />
      ) : (
        <View style={styles.container}>
          {/* Black Header Section - 30vh */}
          <View style={styles.blackHeader}>
            
            {/* Content Row with Image and Text */}
            <View style={styles.contentRow}>
              {/* Profile Image on left */}
              <Image 
                source={{ uri: 'https://picsum.photos/50/50' }} 
                style={styles.profileImage}
                defaultSource={require('../../../assets/homeimages/logo.png')}
              />
              
              {/* Title and Info with Button */}
              <View style={styles.textColumnWithButton}>
                {/* Title */}
                <Text style={styles.whiteTitle}>Salman Khan</Text>
                
                {/* Last Visit Date with 5px gap */}
                <Text style={styles.whiteSubText}>Last visited: 2 hours ago</Text>
              </View>
              
              {/* New Visit Button */}
              <DynamicButton
                text="New Visit"
                onPress={handleNewVisitPress}
                backgroundColor="#FFFFFF"
                textColor="#000000"
                borderRadius={5}
                paddingVertical={8}
                paddingHorizontal={12}
                fontSize={12}
              />
            </View>
            
            {/* History and Info Buttons in Black Section */}
            <View style={styles.headerButtons}>
              <View style={styles.buttonRow}>
                <DynamicButton
                  text="History"
                  onPress={handleHistoryPress}
                  backgroundColor="#FFFFFF"
                  textColor="#000000"
                  borderRadius={5}
                  paddingVertical={8}
                  paddingHorizontal={16}
                  fontSize={14}
                  containerStyle={{ flex: 1, marginRight: 8 }}
                />
                
                <DynamicButton
                  text="Info"
                  onPress={handleInfoPress}
                  backgroundColor="#FFFFFF"
                  textColor="#000000"
                  borderRadius={5}
                  paddingVertical={8}
                  paddingHorizontal={16}
                  fontSize={14}
                  containerStyle={{ flex: 1 }}
                />
              </View>
            </View>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
            {/* Conditional Rendering Based on Active Section */}
            {activeSection === 'default' && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No content available</Text>
              </View>
            )}

            {activeSection === 'history' && (
              <View style={styles.sectionContent}>
                <InfoCard
                  title="Service: Full Color"
                  description="Price: 500PKR"
                  backgroundColor="#F8F8F8"
                  titleSize={16}
                  descriptionSize={14}
                  titleWeight="600"
                  descriptionWeight="400"
                  margin={0}
                  containerStyle={{
                    alignSelf: 'center',
                    width: '100%',
                    marginHorizontal: 0,
                    marginBottom: 15,
                  }}
                />
                
                {/* Two Images Below History Card */}
                <View style={[styles.imageContainer, { marginBottom: 15 }]}>
                  <View style={styles.imageWrapper}>
                    <Image 
                      source={{ uri: 'https://picsum.photos/100/100' }} 
                      style={styles.historyImage}
                    />
                    <View style={styles.imageOverlay}>
                      <Text style={styles.overlayText}>Before</Text>
                    </View>
                  </View>
                  <View style={styles.imageWrapper}>
                    <Image 
                      source={{ uri: 'https://picsum.photos/100/101' }} 
                      style={styles.historyImage}
                    />
                    <View style={styles.imageOverlay}>
                      <Text style={styles.overlayText}>After</Text>
                    </View>
                  </View>
                </View>
                
                {/* Service Details Div Below Images */}
                <InfoCard
                  title="Dec, 1, 2025"
                  description="[bleech root] [s toner] [violet ash] [vio deeper]"
                  backgroundColor="#F8F8F8"
                  titleSize={16}
                  descriptionSize={14}
                  titleWeight="bold"
                  descriptionWeight="normal"
                  margin={4}
                  containerStyle={{
                    alignSelf: 'center',
                    width: '100%',
                    marginHorizontal: 0,
                    marginBottom: 15,
                  }}
                />
                
                {/* New Grid Section with Image and Content */}
                <ImageDesCard
                  imageSource={{ uri: 'https://picsum.photos/80/80' }}
                  title="Service Title"
                  description="This is a detailed description of the service provided to the client with all relevant."
                  cardMargin={0}
                  cardMarginTop={5}
                  cardPadding={15}
                  imageSize={80}
                  backgroundColor="#F8F8F8"
                />
                
                {/* Cancel Button at bottom of history section */}
                <DynamicButton
                  text="Cancel"
                  onPress={() => onBack?.()}
                  backgroundColor="#F44336"
                  textColor="#FFFFFF"
                  borderRadius={8}
                  paddingVertical={12}
                  paddingHorizontal={24}
                  fontSize={16}
                  width="80%"
                  containerStyle={{
                    marginTop: 20,
                    marginBottom: 20,
                    alignSelf: 'center',
                  }}
                />
              </View>
            )}

            {activeSection === 'info' && (
              <View style={styles.sectionContent}>
                {/* Personal Information Container */}
                <DetailCard
                  title="PERSONAL Details"
                  name="Salman Khan"
                  phone="+92 300 1234567"
                  email="Exam@gamil.com"
                  birthday="Jan 15, 1990"
                />
                
                {/* Preferences Section */}
                <PreferCard
                  title="Preferences"
                  allergies="No allergies"
                  favoriteStyle="Modern Classic"
                  notes="Regular customer, prefers appointments on weekends. Sensitive to strong chemical smells."
                />
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  blackHeader: {
    height: '25%',
    backgroundColor: '#000',
    paddingTop: 35,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 15,
  },
  textColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColumnWithButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  whiteTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 0,
  },
  whiteSubText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
    marginLeft: 0,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerButtons: {
    marginTop: 15,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  sectionContent: {
    flex: 1,
    padding: 20,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  historyItem: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  historyCard: {
    height: 60,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
    alignSelf: 'stretch',
    marginHorizontal: 0,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  priceText: {
    fontSize: 14,
    color: '#666',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    gap: 0,
    marginLeft: 0,
    width: '100%',
  },
  imageWrapper: {
    position: 'relative',
    width: '48%',
  },
  historyImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    paddingVertical: 4,
  },
  overlayText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  serviceDetailsCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 15,
    marginTop: 8,
    width: '100%',
    alignSelf: 'stretch',
  },
  serviceDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bracketList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  bracketItem: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'normal',
  },
  historyDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  historyDetail: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  personalInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 3,
  },
  infoItem: {
    width: '48%',
    padding: 5,
    borderRadius: 8,
    alignItems: 'flex-start',
    flexShrink: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    textAlign: 'left',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  preferencesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  preferencesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  preferencesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  preferenceItem: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    padding: 8,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  preferenceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    textAlign: 'left',
  },
  preferenceValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  notesSection: {
    width: '100%',
    backgroundColor: '#F8F8F8',
    padding: 8,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  notesLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    textAlign: 'left',
  },
  notesValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  buttonSection: {
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  gridContentCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 15,
    marginTop: 8,
    width: '100%',
    alignSelf: 'stretch',
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
  },
  gridImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  gridDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  });

export default About;
