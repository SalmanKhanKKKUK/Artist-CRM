import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { 
  Alert, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  StatusBar, 
  Text, 
  TouchableOpacity, 
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DynamicButton from "../../common/Buttons/DynamicButton";
import Setting from "../Setting/Setting";

const Profile = ({ onBack }: any) => {
  const [profileImage, setProfileImage] = useState<any>(null);
  const [showSetting, setShowSetting] = useState(false);

  const handleImageUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (showSetting) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={false} />
        <Setting onBack={() => setShowSetting(false)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={false} />
      
      <View style={styles.mainWrapper}>
        
        {/* ================= FIXED BLACK HEADER ================= */}
        <View style={styles.titleContainer}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onBack}>
              <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>PROFILE</Text>
            <View style={{ width: 28 }} />
          </View>
          
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

        {/* ================= SCROLLABLE WHITE CONTENT ================= */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          {/* formSection holds the Rounded Corners and Scrolls up */}
          <View style={styles.formSection}>
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.profileContent}>
                <Text style={styles.profileName}>Aqib Shoaib</Text>
                <Text style={styles.profileBusiness}>Saloon Hair</Text>
              </View>
              
              <View style={styles.infoWrapper}>
                <View style={styles.sentenceCard}>
                   <Text style={styles.infoCardTitle}>Email: </Text>
                   <Text style={styles.infoCardDescription}>aqibshoaib@gmail.com</Text>
                </View>

                <View style={styles.sentenceCard}>
                   <Text style={styles.infoCardTitle}>Phone: </Text>
                   <Text style={styles.infoCardDescription}>3118298343</Text>
                </View>

                <TouchableOpacity 
                  style={styles.clickableCard} 
                  onPress={() => setShowSetting(true)}
                >
                  <Text style={styles.infoCardTitle}>Setting</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.clickableCard}>
                  <Text style={styles.infoCardTitle}>Manage Billing</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#333" />
                </TouchableOpacity>

                <DynamicButton
                  text="Logout"
                  onPress={() => Alert.alert('Logout', 'Are you sure?')}
                  backgroundColor="#FF4444"
                  textColor="#FFFFFF"
                  width="100%"
                  borderRadius={10}
                  containerStyle={styles.logoutBtnContainer}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

// Styles as any to bypass all TypeScript checks
const styles: any = {
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  mainWrapper: {
    flex: 1,
    backgroundColor: '#000000', 
  },
  titleContainer: {
    backgroundColor: '#000',
    paddingBottom: 40,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  cameraContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  cameraButton: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  profileImage: {
    width: 124,
    height: 124,
    borderRadius: 62,
  },
  cameraPlaceholder: {
    alignItems: 'center',
  },
  cameraText: {
    color: '#FFD700',
    fontSize: 12,
    marginTop: 5,
  },
  formSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -30, 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  profileContent: {
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  profileBusiness: {
    fontSize: 18,
    color: '#666',
    marginTop: 4,
  },
  infoWrapper: {
    width: '100%',
  },
  sentenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clickableCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  infoCardDescription: {
    fontSize: 16,
    color: "#666",
  },
  logoutBtnContainer: {
    marginTop: 30, 
    marginBottom: 40
  },
};

export default Profile;