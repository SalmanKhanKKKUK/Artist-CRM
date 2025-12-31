import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
  leftIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  rightIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;
  containerStyle?: any;
  labelStyle?: any;
  inputStyle?: any;
  helperText?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  onToggleSecure?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = 'default',
  size = 'medium',
  leftIcon,
  rightIcon,
  onRightIconPress,
  onLeftIconPress,
  containerStyle,
  labelStyle,
  inputStyle,
  helperText,
  required = false,
  secureTextEntry = false,
  onToggleSecure,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          inputHeight: 40,
          fontSize: 14,
          iconSize: 18,
          padding: 10,
        };
      case 'large':
        return {
          inputHeight: 56,
          fontSize: 18,
          iconSize: 24,
          padding: 16,
        };
      default:
        return {
          inputHeight: 48,
          fontSize: 16,
          iconSize: 20,
          padding: 12,
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          borderWidth: 2,
          borderColor: error ? '#ff4444' : isFocused ? '#FFD700' : '#333',
          backgroundColor: '#fff',
        };
      case 'filled':
        return {
          borderWidth: 0,
          backgroundColor: '#f5f5f5',
        };
      default:
        return {
          borderWidth: 1,
          borderColor: error ? '#ff4444' : isFocused ? '#FFD700' : '#333',
          backgroundColor: '#fff',
        };
    }
  };

  const { inputHeight, fontSize, iconSize, padding } = getSizeStyles();
  const variantStyles = getVariantStyles();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}
      
      <View style={[
        styles.inputContainer,
        { height: inputHeight },
        variantStyles,
        !editable && styles.disabled,
      ]}>
        {leftIcon && (
          <TouchableOpacity
            onPress={onLeftIconPress}
            style={[styles.iconContainer, styles.leftIcon]}
            disabled={!onLeftIconPress}
          >
            <MaterialCommunityIcons
              name={leftIcon}
              size={iconSize}
              color={error ? '#ff4444' : isFocused ? '#FFD700' : '#999'}
            />
          </TouchableOpacity>
        )}

        <TextInput
          style={[
            styles.input,
            { fontSize, paddingLeft: leftIcon ? 0 : padding, paddingRight: (rightIcon || secureTextEntry) ? 0 : padding },
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#666"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {(rightIcon || secureTextEntry) && (
          <TouchableOpacity
            onPress={secureTextEntry ? onToggleSecure : onRightIconPress}
            style={[styles.iconContainer, styles.rightIcon]}
            disabled={!onRightIconPress && !secureTextEntry}
          >
            <MaterialCommunityIcons
              name={secureTextEntry ? (value ? 'eye-off' : 'eye') : rightIcon}
              size={iconSize}
              color={error ? '#ff4444' : isFocused ? '#FFD700' : '#999'}
            />
          </TouchableOpacity>
        )}
      </View>

      {(error || helperText) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  required: {
    color: '#ff4444',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    color: '#333',
    textAlignVertical: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    paddingLeft: 12,
    paddingRight: 8,
  },
  rightIcon: {
    paddingLeft: 8,
    paddingRight: 12,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    color: '#999',
  },
  errorText: {
    color: '#ff4444',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Input;

// ye reusable component hai
// s ko hum ne Inputs k liye reusbale bana ya hai
// ye project k andar jitne b inputs fields hogy os k liye banaye hai ye sirf aik individual inputs ko get karienga phir used karienga.