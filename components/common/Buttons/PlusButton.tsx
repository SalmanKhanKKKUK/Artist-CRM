import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PlusButtonProps {
  onPress: () => void;
  size?: number;
  backgroundColor?: string;
  iconSize?: number;
  disabled?: boolean;
  style?: ViewStyle;
}

const PlusButton: React.FC<PlusButtonProps> = ({
  onPress,
  size = 60,
  backgroundColor = '#FFD700',
  iconSize = 30,
  disabled = false,
  style,
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
        name="plus"
        size={iconSize}
        color="#FFFFFF"
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
