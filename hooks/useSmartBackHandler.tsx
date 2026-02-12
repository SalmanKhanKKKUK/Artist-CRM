import { useRouter, useSegments } from 'expo-router';
import { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';

export function useSmartBackHandler(customGoBack?: () => void) {
  const router = useRouter();
  const segments = useSegments();

  // Use ref to hold the latest customGoBack callback to avoid re-running effect
  const customGoBackRef = useRef(customGoBack);

  useEffect(() => {
    customGoBackRef.current = customGoBack;
  }, [customGoBack]);

  useEffect(() => {
    const onBackPress = () => {
      // 1. Priority: Custom Handler
      if (customGoBackRef.current) {
        customGoBackRef.current();
        return true;
      }

      // 2. Identify Current Page
      // Check if the current screen is 'dashboard'
      const isDashboard = segments[segments.length - 1] === 'dashboard';

      if (isDashboard) {
        // User Requirement: Quit app immediately on Dashboard
        BackHandler.exitApp();
        return true;
      } else {
        // 3. For all other pages (Tabs, Stack, Auth), go back one page
        // We call router.back() directly. This allows React Navigation to handle
        // Tab history (backBehavior='history') internally.
        // If there is absolutely no history, this might do nothing, but currently
        // we prioritized 'back' over 'exit'.
        router.back();
        return true;
      }
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return () => {
      subscription.remove();
    };
  }, [router, segments]); // Dependencies ensure logic updates on route change
}
