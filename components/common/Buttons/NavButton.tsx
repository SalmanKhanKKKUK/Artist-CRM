import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

interface NavButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  isCenterButton?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ 
  label, 
  icon, 
  isActive, 
  onClick, 
  isCenterButton 
}) => {
  const activeColor = "#5152B3";
  const inactiveColor = "#CBD5E1"; // Matching your Dashboard's inactive color

  return (
    <TouchableOpacity 
      onPress={onClick}
      activeOpacity={0.7}
      style={[
        styles.button,
        isCenterButton && styles.centerButtonContainer
      ]}
    >
      <View style={[
        styles.iconWrapper,
        isCenterButton && styles.centerIconWrapper
      ]}>
        {/* We clone the icon to inject the correct color and size automatically */}
        {React.isValidElement(icon) ? 
          React.cloneElement(icon as React.ReactElement<any>, { 
            color: isActive ? activeColor : inactiveColor,
            size: 24 
          }) 
          : icon
        }
      </View>
      
      {!isCenterButton && (
        <Text style={[
          styles.label, 
          { color: isActive ? activeColor : inactiveColor }
        ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  centerButtonContainer: {
    // This handles the overlap if needed, but since you use PlusButton 
    // separately in Dashboard, we keep this simple.
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerIconWrapper: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '600',
  },
});

export default NavButton;
//ye reusable component hai 
// s ko project k andar jo neeche navmenu hai os k liye banai hai
// ye get kareinga icons ko text k sath get karienga