import React from 'react';
import { Image, ImageStyle, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

export interface ImageDesCardProps {
  imageSource: any;
  title: string;
  description?: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  imageSize?: number;
  imageBorderRadius?: number;
  cardPadding?: number;
  cardMargin?: number;
  cardMarginTop?: number;
  backgroundColor?: string;
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
  disabled?: boolean;
}

const ImageDesCard: React.FC<ImageDesCardProps> = ({
  imageSource,
  title,
  description,
  onPress,
  containerStyle,
  imageStyle,
  titleStyle,
  descriptionStyle,
  imageSize = 60,
  imageBorderRadius = 10,
  cardPadding = 15,
  cardMargin = 10,
  cardMarginTop,
  backgroundColor = '#FFFFFF',
  shadowColor = '#000',
  shadowOffset = { width: 0, height: 2 },
  shadowOpacity = 0.1,
  shadowRadius = 4,
  elevation = 3,
  disabled = false,
}) => {
  const CardComponent = onPress && !disabled ? TouchableOpacity : View;
  const cardProps = onPress && !disabled ? { onPress, activeOpacity: 0.8 } : {};

  return (
    <CardComponent
      style={[
        styles.container,
        {
          padding: cardPadding,
          margin: cardMargin,
          marginTop: cardMarginTop,
          backgroundColor,
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation,
        },
        disabled && styles.disabled,
        containerStyle,
      ]}
      {...cardProps}
    >
      {/* Left Side - Image */}
      <Image
        source={imageSource}
        style={[
          styles.image,
          {
            width: imageSize,
            height: imageSize,
            borderRadius: imageBorderRadius,
          },
          imageStyle,
        ]}
        resizeMode="cover"
      />

      {/* Right Side - Title and Description */}
      <View style={styles.textContainer}>
        <Text style={[styles.title, titleStyle]} numberOfLines={2}>
          {title}
        </Text>
        {description && (
          <Text style={[styles.description, descriptionStyle]} numberOfLines={5}>
            {description}
          </Text>
        )}
      </View>
    </CardComponent>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  } as ViewStyle,
  image: {
    marginRight: 15,
  } as ImageStyle,
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  } as ViewStyle,
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  } as TextStyle,
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666',
    lineHeight: 16,
  } as TextStyle,
  disabled: {
    opacity: 0.5,
  } as ViewStyle,
};

export default ImageDesCard;

// ye reusable component hai
// s ko hum ne card k liye reusbale bana ya hai
// ye project k andar jo About  page k adnar card hai os k liye hai.
// ye image ko left side main our title our description ko right side main get karta hai 