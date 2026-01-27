import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import Dashboard from '../../components/screens/Dashboard/Dashboard';
import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function DashboardScreen() {
  const router = useRouter();

  const handleBackToLogin = useCallback(() => {
    router.replace('/(auth)/login');
  }, [router]);

  // Handle Android back button - go to Login page
  useSmartBackHandler(handleBackToLogin);

  return <Dashboard onBack={handleBackToLogin} />;
}
