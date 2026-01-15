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

// Reusable components
import NavHeader from '../../common/Buttons/NavHeader';
import ImageDesCard from '../../common/Cards/ImageDesCard';
import SearchInput from '../../common/Inputs/SearchInput';
import FilterInput, { FilterSection } from '../../common/Inputs/FilterInput';

interface HistoryProps {
  onBack?: () => void;
  onNavigateToWelcome?: () => void;
}

const History: React.FC<HistoryProps> = () => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // History items state
  const [historyItems, setHistoryItems] = useState([
    { id: 1, name: "Ahmad Ali", service: "Haircut", date: "14 Jan 2026", time: "10:30 AM", img: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: "Sara Khan", service: "Color Expert", date: "12 Jan 2026", time: "02:15 PM", img: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: "Zeenat Malik", service: "Manager", date: "10 Jan 2026", time: "09:00 AM", img: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: "Hamza Sheikh", service: "Styling", date: "08 Jan 2026", time: "04:45 PM", img: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: "Danish Ahmed", service: "Haircut", date: "05 Jan 2026", time: "11:20 AM", img: 'https://i.pravatar.cc/150?u=5' },
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
    {
      id: 'category',
      title: 'Filter By Category',
      options: [
        { label: 'Haircut', value: 'haircut' },
        { label: 'Coloring', value: 'coloring' },
        { label: 'Styling', value: 'styling' },
      ],
    },
  ];

  // Logic to Delete All History with Confirmation Popup
  const handleClearAllHistory = () => {
    if (historyItems.length === 0) return;

    Alert.alert(
      "Confirm Delete",
      "Are you sure to delete all history?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete All", 
          onPress: () => setHistoryItems([]),
          style: "destructive" 
        }
      ]
    );
  };

  const handleDeleteItem = (id: number) => {
    Alert.alert("Delete Visit", "Are you sure you want to delete this record?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => setHistoryItems(prev => prev.filter(item => item.id !== id)) }
    ]);
  };

  const handleApplyFilter = (selections: Record<string, string>) => {
    console.log("Selected Filters:", selections);
    setIsFilterVisible(false);
  };

  return (
    <SafeAreaView style={styles.masterContainer} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <NavHeader title="Our All History !">
        <TouchableOpacity onPress={handleClearAllHistory}>
          <MaterialCommunityIcons name="delete-sweep-outline" size={28} color="#5152B3" />
        </TouchableOpacity>
      </NavHeader>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 10 + insets.bottom }]}
      >
        <View style={styles.contentFadeIn}>
          
          <SearchInput
            value={searchText}
            onChangeText={(text: string) => setSearchText(text)}
            placeholder="Search history..."
            showFilterIcon={true}
            onFilterIconPress={() => setIsFilterVisible(true)}
            containerStyle={styles.searchBarContainer}
          />

          {historyItems
            .filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
            .map((item) => (
              <View key={item.id} style={styles.cardWrapper}>
                <ImageDesCard
                  imageSource={{ uri: item.img }}
                  title={item.name}
                  description={`${item.service}\n${item.date} | ${item.time}`}
                  backgroundColor="#FFFFFF"
                  containerStyle={styles.cardMargin}
                  titleStyle={styles.cardTitle}
                />
                <TouchableOpacity 
                  style={styles.threeDotButton} 
                  onPress={() => handleDeleteItem(item.id)}
                >
                  <MaterialCommunityIcons name="dots-vertical" size={24} color="#64748B" />
                </TouchableOpacity>
              </View>
          ))}
        </View>
      </ScrollView>

      <FilterInput 
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        sections={filterSections}
        onApply={handleApplyFilter}
        onReset={() => {}}
        title="Search Filters"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: '#F1F3F5',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  contentFadeIn: {
    width: '100%',
  },
  searchBarContainer: {
    marginBottom: 20,
    width: '100%',
  },
  cardWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  cardMargin: {
    marginBottom: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingRight: 45,
  },
  cardTitle: {
    color: '#5152B3',
    fontWeight: 'bold',
  },
  threeDotButton: {
    position: 'absolute',
    right: 15,
    padding: 10,
    zIndex: 5,
  },
});

export default History;