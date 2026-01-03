import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { 
  Image, 
  ScrollView, 
  StatusBar, 
  Text, 
  TouchableOpacity, 
  View, 
  Platform, 
  KeyboardAvoidingView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicButton from '../../common/Buttons/DynamicButton';
import DetailCard from '../../common/Cards/DetailCard';
import ImageDesCard from '../../common/Cards/ImageDesCard';
import InfoCard from '../../common/Cards/InfoCard';
import PreferCard from '../../common/Cards/PreferCard';
import NewVisit from '../NewVisit/NewVisit';

const About = ({ onBack, clientName = "Salman Khan" }: any) => {
  const [activeSection, setActiveSection] = useState('history');
  const [showNewVisit, setShowNewVisit] = useState(false);

  if (showNewVisit) {
    return <NewVisit onBack={() => setShowNewVisit(false)} clientName={clientName} />;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={false} />
      
      <View style={styles.mainWrapper}>
        
        {/* ================= FIXED BLACK HEADER SECTION ================= */}
        <View style={styles.blackHeader}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onBack}>
              <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
            </TouchableOpacity>
            <View style={{ width: 28 }} /> 
          </View>
          
          <View style={styles.profileHeaderContent}>
            <View style={styles.contentRow}>
              <Image 
                source={{ uri: 'https://picsum.photos/80/80' }} 
                style={styles.profileImage}
              />
              <View style={styles.headerTextColumn}>
                <Text style={styles.clientNameText}>{clientName}</Text>
                <Text style={styles.lastVisitText}>Last visited: 2 hours ago</Text>
              </View>
              <DynamicButton
                text="New Visit"
                onPress={() => setShowNewVisit(true)}
                backgroundColor="#FFFFFF" 
                textColor="#000000"
                borderRadius={8}
                paddingVertical={8}
                paddingHorizontal={15}
                fontSize={12}
                fontWeight="bold"
              />
            </View>

            {/* Adjusted Tabs - Both White Background */}
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={styles.tabButton} 
                onPress={() => setActiveSection('history')}
              >
                <Text style={styles.tabText}>History</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.tabButton} 
                onPress={() => setActiveSection('info')}
              >
                <Text style={styles.tabText}>Info</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ================= WHITE FORM SECTION (Signup Rounded Style) ================= */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          {/* formSection holds the Rounded Corners Design */}
          <View style={styles.formSection}>
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.sectionPadding}>
                {activeSection === 'history' ? (
                  <View>
                    <InfoCard
                      title="Service: Full Color"
                      description="Price: 500PKR"
                      backgroundColor="#F8F8F8"
                      containerStyle={{ marginBottom: 15, marginTop: 10 }}
                    />
                    
                    <View style={styles.historyImagesRow}>
                      <View style={styles.imageWrapper}>
                        <Image source={{ uri: 'https://picsum.photos/150/150' }} style={styles.historyImg} />
                        <View style={styles.imageOverlay}><Text style={styles.overlayText}>Before</Text></View>
                      </View>
                      <View style={styles.imageWrapper}>
                        <Image source={{ uri: 'https://picsum.photos/151/151' }} style={styles.historyImg} />
                        <View style={styles.imageOverlay}><Text style={styles.overlayText}>After</Text></View>
                      </View>
                    </View>

                    <InfoCard
                      title="Dec, 1, 2025"
                      description="[bleech root] [s toner] [violet ash] [vio deeper]"
                      backgroundColor="#F8F8F8"
                      containerStyle={{ marginBottom: 15 }}
                    />

                    <ImageDesCard
                      imageSource={{ uri: 'https://picsum.photos/80/80' }}
                      title="Service Summary"
                      description="Detailed description of the service provided to the client."
                      backgroundColor="#F8F8F8"
                    />
                  </View>
                ) : (
                  <View>
                    <DetailCard
                      title="PERSONAL DETAILS"
                      name={clientName}
                      phone="+92 300 1234567"
                      email="Exam@gmail.com"
                      birthday="Jan 15, 1990"
                      containerStyle={{ marginTop: 10 }}
                    />
                    
                    <PreferCard
                      title="Preferences"
                      allergies="No allergies"
                      favoriteStyle="Modern Classic"
                      notes="Regular customer, prefers appointments on weekends."
                    />

                    <ImageDesCard
                      imageSource={{ uri: 'https://picsum.photos/81/81' }}
                      title="Consultation Notes"
                      description="Detailed notes about client preferences and skin sensitivity."
                      backgroundColor="#F8F8F8"
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

// Styles as plain object to avoid TS check
const styles: any = {
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  blackHeader: {
    backgroundColor: '#000',
    paddingBottom: 45, // Enough space for rounded section to overlap
    alignItems: 'center',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    paddingTop: 10,
  },
  profileHeaderContent: {
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 10,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: '#333',
  },
  headerTextColumn: {
    flex: 1,
    marginLeft: 15,
  },
  clientNameText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  lastVisitText: {
    color: '#999',
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  formSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -35, // Overlap design like Signup
    borderTopLeftRadius: 35, // Rounded corners
    borderTopRightRadius: 35, // Rounded corners
    overflow: 'hidden',
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionPadding: {
    paddingHorizontal: 20,
    paddingTop: 20, // Adjusted margin top so content looks proper
    paddingBottom: 40,
  },
  historyImagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  imageWrapper: {
    width: '48%',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  historyImg: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 4,
    alignItems: 'center',
  },
  overlayText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
};

export default About;

