import React, { useState } from 'react';
import { DimensionValue, Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface CustomCardProps {
  profileImageUri: string; 
  name: string;
  lastVisit: string; 
  appIcon?: React.ReactNode; 
  backgroundColor?: string; 
  width?: DimensionValue; 
  padding?: number;
  containerStyle?: ViewStyle;
  onPress?: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({
  profileImageUri,
  name,
  lastVisit,
  appIcon,
  backgroundColor = '#FFFFFF',
  width = '90%',
  padding = 18,
  containerStyle,
  onPress,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor, width, padding }, containerStyle]}>
      <View style={styles.contentContainer}>
        
        <Image 
          source={
            imageError || !profileImageUri 
              ? require('../../../assets/images/android-icon-foreground.png')
              : { uri: profileImageUri }
          } 
          style={styles.profileImage}
          accessibilityLabel={`${name}'s profile picture`}
          onError={handleImageError}
        />

        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.lastVisitText}>Last Visit: {lastVisit}</Text>
        </View>

        {appIcon && (
          <View style={styles.iconContainer}>
            {appIcon}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    marginVertical: 10, 
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
    backgroundColor: '#ccc',
    borderWidth: 1, 
    borderColor: '#eee',
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
  },
  lastVisitText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    fontWeight: '400',
  },
  iconContainer: {
    marginLeft: 15,
    alignSelf: 'flex-start', 
    paddingTop: 5, 
  }
});

export default CustomCard;

// ye reusable component hai
// s ko hum ne card k liye reusbale bana ya hai
// ye project k andar jo home page k adnar card hai os k liye hai.