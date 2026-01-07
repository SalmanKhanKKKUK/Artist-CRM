import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, Image, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function Splash() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Animation for logo appearance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigation timer - 10 seconds to home page
    const timer = setTimeout(() => {
      router.replace('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="#FFFFFF" />
      
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image 
          source={require('../assets/homeimages/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.artistName}>ARTIST CRM</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  artistName: {
    color: '#5152B3',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    
  },
});
