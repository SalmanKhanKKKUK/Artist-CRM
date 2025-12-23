import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PlusButton from "../../common/Buttons/PlusButton";
import CustomCard from "../../common/Cards/CustomCard";
import FilterInput, { FilterSection } from "../../common/Inputs/FilterInput";
import SearchInput from "../../common/Inputs/SearchInput";
import About from "../About/About";
import Login from "../Login/login";
import Profile from "../Profile/Profile";

const { height: screenHeight } = Dimensions.get("window");

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState("all");
      const [selectedDateFilter, setSelectedDateFilter] = useState("all");
  const [selectedServiceFilter, setSelectedServiceFilter] = useState("all");
  const currentDate = new Date().toDateString();

  // Create the WhatsApp icon component to pass to the card
  const whatsappIcon = (
    <MaterialCommunityIcons
      name="whatsapp"
      size={24}
      color="#25D366"
    />
  );

  // Sample Data (Only 5 cards for Home page) - wrapped in useMemo for performance
  const clientData = useMemo(() => [
    {
      id: 1,
      name: "Ahmed Khan",
      profileImageUri: "https://example.com/ahmed.jpg",
      lastVisit: "2 hours ago",
      lastVisitDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      phone: "+923001234567",
      instagram: "@ahmedkhan_official",
      serviceType: "Full Color",
      visitCount: 3,
      category: "VIP"
    },
    {
      id: 2,
      name: "Fatima Ali",
      profileImageUri: "https://example.com/fatima.jpg",
      lastVisit: "Yesterday",
      lastVisitDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      phone: "+923007654321",
      instagram: "@fatima.ali",
      serviceType: "Haircut",
      visitCount: 4,
      category: "Regular"
    },
    {
      id: 3,
      name: "Zainab",
      profileImageUri: "https://example.com/zainab.jpg",
      lastVisit: "2 mins ago",
      lastVisitDate: new Date(Date.now() - 2 * 60 * 1000), // 2 mins ago
      phone: "+923009876543",
      instagram: "@zainab_beauty",
      serviceType: "Full Color",
      visitCount: 8,
      category: "VIP"
    },
    {
      id: 4,
      name: "Omar Hassan",
      profileImageUri: "https://example.com/omar.jpg",
      lastVisit: "1 hour ago",
      lastVisitDate: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      phone: "+923001234567",
      instagram: "@omar_hassan",
      serviceType: "Haircut",
      visitCount: 1,
      category: "Regular"
    },
    {
      id: 5,
      name: "Sara Ahmed",
      profileImageUri: "https://example.com/sara.jpg",
      lastVisit: "3 hours ago",
      lastVisitDate: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      phone: "+923005678901",
      instagram: "@sara.ahmed",
      serviceType: "Haircut",
      visitCount: 2,
      category: "New"
    }
  ], []);

  // Filter Sections for FilterInput Component
  const filterSections: FilterSection[] = [
    {
      id: "category",
      title: "Category",
      options: [
        { label: "All", value: "all" },
        { label: "VIP", value: "vip" },
        { label: "Regular", value: "regular" },
        { label: "New", value: "new" },
        { label: "Frequent Clients", value: "frequent" }
      ]
    },
    {
      id: "service",
      title: "Service Type",
      options: [
        { label: "All Services", value: "all" },
        { label: "Full Color", value: "fullcolor" },
        { label: "Haircut", value: "haircut" },
        { label: "Bleach", value: "bleach" },
        { label: "Highlights", value: "highlights" },
        { label: "Treatment", value: "treatment" },
        { label: "Styling", value: "styling" }
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
    let filtered = clientData;

    // Apply Service Filter
    if (selectedServiceFilter !== "all") {
      filtered = filtered.filter(client => 
        client.serviceType.toLowerCase().includes(selectedServiceFilter.toLowerCase())
      );
    }

    // Apply Date Filter
    if (selectedDateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const thisWeekStart = new Date(today);
      thisWeekStart.setDate(today.getDate() - today.getDay());
      const lastWeekStart = new Date(thisWeekStart);
      lastWeekStart.setDate(lastWeekStart.getDate() - 7);
      const lastWeekEnd = new Date(thisWeekStart);
      lastWeekEnd.setDate(lastWeekEnd.getDate() - 1);
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());

      filtered = filtered.filter(client => {
        const clientDate = client.lastVisitDate;
        switch (selectedDateFilter) {
          case "today":
            return clientDate >= today;
          case "yesterday":
            return clientDate >= yesterday && clientDate < today;
          case "thisweek":
            return clientDate >= thisWeekStart;
          case "lastweek":
            return clientDate >= lastWeekStart && clientDate <= lastWeekEnd;
          case "thismonth":
            return clientDate >= thisMonthStart;
          case "lastmonth":
            return clientDate >= lastMonthStart && clientDate <= lastMonthEnd;
          case "last3months":
            return clientDate >= threeMonthsAgo;
          default:
            return true;
        }
      });
    }

    // Apply Category Filter
    if (selectedFilter !== "all") {
      switch (selectedFilter) {
        case "vip":
        case "regular":
        case "new":
          filtered = filtered.filter(client => 
            client.category.toLowerCase() === selectedFilter.toLowerCase()
          );
          break;
        case "frequent":
          filtered = filtered.filter(client => 
            client.visitCount >= 3 // Clients who visit 3+ times
          );
          break;
      }
    }

    // Apply Search (supports search by name and number)
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      const cleanSearch = searchText.replace(/\D/g, ''); // Remove non-digits for number search
      
      filtered = filtered.filter(client => {
        // Search by name
        if (client.name.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // Search by phone number (last 4 digits or any digits)
        if (cleanSearch.length > 0) {
          const cleanPhone = client.phone.replace(/\D/g, '');
          if (cleanPhone.includes(cleanSearch)) {
            return true;
          }
        }
        
        // Search by visit count
        if (cleanSearch.length > 0 && client.visitCount.toString().includes(cleanSearch)) {
          return true;
        }
        
        // Search by client ID
        if (cleanSearch.length > 0 && client.id.toString().includes(cleanSearch)) {
          return true;
        }
        
        // Search by other text fields
        return (
          client.instagram.toLowerCase().includes(searchLower) ||
          client.lastVisit.toLowerCase().includes(searchLower) ||
          client.serviceType.toLowerCase().includes(searchLower) ||
          client.category.toLowerCase().includes(searchLower)
        );
      });
    }

    // Apply Sort (default to name ascending)
    const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  }, [clientData, selectedFilter, selectedDateFilter, selectedServiceFilter, searchText]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {showLogin ? (
        <Login onBack={() => setShowLogin(false)} />
      ) : showAbout ? (
        <About onBack={() => setShowAbout(false)} clientName={selectedClient} />
      ) : showProfile ? (
        <Profile onBack={() => setShowProfile(false)} />
      ) : (
        <>
          {/* ================= HERO SECTION (headerContainer) ================= */}
          <View style={styles.headerContainer}>
            {/* Date at top */}
            <Text style={styles.dateText}>{currentDate}</Text>

            {/* Image + Title */}
            <View style={styles.rowBox}>
              <Image
                source={require("../../../assets/homeimages/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.heading}>ARTISTS CRM</Text>
              <TouchableOpacity 
                onPress={() => setShowProfile(true)}
              >
                <MaterialCommunityIcons
                  name="account-circle"
                  size={40}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <SearchInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search by Name..."
              containerStyle={styles.searchBox}
              onFilterIconPress={() => setShowFilterModal(true)}
              showFilterIcon={true}
            />
          </View>
          {/* ================================================== */}

          {/* ================= CARD SECTION ================= */}
          <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
            {filteredAndSortedData.map((client) => (
              <CustomCard
                key={client.id}
                profileImageUri={client.profileImageUri}
                name={client.name}
                lastVisit={client.lastVisit}
                appIcon={whatsappIcon}
                backgroundColor="#F8F8F8"
                onPress={() => {
                  setSelectedClient(client.name);
                  setShowAbout(true);
                }}
              />
            ))}
            {filteredAndSortedData.length === 0 && (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No clients found</Text>
              </View>
            )}
          </ScrollView>

          {/* ================= PLUS BUTTON SECTION ================= */}
          <View style={styles.buttonContainer}>
            <PlusButton
              onPress={() => setShowLogin(true)}
              size={70}
              backgroundColor="#FFD700"
              iconSize={35}
            />
          </View>
          {/* ======================================================= */}

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
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: 35,
  },
  headerContainer: {
    width: "100%",
    height: screenHeight * 0.25,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#000",
  },
  dateText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
    marginBottom: 10,
  },
  rowBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#000",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    marginRight: 20,
  },
  profileIcon: {
    marginLeft: 10,
  },
  searchBox: {
    width: "90%",
    backgroundColor: "#fff",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
  listContent: {
    alignItems: "center",
    paddingBottom: 20,
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  noResultsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});

export default Home;