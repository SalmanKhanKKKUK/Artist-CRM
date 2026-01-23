import { useRouter } from 'expo-router';
import React from 'react';
import History from '../../components/screens/History/History';
import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function HistoryScreen() {
  const router = useRouter();
  
  // Handle Android back button - go to previous page instead of quitting
  useSmartBackHandler(() => {
    router.back();
  });

  return (
    <History
      onBack={() => router.back()}
      onNavigateToNewVisit={() => router.push('/(tabs)/new-visit')}
    />
  );
}
