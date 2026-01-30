import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Using relative path to be absolutely safe against alias issues
import { useTheme } from '../../../contexts/ThemeContext';

interface NavButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  isCenterButton?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  isDark?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
  label,
  icon,
  isActive,
  onClick,
  isCenterButton,
  activeColor,
  inactiveColor,
  isDark: isDarkProp
}) => {
  // Use the theme hook to get current mode, but allow prop override
  const { isDark: isDarkContext } = useTheme();
  // If isDarkProp is passed, use it; otherwise fallback to context
  const isDark = isDarkProp ?? isDarkContext;

  // Resolve colors based on props or theme defaults
  // Active: White in dark mode, Purple in light mode (default)
  const resolvedActiveColor = activeColor || (isDark ? "#FFFFFF" : "#5152B3");
  // Inactive: Gray in both, but specific shade
  const resolvedInactiveColor = inactiveColor || (isDark ? "#94A3B8" : "#CBD5E1");

  // Style for the circular background of the center button
  const centerBtnStyle = isCenterButton ? {
    backgroundColor: isDark ? "#1e293b" : "#FFFFFF"
  } : undefined;

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
        isCenterButton && styles.centerIconBase,
        centerBtnStyle
      ]}>
        {/* We clone the icon to inject the correct color and size automatically */}
        {React.isValidElement(icon) ?
          React.cloneElement(icon as React.ReactElement<any>, {
            color: isActive ? resolvedActiveColor : resolvedInactiveColor,
            size: 24
          })
          : icon
        }
      </View>

      {!isCenterButton && (
        <Text style={[
          styles.label,
          { color: isActive ? resolvedActiveColor : resolvedInactiveColor }
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
    // Container specific styles if needed
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Base style for center button shape/shadow (without color)
  centerIconBase: {
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