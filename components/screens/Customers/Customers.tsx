import React, { useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

import { THEME_COLORS } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import NavHeader from '../../common/Buttons/NavHeader';
import ImageDesCard from '../../common/Cards/ImageDesCard';
import SearchInput from '../../common/Inputs/SearchInput';

// --- Interfaces ---
interface Customer {
  id: string;
  title: string;
  phone: string;
  email: string;
  description: string;
  image: string;
}

const Customers: React.FC<{ onBack?: () => void; onNavigateToInvite?: () => void }> = ({
  onBack,
  onNavigateToInvite
}) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  // --- Data ---
  const defaultCustomers: Customer[] = [
    { id: '1', title: "Ahmad Ali", phone: "0300-1234567", email: "ahmad@mail.com", description: "0300-1234567\nahmad@mail.com", image: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', title: "Sara Khan", phone: "0312-7654321", email: "sara@mail.com", description: "0312-7654321\nsara@mail.com", image: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', title: "Zeenat Malik", phone: "0345-1122334", email: "zeenat@mail.com", description: "0345-1122334\nzeenat@mail.com", image: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', title: "Hamza Sheikh", phone: "0321-9988776", email: "hamza@mail.com", description: "0321-9988776\nhamza@mail.com", image: 'https://i.pravatar.cc/150?u=4' },
    { id: '5', title: "Danish Ahmed", phone: "0333-5544332", email: "danish@mail.com", description: "0333-5544332\ndanish@mail.com", image: 'https://i.pravatar.cc/150?u=5' },
    { id: '6', title: "Zoya Malik", phone: "0310-1122445", email: "zoya@mail.com", description: "0310-1122445\nzoya@mail.com", image: 'https://i.pravatar.cc/150?u=6' },
    { id: '7', title: "Bilal Khan", phone: "0301-8877665", email: "bilal@mail.com", description: "0301-8877665\nbilal@mail.com", image: 'https://i.pravatar.cc/150?u=7' },
    { id: '8', title: "Mariam Aziz", phone: "0344-5566778", email: "mariam@mail.com", description: "0344-5566778\nmariam@mail.com", image: 'https://i.pravatar.cc/150?u=8' },
    { id: '9', title: "Usman Pirzada", phone: "0322-1234000", email: "usman@mail.com", description: "0322-1234000\nusman@mail.com", image: 'https://i.pravatar.cc/150?u=9' },
    { id: '10', title: "Ayesha Omer", phone: "0300-0001112", email: "ayesha@mail.com", description: "0300-0001112\nayesha@mail.com", image: 'https://i.pravatar.cc/150?u=10' },
  ];

  // --- States ---
  const [customers, setCustomers] = useState<Customer[]>(defaultCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [tempTitle, setTempTitle] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempImg, setTempImg] = useState("");
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  // --- Search Logic ---
  const filteredCustomers = customers.filter(customer => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      customer.title.toLowerCase().includes(query) || 
      customer.phone.includes(query)
    );
  });

  // --- Storage Logic ---
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('permanently_saved_customers');
      if (saved) setCustomers(JSON.parse(saved));
    })();
  }, []);

  const persistData = async (list: Customer[]) => {
    await AsyncStorage.setItem('permanently_saved_customers', JSON.stringify(list));
  };

  // --- Handlers ---
  const handleOpenMenu = (event: any, member: Customer) => {
    const { pageY } = event.nativeEvent;
    const adjustedTop = pageY > 500 ? pageY - 120 : pageY - 10;
    
    setMenuPosition({ top: adjustedTop, right: 40 });
    setSelectedId(member.id);
    setTempTitle(member.title);
    setTempPhone(member.phone);
    setTempEmail(member.email);
    setTempImg(member.image);
    setMenuVisible(true);
  };

  const handleSaveEdit = () => {
    const updated = customers.map(c => c.id === selectedId ? {
      ...c, 
      title: tempTitle, 
      phone: tempPhone, 
      email: tempEmail, 
      image: tempImg,
      description: `${tempPhone}\n${tempEmail}`
    } : c);

    setCustomers(updated);
    persistData(updated);
    setEditModalVisible(false);
  };

  return (
    <LinearGradient colors={colors.bgGradient} style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['top', 'bottom']}>
        <StatusBar 
          barStyle={isDark ? "light-content" : "dark-content"} 
          translucent 
          backgroundColor="transparent" 
        />

        <NavHeader title="Meet Our Customers !">
          <TouchableOpacity onPress={() => onNavigateToInvite?.()} activeOpacity={0.8}>
            <LinearGradient colors={THEME_COLORS.buttonGradient} style={styles.inviteBtn}>
              <Text style={styles.inviteText}>Invite</Text>
            </LinearGradient>
          </TouchableOpacity>
        </NavHeader>

        {/* Search Header */}
        <View style={styles.searchFixedContainer}>
          <SearchInput
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            placeholder="Search Customer"
            showSearchType={false}
            backgroundColor={isDark ? "#1e293b" : "#FFFFFF"}
            textColor={colors.text}
            iconColor={colors.textSecondary}
          />
        </View>

        {/* Customer List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollArea, { paddingBottom: insets.bottom + 20 }]}
          keyboardShouldPersistTaps="handled"
        >
          {filteredCustomers.map((member) => (
            <View key={member.id} style={styles.cardContainer}>
              <ImageDesCard
                imageSource={{ uri: member.image }}
                title={member.title}
                description={member.description}
                backgroundColor={isDark ? "#1e293b" : "#FFFFFF"}
                containerStyle={[styles.cardItem, { borderColor: colors.border }]}
                titleStyle={{ color: colors.text }}
                descriptionStyle={{ color: colors.textSecondary }}
              />
              <TouchableOpacity style={styles.dots} onPress={(e) => handleOpenMenu(e, member)}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>

      {/* --- MENU MODAL (EDIT/DELETE OPTIONS) --- */}
      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlayClear}>
            <View 
              style={[
                styles.menuPopup, 
                { top: menuPosition.top, right: menuPosition.right, backgroundColor: colors.card }
              ]}
            >
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => {
                  setMenuVisible(false);
                  setTimeout(() => setEditModalVisible(true), 200);
                }}
              >
                <MaterialCommunityIcons name="pencil" size={20} color={colors.primary} />
                <Text style={[styles.menuOptionText, { color: colors.text }]}>Edit</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.menuOption} onPress={() => setMenuVisible(false)}>
                <MaterialCommunityIcons name="delete" size={20} color="#EF4444" />
                <Text style={[styles.menuOptionText, { color: colors.text }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* --- EDIT MODAL --- */}
      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlayDark}>
          <View style={[styles.editBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Edit Customer</Text>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Client Name</Text>
              <TextInput
                style={[styles.field, { color: colors.text, borderColor: colors.border }]}
                value={tempTitle}
                onChangeText={setTempTitle}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={[styles.field, { color: colors.text, borderColor: colors.border }]}
                value={tempPhone}
                onChangeText={setTempPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={[styles.field, { color: colors.text, borderColor: colors.border }]}
                value={tempEmail}
                onChangeText={setTempEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.btnGroup}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Text style={styles.cancelLink}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.updateBtn} onPress={handleSaveEdit}>
                <Text style={styles.updateTxt}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

// --- Stylesheet Layout ---
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  inviteBtn: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
  },
  inviteText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  searchFixedContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    zIndex: 10,
  },
  scrollArea: {
    paddingHorizontal: 15,
  },
  cardContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  cardItem: {
    borderRadius: 20,
    borderWidth: 1,
    elevation: 2,
  },
  dots: {
    position: 'absolute',
    right: 15,
    top: 25,
    padding: 10,
    zIndex: 5,
  },
  modalOverlayClear: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalOverlayDark: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuPopup: {
    position: 'absolute',
    borderRadius: 12,
    width: 140,
    paddingVertical: 5,
    elevation: 15,
    zIndex: 9999,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  menuOptionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 10,
  },
  editPopup: {
    borderRadius: 24,
    width: '85%',
    padding: 24,
    elevation: 10,
  },
  editBox: {
    borderRadius: 24,
    width: '85%',
    padding: 24,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    fontSize: 14,
    color: '#64748B',
  },
  field: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 15,
    alignItems: 'center',
  },
  cancelLink: {
    color: '#94A3B8',
    fontWeight: 'bold',
    fontSize: 16,
  },
  updateBtn: {
    backgroundColor: '#5152B3',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  updateTxt: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Customers;