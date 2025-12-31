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
import Login from "../Login/login";
import Profile from "../Profile/Profile";
import Signup from "../Signup/Signup";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
  },
  headerSection: {
    backgroundColor: '#000000', // Black header only
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 25,
  },
  liveDate: {
    textAlign: 'center',
    fontSize: 13,
    color: '#FFFFFF', // White text for black background
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
    backgroundColor: '#FFD700', // Gold color for logo
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for black background
    marginLeft: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    flex: 1, // Take available space
  },
  userIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10, // Space from text
  },
  searchWrapper: {
    paddingHorizontal: 20,
  },
  searchInputStyle: {
    backgroundColor: '#FFFFFF', // White search input
    borderRadius: 25,
    height: 50,
    paddingLeft: 15,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background for list area
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
  cardWrapper: {
    backgroundColor: '#F8F8F8', // Light card for white theme
    borderRadius: 15,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    marginLeft: -35, // Half of button width (70/2)
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCompanyName, setShowCompanyName] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const displayDate = "December 30, 2025";

  const clientData = useMemo(() => [
    { id: 1, name: "Anya Sharma", phone: "+91 98765 43210", lastVisit: "Dec 1, 2025", image: "https://randomuser.me/api/portraits/women/10.jpg", status: "active", category: "Regular" },
    { id: 2, name: "Ben Carter", phone: "+1 555-123-4567", lastVisit: "Dec 28, 2025", image: "https://randomuser.me/api/portraits/men/10.jpg", status: "active", category: "VIP" },
    { id: 3, name: "Chloe Lee", phone: "+44 20 7946 0958", lastVisit: "Nov 20, 2025", image: "https://randomuser.me/api/portraits/women/11.jpg", status: "inactive", category: "Regular" },
    { id: 4, name: "Emma Wilson", phone: "+61 2 9876 5432", lastVisit: "Nov 15, 2025", image: "https://randomuser.me/api/portraits/women/12.jpg", status: "inactive", category: "VIP" },
    { id: 5, name: "David Chen", phone: "+86 138 0013 8000", lastVisit: "Nov 15, 2025", image: "https://randomuser.me/api/portraits/men/11.jpg", status: "active", category: "Regular" },
  ], []);

  // Filter Sections for FilterInput Component (like Setting page)
  const filterSections = [
    {
      id: "status",
      title: "Status",
      options: [
        { label: "All", value: "all" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    {
      id: "category",
      title: "Client Category",
      options: [
        { label: "All Clients", value: "all" },
        { label: "Regular", value: "regular" },
        { label: "VIP", value: "vip" },
      ],
    },
    {
      id: "sort",
      title: "Sort By",
      options: [
        { label: "Name", value: "name" },
        { label: "Last Visit", value: "lastVisit" },
        { label: "Date Added", value: "dateAdded" },
      ],
    },
  ];

  // Filter, Search, and Sort Logic (like Setting page)
  const filteredAndSortedClients = useMemo(() => {
    let filtered = clientData;

    // Apply Status Filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(client => 
        client.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply Category Filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(client => 
        client.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply Search (supports search by name and phone like Setting page)
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      const cleanSearch = searchText.replace(/\D/g, ''); // Remove non-digits for phone search
      
      filtered = filtered.filter(client => {
        // Search by name
        if (client.name.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // Search by phone number
        if (client.phone.replace(/\D/g, '').includes(cleanSearch)) {
          return true;
        }
        
        return false;
      });
    }

    // Sort the filtered results
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "lastVisit":
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
        case "dateAdded":
          return a.id - b.id;
        default:
          return 0;
      }
    });
  }, [clientData, searchText, statusFilter, categoryFilter, sortBy]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={false} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {showLogin ? (
          <Login 
            onBack={() => setShowLogin(false)} 
            onNavigateToSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
            onNavigateToHome={() => setShowLogin(false)}
          />
        ) : showSignup ? (
          <Signup 
            onBack={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
            onNavigateToCompanyName={() => {
              setShowSignup(false);
              setShowCompanyName(true);
            }}
            onNavigateToLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        ) : showCompanyName ? (
          <CompanyName 
            onBack={() => {
              setShowCompanyName(false);
              setShowSignup(true);
            }}
            onNavigateToProfile={() => {
              setShowCompanyName(false);
              setShowProfile(true);
            }}
            onNavigateToSignup={() => {
              setShowCompanyName(false);
              setShowSignup(true);
            }}
          />
        ) : showAbout ? (
          <About 
            onBack={() => setShowAbout(false)}
          />
        ) : showProfile ? (
          <Profile 
            onBack={() => setShowProfile(false)}
          />
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
                <SearchInput
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search by Name or Phone..."
                  style={styles.searchInputStyle}
                  showFilterIcon={true}
                  onFilterIconPress={() => setShowFilterModal(true)}
                />
                <FilterInput
                  title="Client Filters"
                  sections={filterSections}
                  isVisible={showFilterModal}
                  onClose={() => setShowFilterModal(false)}
                  onApply={(filters) => {
                    console.log('Filters applied:', filters);
                    setStatusFilter(filters.status || 'all');
                    setCategoryFilter(filters.category || 'all');
                    setSortBy(filters.sort || 'name');
                    setShowFilterModal(false);
                  }}
                  onReset={() => {
                    console.log('Filters reset');
                    setStatusFilter('all');
                    setCategoryFilter('all');
                    setSortBy('name');
                    setShowFilterModal(false);
                  }}
                />
              </View>
            </View>

            <ScrollView style={styles.listContainer}>
              <View style={styles.listContent}>
                {filteredAndSortedClients.map((client) => (
                  <CustomCard
                    key={client.id}
                    name={client.name}
                    profileImageUri={client.image}
                    lastVisit={`Last Visit: ${client.lastVisit}`}
                    appIcon={<MaterialCommunityIcons name="whatsapp" size={26} color="#25D366" />}
                    backgroundColor="#F8F8F8"
                    onPress={() => {
                      setShowAbout(true);
                    }}
                  />
                ))}
              </View>
            </ScrollView>
          </>
        )}
      </KeyboardAvoidingView>

      {/* ================= PLUS BUTTON SECTION ================= */}
      {/* Only show plus button on home page */}
      {!showLogin && !showSignup && !showCompanyName && !showAbout && !showProfile && (
        <View style={styles.buttonContainer}>
          <PlusButton
            onPress={() => setShowLogin(true)}
            size={70}
            backgroundColor="#FFD700"
            iconSize={35}
          />
        </View>
      )}
      {/* ======================================================= */}
    </SafeAreaView>
  );
};

export default Home;