export const THEME_COLORS = {
  // Background Gradient
  bgGradient: ['#f3e8ff', '#fae8ff'] as const,

  // Button Gradient
  buttonGradient: ['#7459FF', '#9D71FD'] as const,

  // Primary Theme Colors
  primary: '#5152B3',
  white: '#FFFFFF',
  textSecondary: '#666',
};

export const LIGHT_THEME = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    text: '#1E293B',
    textSecondary: '#64748B',
    primary: '#5152B3',
    card: '#FFFFFF',
    border: '#E2E8F0',
    bgGradient: ['#f3e8ff', '#fae8ff'] as const,
    buttonText: '#FFFFFF',
    icon: '#5152B3',
    iconBg: '#FFFFFF',
    shadow: '#000000',
  }
};

export const DARK_THEME = {
  dark: true,
  colors: {
    background: '#0f172a', // Dark Slate 900
    text: '#F8FAFC',       // Slate 50
    textSecondary: '#94A3B8', // Slate 400
    primary: '#7459FF',    // Slightly lighter primary for dark mode
    card: '#1e293b',       // Slate 800
    border: '#334155',     // Slate 700
    bgGradient: ['#0f172a', '#1e293b'] as const, // Dark gradient
    buttonText: '#FFFFFF',
    icon: '#FFFFFF',
    iconBg: '#334155',
    shadow: '#000000',
  }
};