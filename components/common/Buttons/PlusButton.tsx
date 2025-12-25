import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface PlusButtonProps {
  onPress: () => void;
  size?: number;
  backgroundColor?: string;
  iconSize?: number;
  disabled?: boolean;
  style?: ViewStyle;
  iconName?: string;
  iconColor?: string;
}

const PlusButton: React.FC<PlusButtonProps> = ({
  onPress,
  size = 60,
  backgroundColor = '#FFD700',
  iconSize = 30,
  disabled = false,
  style,
  iconName = 'plus',
  iconColor = '#FFFFFF',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: backgroundColor,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <MaterialCommunityIcons
        name={iconName as any}
        size={iconSize}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default PlusButton;

// ye reusable component hai
// s ko hum ne button plus icons k liye reusbale bana ya hai
// s ko humne project k andar home page k andar jo Plus Icons hai os k liye banaya hai.
