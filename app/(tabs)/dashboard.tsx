import React from 'react';
import Dashboard from '../../components/screens/Dashboard/Dashboard';
import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function DashboardScreen() {

  // Handle Android back button - Default behavior (Exit App on Dashboard)
  useSmartBackHandler();

  return <Dashboard />;
}
