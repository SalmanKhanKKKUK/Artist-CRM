import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface NewVisitProps {
  onBack?: () => void;
  clientName?: string;
}

const NewVisit: React.FC<NewVisitProps> = ({ onBack, clientName = "Client" }) => {
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [formulaNotes, setFormulaNotes] = useState<string>('');

  const handleImageUpload = async (imageType: 'before' | 'after') => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        if (imageType === 'before') {
          setBeforeImage(selectedImage.uri);
          Alert.alert('Success', 'Before image uploaded successfully!');
        } else {
          setAfterImage(selectedImage.uri);
          Alert.alert('Success', 'After image uploaded successfully!');
        }
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Black Header Section - 30vh */}
        <View style={styles.blackHeader}>
          
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
        <ScrollView style={styles.whiteSection} contentContainerStyle={styles.scrollContent}>
          {/* Service Section */}
          <View style={styles.serviceContainer}>
            <Text style={styles.serviceTitle}>Service: Full Cut, Half Cut</Text>
          </View>
          
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
              style={styles.formulaInput}
              placeholder="Enter Technical Notes, Formulas"
              placeholderTextColor="#999"
              value={formulaNotes}
              onChangeText={setFormulaNotes}
              multiline
              textAlignVertical="top"
            />
          </View>
          
          {/* Photos Section */}
          <View style={styles.photosContainer}>
            <Text style={styles.photosTitle}>Add Photos</Text>
            <View style={styles.photosGrid}>
              <View style={styles.photoItem}>
                <TouchableOpacity onPress={() => handleImageUpload('before')} style={styles.photoButton}>
                  {beforeImage ? (
                    <Image source={{ uri: beforeImage }} style={styles.photoImage} />
                  ) : (
                    <View style={styles.photoPlaceholder}>
                      <MaterialCommunityIcons name="camera" size={50} color="#000000" />
                      <Text style={styles.photoText}>Before</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              
              <View style={styles.photoItem}>
                <TouchableOpacity onPress={() => handleImageUpload('after')} style={styles.photoButton}>
                  {afterImage ? (
                    <Image source={{ uri: afterImage }} style={styles.photoImage} />
                  ) : (
                    <View style={styles.photoPlaceholder}>
                      <MaterialCommunityIcons name="camera" size={50} color="#000000" />
                      <Text style={styles.photoText}>After</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Save Visit pressed')}>
              <Text style={styles.saveButtonText}>Save Visit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancelButton} onPress={onBack}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  serviceContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formulasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  formulaInput: {
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    padding: 8,
    minHeight: 50,
    fontStyle: 'normal',
  },
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    gap: 15,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  photosContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  photosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  photosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    width: '100%',
  },
  photoItem: {
    alignItems: 'center',
    width: '48%',
  },
  photoButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  photoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    color: '#000000',
    fontSize: 12,
    marginTop: 5,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});

export default NewVisit;
