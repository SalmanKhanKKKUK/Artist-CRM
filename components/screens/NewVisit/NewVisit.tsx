import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Component Imports
import Input from '../../common/Inputs/Input';
import NavHeader from '../../common/Buttons/NavHeader';
import DynamicButton from '../../common/Buttons/DynamicButton';

const { width } = Dimensions.get('window');

interface NewVisitProps {
  onBack: () => void;
  onNavigateToWelcome?: () => void;
}

const NewVisit: React.FC<NewVisitProps> = ({ onBack }) => {
  const [service, setService] = useState<string>('');
  const [formula, setFormula] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  
  const insets = useSafeAreaInsets();

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map(asset => asset.uri);
      setImages(prev => [...prev, ...selectedUris]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView style={styles.masterContainer} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <NavHeader title="Add New Visit !" showProfileIcon={false}>
        <DynamicButton 
          text="Save"
          onPress={onBack}
          backgroundColor="transparent"
          textColor="#5152B3"
          paddingVertical={8}
          paddingHorizontal={5}
          fontSize={18}
          fontWeight="bold"
        />
      </NavHeader>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.flexOne}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 50 + insets.bottom } 
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <Text style={styles.label}>Service</Text>
            
            <Input
              value={service}
              onChangeText={setService}
              placeholder="Search service..."
              autoCapitalize="none"
              leftIcon="magnify"
              containerStyle={[styles.fullWidthInput, styles.roundedInput]}
              size="large"
              variant="outlined"
            />

            <View style={styles.sectionGap} />
            
            <Text style={styles.label}>Quick Tags</Text>
            <View style={styles.tagsGrid}>
              {['Bleech', 'Toner', 'Color', 'Style'].map((tag) => (
                <TouchableOpacity key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.sectionGap} />
            
            <Text style={styles.label}>Formulas / Notes</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter Technical Notes..."
              placeholderTextColor="#94A3B8"
              multiline
              value={formula}
              onChangeText={setFormula}
            />

            <View style={styles.sectionGap} />
            
            <Text style={styles.label}>Visit Photos</Text>
            
            <View style={styles.imageSection}>
              {/* Photo box now matches Input design exactly */}
              <TouchableOpacity 
                style={styles.fullWidthPhotoBox} 
                onPress={handleImagePick}
              >
                <MaterialCommunityIcons name="camera-plus" size={35} color="#5152B3" />
                <Text style={styles.photoHint}>Add Visit Images</Text>
              </TouchableOpacity>

              {images.length > 0 && (
                <View style={styles.imageGrid}>
                  {images.map((uri, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <Image source={{ uri }} style={styles.uploadedImg} />
                      <TouchableOpacity 
                        style={styles.removeIcon} 
                        onPress={() => removeImage(index)}
                      >
                        <Ionicons name="close-circle" size={22} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: '#F1F3F5', 
  },
  flexOne: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  formContainer: {
    width: '100%',
  },
  fullWidthInput: {
    width: '100%',
  },
  roundedInput: {
    borderRadius: 25,
  },
  sectionGap: {
    height: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5152B3',
    marginBottom: 10,
    marginLeft: 5,
  },
  tagsGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '700',
  },
  textArea: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 25, 
    padding: 18,
    height: 140,
    textAlignVertical: 'top',
    color: '#333',
    backgroundColor: '#FFFFFF',
  },
  imageSection: {
    width: '100%',
  },
  fullWidthPhotoBox: {
    width: '100%',
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1,            
    borderColor: '#E2E8F0',   
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageWrapper: {
    width: (width - 74) / 3,
    height: 110,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  uploadedImg: {
    width: '100%',
    height: '100%',
  },
  removeIcon: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  photoHint: {
    fontSize: 15,
    color: '#5152B3',
    marginTop: 10,
    fontWeight: '600',
  },
});

export default NewVisit;