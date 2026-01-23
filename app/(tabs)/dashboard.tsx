import { useRouter } from 'expo-router';
import React from 'react';
import Dashboard from '../../components/screens/Dashboard/Dashboard';

export default function DashboardScreen() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };

  return <Dashboard onBack={handleBackToLogin} />;
}
