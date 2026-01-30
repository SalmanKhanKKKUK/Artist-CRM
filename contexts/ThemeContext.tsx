import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';
import { DARK_THEME, LIGHT_THEME } from '../constants/Colors';

type ThemeMode = 'active' | 'light' | 'dark';

interface ThemeContextType {
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    colors: {
        background: string;
        text: string;
        textSecondary: string;
        primary: string;
        card: string;
        border: string;
        bgGradient: readonly [string, string];
        buttonText: string;
        icon: string;
        iconBg: string;
        shadow: string;
    };
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
    themeMode: 'active',
    setThemeMode: () => { },
    colors: LIGHT_THEME.colors,
    isDark: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemColorScheme = _useColorScheme();
    const [themeMode, setThemeModeState] = useState<ThemeMode>('active');
    const [activeScheme, setActiveScheme] = useState<ColorSchemeName>(systemColorScheme);

    // Load saved preference
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('user_theme_preference');
                if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'active') {
                    setThemeModeState(savedTheme);
                }
            } catch (error) {
                console.error('Failed to load theme preference:', error);
            }
        };
        loadTheme();
    }, []);

    // Update effect when system scheme changes or mode changes
    useEffect(() => {
        if (themeMode === 'active') {
            setActiveScheme(systemColorScheme);
        } else {
            setActiveScheme(themeMode);
        }
    }, [themeMode, systemColorScheme]);

    const setThemeMode = async (mode: ThemeMode) => {
        setThemeModeState(mode);
        try {
            await AsyncStorage.setItem('user_theme_preference', mode);
        } catch (error) {
            console.error('Failed to save theme preference:', error);
        }
    };

    const isDark = activeScheme === 'dark';
    const theme = isDark ? DARK_THEME : LIGHT_THEME;

    return (
        <ThemeContext.Provider value={{ themeMode, setThemeMode, colors: theme.colors, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
