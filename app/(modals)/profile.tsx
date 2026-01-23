import { useRouter } from 'expo-router';
import React from 'react';
import Profile from '../../components/screens/Profile/Profile';

export default function ProfileScreen() {
  const router = useRouter();
  
  // Profile component has its own BackHandler with special logic (showSetting)
  // So we don't add useSmartBackHandler here to avoid conflicts

  return (
    <Profile
      onBack={() => router.back()}
    />
  );
}
