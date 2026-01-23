import { useRouter } from 'expo-router';
import React from 'react';
import Login from '../../components/screens/Login/login';
import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function LoginScreen() {
  const router = useRouter();

  // Handle Android back button - go to previous page instead of quitting
  // Handle Android back button - Default behavior for login is to exit app
  useSmartBackHandler();

  return (
    <Login
      onNavigateToDashboard={() => router.replace('/(tabs)/dashboard')}
      onNavigateToSignup={() => router.push('/(auth)/signup')}
      onBack={() => { }}
    />
  );
}
