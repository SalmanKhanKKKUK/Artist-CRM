import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  StatusBar, 
  Platform 
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { THEME_COLORS } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import NavHeader from '../../common/Buttons/NavHeader';

const Notification = () => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  // Mock data for UI consistency
  const notifications = [
    {
      id: 1,
      title: "New Visit Added",
      message: "John Doe's hair transformation visit was saved successfully.",
      time: "2 mins ago",
      icon: "calendar-check"
    },
    {
      id: 2,
      title: "Team Invite",
      message: "Sara Khan joined your Artist CRM team.",
      time: "1 hour ago",
      icon: "account-group"
    }
  ];

  return (
    <LinearGradient
      colors={colors.bgGradient}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar 
          barStyle={isDark ? "light-content" : "dark-content"} 
          backgroundColor="transparent" 
          translucent 
        />

        {/* Existing NavHeader used across the app */}
        <NavHeader title="Notifications" showProfileIcon={false} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 100 + insets.bottom }
          ]}
        >
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <View 
                key={item.id} 
                style={[
                  styles.notificationCard, 
                  { 
                    backgroundColor: isDark ? "#1e293b" : "#FFFFFF", 
                    borderColor: colors.border 
                  }
                ]}
              >
                <View style={[styles.iconWrapper, { backgroundColor: isDark ? "#334155" : "#EEF2FF" }]}>
                  <MaterialCommunityIcons 
                    name={item.icon as any} 
                    size={22} 
                    color={isDark ? "#FFFFFF" : "#5152B3"} 
                  />
                </View>
                
                <View style={styles.textWrapper}>
                  <View style={styles.titleRow}>
                    <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
                    <Text style={[styles.time, { color: colors.textSecondary }]}>{item.time}</Text>
                  </View>
                  <Text style={[styles.message, { color: colors.textSecondary }]} numberOfLines={2}>
                    {item.message}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            // Fallback for empty state
            <View style={styles.emptyState}>
              <MaterialCommunityIcons 
                name="bell-off-outline" 
                size={80} 
                color={isDark ? "#334155" : "#E2E8F0"} 
              />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No new notifications
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
      android: { elevation: 2 }
    })
  },
  iconWrapper: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
    marginLeft: 15,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  time: {
    fontSize: 11,
  },
  message: {
    fontSize: 13,
    lineHeight: 18,
  },
  emptyState: {
    flex: 1,
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: '500',
  },
});

export default Notification;