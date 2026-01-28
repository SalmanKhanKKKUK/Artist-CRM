import { useRouter } from 'expo-router';
import React from 'react';
import Teams from '../../components/screens/Teams/Teams';
import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function TeamsScreen() {
  const router = useRouter();

  // Handle Android back button - go to previous page instead of quitting
  useSmartBackHandler(() => {
    router.back();
  });

  return (
    <Teams
      onBack={() => router.back()}
      onNavigateToInvite={() => router.push('/(tabs)/invite' as any)}
    />
  );
}
