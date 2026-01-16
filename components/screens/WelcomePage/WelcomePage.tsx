// import React, { useEffect, useRef, useState } from 'react';
// import {
//   BackHandler,
//   Dimensions,
//   Image,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// // Added SafeAreaView from the library as requested
// import { SafeAreaView } from 'react-native-safe-area-context';

// import DynamicButton from '../../common/Buttons/DynamicButton';
// import PlusButton from '../../common/Buttons/PlusButton';

// import CompanyName from '../CompanyName/CompanyName';
// import Login from '../Login/login';
// import Signup from '../Signup/Signup';

// const { width } = Dimensions.get('window');

// const WelcomePage = ({ onLoginSuccess }: { onLoginSuccess?: () => void }) => {
//   const [navigationStack, setNavigationStack] = useState<string[]>(['welcome']);
  
//   const stackRef = useRef(navigationStack);

//   useEffect(() => {
//     stackRef.current = navigationStack;
//   }, [navigationStack]);

//   useEffect(() => {
//     const onBackPress = () => {
//       if (stackRef.current.length > 1) {
//         const newStack = [...stackRef.current];
//         newStack.pop();
//         setNavigationStack(newStack);
//         return true;
//       }
//       return false;
//     };

//     const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//     return () => subscription.remove();
//   }, []);

//   const currentPage = navigationStack[navigationStack.length - 1];

//   const handleManualBack = () => {
//     if (navigationStack.length > 1) {
//       const newStack = [...navigationStack];
//       newStack.pop();
//       setNavigationStack(newStack);
//     }
//   };

//   const navigateToPage = (page: 'welcome' | 'login' | 'signup' | 'companyname' | 'home') => {
//     setNavigationStack(prev => [...prev, page]);
//   };

//   const handleArtistCRMPress = () => {
//     console.log('Artist-CRM link pressed');
//   };

//   const renderPageContent = () => {
//     switch(currentPage) {
//       case 'login':
//         return (
//           <Login 
//             onBack={handleManualBack} 
//             onNavigateToDashboard={() => onLoginSuccess?.()} 
//             onNavigateToSignup={() => navigateToPage('signup')}
//           />
//         );
//       case 'signup':
//         return (
//           <Signup 
//             onBack={handleManualBack} 
//             onNavigateToLogin={() => navigateToPage('login')} 
//             onNavigateToCompanyName={() => navigateToPage('companyname')} 
//           />
//         );
//       case 'companyname':
//         return (
//           <CompanyName 
//             onBack={handleManualBack}
//             onNavigateToProfile={() => onLoginSuccess?.()} 
//           />
//         );
//       default:
//         return (
//           <View style={styles.content}>
//             <Image 
//               source={require('../../../assets/homeimages/logo.png')}
//               style={styles.topImage}
//               resizeMode="contain"
//             />
            
//             <Text style={styles.welcomeTitle}>Welcome Back!</Text>
            
//             <View style={styles.descriptionContainer}>
//                 <Text style={styles.description}>
//                   Welcome to{' '}
//                   <Text style={styles.artistCRMText} onPress={handleArtistCRMPress}>
//                     ARTIST-CRM
//                   </Text>
//                   {' '}where you can manage your client data
//                 </Text>
//             </View>
            
//             <DynamicButton 
//               text="Login"
//               onPress={() => navigateToPage('login')}
//               backgroundColor="#5152B3"
//               textColor="white"
//               borderRadius={25}
//               width="100%"
//               height={50}
//             />
            
//             <View style={styles.buttonGap} />
            
//             <DynamicButton 
//               text="Signup"
//               onPress={() => navigateToPage('signup')}
//               backgroundColor="transparent"
//               textColor="#5152B3"
//               borderRadius={25}
//               width="100%"
//               borderWidth={2}
//               borderColor="#5152B3"
//               height={50}
//             />
            
//             <Text style={styles.signinText}>Login using</Text>
            
//             <View style={styles.socialContainer}>
//               <PlusButton 
//                 onPress={() => {}}
//                 size={50}
//                 backgroundColor="#DB4437"
//                 iconSize={24}
//                 iconName="google"
//                 iconColor="white"
//               />
//               <View style={styles.socialGap} />
//               <PlusButton 
//                 onPress={() => {}}
//                 size={50}
//                 backgroundColor="#4267B2"
//                 iconSize={24}
//                 iconName="facebook"
//                 iconColor="white"
//               />
//             </View>
//           </View>
//         );
//     }
//   }

//   return (
//     <SafeAreaView style={styles.safeAreaContainer}>
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
//       {currentPage === 'welcome' ? (
//         <ScrollView 
//           style={styles.innerContainer} 
//           contentContainerStyle={styles.welcomeScrollContent}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           {renderPageContent()}
//         </ScrollView>
//       ) : (
//         <View style={styles.pageWrapper}>
//           {renderPageContent()}
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeAreaContainer: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   innerContainer: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   pageWrapper: {
//     flex: 1,
//   },
//   welcomeScrollContent: {
//     paddingTop: 30, // Adjusted for safe area spacing
//     paddingBottom: 40,
//   },
//   content: {
//     alignItems: 'center',
//     paddingHorizontal: 30,
//     width: '100%',
//   },
//   topImage: {
//     width: width * 0.6,
//     height: 180,
//     marginBottom: 20,
//   },
//   welcomeTitle: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   descriptionContainer: {
//     marginBottom: 30,
//   },
//   description: {
//     fontSize: 16,
//     color: '#666666',
//     textAlign: 'center',
//     lineHeight: 24,
//   },
//   artistCRMText: {
//     fontWeight: 'bold',
//     color: '#5152B3',
//     textDecorationLine: 'underline',
//   },
//   socialContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     marginTop: 10,
//   },
//   signinText: {
//     fontSize: 16,
//     color: '#666666',
//     textAlign: 'center',
//     marginBottom: 5,
//     marginTop: 20,
//   },
//   buttonGap: {
//     height: 10,
//   },
//   socialGap: {
//     width: 10,
//   },
// });

// export default WelcomePage;