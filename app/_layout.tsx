import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
