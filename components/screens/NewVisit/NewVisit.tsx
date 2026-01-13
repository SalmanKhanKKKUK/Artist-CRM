import { MaterialCommunityIcons } from '@expo/vector-icons';
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
import { SafeAreaView } from 'react-native-safe-area-context';

// Component Imports
import Input from '../../common/Inputs/Input';
import DynamicButton from '../../common/Buttons/DynamicButton';

const { width } = Dimensions.get('window');

interface NewVisitProps {
  onBack: () => void;
  onNavigateToWelcome?: () => void;
}

const NewVisit: React.FC<NewVisitProps> = ({ onBack }) => {
  const [service, setService] = useState<string>('');
  const [formula, setFormula] = useState<string>('');
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);

  const handleImagePick = async (type: 'before' | 'after') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'before') setBeforeImage(result.assets[0].uri);
      else setAfterImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.flexOne}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          bounces={false} // Extra bouncy scrolling ko khatam karne ke liye
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>
              New-Visit
            </Text>
            
            <Image 
              source={require('../../../assets/homeimages/welcomepagepic.png')}
              style={styles.topImage}
              resizeMode="contain"
            />

            <View style={styles.formContainer}>
              <Input
                value={service}
                onChangeText={setService}
                placeholder="Search Service"
                leftIcon="magnify"
                containerStyle={styles.roundedInput}
                size="large"
                variant="outlined"
              />

              <View style={styles.sectionGap} />
              
              <Text style={styles.label}>
                Quick Tags
              </Text>
              
              <View style={styles.tagsGrid}>
                {['Bleech', 'Toner', 'Color', 'Style'].map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.sectionGap} />
              
              <Text style={styles.label}>
                Formulas / Notes
              </Text>
              
              <TextInput
                style={styles.textArea}
                placeholder="Enter Technical Notes..."
                placeholderTextColor="#94A3B8"
                multiline
                value={formula}
                onChangeText={setFormula}
              />

              <View style={styles.sectionGap} />
              
              <Text style={styles.label}>
                Add Photos
              </Text>
              
              <View style={styles.photoRow}>
                <TouchableOpacity 
                  style={styles.photoBox} 
                  onPress={() => handleImagePick('before')}
                >
                  {beforeImage ? (
                    <Image source={{ uri: beforeImage }} style={styles.uploadedImg} />
                  ) : (
                    <>
                      <MaterialCommunityIcons name="camera" size={28} color="#5152B3" />
                      <Text style={styles.photoHint}>Before</Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.photoBox} 
                  onPress={() => handleImagePick('after')}
                >
                  {afterImage ? (
                    <Image source={{ uri: afterImage }} style={styles.uploadedImg} />
                  ) : (
                    <>
                      <MaterialCommunityIcons name="camera" size={28} color="#5152B3" />
                      <Text style={styles.photoHint}>After</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.buttonGap} />
              
              <DynamicButton
                text="Save Visit"
                onPress={onBack}
                backgroundColor="#5152B3"
                textColor="#FFFFFF"
                borderRadius={25}
                paddingVertical={14}
                width="100%"
              />
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
    backgroundColor: '#FFFFFF',
  },
  flexOne: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 46, 
  },
  innerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  topImage: {
    width: width * 0.75,
    height: 140,
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
  },
  roundedInput: {
    borderRadius: 25,
  },
  sectionGap: {
    height: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginLeft: 10,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 5,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: '#FFF',
  },
  tagText: {
    fontSize: 12,
    color: '#64748B',
  },
  textArea: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    padding: 15,
    height: 80,
    textAlignVertical: 'top',
    color: '#333',
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoBox: {
    width: '48%',
    height: 90,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  uploadedImg: {
    width: '100%',
    height: '100%',
  },
  photoHint: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },
  buttonGap: {
    height: 25,
  },
});

export default NewVisit;