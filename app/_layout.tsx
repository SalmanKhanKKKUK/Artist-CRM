import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';
import '../global.css';
import { useSmartBackHandler } from '../hooks/useSmartBackHandler';

export default function RootLayout() {
  // Global Back Handler
  useSmartBackHandler();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
