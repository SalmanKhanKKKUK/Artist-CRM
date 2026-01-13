import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { 
  Alert, 
  Dimensions,
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  StatusBar, 
  StyleSheet,
  Text, 
  TouchableOpacity, 
  View,
  BackHandler // Hardware back button handle karne ke liye
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Reusable Components
import DynamicButton from "../../common/Buttons/DynamicButton";
import InfoCard from "../../common/Cards/InfoCard";
import Setting from "../Setting/Setting";

const { width } = Dimensions.get('window');

interface ProfileProps {
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const [showSetting, setShowSetting] = useState(false);

  // Android Hardware Back Button Logic
  useEffect(() => {
    const backAction = () => {
      if (showSetting) {
        // Agar setting open hai to profile par wapas jao
        setShowSetting(false);
        return true; // Isse app close nahi hogi
      } else {
        // Agar profile par hain to Dashboard (onBack) par jao
        onBack();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [showSetting, onBack]);

  if (showSetting) {
    return <Setting onBack={() => setShowSetting(false)} />;
  }

  return (
    <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flexOne}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <Text style={styles.titleText}>Profile</Text>
            
            <Image 
              source={require('../../../assets/homeimages/welcomepagepic.png')}
              style={styles.topImage}
              resizeMode="contain"
            />

            <View style={styles.formContainer}>
              <View style={styles.profileHeader}>
                <Text style={styles.profileName}>Aqib Shoaib</Text>
                <Text style={styles.profileBusiness}>Saloon Hair</Text>
              </View>

              <View style={styles.infoWrapper}>
                <InfoCard 
                  title="Email"
                  description="aqibshoaib@gmail.com"
                  backgroundColor="#F8FAFC"
                  borderRadius={20}
                  margin={0}
                  elevation={0}
                  containerStyle={styles.cardBorder}
                />

                <InfoCard 
                  title="Phone"
                  description="3118298343"
                  backgroundColor="#F8FAFC"
                  borderRadius={20}
                  margin={0}
                  elevation={0}
                  containerStyle={styles.cardBorder}
                />

                <TouchableOpacity onPress={() => setShowSetting(true)}>
                  <View style={styles.clickableWrapper}>
                    <InfoCard 
                      title="Settings"
                      description="App preferences and security"
                      backgroundColor="#FFFFFF"
                      borderRadius={20}
                      margin={0}
                      elevation={0}
                      containerStyle={styles.cardBorder}
                    />
                    <MaterialCommunityIcons 
                      name="chevron-right" 
                      size={24} 
                      color="#CBD5E1" 
                      style={styles.chevronIcon}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log("Billing Clicked")}>
                  <View style={styles.clickableWrapper}>
                    <InfoCard 
                      title="Manage Billing"
                      description="Subscription and payments"
                      backgroundColor="#FFFFFF"
                      borderRadius={20}
                      margin={0}
                      elevation={0}
                      containerStyle={styles.cardBorder}
                    />
                    <MaterialCommunityIcons 
                      name="chevron-right" 
                      size={24} 
                      color="#CBD5E1" 
                      style={styles.chevronIcon}
                    />
                  </View>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                  <DynamicButton
                    text="Logout"
                    onPress={() => Alert.alert('Logout', 'Are you sure?', [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Logout', onPress: () => onBack(), style: 'destructive' }
                    ])}
                    backgroundColor="#5152B3"
                    textColor="#FFFFFF"
                    borderRadius={25}
                    width="100%"
                    paddingVertical={14}
                  />
                </View>
              </View>
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
    flexGrow: 1,
    paddingBottom: 45,
  },
  innerContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  topImage: {
    width: width * 0.8,
    height: 140,
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileBusiness: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 2,
  },
  infoWrapper: {
    gap: 12,
  },
  cardBorder: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  clickableWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  chevronIcon: {
    position: 'absolute',
    right: 15,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export default Profile;