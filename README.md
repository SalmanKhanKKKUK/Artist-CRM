# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


artist-crm/
├── app/
│   ├── (auth)/                 # Authentication Group
│   │   ├── login.tsx          # Login Screen
│   │   ├── signup.tsx         # Signup Screen  
│   │   └── company-name.tsx   # Company Name Screen
│   │   └── _layout.tsx        # Auth Stack Layout
│   │
│   ├── (tabs)/                # Main App Tabs Group
│   │   ├── dashboard.tsx      # Home Tab (Dashboard)
│   │   ├── new-visit.tsx      # New Visit Tab
│   │   ├── history.tsx        # History Tab
│   │   ├── customers.tsx      # Customers Tab
│   │   └── _layout.tsx        # Tabs Layout
│   │
│   ├── (modals)/              # Modal Screens Group
│   │   ├── profile.tsx        # Profile Modal
│   │   ├── invite.tsx         # Invite Modal
│   │   └── add-clients.tsx    # Add Clients Modal
│   │   └── _layout.tsx        # Modal Stack Layout
│   │
│   ├── _layout.tsx            # Root Layout (Navigation Container)
│   ├── index.tsx              # Initial Splash/Redirect
│   └── splash.tsx             # Splash Screen
│
└── components/
    └── commons/            #reusable co
    └── screens/               # Existing Screen Components (Reusable)
        ├── Login/
        ├── Signup/
        ├── Dashboard/
        ├── Profile/
        ├── History/
        ├── Customers/
        ├── NewVisit/
        ├── AddClients/
        └── Invite/


        // import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from 'expo-image-picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   Dimensions,
//   GestureResponderEvent,
//   Image,
//   LayoutAnimation,
//   Modal,
//   Platform,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   UIManager,
//   View,
// } from 'react-native';

// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// import { THEME_COLORS } from '@/constants/Colors';
// import { useTheme } from '@/contexts/ThemeContext';
// import NavHeader from '../../common/Buttons/NavHeader';
// import HistoryCard from '../../common/Cards/HistoryCard';
// import FilterInput, { FilterSection } from '../../common/Inputs/FilterInput';
// import SearchInput from '../../common/Inputs/SearchInput';
// import Input from '../../common/Inputs/Input';

// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// const { width } = Dimensions.get('window');

// interface Customer {
//   id: string;
//   name: string;
//   phone: string;
// }

// interface HistoryItem {
//   id: number;
//   customer: {
//     name: string;
//     phone: string;
//     img?: string;
//   };
//   services: string[];
//   tags: string[];
//   notes?: string;
//   photos?: string[];
//   date: string;
//   time: string;
// }

// interface HistoryProps {
//   onBack?: () => void;
//   onNavigateToNewVisit?: () => void;
// }

// const CUSTOMERS_DATA: Customer[] = [
//   { id: '1', name: 'Ahmad Ali', phone: '0300-1234567' },
//   { id: '2', name: 'Sara Khan', phone: '0312-7654321' },
//   { id: '3', name: 'Zeenat Malik', phone: '0345-1122334' },
//   { id: '4', name: 'Hamza Sheikh', phone: '0321-9988776' },
//   { id: '5', name: 'Danish Ahmed', phone: '0333-5544332' },
// ];

// const History: React.FC<HistoryProps> = ({ onNavigateToNewVisit }) => {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();
//   const { colors, isDark } = useTheme();

//   const defaultHistory: HistoryItem[] = [
//     {
//       id: 1,
//       customer: { name: "Ahmad Ali", phone: "0300-1234567", img: 'https://i.pravatar.cc/150?u=1' },
//       services: ["Haircut", "Shaving"],
//       tags: ["Regular"],
//       notes: "Prefer shorter sides, sharp fade.",
//       photos: ["https://picsum.photos/200/300"],
//       date: "14 Jan 2026",
//       time: "10:30 AM"
//     },
//     {
//       id: 2,
//       customer: { name: "Bilal Khan", phone: "0301-7654321", img: 'https://i.pravatar.cc/150?u=2' },
//       services: ["Facial", "Massage"],
//       tags: ["VIP"],
//       notes: "Sensitive skin, use herbal products.",
//       photos: ["https://picsum.photos/200/301"],
//       date: "15 Jan 2026",
//       time: "11:00 AM"
//     },
//     {
//       id: 3,
//       customer: { name: "Hamza Ahmed", phone: "0321-9876543", img: 'https://i.pravatar.cc/150?u=3' },
//       services: ["Styling", "Color"],
//       tags: ["New"],
//       notes: "Looking for a modern ash grey look.",
//       photos: ["https://picsum.photos/200/302"],
//       date: "16 Jan 2026",
//       time: "12:15 PM"
//     },
//     {
//       id: 4,
//       customer: { name: "Usman Ghani", phone: "0333-1122334", img: 'https://i.pravatar.cc/150?u=4' },
//       services: ["Haircut"],
//       tags: ["Regular"],
//       notes: "Standard crew cut.",
//       photos: [],
//       date: "17 Jan 2026",
//       time: "01:00 PM"
//     },
//     {
//       id: 5,
//       customer: { name: "Zain Malik", phone: "0345-4455667", img: 'https://i.pravatar.cc/150?u=5' },
//       services: ["Beard Trim", "Haircut"],
//       tags: ["VIP"],
//       notes: "Line up beard carefully.",
//       photos: ["https://picsum.photos/200/303"],
//       date: "18 Jan 2026",
//       time: "02:30 PM"
//     },
//     {
//       id: 6,
//       customer: { name: "Fahad Mustafa", phone: "0312-5566778", img: 'https://i.pravatar.cc/150?u=6' },
//       services: ["Massage", "Steam"],
//       tags: ["New"],
//       notes: "Requires shoulder relaxation.",
//       photos: [],
//       date: "19 Jan 2026",
//       time: "04:00 PM"
//     },
//     {
//       id: 7,
//       customer: { name: "Yasir Hussain", phone: "0302-8899001", img: 'https://i.pravatar.cc/150?u=7' },
//       services: ["Color", "Highlights"],
//       tags: ["Premium"],
//       notes: "Golden highlights on top.",
//       photos: ["https://picsum.photos/200/304"],
//       date: "20 Jan 2026",
//       time: "05:15 PM"
//     },
//     {
//       id: 8,
//       customer: { name: "Omer Shah", phone: "0344-2233445", img: 'https://i.pravatar.cc/150?u=8' },
//       services: ["Haircut", "Facial"],
//       tags: ["Regular"],
//       notes: "Before wedding prep.",
//       photos: ["https://picsum.photos/200/305"],
//       date: "21 Jan 2026",
//       time: "06:00 PM"
//     },
//     {
//       id: 9,
//       customer: { name: "Saad Qureshi", phone: "0322-1112223", img: 'https://i.pravatar.cc/150?u=9' },
//       services: ["Shaving"],
//       tags: ["Regular"],
//       notes: "Clean shave with hot towel.",
//       photos: [],
//       date: "22 Jan 2026",
//       time: "10:00 AM"
//     },
//     {
//       id: 10,
//       customer: { name: "Rizwan Baig", phone: "0300-9988776", img: 'https://i.pravatar.cc/150?u=10' },
//       services: ["Styling", "Beard Trim"],
//       tags: ["VIP"],
//       notes: "High volume quiff.",
//       photos: ["https://picsum.photos/200/306"],
//       date: "23 Jan 2026",
//       time: "11:45 AM"
//     },
//   ];

//   const [historyItems, setHistoryItems] = useState<HistoryItem[]>(defaultHistory);
//   const [searchText, setSearchText] = useState<string>('');
//   const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
//   const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
//   const [menuVisible, setMenuVisible] = useState<boolean>(false);
//   const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
//   const [selectedId, setSelectedId] = useState<number | null>(null);

//   // Edit Modal States
//   const [customerSearch, setCustomerSearch] = useState<string>('');
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

//   const [allServices, setAllServices] = useState<string[]>(['Haircut', 'Coloring', 'Styling', 'Facial', 'Treatment', 'Shaving']);
//   const [selectedServices, setSelectedServices] = useState<string[]>([]);
//   const [serviceSearch, setServiceSearch] = useState<string>('');
//   const topServices = ['Haircut', 'Coloring', 'Styling'];

//   const [allTags, setAllTags] = useState<string[]>(['Premium', 'Regular', 'VIP', 'New', 'Color']);
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);
//   const [tagSearch, setTagSearch] = useState<string>('');
//   const topTags = ['Premium', 'Regular', 'VIP'];

//   const [tempNotes, setTempNotes] = useState<string>('');
//   const [tempPhotos, setTempPhotos] = useState<string[]>([]);
//   const [menuPosition, setMenuPosition] = useState<{ top: number; right: number }>({ top: 0, right: 0 });

//   const filterSections: FilterSection[] = [
//     {
//       id: 'category_filter',
//       title: 'Filter By Service',
//       options: [
//         { label: 'Haircut', value: 'Haircut' },
//         { label: 'Color Expert', value: 'Color' },
//         { label: 'Styling', value: 'Styling' },
//         { label: 'Facial', value: 'Facial' },
//       ],
//     },
//     {
//       id: 'tag_filter',
//       title: 'Filter By Tag',
//       options: [
//         { label: 'New Client', value: 'New' },
//         { label: 'Regular', value: 'Regular' },
//         { label: 'VIP', value: 'VIP' },
//       ],
//     },
//     {
//       id: 'date_filter',
//       title: 'Filter By Date',
//       options: [
//         { label: 'Today', value: '14 Jan 2026' },
//         { label: 'Jan 2026', value: 'Jan 2026' },
//         { label: 'Old Records', value: '2025' },
//       ],
//     },
//   ];

//   useEffect(() => {
//     const loadHistory = async () => {
//       try {
//         const savedString = await AsyncStorage.getItem('permanently_deleted_history');
//         if (savedString) {
//           const parsedData = JSON.parse(savedString);
//           if (Array.isArray(parsedData) && parsedData.length >= 10) {
//             setHistoryItems(parsedData);
//           } else {
//             setHistoryItems(defaultHistory);
//           }
//         } else {
//           setHistoryItems(defaultHistory);
//         }
//       } catch (err) {
//         console.error("Error loading storage", err);
//       }
//     };
//     loadHistory();
//   }, []);

//   const persistHistory = async (updatedList: HistoryItem[]) => {
//     try {
//       await AsyncStorage.setItem('permanently_deleted_history', JSON.stringify(updatedList));
//     } catch (err) {
//       console.error("Error saving storage", err);
//     }
//   };

//   const filteredCustomers = CUSTOMERS_DATA.filter(c =>
//     c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
//     c.phone.includes(customerSearch)
//   );

//   const handleAddItem = (val: string, type: 'service' | 'tag') => {
//     const trimmedVal = val.trim();
//     if (!trimmedVal) return;

//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     if (type === 'service') {
//       if (!selectedServices.includes(trimmedVal)) {
//         setSelectedServices([...selectedServices, trimmedVal]);
//         if (!allServices.includes(trimmedVal)) setAllServices([...allServices, trimmedVal]);
//       }
//       setServiceSearch('');
//     } else {
//       if (!selectedTags.includes(trimmedVal)) {
//         setSelectedTags([...selectedTags, trimmedVal]);
//         if (!allTags.includes(trimmedVal)) setAllTags([...allTags, trimmedVal]);
//       }
//       setTagSearch('');
//     }
//   };

//   const removeChip = (val: string, type: 'service' | 'tag') => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     if (type === 'service') {
//       setSelectedServices(selectedServices.filter(s => s !== val));
//     } else {
//       setSelectedTags(selectedTags.filter(t => t !== val));
//     }
//   };

//   const handleImagePick = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true
//     });
//     if (!result.canceled) {
//       setTempPhotos(prev => [...prev, ...result.assets.map(a => a.uri)]);
//     }
//   };

//   const removeImage = (index: number) => {
//     setTempPhotos(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleOpenMenu = (event: GestureResponderEvent, item: HistoryItem) => {
//     const { pageY } = event.nativeEvent;
//     setMenuPosition({ top: pageY - 10, right: 40 });
//     setSelectedId(item.id);

//     setCustomerSearch(item.customer.name);
//     setSelectedCustomer({ id: '', name: item.customer.name, phone: item.customer.phone });
//     setSelectedServices(item.services);
//     setSelectedTags(item.tags);
//     setTempNotes(item.notes || "");
//     setTempPhotos(item.photos || []);

//     setMenuVisible(true);
//   };

//   const handleSaveEdit = () => {
//     if (selectedId === null) return;
//     const updated = historyItems.map((item) =>
//       item.id === selectedId
//         ? {
//           ...item,
//           customer: {
//             ...item.customer,
//             name: selectedCustomer?.name || item.customer.name,
//             phone: selectedCustomer?.phone || item.customer.phone
//           },
//           services: selectedServices,
//           tags: selectedTags,
//           notes: tempNotes,
//           photos: tempPhotos
//         }
//         : item
//     );
//     setHistoryItems(updated);
//     persistHistory(updated);
//     setEditModalVisible(false);
//   };

//   const handleViewDetails = () => {
//     setMenuVisible(false);
//     router.push('/(tabs)/view-history' as any);
//   };

//   const handleDeleteItem = () => {
//     if (selectedId === null) return;
//     Alert.alert("Confirm Delete", "Are you sure?", [
//       { text: "Cancel", style: "cancel", onPress: () => setMenuVisible(false) },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: () => {
//           const filtered = historyItems.filter((item) => item.id !== selectedId);
//           setHistoryItems(filtered);
//           persistHistory(filtered);
//           setMenuVisible(false);
//         }
//       }
//     ]);
//   };

//   const filteredData = historyItems.filter((item) => {
//     if (!item || !item.customer) return false;
//     const query = searchText.toLowerCase();
//     const searchMatch = (item.customer.name || "").toLowerCase().includes(query) ||
//       (item.customer.phone || "").includes(query) ||
//       (item.services || []).some(s => s.toLowerCase().includes(query)) ||
//       (item.notes || "").toLowerCase().includes(query) ||
//       (item.tags || []).some(t => t.toLowerCase().includes(query));

//     const categoryMatch = activeFilters.category_filter ? (item.services || []).some(s => s.includes(activeFilters.category_filter)) : true;
//     const dateMatch = activeFilters.date_filter ? (item.date || "").includes(activeFilters.date_filter) : true;
//     const tagMatch = activeFilters.tag_filter ? (item.tags || []).some(t => t.includes(activeFilters.tag_filter)) : true;

//     return searchMatch && categoryMatch && dateMatch && tagMatch;
//   });

//   return (
//     <LinearGradient colors={colors.bgGradient} style={styles.gradientContainer}>
//       <SafeAreaView style={styles.masterContainer} edges={['top', 'bottom']}>
//         <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />

//         <NavHeader title="Our All History !">
//           <TouchableOpacity onPress={() => onNavigateToNewVisit?.()} activeOpacity={0.8}>
//             <LinearGradient
//               colors={THEME_COLORS.buttonGradient}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               style={styles.newVisitHeaderBtn}
//             >
//               <Text style={styles.newVisitBtnText}>New Visit</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </NavHeader>

//         <View style={styles.searchFixedWrapper}>
//           <SearchInput
//             value={searchText}
//             onChangeText={setSearchText}
//             placeholder="Search history..."
//             showFilterIcon={true}
//             onFilterIconPress={() => setIsFilterVisible(true)}
//             containerStyle={styles.searchBar}
//             backgroundColor={isDark ? "#1e293b" : "#FFFFFF"}
//             textColor={isDark ? "#FFFFFF" : "#333333"}
//             iconColor={isDark ? "#94A3B8" : "#888888"}
//             showFilterSort={false}
//           />
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={[styles.listContent, { paddingBottom: 80 + insets.bottom }]}
//         >
//           {filteredData.map((item) => (
//             <View key={item.id} style={styles.cardOuterWrapper}>
//               <HistoryCard
//                 customer={item.customer}
//                 services={item.services}
//                 tags={item.tags}
//                 notes={item.notes}
//                 photos={item.photos}
//                 date={item.date}
//                 time={item.time}
//                 onPress={() => router.push('/(tabs)/view-history' as any)}
//                 containerStyle={[styles.cardItem, { borderColor: colors.border }]}
//                 backgroundColor={isDark ? "#1e293b" : "#FFFFFF"}
//                 titleColor={isDark ? "#FFFFFF" : "#1E293B"}
//                 phoneColor={isDark ? "#94A3B8" : "#64748B"}
//                 noteColor={isDark ? "#CBD5E1" : "#475569"}
//                 dateColor={isDark ? "#818CF8" : "#5152B3"}
//               />
//               <TouchableOpacity
//                 style={styles.actionButton}
//                 onPress={(e) => handleOpenMenu(e, item)}
//               >
//                 <MaterialCommunityIcons name="dots-vertical" size={24} color="#64748B" />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </ScrollView>

//         {/* Menu Popover */}
//         <Modal visible={menuVisible} transparent animationType="fade">
//           <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
//             <View style={styles.modalOverlayDimmed}>
//               <View style={[styles.menuPopup, { top: menuPosition.top, right: menuPosition.right, backgroundColor: colors.card }]}>
//                 <TouchableOpacity style={styles.menuItem} onPress={handleViewDetails}>
//                   <MaterialCommunityIcons name="eye" size={20} color={colors.textSecondary} />
//                   <Text style={[styles.menuText, { color: colors.text }]}>View</Text>
//                 </TouchableOpacity>
//                 <View style={styles.menuSeparator} />
//                 <TouchableOpacity
//                   style={styles.menuItem}
//                   onPress={() => {
//                     setMenuVisible(false);
//                     setEditModalVisible(true);
//                   }}
//                 >
//                   <MaterialCommunityIcons name="pencil" size={20} color={colors.primary} />
//                   <Text style={[styles.menuText, { color: colors.text }]}>Edit</Text>
//                 </TouchableOpacity>
//                 <View style={styles.menuSeparator} />
//                 <TouchableOpacity style={styles.menuItem} onPress={handleDeleteItem}>
//                   <MaterialCommunityIcons name="delete" size={20} color="#EF4444" />
//                   <Text style={[styles.menuText, { color: colors.text }]}>Delete</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </TouchableWithoutFeedback>
//         </Modal>

//         {/* Edit Visit Modal */}
//         <Modal visible={editModalVisible} transparent animationType="slide">
//           <View style={styles.modalOverlayCenterDark}>
//             <View style={[styles.editPopup, { backgroundColor: colors.card }]}>
//               <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
//                 <Text style={[styles.editTitle, { color: colors.text }]}>Edit Visit Info</Text>

//                 {/* Customer Section */}
//                 <View style={styles.inputWrapper}>
//                   <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Customer</Text>
//                   <Input
//                     value={customerSearch}
//                     onChangeText={(val) => {
//                       setCustomerSearch(val);
//                       if (selectedCustomer) setSelectedCustomer(null);
//                     }}
//                     placeholder="Search customer..."
//                     leftIcon="account-search"
//                     variant="outlined"
//                     backgroundColor={isDark ? "#1e293b" : "#FFFFFF"}
//                   />
//                   {customerSearch.length > 0 && !selectedCustomer && filteredCustomers.length > 0 && (
//                     <View style={[styles.dropdownMenu, { backgroundColor: colors.card, borderColor: colors.border }]}>
//                       <ScrollView style={{ maxHeight: 200 }} keyboardShouldPersistTaps="handled">
//                         {filteredCustomers.map(c => (
//                           <TouchableOpacity
//                             key={c.id}
//                             style={[styles.suggestionItem, { borderBottomColor: colors.border }]}
//                             onPress={() => { setSelectedCustomer(c); setCustomerSearch(c.name); }}
//                           >
//                             <MaterialCommunityIcons name="account-circle" size={22} color={colors.textSecondary} />
//                             <View>
//                               <Text style={[styles.itemTitle, { color: colors.text }]}>{c.name}</Text>
//                               <Text style={[styles.itemSub, { color: colors.textSecondary }]}>{c.phone}</Text>
//                             </View>
//                           </TouchableOpacity>
//                         ))}
//                       </ScrollView>
//                     </View>
//                   )}
//                 </View>

//                 {selectedCustomer && (
//                   <View style={[styles.selectedBadge, { backgroundColor: isDark ? colors.border : '#ECFDF5' }]}>
//                     <Ionicons name="checkmark-circle" size={18} color="#10B981" />
//                     <Text style={[styles.selectedBadgeText, { color: isDark ? colors.text : '#065F46' }]}>Selected: {selectedCustomer.name}</Text>
//                     <TouchableOpacity onPress={() => setSelectedCustomer(null)} style={{ marginLeft: 'auto' }}>
//                       <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
//                     </TouchableOpacity>
//                   </View>
//                 )}

//                 {/* Services Section */}
//                 <View style={styles.inputGroup}>
//                   <Text style={[styles.inputLabel, { color: colors.textSecondary, marginTop: 10 }]}>Services</Text>
//                   <View style={styles.chipsRow}>
//                     {selectedServices.map(s => (
//                       <TouchableOpacity key={s} style={[styles.chip, { backgroundColor: colors.background, borderColor: colors.border }]} onPress={() => removeChip(s, 'service')}>
//                         <Text style={[styles.chipText, { color: colors.primary }]}>{s} ✕</Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                   <Input
//                     value={serviceSearch}
//                     onChangeText={setServiceSearch}
//                     placeholder="Add service..."
//                     leftIcon="plus-circle-outline"
//                     variant="outlined"
//                   />
//                   <View style={styles.quickSelectRow}>
//                     {topServices.filter(s => !selectedServices.includes(s)).map(s => (
//                       <TouchableOpacity
//                         key={s}
//                         style={[styles.quickChip, { backgroundColor: colors.background, borderColor: colors.border }]}
//                         onPress={() => handleAddItem(s, 'service')}
//                       >
//                         <Text style={[styles.quickChipText, { color: colors.textSecondary }]}>+ {s}</Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </View>

//                 {/* Tags Section */}
//                 <View style={styles.inputGroup}>
//                   <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Tags</Text>
//                   <View style={styles.chipsRow}>
//                     {selectedTags.map(t => (
//                       <TouchableOpacity key={t} style={[styles.chip, styles.tagChip, { backgroundColor: colors.background, borderColor: colors.border }]} onPress={() => removeChip(t, 'tag')}>
//                         <Text style={[styles.chipText, styles.tagChipText, { color: colors.textSecondary }]}>{t} ✕</Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                   <Input
//                     value={tagSearch}
//                     onChangeText={setTagSearch}
//                     placeholder="Add tags..."
//                     leftIcon="tag-plus-outline"
//                     variant="outlined"
//                   />
//                   <View style={styles.quickSelectRow}>
//                     {topTags.filter(t => !selectedTags.includes(t)).map(t => (
//                       <TouchableOpacity
//                         key={t}
//                         style={[styles.quickChip, { backgroundColor: colors.background, borderColor: colors.border }]}
//                         onPress={() => handleAddItem(t, 'tag')}
//                       >
//                         <Text style={[styles.quickChipText, { color: colors.textSecondary }]}># {t}</Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </View>

//                 {/* Notes Section */}
//                 <View style={styles.inputGroup}>
//                   <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Notes</Text>
//                   <TextInput
//                     style={[styles.textArea, { backgroundColor: isDark ? "#1e293b" : "#FFFFFF", borderColor: colors.border, color: colors.text }]}
//                     value={tempNotes}
//                     onChangeText={setTempNotes}
//                     multiline
//                     placeholder="Formulas/Notes..."
//                     placeholderTextColor={colors.textSecondary}
//                   />
//                 </View>

//                 {/* Photos Section */}
//                 <View style={styles.photoGrid}>
//                   <TouchableOpacity style={[styles.addPhotoBox, { backgroundColor: colors.background, borderColor: colors.primary }]} onPress={handleImagePick}>
//                     <MaterialCommunityIcons name="camera-plus" size={24} color={colors.primary} />
//                     <Text style={[styles.addPhotoText, { color: colors.primary }]}>Add Photo</Text>
//                   </TouchableOpacity>
//                   {tempPhotos.map((uri, i) => (
//                     <View key={i} style={styles.imageWrapper}>
//                       <Image source={{ uri }} style={styles.uploadedImg} />
//                       <TouchableOpacity style={[styles.removeBtn, { backgroundColor: colors.card }]} onPress={() => removeImage(i)}>
//                         <Ionicons name="close-circle" size={20} color="#EF4444" />
//                       </TouchableOpacity>
//                     </View>
//                   ))}
//                 </View>

//                 <View style={styles.actionRow}>
//                   <TouchableOpacity onPress={() => setEditModalVisible(false)}>
//                     <Text style={styles.cancelBtnText}>Cancel</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={styles.saveBtn} onPress={handleSaveEdit}>
//                     <Text style={styles.saveBtnText}>Update</Text>
//                   </TouchableOpacity>
//                 </View>
//               </ScrollView>
//             </View>
//           </View>
//         </Modal>

//         <FilterInput
//           isVisible={isFilterVisible}
//           onClose={() => setIsFilterVisible(false)}
//           backgroundColor={isDark ? "#1e293b" : "#F8FAFC"}
//           textColor={isDark ? "#FFFFFF" : "#334155"}
//           chipInactiveBackgroundColor={isDark ? "#334155" : "#FFFFFF"}
//           sections={filterSections}
//           onApply={(selections) => {
//             setActiveFilters(selections);
//             setIsFilterVisible(false);
//           }}
//           onReset={() => setActiveFilters({})}
//           title="Search Filters"
//         />
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   gradientContainer: {
//     flex: 1,
//   },
//   masterContainer: {
//     flex: 1,
//     backgroundColor: 'transparent',
//   },
//   newVisitHeaderBtn: {
//     paddingHorizontal: 15,
//     paddingVertical: 6,
//     borderRadius: 20,
//     elevation: 3,
//     minWidth: 85,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   newVisitBtnText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     fontSize: 13,
//   },
//   searchFixedWrapper: {
//     paddingHorizontal: 15,
//     paddingVertical: 5,
//     zIndex: 10,
//   },
//   searchBar: {
//     width: '100%',
//     marginBottom: 0,
//   },
//   listContent: {
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//   },
//   cardOuterWrapper: {
//     position: 'relative',
//     justifyContent: 'center',
//     marginBottom: 15,
//   },
//   cardItem: {
//     marginBottom: 0,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//       },
//       android: {
//         elevation: 2,
//       },
//     }),
//   },
//   actionButton: {
//     position: 'absolute',
//     right: 15,
//     top: 30,
//     padding: 10,
//     zIndex: 10,
//   },
//   modalOverlayDimmed: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   modalOverlayCenterDark: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   menuPopup: {
//     position: 'absolute',
//     borderRadius: 12,
//     width: 140,
//     paddingVertical: 5,
//     elevation: 8,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     gap: 12,
//   },
//   menuSeparator: {
//     height: 1,
//     backgroundColor: '#F1F5F9',
//     marginHorizontal: 10,
//   },
//   menuText: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   editPopup: {
//     borderRadius: 24,
//     width: '92%',
//     maxHeight: '85%',
//     padding: 20,
//     elevation: 10,
//   },
//   editTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   inputWrapper: {
//     position: 'relative',
//     width: '100%',
//     marginTop: 10,
//   },
//   dropdownMenu: {
//     position: 'absolute',
//     top: 60,
//     left: 0,
//     right: 0,
//     borderRadius: 15,
//     elevation: 8,
//     zIndex: 9999,
//     borderWidth: 1,
//     padding: 5,
//   },
//   suggestionItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   itemTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   itemSub: {
//     fontSize: 12,
//   },
//   selectedBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 10,
//     marginTop: 10,
//     gap: 8,
//   },
//   selectedBadgeText: {
//     fontSize: 13,
//     fontWeight: '600',
//   },
//   chipsRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginVertical: 10,
//   },
//   chip: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 12,
//     borderWidth: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   chipText: {
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   tagChip: {
//     backgroundColor: '#F1F5F9',
//     borderColor: '#E2E8F0',
//   },
//   tagChipText: {
//     color: '#64748B',
//   },
//   quickSelectRow: {
//     flexDirection: 'row',
//     gap: 8,
//     marginTop: 12,
//     flexWrap: 'wrap',
//   },
//   quickChip: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 10,
//     borderWidth: 1,
//   },
//   quickChipText: {
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   textArea: {
//     borderWidth: 1,
//     borderRadius: 15,
//     padding: 15,
//     height: 100,
//     textAlignVertical: 'top',
//     marginTop: 12,
//     fontSize: 14,
//   },
//   photoGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//     marginVertical: 15,
//     justifyContent: 'center',
//   },
//   addPhotoBox: {
//     width: 80,
//     height: 80,
//     borderWidth: 1.5,
//     borderStyle: 'dashed',
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addPhotoText: {
//     fontSize: 10,
//     marginTop: 4,
//     fontWeight: '700',
//   },
//   imageWrapper: {
//     width: 80,
//     height: 80,
//     position: 'relative',
//   },
//   uploadedImg: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 15,
//   },
//   removeBtn: {
//     position: 'absolute',
//     top: -5,
//     right: -5,
//     borderRadius: 10,
//     elevation: 3,
//   },
//   inputGroup: {
//     marginBottom: 12,
//     width: '100%',
//   },
//   inputLabel: {
//     color: '#64748B',
//     marginBottom: 4,
//     fontWeight: '600',
//     fontSize: 13,
//     marginLeft: 4,
//   },
//   actionRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     gap: 20,
//     marginTop: 15,
//     paddingBottom: 10,
//   },
//   cancelBtnText: {
//     color: '#94A3B8',
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
//   saveBtn: {
//     backgroundColor: '#5152B3',
//     paddingVertical: 10,
//     paddingHorizontal: 25,
//     borderRadius: 12,
//   },
//   saveBtnText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
// });

// export default History;

