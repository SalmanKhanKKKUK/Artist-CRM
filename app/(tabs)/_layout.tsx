import NavButton from '@/components/common/Buttons/NavButton';
import { THEME_COLORS } from '@/constants/Colors';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  // Get current active tab from pathname
  const getActiveRoute = () => {
    if (pathname?.includes('new-visit')) return 'new-visit';
    if (pathname?.includes('history')) return 'history';
    if (pathname?.includes('teams')) return 'teams';
    return 'dashboard';
  };

  const currentRoute = getActiveRoute();

  const handleTabPress = (route: string) => {
    router.push(`/(tabs)/${route}` as any);
  };

  const handleAddClientsPress = () => {
    router.push('/(tabs)/add-clients' as any);
  };

  // Hide Tab Bar on specific detail screens to maintain "Modal" feel - REMOVED


  return (
    <View style={[
      styles.bottomNavContainer,
      {
        paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
        height: 65 + insets.bottom
      }
    ]}>
      <View style={styles.navBar}>
        <NavButton
          label="Home"
          icon={<MaterialCommunityIcons name="home-variant" size={24} />}
          isActive={currentRoute === 'dashboard'}
          onClick={() => handleTabPress('dashboard')}
        />

        <NavButton
          label="New Visit"
          icon={<MaterialCommunityIcons name="calendar-plus" size={24} />}
          isActive={currentRoute === 'new-visit'}
          onClick={() => handleTabPress('new-visit')}
        />

        <View style={styles.plusActionWrapper}>
          <TouchableOpacity onPress={handleAddClientsPress} activeOpacity={0.8}>
            <LinearGradient
              colors={THEME_COLORS.buttonGradient}
              style={styles.plusGradientBtn}
            >
              <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <NavButton
          label="History"
          icon={<MaterialCommunityIcons name="history" size={24} />}
          isActive={currentRoute === 'history'}
          onClick={() => handleTabPress('history')}
        />

        <NavButton
          label="Teams"
          icon={<FontAwesome5 name="users" size={20} />}
          isActive={currentRoute === 'teams'}
          onClick={() => handleTabPress('teams')}
        />
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Hide default tab bar
        }}
      >
        <Tabs.Screen name="dashboard" />
        <Tabs.Screen name="new-visit" />
        <Tabs.Screen name="history" />
        <Tabs.Screen name="teams" />
        <Tabs.Screen name="add-clients" />
        <Tabs.Screen name="invite" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="view-history" />
        <Tabs.Screen name="notifications" />
      </Tabs>
      <CustomTabBar />
    </>
  );
}

const styles = StyleSheet.create({
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingTop: 10,
    zIndex: 1000,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 20,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
  },
  plusActionWrapper: {
    marginTop: -55,
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 35,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 5,
  },
  plusGradientBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
