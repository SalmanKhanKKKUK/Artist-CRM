import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../global.css';
import { useSmartBackHandler } from '../hooks/useSmartBackHandler';

export default function RootLayout() {
  // Global Back Handler
  useSmartBackHandler();

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
