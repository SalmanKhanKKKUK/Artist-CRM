import React from 'react';
import Dashboard from '../../components/screens/Dashboard/Dashboard';
import { useSmartBackHandler } from '../../hooks/useSmartBackHandler';

export default function DashboardScreen() {
  // Yahan callback pass NAHI karna, taake default "Exit" logic chale
  useSmartBackHandler();
  return <Dashboard />;
}
