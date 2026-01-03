// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import React, { useState } from 'react';
// import { 
//   Alert, 
//   Image, 
//   ScrollView, 
//   StyleSheet, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   View,
//   Platform,
//   KeyboardAvoidingView,
//   StatusBar,
//   ViewStyle,
//   TextStyle,
//   ImageStyle
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Input from '../../common/Inputs/Input';

// interface NewVisitProps {
//   onBack: () => void;
//   clientName?: string;
// }

// const NewVisit: React.FC<NewVisitProps> = ({ onBack, clientName = "Salman Khan" }) => {
//   const [beforeImage, setBeforeImage] = useState<string | null>(null);
//   const [afterImage, setAfterImage] = useState<string | null>(null);
//   const [formulaNotes, setFormulaNotes] = useState<string>('');
//   const [serviceSearch, setServiceSearch] = useState<string>('');

//   const handleImageUpload = async (imageType: 'before' | 'after') => {
//     try {
//       const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (permissionResult.status !== 'granted') {
//         Alert.alert('Permission Denied', 'Media library access is required!');
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 1,
//       });

//       if (!result.canceled && result.assets && result.assets.length > 0) {
//         const uri = result.assets[0].uri;
//         if (imageType === 'before') setBeforeImage(uri);
//         else setAfterImage(uri);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top']}>
//       <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={false} />
      
//       <View style={styles.mainWrapper}>
        
//         {/* ================= FIXED BLACK HEADER (Clean look without Back Icon) ================= */}
//         <View style={styles.titleContainer}>
//           {/* Header row is empty now to keep the spacing or you can remove if not needed */}
//           <View style={styles.headerRow} />
          
//           <View style={styles.profileHeaderContent}>
//             <View style={styles.contentRow}>
//               <Image 
//                 source={{ uri: 'https://picsum.photos/80/80' }} 
//                 style={styles.profileImage}
//               />
//               <View style={styles.headerTextColumn}>
//                 <Text style={styles.whiteTitle}>Add New Visit</Text>
//                 <Text style={styles.whiteSubText}>{clientName}</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* ================= WHITE SECTION (Rounded Overlap) ================= */}
//         <KeyboardAvoidingView 
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//           style={{ flex: 1 }}
//         >
//           <View style={styles.formSection}>
//             <ScrollView 
//               showsVerticalScrollIndicator={false} 
//               contentContainerStyle={styles.scrollContent}
//               keyboardShouldPersistTaps="handled"
//             >
//               <View style={styles.sectionPadding}>
                
//                 {/* Service Section */}
//                 <Text style={styles.inputLabel}>Services</Text>
//                 <Input
//                   value={serviceSearch}
//                   onChangeText={setServiceSearch}
//                   placeholder="Search Service"
//                   leftIcon="magnify"
//                   containerStyle={{ marginBottom: 20 }}
//                 />

//                 {/* Quick Tags Section */}
//                 <Text style={styles.inputLabel}>Quick Tags</Text>
//                 <View style={styles.tagsGrid}>
//                   {['Bleech', 'Toner', 'Color', 'Style'].map((tag) => (
//                     <View key={tag} style={styles.tag}>
//                       <Text style={styles.tagText}>{tag}</Text>
//                     </View>
//                   ))}
//                 </View>

//                 {/* Formulas Section */}
//                 <Text style={styles.inputLabel}>Formulas/Notes</Text>
//                 <TextInput
//                   style={styles.formulaInput}
//                   placeholder="Enter Technical Notes, Formulas"
//                   placeholderTextColor="#999"
//                   value={formulaNotes}
//                   onChangeText={setFormulaNotes}
//                   multiline
//                   textAlignVertical="top"
//                 />

//                 {/* Photos Section */}
//                 <Text style={styles.inputLabel}>Add Photos</Text>
//                 <View style={styles.photosGrid}>
//                   <TouchableOpacity onPress={() => handleImageUpload('before')} style={styles.photoButton}>
//                     {beforeImage ? (
//                       <Image source={{ uri: beforeImage }} style={styles.photoImage} />
//                     ) : (
//                       <View style={styles.photoPlaceholder}>
//                         <MaterialCommunityIcons name={"camera" as any} size={40} color="#000" />
//                         <Text style={styles.photoText}>Before</Text>
//                       </View>
//                     )}
//                   </TouchableOpacity>

//                   <TouchableOpacity onPress={() => handleImageUpload('after')} style={styles.photoButton}>
//                     {afterImage ? (
//                       <Image source={{ uri: afterImage }} style={styles.photoImage} />
//                     ) : (
//                       <View style={styles.photoPlaceholder}>
//                         <MaterialCommunityIcons name={"camera" as any} size={40} color="#000" />
//                         <Text style={styles.photoText}>After</Text>
//                       </View>
//                     )}
//                   </TouchableOpacity>
//                 </View>

//                 {/* Action Buttons */}
//                 <View style={styles.buttonContainer}>
//                   <TouchableOpacity style={styles.saveButton}>
//                     <Text style={styles.saveButtonText}>Save Visit</Text>
//                   </TouchableOpacity>
                  
//                   <TouchableOpacity style={styles.cancelButton} onPress={onBack}>
//                     <Text style={styles.cancelButtonText}>Cancel</Text>
//                   </TouchableOpacity>
//                 </View>

//               </View>
//             </ScrollView>
//           </View>
//         </KeyboardAvoidingView>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#000000',
//   } as ViewStyle,
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   } as ViewStyle,
//   titleContainer: {
//     backgroundColor: '#000',
//     paddingBottom: 40, 
//     alignItems: 'center',
//     width: '100%',
//   } as ViewStyle,
//   headerRow: {
//     height: 20, // Small gap for spacing
//     width: '100%',
//   } as ViewStyle,
//   profileHeaderContent: {
//     paddingHorizontal: 20,
//     width: '100%',
//     marginTop: 10,
//   } as ViewStyle,
//   contentRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   } as ViewStyle,
//   profileImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 15,
//     borderWidth: 1.5,
//     borderColor: '#333',
//   } as ImageStyle,
//   headerTextColumn: {
//     flex: 1,
//   } as ViewStyle,
//   whiteTitle: {
//     color: '#FFFFFF',
//     fontSize: 22,
//     fontWeight: 'bold',
//   } as TextStyle,
//   whiteSubText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     opacity: 0.8,
//   } as TextStyle,
//   formSection: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     marginTop: -30, 
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     overflow: 'hidden',
//   } as ViewStyle,
//   scrollContent: {
//     flexGrow: 1,
//   } as ViewStyle,
//   sectionPadding: {
//     paddingHorizontal: 20,
//     paddingTop: 25, 
//     paddingBottom: 40,
//   } as ViewStyle,
//   inputLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   } as TextStyle,
//   tagsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginBottom: 20,
//   } as ViewStyle,
//   tag: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//   } as ViewStyle,
//   tagText: {
//     fontSize: 13,
//     color: '#666',
//   } as TextStyle,
//   formulaInput: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 10,
//     padding: 12,
//     minHeight: 80,
//     marginBottom: 20,
//     fontSize: 14,
//     color: '#333',
//   } as TextStyle,
//   photosGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 30,
//   } as ViewStyle,
//   photoButton: {
//     width: '48%',
//     height: 120,
//     borderRadius: 15,
//     backgroundColor: '#F8F8F8',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     overflow: 'hidden',
//   } as ViewStyle,
//   photoImage: {
//     width: '100%',
//     height: '100%',
//   } as ImageStyle,
//   photoPlaceholder: {
//     alignItems: 'center',
//   } as ViewStyle,
//   photoText: {
//     fontSize: 12,
//     color: '#333',
//     marginTop: 5,
//   } as TextStyle,
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 15,
//   } as ViewStyle,
//   saveButton: {
//     flex: 1,
//     backgroundColor: '#FFD700',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//   } as ViewStyle,
//   saveButtonText: {
//     color: '#000',
//     fontSize: 16,
//     fontWeight: 'bold',
//   } as TextStyle,
//   cancelButton: {
//     flex: 1,
//     backgroundColor: '#333',
//     borderRadius: 10,
//     padding: 15,
//     alignItems: 'center',
//   } as ViewStyle,
//   cancelButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   } as TextStyle,
// });

// export default NewVisit;
import React from 'react'

const NewVisit = () => {
  return (
    <div>
        welcome to newvisit
    </div>
  )
}

export default NewVisit
