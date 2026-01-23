import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="(modals)" 
        options={{ 
          headerShown: false,
          presentation: 'modal' 
        }} 
      />
    </Stack>
  );
}
