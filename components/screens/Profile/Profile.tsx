import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Alert, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
      {showSetting ? (
        <>
          <Setting onBack={handleSettingBack} />
        </>
      ) : (
        <>
      {/* Black Header Section - 20% of screen height */}
      <View style={styles.blackHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PROFILE PAGE</Text>
      </View>

      {/* White Content Section */}
      <View style={styles.whiteContent}>
        {/* Profile Image positioned at border - Fixed (non-scrollable) */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleImageUpload} style={styles.profileImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <MaterialCommunityIcons name="camera" size={30} color="#FFD700" />
                <Text style={styles.uploadText}>Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  blackHeader: {
    height: screenHeight * 0.25, // 25% of screen height
    backgroundColor: "#000",
    paddingTop: 35,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backButton: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  whiteContent: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 70, // Space for the profile image
  },
  imageContainer: {
    position: "absolute",
    top: -60, // Position at border - 50% in black, 50% in white
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10, // Ensure it stays on top
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadedImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  uploadPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    fontSize: 12,
    color: "#FFD700",
    marginTop: 5,
    fontWeight: "bold",
  },
  profileContent: {
    alignItems: "flex-start",
    marginTop: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    width: "100%",
  },
  profileBusiness: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
    width: "100%",
  },
  contactText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    marginTop: 20,
  },
  settingContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: "center",
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
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
    alignSelf: "center",
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
