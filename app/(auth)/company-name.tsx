import { useRouter } from 'expo-router';
import React from 'react';
import CompanyName from '../../components/screens/CompanyName/CompanyName';
import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function CompanyNameScreen() {
  const router = useRouter();
  
  // Handle Android back button - go to previous page instead of quitting
  useSmartBackHandler(() => {
    router.back();
  });

  return (
    <CompanyName 
      onNavigateToProfile={() => router.replace('/(tabs)/dashboard')}
      onBack={() => router.back()}
    />
  );
}
