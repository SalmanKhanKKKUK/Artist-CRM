import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import PlusButton from "../../common/Buttons/PlusButton";
import CustomCard from "../../common/Cards/CustomCard";
import SearchInput from "../../common/Inputs/SearchInput";
import About from "../About/About";
import Login from "../Login/login";

const { height: screenHeight } = Dimensions.get("window");

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const currentDate = new Date().toDateString();

  // Create the WhatsApp icon component to pass to the card
  const whatsappIcon = (
    <MaterialCommunityIcons
      name="whatsapp"
      size={24}
      color="#25D366"
    />
  );

  // Sample Data (Only 5 cards for Home page)
  const clientData = [
    {
      id: 1,
      name: "Ahmed Khan",
      profileImageUri: "https://example.com/ahmed.jpg",
      lastVisit: "2 hours ago"
    },
    {
      id: 2,
      name: "Fatima Ali",
      profileImageUri: "https://example.com/fatima.jpg",
      lastVisit: "Yesterday"
    },
    {
      id: 3,
      name: "Zainab",
      profileImageUri: "https://example.com/zainab.jpg",
      lastVisit: "2 mins ago"
    },
    {
      id: 4,
      name: "Omar Hassan",
      profileImageUri: "https://example.com/omar.jpg",
      lastVisit: "1 hour ago"
    },
    {
      id: 5,
      name: "Sara Ahmed",
      profileImageUri: "https://example.com/sara.jpg",
      lastVisit: "3 hours ago"
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {showLogin ? (
        <Login onBack={() => setShowLogin(false)} />
      ) : showAbout ? (
        <About onBack={() => setShowAbout(false)} clientName={selectedClient} /> // Add the About component
      ) : (
        <>
          {/* ================= HERO SECTION (headerContainer) ================= */}
          <View style={styles.headerContainer}>
            {/* Date at top */}
            <Text style={styles.dateText}>{currentDate}</Text>

            {/* Image + Title */}
            <View style={styles.rowBox}>
              <Image
                // Note: The path requires a dummy image if you're not running in Expo/RN environment with the file.
                source={require("../../../assets/homeimages/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.heading}>ARTISTS CRM</Text>
            </View>

            {/* Search Input */}
            <SearchInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search by Name"
              containerStyle={styles.searchBox}
            />
          </View>
          {/* ================================================== */}

          {/* ================= CARD SECTION ================= */}
          {/* Use ScrollView to allow scrolling for the list */}
          <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
            {clientData.map((client) => (
              // *** CUSTOM CARD USAGE 1: Mapped from data ***
              <CustomCard
                key={client.id}
                profileImageUri={client.profileImageUri}
                name={client.name}
                lastVisit={client.lastVisit}
                appIcon={whatsappIcon} // Reused icon
                backgroundColor="#F8F8F8"
                onPress={() => {
                  setSelectedClient(client.name);
                  setShowAbout(true);
                }}
              />
            ))}
          </ScrollView>
          {/* ======================================================= */}

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
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#000",
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
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
});

export default Home;