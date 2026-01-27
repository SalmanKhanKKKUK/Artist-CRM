import { Stack } from 'expo-router';
import React from 'react';

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
    >
      <Stack.Screen name="profile" />
      <Stack.Screen name="invite" />
      <Stack.Screen name="view-history" />
    </Stack>
  );
}
