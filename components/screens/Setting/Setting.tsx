// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Storage import kiya
// import React, { useEffect, useMemo, useState } from 'react';
// import {
//   Alert,
//   BackHandler,
//   Dimensions,
//   Image,
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// // Reusable Components
// import DynamicButton from '../../common/Buttons/DynamicButton';
// import ToggleButton from '../../common/Buttons/ToggleButton';
// import CalendarCard from '../../common/Cards/CalendarCard';
// import InfoCard from '../../common/Cards/InfoCard';
// import SearchInput from '../../common/Inputs/SearchInput';

// const { width } = Dimensions.get('window');

// type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

// interface SettingProps {
//   onBack: () => void;
// }

// interface SettingItem {
//   id: number;
//   title: string;
//   subtitle: string;
//   icon: IconName;
//   hasRightIcon: boolean;
//   rightIcon?: IconName;
//   hasToggle: boolean;
// }

// const Setting: React.FC<SettingProps> = ({ onBack }) => {
//   const [searchText, setSearchText] = useState<string>('');
//   const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false);
//   const [tempToggleStates, setTempToggleStates] = useState<Record<string, boolean>>({});

//   // Helper function to get current date formatted
//   const getCurrentFormattedDate = () => {
//     return new Date().toLocaleDateString('en-GB', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     });
//   };

//   // State with default as current date
//   const [selectedAppointmentDate, setSelectedAppointmentDate] = useState<string>(`Scheduled: ${getCurrentFormattedDate()}`);

//   // Load saved date from Storage when app starts
//   useEffect(() => {
//     const loadSavedDate = async () => {
//       try {
//         const savedDate = await AsyncStorage.getItem('appointment_date');
//         if (savedDate !== null) {
//           setSelectedAppointmentDate(savedDate);
//         }
//       } catch (error) {
//         console.error("Failed to load date", error);
//       }
//     };
//     loadSavedDate();
//   }, []);

//   useEffect(() => {
//     const backAction = () => {
//       onBack();
//       return true;
//     };
//     const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
//     return () => backHandler.remove();
//   }, [onBack]);

//   const settingsData: SettingItem[] = useMemo(() => [
//     { id: 2, title: 'Operating Hours', subtitle: 'Notice, Buffer, Weekly Notice', icon: 'clock-outline', hasRightIcon: true, rightIcon: 'chevron-right', hasToggle: false },
//     { id: 3, title: 'Tax Setting', subtitle: 'Fees and Refunds', icon: 'file-document-outline', hasRightIcon: true, rightIcon: 'chevron-right', hasToggle: false },
//     { id: 4, title: 'Book & Appointment', subtitle: selectedAppointmentDate, icon: 'calendar-check-outline', hasRightIcon: true, rightIcon: 'calendar', hasToggle: false },
//     { id: 5, title: 'Cancellation Policy', subtitle: 'Terms for cancellations', icon: 'shield-alert-outline', hasRightIcon: false, hasToggle: true },
//     { id: 6, title: 'Custom Notifications', subtitle: 'Email and SMS alerts', icon: 'bell-outline', hasRightIcon: true, rightIcon: 'chevron-right', hasToggle: false },
//     { id: 9, title: 'Two-Factor Auth', subtitle: 'Secure your account', icon: 'shield-key-outline', hasRightIcon: true, rightIcon: 'chevron-right', hasToggle: false },
//     { id: 10, title: 'Dark Mode', subtitle: 'Switch app theme', icon: 'moon-waning-crescent', hasRightIcon: false, hasToggle: true }
//   ], [selectedAppointmentDate]);

//   const filteredData = useMemo(() => {
//     if (!searchText) return settingsData;
//     return settingsData.filter(item => 
//       item.title.toLowerCase().includes(searchText.toLowerCase())
//     );
//   }, [searchText, settingsData]);

//   // Handle selection and save to permanent storage
//   const handleDateSelect = async (date: Date) => {
//     const formattedDate = date.toLocaleDateString('en-GB', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     });
//     const finalDateString = `Scheduled: ${formattedDate}`;
    
//     try {
//       setSelectedAppointmentDate(finalDateString);
//       await AsyncStorage.setItem('appointment_date', finalDateString); // Save permanently
//       setShowCalendarModal(false);
//     } catch (error) {
//       console.error("Failed to save date", error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
//       <KeyboardAvoidingView 
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
//         style={styles.flexOne}
//       >
//         <ScrollView 
//           showsVerticalScrollIndicator={false} 
//           bounces={false}
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//         >
//           <View style={styles.innerContainer}>
//             <Text style={styles.titleText}>Settings</Text>
            
//             <Image 
//               source={require('../../../assets/homeimages/logo.png')}
//               style={styles.topImage}
//               resizeMode="contain"
//             />

//             <View style={styles.formContainer}>
//               <SearchInput
//                 value={searchText}
//                 onChangeText={setSearchText}
//                 placeholder="Search by name..."
//                 containerStyle={styles.searchBox}
//                 showFilterIcon={false}
//               />

//               <Text style={styles.sectionHeading}>General Business Settings</Text>
              
//               <View style={styles.infoWrapper}>
//                 {filteredData.map((item) => (
//                   <TouchableOpacity 
//                     key={item.id} 
//                     onPress={() => item.title === 'Book & Appointment' ? setShowCalendarModal(true) : null}
//                     disabled={item.hasToggle}
//                   >
//                     <View style={styles.cardWrapper}>
//                       <InfoCard 
//                         title={item.title}
//                         description={item.subtitle}
//                         backgroundColor="#F8FAFC"
//                         borderRadius={20}
//                         margin={0}
//                         elevation={0}
//                         containerStyle={styles.cardBorder}
//                         titleSize={15}
//                         descriptionSize={11}
//                       />
                      
//                       <View style={styles.rightElement}>
//                         {item.hasToggle ? (
//                           <ToggleButton
//                             isOn={tempToggleStates[item.title] || false}
//                             onToggle={(isOn) => setTempToggleStates(prev => ({ ...prev, [item.title]: isOn }))}
//                             size={18}
//                           />
//                         ) : (
//                           <MaterialCommunityIcons 
//                             name={(item.rightIcon as any) || 'chevron-right'} 
//                             size={24} 
//                             color="#CBD5E1" 
//                           />
//                         )}
//                       </View>
//                     </View>
//                   </TouchableOpacity>
//                 ))}

//                 <View style={styles.buttonContainer}>
//                   <DynamicButton
//                     text="Save Changes"
//                     onPress={() => Alert.alert('Success', 'Settings updated!')}
//                     backgroundColor="#5152B3"
//                     textColor="#FFFFFF"
//                     borderRadius={25}
//                     width="100%"
//                     paddingVertical={14}
//                   />
//                 </View>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>

//       <Modal visible={showCalendarModal} transparent animationType="fade">
//         <TouchableWithoutFeedback onPress={() => setShowCalendarModal(false)}>
//           <View style={styles.modalBg}>
//             <TouchableWithoutFeedback>
//               <View style={styles.modalContent}>
//                 <CalendarCard 
//                     title="Select Date" 
//                     subtitle="Appointment" 
//                     icon="calendar" 
//                     showHeader={true}
//                     onDateSelect={handleDateSelect} 
//                 />
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   masterContainer: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   flexOne: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: 40,
//   },
//   innerContainer: {
//     alignItems: 'center',
//     paddingTop: 10,
//     paddingHorizontal: 20,
//     width: '100%',
//   },
//   titleText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   topImage: {
//     width: width * 0.8,
//     height: 140,
//     marginBottom: 10,
//   },
//   formContainer: {
//     width: '100%',
//   },
//   searchBox: {
//     width: "100%",
//     marginBottom: 20,
//   },
//   sectionHeading: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 15,
//     color: '#333',
//     marginLeft: 5,
//   },
//   infoWrapper: {
//     gap: 12,
//   },
//   cardWrapper: {
//     position: 'relative',
//     justifyContent: 'center',
//   },
//   cardBorder: {
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//     paddingRight: 50,
//   },
//   rightElement: {
//     position: 'absolute',
//     right: 15,
//   },
//   buttonContainer: {
//     marginTop: 20,
//     width: '100%',
//   },
//   modalBg: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: { 
//     width: '90%',
//     backgroundColor: 'transparent', 
//   },
// });

// export default Setting;