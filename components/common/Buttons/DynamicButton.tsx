import React from 'react';
import type { DimensionValue } from 'react-native';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface DynamicButtonProps {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  width?: DimensionValue;
  height?: number;
  disabled?: boolean;
  opacity?: number;
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  text,
  onPress,
  backgroundColor = '#007AFF',
  textColor = '#FFFFFF',
  borderColor,
  borderWidth = 0,
  borderRadius = 8,
  paddingVertical = 12,
  paddingHorizontal = 20,
  fontSize = 16,
  fontWeight = '600',
  width,
  height,
  disabled = false,
  opacity = 1,
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius,
  elevation,
  containerStyle,
  textStyle,
}) => {
  const buttonStyle: ViewStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius,
    paddingVertical,
    paddingHorizontal,
    width,
    height,
    opacity: disabled ? 0.5 : opacity,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    elevation,
    ...containerStyle,
  };

  const buttonTextStyle: TextStyle = {
    color: textColor,
    fontSize,
    fontWeight,
    textAlign: 'center',
    ...textStyle,
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={buttonTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DynamicButton;

// ye reusable component hai
// s ko hum ne button k liye reusbale bana ya hai
// ye project k andar jitne b text k sath button hogy os ko get karne 
// k liye used kariengy.
