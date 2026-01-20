import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME_COLORS } from '@/constants/Colors';

import NavHeader from '../../common/Buttons/NavHeader';
import ImageDesCard from '../../common/Cards/ImageDesCard';
import SearchInput from '../../common/Inputs/SearchInput';
import FilterInput, { FilterSection } from '../../common/Inputs/FilterInput';

interface HistoryProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
}

const History: React.FC<HistoryProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  const [historyItems, setHistoryItems] = useState([
    { id: 1, name: "Ahmad Ali", service: "Haircut", date: "14 Jan 2026", time: "10:30 AM", img: 'https://i.pravatar.cc/150?u=6' },
    { id: 2, name: "Sara Khan", service: "Color Expert", date: "12 Jan 2026", time: "02:15 PM", img: 'https://i.pravatar.cc/150?u=7' },
    { id: 3, name: "Zeenat Malik", service: "Manager", date: "10 Jan 2026", time: "09:00 AM", img: 'https://i.pravatar.cc/150?u=8' },
    { id: 4, name: "Hamza Sheikh", service: "Styling", date: "08 Jan 2026", time: "04:45 PM", img: 'https://i.pravatar.cc/150?u=9' },
    { id: 5, name: "Danish Ahmed", service: "Haircut", date: "05 Jan 2026", time: "11:20 AM", img: 'https://i.pravatar.cc/150?u=3' },
  ]);

  const filterSections: FilterSection[] = [
    {
      id: 'search_type',
      title: 'Filter By Name',
      options: [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
      ],
    },
    {
      id: 'date_filter',
      title: 'Filter By Date',
      options: [
        { label: 'Today', value: 'today' },
        { label: 'This Week', value: 'week' },
        { label: 'This Month', value: 'month' },
      ],
    },
  ];

  const handleClearAllHistory = () => {
    if (historyItems.length === 0) return;
    Alert.alert("Confirm Delete", "Delete all history records?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete All", onPress: () => setHistoryItems([]), style: "destructive" }
    ]);
  };

  const handleDeleteItem = (id: number) => {
    Alert.alert("Delete Visit", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => setHistoryItems(prev => prev.filter(item => item.id !== id)) }
    ]);
  };

  return (
    <LinearGradient colors={THEME_COLORS.bgGradient} style={styles.gradientContainer}>
      <SafeAreaView style={styles.masterContainer} edges={['bottom']}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        {/* --- Header Section --- */}
        <NavHeader title="Our All History !">
          <TouchableOpacity onPress={handleClearAllHistory} activeOpacity={0.7}>
            <MaterialCommunityIcons name="delete-sweep-outline" size={28} color="#5152B3" />
          </TouchableOpacity>
        </NavHeader>

        {/* --- Fixed Search Section --- */}
        <View style={styles.searchFixedWrapper}>
          <SearchInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search history..."
            showFilterIcon={true}
            onFilterIconPress={() => setIsFilterVisible(true)}
            containerStyle={styles.searchBar}
          />
        </View>

        {/* --- Scrollable List Section --- */}
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.listContent, 
            { paddingBottom: 60 + insets.bottom }
          ]}
        >
          {historyItems
            .filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
            .map((item) => (
              <View key={item.id} style={styles.cardOuterWrapper}>
                <ImageDesCard
                  imageSource={{ uri: item.img }}
                  title={item.name}
                  description={`${item.service}\n${item.date} | ${item.time}`}
                  backgroundColor="#FFFFFF"
                  containerStyle={styles.cardItem}
                  titleStyle={styles.cardTitleText}
                />
                
                {/* Action Button (Three Dots) */}
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={() => handleDeleteItem(item.id)}
                  activeOpacity={0.6}
                >
                  <MaterialCommunityIcons name="dots-vertical" size={24} color="#64748B" />
                </TouchableOpacity>
              </View>
          ))}
        </ScrollView>

        {/* --- Filter Modal --- */}
        <FilterInput 
          isVisible={isFilterVisible}
          onClose={() => setIsFilterVisible(false)}
          sections={filterSections}
          onApply={() => setIsFilterVisible(false)}
          onReset={() => {}}
          title="Search Filters"
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // 1. Layout Styles
  gradientContainer: {
    flex: 1,
  },
  masterContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  
  // 2. Fixed Search Bar Styles
  searchFixedWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 10,
  },
  searchBar: {
    width: '100%',
    marginBottom: 0,
  },

  // 3. List & Scroll Styles
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 5,
  },

  // 4. Card Item Styles (Compact Gap like Teams.tsx)
  cardOuterWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  cardItem: {
    marginBottom: 0, // Compact gap set to 5px
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingRight: 45,
    backgroundColor: '#FFFFFF',
    
    // Professional Shadow
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitleText: {
    color: '#5152B3',
    fontWeight: 'bold',
  },

  // 5. Buttons Styles
  actionButton: {
    position: 'absolute',
    right: 15,
    padding: 10,
    zIndex: 5,
  },
});

export default History;