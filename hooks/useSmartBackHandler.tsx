import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import { useRouter, useSegments } from 'expo-router';

export function useSmartBackHandler(customGoBack?: () => void) {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const onBackPress = () => {
      // If a custom go back function is provided, use it
      if (customGoBack) {
        try {
          customGoBack();
          return true; // block default behavior (exit app)
        } catch (error) {
          // Silently handle error
          return false;
        }
      }

      // Check if we have navigation history by checking segments
      const currentPath = segments.join('/');

      // Define root routes where we should allow app exit
      const rootRoutes = ['splash', 'index'];
      const isRootRoute = segments.length <= 1 ||
        rootRoutes.some(route => currentPath.includes(route));

      // If we're at root routes, allow default behavior (exit app)
      if (isRootRoute) {
        return false;
      }

      // For login screen, allow exit (it's the entry point after splash)
      if (currentPath.includes('(auth)/login')) {
        return false;
      }

      // Otherwise, try to go back safely
      // Check if we're in a navigable context (not at root)
      const isInNavigableContext = segments.length > 1 ||
        segments.some(s => s.includes('(tabs)') ||
          s.includes('(modals)') ||
          s.includes('(auth)'));

      if (isInNavigableContext && router && typeof router.back === 'function') {
        try {
          // Try to go back - wrap in try-catch to handle "go back was not handled" error
          router.back();
          return true; // block default behavior (exit app)
        } catch (error: any) {
          // If navigation fails (e.g., "go back was not handled"), 
          // check if we should navigate to a safe route or allow exit

          // For tabs, navigate to dashboard
          if (segments.some(s => s.includes('(tabs)'))) {
            try {
              router.replace('/(tabs)/dashboard');
              return true;
            } catch {
              return false; // Allow exit if navigation fails
            }
          }

          // For auth, navigate to login
          if (segments.some(s => s.includes('(auth)'))) {
            try {
              router.replace('/(auth)/login');
              return true;
            } catch {
              return false; // Allow exit if navigation fails
            }
          }

          // For modals, allow exit (modal will close)
          if (segments.some(s => s.includes('(modals)'))) {
            return false;
          }

          // If all else fails, allow default behavior
          return false;
        }
      }

      // If not in navigable context, allow default behavior
      return false;
    };

    let sub: any;
    if (Platform.OS === 'android') {
      sub = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
    }

    return () => {
      if (sub && typeof sub.remove === 'function') {
        sub.remove();
      }
    };
  }, [customGoBack, router, segments]);
}
