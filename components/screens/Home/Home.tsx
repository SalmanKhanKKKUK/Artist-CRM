import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlusButton from "../../common/Buttons/PlusButton";
import CustomCard from "../../common/Cards/CustomCard";
import FilterInput from "../../common/Inputs/FilterInput";
import SearchInput from "../../common/Inputs/SearchInput";
import About from "../About/About";
import CompanyName from "../CompanyName/CompanyName";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/login";
import Profile from "../Profile/Profile";
import Signup from "../Signup/Signup";

// TypeScript interfaces
interface Client {
  id: number;
  name: string;
  phone: string;
  lastVisit: string;
  image: string;
  status: string;
  category: string;
}

// Interface for filter selections
interface FilterSelections {
  category?: string;
  service?: string;
  date?: string;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSection: {
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 25,
  },
  liveDate: {
    textAlign: 'center',
    fontSize: 13,
    color: '#FFFFFF',
    marginBottom: 15,
    fontWeight: '500',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'center', 
  },
  logoIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 40,
    letterSpacing: 1,
    textTransform: 'uppercase',
    flex: 1,
  },
  userIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  searchWrapper: {
    paddingHorizontal: 20,
  },
  searchInputStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    paddingLeft: 15,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    marginLeft: -35,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('all');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>('all');
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const [showCompanyName, setShowCompanyName] = useState<boolean>(false);
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);

  // Force show main content by default
  const showMainContent = !showLogin && !showSignup && !showCompanyName && !showAbout && !showProfile && !showDashboard;

  const displayDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const clientData: Client[] = useMemo(() => [
    { id: 1, name: "Anya Sharma", phone: "+91 98765 43210", lastVisit: "Dec 1, 2025", image: "https://randomuser.me/api/portraits/women/10.jpg", status: "active", category: "Regular" },
    { id: 2, name: "Ben Carter", phone: "+1 555-123-4567", lastVisit: "Dec 28, 2025", image: "https://randomuser.me/api/portraits/men/10.jpg", status: "active", category: "VIP" },
    { id: 3, name: "Chloe Lee", phone: "+44 20 7946 0958", lastVisit: "Nov 20, 2025", image: "https://randomuser.me/api/portraits/women/11.jpg", status: "inactive", category: "Regular" },
    { id: 4, name: "Emma Wilson", phone: "+61 2 9876 5432", lastVisit: "Nov 15, 2025", image: "https://randomuser.me/api/portraits/women/12.jpg", status: "inactive", category: "VIP" },
    { id: 5, name: "David Chen", phone: "+86 138 0013 8000", lastVisit: "Nov 15, 2025", image: "https://randomuser.me/api/portraits/men/11.jpg", status: "active", category: "Regular" },
  ], []);

  const filterSections = [
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

  const filteredAndSortedClients = useMemo(() => {
    let filtered = [...clientData];

    if (selectedServiceFilter !== 'all') {
      filtered = filtered.filter(client => 
        client.category.toLowerCase().includes(selectedServiceFilter.toLowerCase())
      );
    }

    if (selectedDateFilter !== 'all') {
      filtered = filtered.filter(client => {
        const clientDate = new Date(client.lastVisit);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        switch (selectedDateFilter) {
          case 'today':
            return clientDate.toDateString() === new Date().toDateString();
          case 'yesterday':
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return clientDate.toDateString() === yesterday.toDateString();
          case 'thisweek':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            return clientDate >= weekStart;
          case 'thismonth':
            return clientDate.getMonth() === today.getMonth() && clientDate.getFullYear() === today.getFullYear();
          default:
            return true;
        }
      });
    }

    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchLower) || 
        client.phone.includes(searchLower)
      );
    }

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(client => client.category.toLowerCase() === selectedFilter.toLowerCase());
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [clientData, selectedFilter, selectedDateFilter, selectedServiceFilter, searchText]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={false} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {showLogin ? (
          <Login onBack={() => setShowLogin(false)} onNavigateToSignup={() => { setShowLogin(false); setShowSignup(true); }} onNavigateToHome={() => setShowLogin(false)} onNavigateToMainHome={() => { setShowLogin(false); }} onNavigateToDashboard={() => { setShowLogin(false); setShowDashboard(true); }} />
        ) : showSignup ? (
          <Signup 
            onBack={() => { setShowSignup(false); setShowLogin(true); }} 
            onNavigateToCompanyName={() => { 
              console.log('Home.tsx: Navigation called - FIXED'); 
              console.log('Before state change:', { showSignup, showCompanyName });
              setShowSignup(false); 
              setShowCompanyName(true); 
              console.log('After state change:', { showSignup: false, showCompanyName: true });
              console.log('Home.tsx: State changed - FIXED'); 
            }} 
            onNavigateToLogin={() => { setShowSignup(false); setShowLogin(true); }} 
            onNavigateToHome={() => { setShowSignup(false); }} 
            onNavigateToMainHome={() => { setShowSignup(false); }} 
          />
        ) : showCompanyName ? (
          <CompanyName onBack={() => { setShowCompanyName(false); setShowSignup(true); }} onNavigateToProfile={() => { setShowCompanyName(false); setShowProfile(true); }} onNavigateToSignup={() => { setShowCompanyName(false); setShowSignup(true); }} />
        ) : showAbout ? (
          <About onBack={() => setShowAbout(false)} />
        ) : showProfile ? (
          <Profile onBack={() => setShowProfile(false)} />
        ) : showDashboard ? (
          <Dashboard onBack={() => setShowDashboard(false)} />
        ) : (
          <>
            <View style={styles.headerSection}>
              <Text style={styles.liveDate}>{displayDate}</Text>
              <View style={styles.logoRow}>
                <View style={styles.logoIconContainer}>
                  <MaterialCommunityIcons name="wrench-outline" size={24} color="#000" />
                </View>
                <Text style={styles.logoText}>Artists-CRM</Text>
                <View style={styles.userIconContainer}>
                  <TouchableOpacity onPress={() => setShowProfile(true)}>
                    <MaterialCommunityIcons name="account-circle" size={28} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.searchWrapper}>
                <SearchInput value={searchText} onChangeText={setSearchText} placeholder="Search..." showFilterIcon={true} onFilterIconPress={() => setShowFilterModal(true)} />
                <FilterInput 
                  title="Filters" 
                  sections={filterSections} 
                  isVisible={showFilterModal} 
                  onClose={() => setShowFilterModal(false)} 
                  onApply={(selections: FilterSelections) => {
                    if (selections.category) setSelectedFilter(selections.category);
                    if (selections.service) setSelectedServiceFilter(selections.service);
                    if (selections.date) setSelectedDateFilter(selections.date);
                    setShowFilterModal(false);
                  }} 
                  onReset={() => {
                    setSelectedFilter("all");
                    setSelectedServiceFilter("all");
                    setSelectedDateFilter("all");
                    setShowFilterModal(false);
                  }} 
                />
              </View>
            </View>
            <ScrollView style={styles.listContainer}>
              <View style={styles.listContent}>
                {filteredAndSortedClients.map((client) => (
                  <CustomCard key={client.id} name={client.name} profileImageUri={client.image} lastVisit={`Last Visit: ${client.lastVisit}`} appIcon={<MaterialCommunityIcons name="whatsapp" size={26} color="#25D366" />} backgroundColor="#F8F8F8" onPress={() => setShowAbout(true)} />
                ))}
              </View>
            </ScrollView>
          </>
        )}
      </KeyboardAvoidingView>
      {showMainContent && (
        <View style={styles.buttonContainer}>
          <PlusButton onPress={() => setShowLogin(true)} size={70} backgroundColor="#FFD700" iconSize={35} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

