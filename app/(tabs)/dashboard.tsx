import { useRouter } from 'expo-router';
import React from 'react';
import DashboardHome from '../../components/screens/Dashboard/DashboardHome';
import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function DashboardScreen() {
  const router = useRouter();

  // Handle Android back button - go to previous page instead of quitting
  // Handle Android back button - Navigate to Login instead of quitting
  useSmartBackHandler(() => {
    router.replace('/(auth)/login');
  });

  return <DashboardHome />;
}
