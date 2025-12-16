import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DynamicButton from '../../common/Buttons/DynamicButton';
import InfoCard from '../../common/Cards/InfoCard';

interface NewVisitProps {
  onBack?: () => void;
  clientName?: string;
}

const NewVisit: React.FC<NewVisitProps> = ({ onBack, clientName = "Client" }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Black Header Section - 30vh */}
        <View style={styles.blackHeader}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          
          {/* Content Row with Image and Text - Same as About page */}
          <View style={styles.contentRow}>
            {/* Profile Image on left */}
            <Image 
              source={{ uri: 'https://picsum.photos/50/50' }} 
              style={styles.profileImage}
              defaultSource={require('../../../assets/homeimages/logo.png')}
            />
            
            {/* Title and Info */}
            <View style={styles.textColumn}>
              {/* Title */}
              <Text style={styles.whiteTitle}>Add New Visit</Text>
              
              {/* Client Name */}
              <Text style={styles.whiteSubText}>{clientName}</Text>
            </View>
          </View>
          
          {/* New Visit Details Title inside black header */}
          <Text style={styles.newVisitDetailsTitle}>New Visit Details</Text>
        </View>

        {/* White Section */}
        <View style={styles.whiteSection}>
          <InfoCard
            title="Service: "
            description="e.g Full Cut"
            backgroundColor="#F8F8F8"
            titleSize={16}
            descriptionSize={12}
            titleWeight="600"
            descriptionWeight="normal"
            margin={0}
            containerStyle={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: 15,
            }}
          />
          
          {/* Quick Tags Section */}
          <View style={styles.quickTagsContainer}>
            <Text style={styles.quickTagsTitle}>Quick Tags</Text>
            <View style={styles.tagsGrid}>
              <View style={styles.tag}><Text style={styles.tagText}>Bleech</Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>Toner</Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>color</Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>style</Text></View>
            </View>
          </View>
          
          {/* Formulas/Notes Section */}
          <View style={styles.formulasContainer}>
            <Text style={styles.formulasTitle}>Formulas/Notes</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Technical Notes, Formulas"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>
          
          {/* Add Photos Section */}
          <View style={styles.photosContainer}>
            <Text style={styles.photosTitle}>Add Photos</Text>
            <View style={styles.photosGrid}>
              <View style={styles.photoIcon}>
                <Text style={styles.photoIconText}>📷</Text>
                <Text style={styles.photoLabel}>Before</Text>
              </View>
              <View style={styles.photoIcon}>
                <Text style={styles.photoIconText}>📷</Text>
                <Text style={styles.photoLabel}>After</Text>
              </View>
              <View style={styles.photoIcon}>
                <Text style={styles.photoIconText}>📷</Text>
                <Text style={styles.photoLabel}>Plus</Text>
              </View>
            </View>
          </View>
          
          {/* Dynamic Buttons Section */}
          <View style={styles.buttonsContainer}>
            <DynamicButton
              text="Save Visit"
              onPress={() => console.log('Save Visit pressed')}
              backgroundColor="#4CAF50"
              textColor="#FFFFFF"
            />
            <DynamicButton
              text="Cancel"
              onPress={() => console.log('Cancel pressed')}
              backgroundColor="#F44336"
              textColor="#FFFFFF"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  blackHeader: {
    height: '30%',
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
  newVisitDetailsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    left: 20,
    bottom: 15,
  },
  whiteSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  quickTagsContainer: {
    marginTop: 20,
    paddingVertical: 15,
  },
  quickTagsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  tagsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
  formulasContainer: {
    marginTop: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
  },
  formulasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
    backgroundColor: 'transparent',
    borderWidth: 0,
    minHeight: 60,
  },
  photosContainer: {
    marginTop: 20,
    paddingVertical: 15,
  },
  photosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  photosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoIcon: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  photoIconText: {
    fontSize: 24,
    marginBottom: 5,
  },
  photoLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  saveButton: {
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    marginLeft: 10,
  },
});

export default NewVisit;
