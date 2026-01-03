import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { 
  Alert, 
  Dimensions, 
  Modal, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  KeyboardAvoidingView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DynamicButton from '../../common/Buttons/DynamicButton';
import ToggleButton from '../../common/Buttons/ToggleButton';
import CalendarCard from '../../common/Cards/CalendarCard';
import FilterInput, { FilterSection } from '../../common/Inputs/FilterInput';
import SearchInput from '../../common/Inputs/SearchInput';

// 1. Icon Names ki list ko satisfy karne ke liye type
type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface SettingProps {
  onBack: () => void;
}

interface SettingItem {
  id: number;
  title: string;
  subtitle: string;
  icon: IconName;
  category: string;
  hasRightIcon: boolean;
  rightIcon?: IconName;
  hasPlusButton: boolean;
}

const screenHeight: number = Dimensions.get('window').height;

const Setting: React.FC<SettingProps> = ({ onBack }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false);
  const [tempToggleStates, setTempToggleStates] = useState<Record<string, boolean>>({});

  const settingsData: SettingItem[] = useMemo(() => [
    { id: 2, title: 'Operating Hours', subtitle: 'Notice, Buffer, Add Weekly Notice', icon: 'clock', category: 'General', hasRightIcon: true, rightIcon: 'chevron-right', hasPlusButton: false },
    { id: 3, title: 'Tax Setting', subtitle: 'Fees and Refunds', icon: 'file-document', category: 'Financial', hasRightIcon: true, rightIcon: 'chevron-right', hasPlusButton: false },
    { id: 4, title: 'Book & Appointment', subtitle: '', icon: 'content-cut', category: 'Appointment', hasRightIcon: true, rightIcon: 'calendar', hasPlusButton: false },
    { id: 5, title: 'Cancellation Policy', subtitle: '', icon: 'file-document', category: 'Policy', hasRightIcon: false, hasPlusButton: true },
    { id: 6, title: 'Custom Notifications', subtitle: '', icon: 'message', category: 'Notification', hasRightIcon: true, rightIcon: 'chevron-right', hasPlusButton: false },
    { id: 7, title: 'Staff Management', subtitle: '', icon: 'account-circle', category: 'Staff', hasRightIcon: true, rightIcon: 'chevron-right', hasPlusButton: false },
    { id: 8, title: 'Commission', subtitle: '', icon: 'account-circle', category: 'Financial', hasRightIcon: false, hasPlusButton: true },
    { id: 9, title: 'Two-Factor Auth Security', subtitle: '', icon: 'shield-key', category: 'Security', hasRightIcon: true, rightIcon: 'chevron-right', hasPlusButton: false },
    { id: 10, title: 'Dark Mood', subtitle: 'Dark theme', icon: 'moon-waning-crescent', category: 'Appearance', hasRightIcon: false, hasPlusButton: true }
  ], []);

  const filterSections: FilterSection[] = [
    { 
      id: "category", 
      title: "Category", 
      options: [
        { label: "All", value: "all" },
        { label: "General", value: "general" },
        { label: "Financial", value: "financial" }
      ] 
    }
  ];

  const filteredData = useMemo(() => {
    let data = [...settingsData];
    if (selectedFilter !== 'all') {
      data = data.filter(item => item.category.toLowerCase() === selectedFilter.toLowerCase());
    }
    if (searchText) {
      data = data.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
    }
    return data;
  }, [selectedFilter, searchText, settingsData]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View style={styles.mainWrapper}>
        {/* BLACK HEADER SECTION */}
        <View style={styles.blackHeader}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onBack}>
              <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>SETTING</Text>
            <View style={{ width: 28 }} />
          </View>
          
          <SearchInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search Settings..."
            containerStyle={styles.searchBox}
            onFilterIconPress={() => setShowFilterModal(true)}
            showFilterIcon={true}
          />
        </View>

        {/* WHITE CONTENT SECTION */}
        <View style={styles.formSection}>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <Text style={styles.generalSettingTitle}>General Business Setting</Text>
              
              {filteredData.map((item) => (
                <View key={item.id} style={styles.settingCard}>
                  <MaterialCommunityIcons name={item.icon} size={22} color="#333" style={styles.iconStyle} />
                  <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {item.subtitle !== '' && <Text style={styles.itemSubtitle}>{item.subtitle}</Text>}
                  </View>
                  
                  {item.title === 'Book & Appointment' ? (
                    <TouchableOpacity onPress={() => setShowCalendarModal(true)}>
                      <MaterialCommunityIcons name="calendar" size={24} color="#9E9E9E" />
                    </TouchableOpacity>
                  ) : item.hasPlusButton ? (
                    <ToggleButton
                      isOn={tempToggleStates[item.title] || false}
                      onToggle={(isOn) => setTempToggleStates(prev => ({ ...prev, [item.title]: isOn }))}
                      size={18}
                    />
                  ) : (
                    <MaterialCommunityIcons name={item.rightIcon || 'chevron-right'} size={22} color="#333" />
                  )}
                </View>
              ))}

              <DynamicButton
                text="Save Changes"
                onPress={() => Alert.alert('Saved')}
                backgroundColor="#FFD700"
                textColor="#000"
                width="100%"
                containerStyle={styles.buttonMargin}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </View>

      {/* Filter Modal */}
      <FilterInput
        title="Filters"
        sections={filterSections}
        isVisible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={(selections) => {
          if (selections.category) setSelectedFilter(selections.category);
          setShowFilterModal(false);
        }}
        onReset={() => {
          setSelectedFilter("all");
          setShowFilterModal(false);
        }}
      />

      {/* Calendar Modal */}
      <Modal visible={showCalendarModal} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowCalendarModal(false)}>
              <MaterialCommunityIcons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <CalendarCard 
                title="Select Date" 
                subtitle="Appointment" 
                icon="calendar" 
                showHeader={false} 
                onDateSelect={() => setShowCalendarModal(false)} 
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  mainWrapper: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  blackHeader: {
    backgroundColor: '#000',
    paddingBottom: 40,
    alignItems: 'center',
    height: screenHeight * 0.28,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    paddingTop: 10,
    marginBottom: 20,
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  searchBox: { 
    width: "95%" 
  },
  formSection: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  scrollContent: { 
    paddingTop: 30 
  },
  generalSettingTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: '#000' 
  },
  settingCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  iconStyle: { 
    marginRight: 15 
  },
  textContainer: { 
    flex: 1 
  },
  itemTitle: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#000' 
  },
  itemSubtitle: { 
    fontSize: 11, 
    color: '#666' 
  },
  buttonMargin: { 
    marginTop: 20, 
    marginBottom: 40 
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 20, 
    width: '90%' 
  },
  closeBtn: { 
    alignSelf: 'flex-end', 
    marginBottom: 10 
  },
});

export default Setting;


