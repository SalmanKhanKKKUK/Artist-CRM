import { useRouter, useSegments } from 'expo-router';
import { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';

export function useSmartBackHandler(customGoBack?: () => void) {
  const router = useRouter();
  const segments = useSegments();

  // Use ref to hold the latest customGoBack callback
  // This prevents the effect from re-running when the callback identity changes
  // (e.g. inline arrow functions in components)
  const customGoBackRef = useRef(customGoBack);

  useEffect(() => {
    customGoBackRef.current = customGoBack;
  }, [customGoBack]);

  // Determine current path for stability in dependency array
  const currentPath = Array.isArray(segments) ? segments.join('/') : '';

  useEffect(() => {
    const onBackPress = () => {
      try {
        // 1. Custom Handler (Highest Priority)
        // Use the ref current value
        if (customGoBackRef.current) {
          try {
            customGoBackRef.current();
            return true; // Prevent default behavior
          } catch (error) {
            console.warn('Custom back handler error:', error);
            // Fall through to other checks if custom handler fails
          }
        }

        // 2. Navigation Check (router.back)
        // Standard Android behavior: go back if history exists
        if (router.canGoBack()) {
          try {
            router.back();
            return true;
          } catch (error) {
            console.warn('router.back() failed:', error);
          }
        }

        // Default: Allow partial system handling (exit app if nothing else works)
        return false;

      } catch (globalError) {
        console.error('Critical BackHandler Error:', globalError);
        return false; // Exit app on critical failure
      }
    };

    // Add Listener
    let subscription: any;
    try {
      subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
    } catch (e) {
      console.warn('Failed to add BackHandler listener', e);
    }

    // Cleanup
    return () => {
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      }
    };
  }, [router, currentPath]); // Removed customGoBack and segments from deps -- relies on currentPath string for updates
}
