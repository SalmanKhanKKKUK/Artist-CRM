import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import React from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to splash screen
    router.replace('/splash');
  }, []);

  return null;
}
