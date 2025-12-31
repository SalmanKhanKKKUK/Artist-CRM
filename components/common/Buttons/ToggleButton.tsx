import React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

interface ToggleButtonProps {
  isOn: boolean;
  onToggle: (isOn: boolean) => void;
  size?: number;
  backgroundColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  disabled?: boolean;
  style?: any;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isOn,
  onToggle,
  size = 50,
  backgroundColor = '#E0E0E0',
  activeColor = '#4CAF50',
  inactiveColor = '#9E9E9E',
  disabled = false,
  style,
}) => {
  const animatedValue = React.useRef(new Animated.Value(isOn ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn, animatedValue]);

  const handlePress = () => {
    if (!disabled) {
      onToggle(!isOn);
    }
  };

  const thumbPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, (size * 1.8) - size - 2],
  });

  const backgroundColorAnimated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  return (
    <TouchableOpacity
      style={[
        styles.toggleContainer,
        {
          width: size * 1.8,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.toggleBackground,
          {
            backgroundColor: backgroundColorAnimated,
            borderRadius: size / 2,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.toggleThumb,
            {
              width: size - 6,
              height: size - 6,
              borderRadius: (size - 6) / 2,
              transform: [{ translateX: thumbPosition }],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  toggleBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  toggleThumb: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default ToggleButton;

// ye reusable component hai
// s ko hum ne button k liye reusbale bana ya hai
// ye project k andar setting page k andar toggle button k liye used hoi hai 

