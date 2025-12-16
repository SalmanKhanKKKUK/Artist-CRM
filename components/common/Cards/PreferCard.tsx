import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

export interface PreferCardProps {
  title?: string;
  allergies?: string;
  favoriteStyle?: string;
  notes?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  notesStyle?: TextStyle;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  borderRadius?: number;
  titleColor?: string;
  labelColor?: string;
  valueColor?: string;
  notesColor?: string;
  titleSize?: number;
  labelSize?: number;
  valueSize?: number;
  notesSize?: number;
  titleWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  labelWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  valueWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  notesWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}

const PreferCard: React.FC<PreferCardProps> = ({
  title,
  allergies,
  favoriteStyle,
  notes,
  containerStyle,
  titleStyle,
  labelStyle,
  valueStyle,
  notesStyle,
  padding = 15,
  margin = 10,
  backgroundColor = '#FFFFFF',
  borderRadius = 15,
  titleColor = '#333',
  labelColor = '#666',
  valueColor = '#333',
  notesColor = '#333',
  titleSize = 16,
  labelSize = 10,
  valueSize = 12,
  notesSize = 12,
  titleWeight = 'bold',
  labelWeight = 'normal',
  valueWeight = 'bold',
  notesWeight = 'normal',
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

      {/* Grid Layout for Preferences */}
      <View style={styles.gridContainer}>
        {/* First Row: Allergies and Favorite Style */}
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
              Allergies
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
              {allergies || 'N/A'}
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
              Favorite Style
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
              {favoriteStyle || 'N/A'}
            </Text>
          </View>
        </View>
      </View>

      {/* Notes Section */}
      {notes && (
        <View style={styles.notesContainer}>
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
            Notes
          </Text>
          <Text
            style={[
              styles.notes,
              {
                color: notesColor,
                fontSize: notesSize,
                fontWeight: 'bold' as TextStyle['fontWeight'],
              },
              notesStyle,
            ]}
          >
            {notes}
          </Text>
        </View>
      )}
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
    backgroundColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    marginBottom: 5,
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
  notesContainer: {
    width: '100%',
    marginTop: 8,
    backgroundColor: '#ccc',
    padding: 8,
    borderRadius: 8,
  } as ViewStyle,
  notes: {
    fontSize: 12,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    color: '#333',
    textAlign: 'left',
    lineHeight: 16,
    flexWrap: 'wrap',
  } as TextStyle,
};

export default PreferCard;

// ye reusable component hai
// s ko hum ne card k liye reusbale bana ya hai
// ye project k andar jo About  page k adnar card hai os k liye hai.
// ye title our des ko get karinga Info Section k adnar Preference k liye used kia hai . 
