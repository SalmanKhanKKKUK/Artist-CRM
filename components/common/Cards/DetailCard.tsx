import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

export interface DetailCardProps {
  title?: string;
  name?: string;
  phone?: string;
  email?: string;
  birthday?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  borderRadius?: number;
  titleColor?: string;
  labelColor?: string;
  valueColor?: string;
  titleSize?: number;
  labelSize?: number;
  valueSize?: number;
  titleWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  labelWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  valueWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}

const DetailCard: React.FC<DetailCardProps> = ({
  title,
  name,
  phone,
  email,
  birthday,
  containerStyle,
  titleStyle,
  labelStyle,
  valueStyle,
  padding = 15,
  margin = 10,
  backgroundColor = '#FFFFFF',
  borderRadius = 15,
  titleColor = '#333',
  labelColor = '#666',
  valueColor = '#333',
  titleSize = 20,
  labelSize = 12,
  valueSize = 14,
  titleWeight = 'bold',
  labelWeight = 'normal',
  valueWeight = 'bold',
  shadowColor = '#000',
  shadowOffset = { width: 0, height: 2 },
  shadowOpacity = 0.25,
  shadowRadius = 3.84,
  elevation = 5,
}) => {
  const getWeightStyle = (weight: string): TextStyle => {
    if (weight.includes('00')) {
      return { fontWeight: weight } as TextStyle;
    }
    switch (weight) {
      case 'bold':
        return { fontWeight: 'bold' as TextStyle['fontWeight'] };
      case 'normal':
        return { fontWeight: 'normal' as TextStyle['fontWeight'] };
      default:
        return { fontWeight: weight as TextStyle['fontWeight'] };
    }
  };

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
              ...getWeightStyle(titleWeight),
            },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      )}

      {/* Two Row Grid Layout for Details */}
      <View style={styles.gridContainer}>
        {/* First Row: Name and Phone */}
        <View style={styles.row}>
          <View style={styles.item}>
            <Text
              style={[
                styles.label,
                {
                  color: labelColor,
                  fontSize: labelSize,
                  ...getWeightStyle(labelWeight),
                },
                labelStyle,
              ]}
            >
              Name
            </Text>
            <Text
              style={[
                styles.value,
                {
                  color: valueColor,
                  fontSize: valueSize,
                  ...getWeightStyle(valueWeight),
                },
                valueStyle,
              ]}
            >
              {name || 'N/A'}
            </Text>
          </View>
          <View style={styles.item}>
            <Text
              style={[
                styles.label,
                {
                  color: labelColor,
                  fontSize: labelSize,
                  ...getWeightStyle(labelWeight),
                },
                labelStyle,
              ]}
            >
              Phone
            </Text>
            <Text
              style={[
                styles.value,
                {
                  color: valueColor,
                  fontSize: valueSize,
                  ...getWeightStyle(valueWeight),
                },
                valueStyle,
              ]}
            >
              {phone || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Second Row: Email and Birthday */}
        <View style={styles.row}>
          <View style={styles.item}>
            <Text
              style={[
                styles.label,
                {
                  color: labelColor,
                  fontSize: labelSize,
                  ...getWeightStyle(labelWeight),
                },
                labelStyle,
              ]}
            >
              Email
            </Text>
            <Text
              style={[
                styles.value,
                {
                  color: valueColor,
                  fontSize: valueSize,
                  ...getWeightStyle(valueWeight),
                },
                valueStyle,
              ]}
            >
              {email || 'N/A'}
            </Text>
          </View>
          <View style={styles.item}>
            <Text
              style={[
                styles.label,
                {
                  color: labelColor,
                  fontSize: labelSize,
                  ...getWeightStyle(labelWeight),
                },
                labelStyle,
              ]}
            >
              Birthday
            </Text>
            <Text
              style={[
                styles.value,
                {
                  color: valueColor,
                  fontSize: valueSize,
                  ...getWeightStyle(valueWeight),
                },
                valueStyle,
              ]}
            >
              {birthday || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    width: '100%',
    maxWidth: '100%',
    marginBottom: 10,
  } as ViewStyle,
  title: {
    fontSize: 16,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    color: '#333',
    marginBottom: 8,
    textAlign: 'left',
    textTransform: 'uppercase',
  } as TextStyle,
  gridContainer: {
    width: '100%',
  } as ViewStyle,
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  } as ViewStyle,
  item: {
    width: '48%',
    alignItems: 'flex-start',
    flexShrink: 1,
  } as ViewStyle,
  label: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
    textAlign: 'left',
  } as TextStyle,
  value: {
    fontSize: 12,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    color: '#333',
    textAlign: 'left',
    flexWrap: 'wrap',
  } as TextStyle,
};

export default DetailCard;
