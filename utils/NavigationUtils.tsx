import React from 'react';

// Centralized navigation to avoid circular imports
export const useNavigation = () => {
  const [currentScreen, setCurrentScreen] = React.useState<string>('home');

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
  };

  return {
    currentScreen,
    navigateTo,
    setCurrentScreen
  };
};
