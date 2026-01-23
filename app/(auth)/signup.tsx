import React from 'react';
import { useRouter } from 'expo-router';
import Signup from '@/components/screens/Signup/Signup';

export default function SignupScreen() {
  const router = useRouter();

  return (
    <Signup
      onBack={() => router.back()}
      onNavigateToLogin={() => router.push('/login')}
      onNavigateToCompanyName={() => router.push('/company-name')}
    />
  );
}