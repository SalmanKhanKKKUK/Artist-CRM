import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Alert, Dimensions, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DynamicButton from '../../common/Buttons/DynamicButton';
import ToggleButton from '../../common/Buttons/ToggleButton';
import CalendarCard from '../../common/Cards/CalendarCard';
import FilterInput, { FilterSection } from '../../common/Inputs/FilterInput';
import SearchInput from '../../common/Inputs/SearchInput';

interface SettingProps {
  onBack: () => void;
}

const Setting = ({ onBack }: SettingProps) => {
  console.log('Setting component rendered');
  
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [tempToggleStates, setTempToggleStates] = useState<{ [key: string]: boolean }>({});
  const { height: screenHeight } = Dimensions.get('window');
  
  console.log('All states initialized successfully');

  // Settings Data Structure
  const settingsData = useMemo(() => [
    {
      id: 1,
      title: 'Business Profile',
      subtitle: 'Name, Logo, Desc, set Weekly Schedule',
      icon: 'cog',
      category: 'General',
      hasRightIcon: true,
      rightIcon: 'chevron-right',
      hasPlusButton: false
    },
    {
      id: 2,
      title: 'Operating Hours',
      subtitle: 'Notice, Buffer, Add Weekly Notice',
      icon: 'clock',
      category: 'General',
      hasRightIcon: true,
      rightIcon: 'chevron-right',
      hasPlusButton: false
    },
    {
      id: 3,
      title: 'Tax Setting',
      subtitle: 'Fees and Refunds',
      icon: 'file-document',
      category: 'Financial',
      hasRightIcon: true,
      rightIcon: 'chevron-right',
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
      hasPlusButton: true,
      plusButtonIcon: 'toggle-switch-off'
    },
    {
      id: 6,
      title: 'Custom Notifications',
      subtitle: '',
      icon: 'message',
      category: 'Notification',
      hasRightIcon: true,
      rightIcon: 'chevron-right',
      hasPlusButton: false
    },
    {
      id: 7,
      title: 'Staff Management',
      subtitle: '',
      icon: 'account-circle',
      category: 'Staff',
      hasRightIcon: true,
      rightIcon: 'chevron-right',
      hasPlusButton: false
    },
    {
      id: 8,
      title: 'Commission',
      subtitle: '',
      icon: 'account-circle',
      category: 'Financial',
      hasRightIcon: false,
      hasPlusButton: true,
      plusButtonIcon: 'toggle-switch-off'
    },
    {
      id: 9,
      title: 'Two-Factor Auth Security',
      subtitle: '',
      icon: 'shield-key',
      category: 'Security',
      hasRightIcon: true,
      rightIcon: 'chevron-right',
      hasPlusButton: false
    },
    {
      id: 10,
      title: 'Dark Mood',
      subtitle: 'Dark theme',
      icon: 'moon-waning-crescent',
      category: 'Appearance',
      hasRightIcon: false,
      hasPlusButton: true,
      plusButtonIcon: 'toggle-switch-off'
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

  // Toggle Button Handler with Alert for Cancellation Policy and Commission
  const handleTogglePress = (setting: any, isOn: boolean) => {
    if (setting.title === 'Cancellation Policy') {
      // Show alert for Cancellation Policy
      Alert.alert(
        'Cancel Policy',
        'Are you sure to cancel\'s policy?',
        [
          {
            text: 'No',
            onPress: () => {
              // Revert toggle state
              setTempToggleStates(prev => ({ ...prev, [setting.title]: !isOn }));
            },
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              // Confirm toggle state
              setTempToggleStates(prev => ({ ...prev, [setting.title]: isOn }));
            },
          },
        ],
        { cancelable: false }
      );
    } else if (setting.title === 'Commission') {
      // Show alert for Commission
      Alert.alert(
        'Commission Setting',
        'Are you sure you want to enable commission settings?',
        [
          {
            text: 'No',
            onPress: () => {
              // Revert toggle state
              setTempToggleStates(prev => ({ ...prev, [setting.title]: !isOn }));
            },
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              // Confirm toggle state
              setTempToggleStates(prev => ({ ...prev, [setting.title]: isOn }));
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      // Normal toggle for other settings (including Dark Mood)
      setTempToggleStates(prev => ({ ...prev, [setting.title]: isOn }));
    }
  };

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
        {filteredAndSortedData.map((setting) => {
          // Use inline CalendarCard for Book & Appointment
          if (setting.title === 'Book & Appointment') {
            return (
              <View key={setting.id} style={styles.businessProfileDiv}>
                <MaterialCommunityIcons 
                  name={setting.icon as any}
                  size={20} 
                  color="#000000" 
                  style={styles.settingIcon}
                />
                <View style={styles.centerContent}>
                  <Text style={styles.businessProfileTitle}>{setting.title}</Text>
                  {setting.subtitle && (
                    <Text style={styles.subText}>{setting.subtitle}</Text>
                  )}
                </View>
                <TouchableOpacity 
                  onPress={() => {
                    setShowCalendarModal(true);
                  }}
                  style={styles.calendarIconContainer}
                >
                  <MaterialCommunityIcons 
                    name="calendar" 
                    size={24} 
                    color="#9E9E9E" 
                  />
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View key={setting.id} style={styles.businessProfileDiv}>
                {/* Left Icon */}
                <MaterialCommunityIcons 
                  name={setting.icon as any}
                  size={20} 
                  color="#333" 
                  style={styles.settingIcon}
                />
                
                {/* Center Content */}
                <View style={styles.centerContent}>
                  <Text style={styles.businessProfileTitle}>{setting.title}</Text>
                  {setting.subtitle && (
                    <Text style={styles.subText}>{setting.subtitle}</Text>
                  )}
                </View>
                
                {/* Right Icon or Plus Button */}
                {setting.hasPlusButton ? (
                  <ToggleButton
                    isOn={tempToggleStates[setting.title] || false}
                    onToggle={(isOn) => handleTogglePress(setting, isOn)}
                    size={18}
                    activeColor="#4CAF50"
                    inactiveColor="#9E9E9E"
                  />
                ) : setting.hasRightIcon ? (
                  <TouchableOpacity style={styles.rightIconContainer}>
                    <MaterialCommunityIcons 
                      name={setting.rightIcon as any}
                      size={20} 
                      color="#333" 
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          }
        })}
        
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
            // Apply all temporary changes
            console.log('Applying all changes:');
            console.log('Toggle states:', tempToggleStates);
            
            console.log('All changes saved successfully!');
          }}
          backgroundColor="#FFD700"
          textColor="#000000"
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

      {/* ================= CALENDAR MODAL ================= */}
      <Modal
        visible={showCalendarModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCalendarModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                onPress={() => setShowCalendarModal(false)}
                style={styles.closeButton}
              >
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <CalendarCard
              title="Book & Appointment"
              subtitle="Select appointment date"
              icon="content-cut"
              showHeader={false}
              onDateSelect={(date) => {
                console.log('Appointment date selected:', date);
                setShowCalendarModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
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
    height: 120,
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
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  settingItem: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  settingValue: {
    fontSize: 14,
    color: "#666",
  },
  generalSettingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    width: "100%",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  businessProfileDiv: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingIcon: {
    marginRight: 15,
  },
  calendarIconContainer: {
    padding: 5,
  },
  rightIconContainer: {
    padding: 5,
  },
  iconGroup: {
    flexDirection: "row",
    marginRight: 15,
  },
  overlapIcon: {
    marginLeft: -8,
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
  rightIcon: {
    marginLeft: 10,
  },
  searchBox: {
    width: "90%",
    marginTop: 15,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmModalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmModalHeader: {
    marginBottom: 15,
    alignItems: 'center',
  },
  confirmModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  confirmModalBody: {
    marginBottom: 20,
    alignItems: 'center',
  },
  confirmModalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  confirmModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmCancelButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmOkButton: {
    flex: 1,
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  confirmCancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  confirmOkText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  closeButton: {
    padding: 5,
  },
});

export default Setting;
