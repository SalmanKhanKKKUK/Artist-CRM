import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DynamicButton from '../../common/Buttons/DynamicButton';
import PlusButton from '../../common/Buttons/PlusButton';
import FilterInput, { FilterSection } from '../../common/Inputs/FilterInput';
import SearchInput from '../../common/Inputs/SearchInput';

interface SettingProps {
  onBack: () => void;
}

const Setting = ({ onBack }: SettingProps) => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { height: screenHeight } = Dimensions.get('window');

  // Settings Data Structure
  const settingsData = useMemo(() => [
    {
      id: 1,
      title: 'Business Profile',
      subtitle: 'Name, Logo, Description, set Weekly Schedule',
      icon: 'cog',
      category: 'General',
      hasRightIcon: false,
      hasPlusButton: false
    },
    {
      id: 2,
      title: 'Operating Hours',
      subtitle: 'Notice, Buffer, Add Weekly Notice',
      icon: 'clock',
      category: 'General',
      hasRightIcon: false,
      hasPlusButton: false
    },
    {
      id: 3,
      title: 'Tax Setting',
      subtitle: 'Fees and Refunds',
      icon: 'file-document',
      category: 'Financial',
      hasRightIcon: false,
      hasPlusButton: false
    },
    {
      id: 4,
      title: 'Book & Appointment',
      subtitle: '',
      icon: 'content-cut',
      category: 'Appointment',
      hasRightIcon: true,
      rightIcon: 'calendar',
      hasPlusButton: false
    },
    {
      id: 5,
      title: 'Cancellation Policy',
      subtitle: '',
      icon: 'file-document',
      category: 'Policy',
      hasRightIcon: false,
      hasPlusButton: true
    },
    {
      id: 6,
      title: 'Custom Notifications',
      subtitle: '',
      icon: 'message',
      category: 'Notification',
      hasRightIcon: false,
      hasPlusButton: false
    },
    {
      id: 7,
      title: 'Staff Management',
      subtitle: '',
      icon: 'account-circle',
      category: 'Staff',
      hasRightIcon: false,
      hasPlusButton: false
    },
    {
      id: 8,
      title: 'Commission',
      subtitle: '',
      icon: 'account-group',
      category: 'Financial',
      hasRightIcon: false,
      hasPlusButton: true,
      hasIconGroup: true
    },
    {
      id: 9,
      title: 'Two-Factor Authentication Security',
      subtitle: '',
      icon: 'shield-key',
      category: 'Security',
      hasRightIcon: false,
      hasPlusButton: false
    },
    {
      id: 10,
      title: 'Dark Mood',
      subtitle: 'Dark theme',
      icon: 'moon-waning-crescent',
      category: 'Appearance',
      hasRightIcon: false,
      hasPlusButton: true
    }
  ], []);

  // Filter Sections for FilterInput Component
  const filterSections: FilterSection[] = [
    {
      id: "category",
      title: "Category",
      options: [
        { label: "All", value: "all" },
        { label: "General", value: "general" },
        { label: "Financial", value: "financial" },
        { label: "Appointment", value: "appointment" },
        { label: "Policy", value: "policy" },
        { label: "Notification", value: "notification" },
        { label: "Staff", value: "staff" },
        { label: "Security", value: "security" },
        { label: "Appearance", value: "appearance" }
      ]
    },
    {
      id: "service",
      title: "Service Type",
      options: [
        { label: "All Services", value: "all" },
        { label: "General", value: "general" },
        { label: "Financial", value: "financial" },
        { label: "Appointment", value: "appointment" },
        { label: "Security", value: "security" },
        { label: "Staff", value: "staff" },
        { label: "Appearance", value: "appearance" }
      ]
    },
    {
      id: "date",
      title: "Date Range",
      options: [
        { label: "All Dates", value: "all" },
        { label: "Today", value: "today" },
        { label: "Yesterday", value: "yesterday" },
        { label: "This Week", value: "thisweek" },
        { label: "Last Week", value: "lastweek" },
        { label: "This Month", value: "thismonth" },
        { label: "Last Month", value: "lastmonth" },
        { label: "Last 3 Months", value: "last3months" }
      ]
    }
  ];

  // Filter Input Handlers
  const handleFilterApply = (selections: Record<string, string>) => {
    if (selections.category) {
      setSelectedFilter(selections.category);
    }
    if (selections.service) {
      setSelectedServiceFilter(selections.service);
    }
    if (selections.date) {
      setSelectedDateFilter(selections.date);
    }
    setShowFilterModal(false);
  };

  const handleFilterReset = () => {
    setSelectedFilter("all");
    setSelectedServiceFilter("all");
    setSelectedDateFilter("all");
    setShowFilterModal(false);
  };

  
  // Filter, Search, and Sort Logic
  const filteredAndSortedData = useMemo(() => {
    let filtered = settingsData;

    // Apply Service Filter
    if (selectedServiceFilter !== 'all') {
      filtered = filtered.filter(setting => 
        setting.category.toLowerCase().includes(selectedServiceFilter.toLowerCase())
      );
    }

    // Apply Date Filter (for settings with dates)
    if (selectedDateFilter !== 'all') {
      // For settings, date filtering is conceptual since settings don't have date fields
      // In a real app, you would filter by actual date fields like lastModified
      // For now, we'll keep the logic structure but all settings pass through
      filtered = filtered.filter(setting => {
        switch (selectedDateFilter) {
          case 'today':
          case 'yesterday':
          case 'thisweek':
          case 'lastweek':
          case 'thismonth':
          case 'lastmonth':
          case 'last3months':
            // All settings pass through - in real app, filter by actual dates
            return true;
          default:
            return true;
        }
      });
    }

    // Apply Category Filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(setting => 
        setting.category.toLowerCase() === selectedFilter.toLowerCase()
      );
    }

    // Apply Search (supports search by name and number)
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      const cleanSearch = searchText.replace(/\D/g, ''); // Remove non-digits for number search
      
      filtered = filtered.filter(setting => {
        // Search by title/name
        if (setting.title.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // Search by subtitle
        if (setting.subtitle && setting.subtitle.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // Search by category
        if (setting.category.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // Search by setting ID
        if (cleanSearch.length > 0 && setting.id.toString().includes(cleanSearch)) {
          return true;
        }
        
        // Search by any digits in title or subtitle
        if (cleanSearch.length > 0) {
          if (setting.title.replace(/\D/g, '').includes(cleanSearch)) {
            return true;
          }
          if (setting.subtitle && setting.subtitle.replace(/\D/g, '').includes(cleanSearch)) {
            return true;
          }
        }
        
        return false;
      });
    }

    // Apply Sort (default to name ascending)
    const sorted = [...filtered].sort((a, b) => a.title.localeCompare(b.title));

    return sorted;
  }, [settingsData, selectedFilter, selectedDateFilter, selectedServiceFilter, searchText]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Black Header Section - 23vh */}
      <View style={[styles.blackHeader, { height: screenHeight * 0.23 }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SETTING</Text>
        
        {/* Search Input below title in header */}
        <SearchInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search Settings..."
          containerStyle={styles.searchBox}
          onFilterIconPress={() => setShowFilterModal(true)}
          showFilterIcon={true}
        />
      </View>

      {/* White Content Section */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.generalSettingTitle}>General Business Setting</Text>
        
        {/* Mapped Settings Items */}
        {filteredAndSortedData.map((setting) => (
          <View key={setting.id} style={styles.businessProfileDiv}>
            {/* Left Icon or Icon Group */}
            {setting.hasIconGroup ? (
              <View style={styles.iconGroup}>
                <MaterialCommunityIcons 
                  name="account-circle" 
                  size={16} 
                  color="#333" 
                />
                <MaterialCommunityIcons 
                  name="account-circle" 
                  size={16} 
                  color="#333" 
                  style={styles.overlapIcon}
                />
                <MaterialCommunityIcons 
                  name="account-circle" 
                  size={16} 
                  color="#333" 
                  style={styles.overlapIcon}
                />
              </View>
            ) : (
              <MaterialCommunityIcons 
                name={setting.icon as any}
                size={20} 
                color="#333" 
                style={styles.settingIcon}
              />
            )}
            
            {/* Center Content */}
            <View style={styles.centerContent}>
              <Text style={styles.businessProfileTitle}>{setting.title}</Text>
              {setting.subtitle && (
                <Text style={styles.subText}>{setting.subtitle}</Text>
              )}
            </View>
            
            {/* Right Icon */}
            {setting.hasRightIcon && setting.rightIcon && (
              <MaterialCommunityIcons 
                name={setting.rightIcon as any}
                size={20} 
                color="#333" 
                style={styles.rightIcon}
              />
            )}
            
            {/* Right Plus Button */}
            {setting.hasPlusButton && (
              <PlusButton
                size={24}
                iconSize={12}
                backgroundColor="#FFD700"
                onPress={() => {
                  console.log(`${setting.title} Plus clicked`);
                }}
              />
            )}
          </View>
        ))}
        
        {/* No Results Message */}
        {filteredAndSortedData.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No settings found</Text>
          </View>
        )}

        {/* Save Changes Button */}
        <DynamicButton
          text="Save Changes"
          onPress={() => {
            console.log('Save Changes clicked');
          }}
          backgroundColor="#4CAF50"
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
            marginTop: 20,
            marginBottom: 30,
          }}
        />
      </ScrollView>

      {/* ================= FILTER MODAL ================= */}
      <FilterInput
        title="Filters"
        sections={filterSections}
        isVisible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleFilterApply}
        onReset={handleFilterReset}
      />
      {/* ======================================================= */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  blackHeader: {
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
    color: "#fff", // White color
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 5, // Reduced gap
  },
  searchBox: {
    width: '90%',
    marginTop: 0, // Removed extra gap
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 30,
  },
  generalSettingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  businessProfileDiv: {
    height: 60, // Increased height to fit title and subtitle properly
    width: '90%',
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
  rightIcon: {
    marginLeft: 15,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  overlapIcon: {
    marginLeft: -8, // Overlap the icons
  },
  centerContent: {
    flex: 1,
  },
  businessProfileTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
  },
  subText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'left',
    marginTop: 2,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noResultsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default Setting;
