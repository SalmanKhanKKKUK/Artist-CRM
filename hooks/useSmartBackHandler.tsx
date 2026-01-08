import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';

export function useSmartBackHandler(customGoBack?: () => void) {
  useEffect(() => {
    const onBackPress = () => {
      // If a custom go back function is provided, use it
      if (customGoBack) {
        customGoBack();
        return true; // block default behavior
      }
      
      // Otherwise, allow default behavior (exit app)
      return false;
    };

    let sub: any;
    if (Platform.OS === 'android') {
      sub = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
    }

    return () => sub?.remove();
  }, [customGoBack]);
}
