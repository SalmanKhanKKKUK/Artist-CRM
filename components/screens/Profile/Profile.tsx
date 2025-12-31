import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Alert, Dimensions, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DynamicButton from "../../common/Buttons/DynamicButton";
import InfoCard from "../../common/Cards/InfoCard";
import Setting from "../Setting/Setting";

interface ProfileProps {
  onBack: () => void;
}

const { height: screenHeight } = Dimensions.get("window");

const Profile = ({ onBack }: ProfileProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showSetting, setShowSetting] = useState(false);

  const handleImageUpload = async () => {
    try {
      // Request permission
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setProfileImage(selectedImage.uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };

  const handleSettingBack = () => {
    setShowSetting(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {showSetting ? (
            <>
              <Setting onBack={handleSettingBack} />
            </>
          ) : (
            <>
              {/* Title Section with Upload Photo - Like Login Page */}
              <View style={styles.titleContainer}>
                <View style={styles.headerRow}>
                  <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.headerTitle}>PROFILE PAGE</Text>
                </View>
                
                {/* Camera Section - Title ke saath neeche */}
                <View style={styles.cameraContainer}>
                  <TouchableOpacity onPress={handleImageUpload} style={styles.cameraButton}>
                    {profileImage ? (
                      <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    ) : (
                      <View style={styles.cameraPlaceholder}>
                        <MaterialCommunityIcons name="camera" size={50} color="#FFD700" />
                        <Text style={styles.cameraText}>Upload Photo</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Profile Form - Like Login Form */}
              <View style={styles.formContainer}>
                {/* Scrollable Content */}
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                
                {/* Profile Content */}
                <View style={styles.profileContent}>
                  <Text style={styles.profileName}>Aqib Shoaib</Text>
                  <Text style={styles.profileBusiness}>Saloon Hair</Text>
                  <Text style={styles.contactText}>Contact</Text>
                </View>
                
                {/* Email Display */}
                <InfoCard
                  title="Email: "
                  description="aqibshoaib@gmail.com"
                  containerStyle={styles.infoCardContainer}
                  titleStyle={styles.infoCardTitle}
                  descriptionStyle={styles.infoCardDescription}
                  padding={12}
                  margin={0}
                  backgroundColor="#fff"
                  shadowColor="#000"
                  shadowOffset={{
                    width: 0,
                    height: 2,
                  }}
                  shadowOpacity={0.1}
                  shadowRadius={4}
                  elevation={3}
                />

                {/* Phone Display */}
                <InfoCard
                  title="Phone: "
                  description="3118298343"
                  containerStyle={styles.infoCardContainer}
                  titleStyle={styles.infoCardTitle}
                  descriptionStyle={styles.infoCardDescription}
                  padding={12}
                  margin={0}
                  backgroundColor="#fff"
                  shadowColor="#000"
                  shadowOffset={{
                    width: 0,
                    height: 2,
                  }}
                  shadowOpacity={0.1}
                  shadowRadius={4}
                  elevation={3}
                />

                {/* Setting Section */}
                <View style={styles.infoCardContainer}>
                  <View style={styles.settingContent}>
                    <Text style={styles.infoCardTitle}>Setting</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowSetting(true)}>
                    <MaterialCommunityIcons 
                      name="chevron-right" 
                      size={24} 
                      color="#333" 
                    />
                  </TouchableOpacity>
                </View>

                {/* Manage Billing Display */}
                <View style={styles.infoCardContainer}>
                  <View style={styles.settingContent}>
                    <Text style={styles.infoCardTitle}>Manage Billing</Text>
                  </View>
                  <TouchableOpacity onPress={() => console.log('Manage Billing pressed')}>
                    <MaterialCommunityIcons 
                      name="chevron-right" 
                      size={24} 
                      color="#333" 
                    />
                  </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <DynamicButton
                  text="Logout"
                  onPress={() => {
                    Alert.alert('Logout', 'Are you sure you want to logout?', [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Logout', onPress: () => console.log('User logged out') }
                    ]);
                  }}
                  backgroundColor="#FF4444"
                  textColor="#FFFFFF"
                  width="90%"
                  paddingVertical={14}
                  fontSize={16}
                  fontWeight="bold"
                  borderRadius={8}
                  shadowColor="#000"
                  shadowOffset={{
                    width: 0,
                    height: 2,
                  }}
                  shadowOpacity={0.2}
                  shadowRadius={4}
                  elevation={3}
                  containerStyle={{
                    alignSelf: "center",
                    marginTop: 20,
                    marginBottom: 30,
                  }}
                />
              </ScrollView>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    backgroundColor: '#000',
    height: screenHeight * 0.25, // 25vh height
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  whiteContent: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -60, // 50% overlap for 120px photo
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: -60, // Half in black background
    marginBottom: 0, // Remove negative bottom margin
  },
  cameraContainer: {
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: 20, // ✅ Add top margin for proper spacing
  },
  cameraButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    color: '#FFD700',
    fontSize: 12,
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  profileContent: {
    alignItems: 'center',
    paddingTop: 60, // Proper padding for 120px photo
    marginTop: 0, // Remove extra margin
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: 0, // Remove extra margin
  },
  profileBusiness: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
    marginTop: 0, // Remove extra margin
  },
  contactText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 30,
    marginTop: 0, // Remove extra margin
  },
  infoCardContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 60,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 0,
  },
  infoCardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 0,
  },
  settingContent: {
    flex: 1,
  },
  profileSettingsContainer: {
    width: "90%",
    marginTop: 20,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  settingItem: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  settingIcon: {
    marginRight: 15,
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default Profile;
