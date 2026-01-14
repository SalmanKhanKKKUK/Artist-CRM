import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NavHeaderProps {
  title: string;
  showProfileIcon?: boolean;
  onProfilePress?: () => void;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  onLeftIconPress?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  titleColor?: string;
  // Children prop define karne ki zaroorat nahi agar PropsWithChildren use karein, 
  // par explicit likhna behtar hai
  children?: React.ReactNode; 
}

const NavHeader: React.FC<NavHeaderProps> = ({
  title,
  showProfileIcon = false,
  onProfilePress,
  leftIcon,
  onLeftIconPress,
  rightIcon,
  onRightIconPress,
  titleColor = '#5152B3',
  children, // Naya prop
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftWrapper}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftIconPress} style={styles.iconButton}>
            <Ionicons name={leftIcon} size={24} color={titleColor} />
          </TouchableOpacity>
        )}
        <Text style={[styles.brandTitle, { color: titleColor }]}>{title}</Text>
      </View>

      <View style={styles.rightWrapper}>
        {/* Pehle specific right icon */}
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.iconButton}>
            <Ionicons name={rightIcon} size={24} color={titleColor} />
          </TouchableOpacity>
        )}

        {/* Profile Avatar */}
        {showProfileIcon && (
          <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
            <View style={styles.avatarMini}>
              <Ionicons name="person" size={18} color="#5152B3" />
            </View>
          </TouchableOpacity>
        )}

        {/* --- YAHAN CHILDREN RENDER HONGE --- */}
        {children && <View style={styles.childrenContainer}>{children}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    height: 70,
    backgroundColor: 'transparent',
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  rightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 10,
  },
  profileButton: {
    marginLeft: 10,
  },
  avatarMini: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  childrenContainer: {
    marginLeft: 10, // Button aur icons ke darmiyan gap
  }
});

export default NavHeader;

// ye aik reusable component hai
// ye navigation header ko reusable karne ke liye banaya gaya hai
// s ko dashboard, history, teams, add clients, profile ke saath use kar sakte hain
// ye kia karienga title, with icon k sath get karienga