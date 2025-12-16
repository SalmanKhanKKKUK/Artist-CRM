import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

export interface InfoCardProps {
  title?: string;
  description?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  borderRadius?: number;
  titleColor?: string;
  descriptionColor?: string;
  titleSize?: number;
  descriptionSize?: number;
  titleWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  descriptionWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  containerStyle,
  titleStyle,
  descriptionStyle,
  padding = 15,
  margin = 10,
  backgroundColor = '#F8F8F8',
  borderRadius = 8,
  titleColor = '#333',
  descriptionColor = '#666',
  titleSize = 16,
  descriptionSize = 14,
  titleWeight = '600',
  descriptionWeight = '400',
  shadowColor = '#000',
  shadowOffset = { width: 0, height: 2 },
  shadowOpacity = 0.1,
  shadowRadius = 4,
  elevation = 3,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          padding,
          margin,
          backgroundColor,
          borderRadius,
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation,
        },
        containerStyle,
      ]}
    >
      {title && (
        <Text
          style={[
            styles.title,
            {
              color: titleColor,
              fontSize: titleSize,
              fontWeight: titleWeight as TextStyle['fontWeight'],
            },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      )}
      
      {description && (
        <Text
          style={[
            styles.description,
            {
              color: descriptionColor,
              fontSize: descriptionSize,
              fontWeight: descriptionWeight as TextStyle['fontWeight'],
            },
            descriptionStyle,
          ]}
        >
          {description}
        </Text>
      )}
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    width: '100%',
    alignSelf: 'stretch',
  } as ViewStyle,
  title: {
    marginBottom: 8,
    textAlign: 'left',
  } as TextStyle,
  description: {
    textAlign: 'left',
    lineHeight: 20,
  } as TextStyle,
};

export default InfoCard;

// ye reusable component hai
// s ko hum ne card k liye reusbale bana ya hai
// ye project k andar jo About  page k adnar card hai os k liye hai.
// ye title our des ko get karinga, History Section k andr 2 jagga par used kia hai . 