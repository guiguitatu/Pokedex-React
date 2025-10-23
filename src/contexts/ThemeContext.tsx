import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Appearance } from 'react-native';

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  secondaryText: string;
  border: string;
  primary: string;
  accent: string;
  error: string;
  inputBackground: string;
  placeholder: string;
  card: string;
  spinner: string;
  headerBackground: string;
  headerText: string;
  headerButtonBackground: string;
  headerButtonText: string;
  listBackground: string;
  emptyStateText: string;
  chipBackground: string;
  chipText: string;
  abilityBackground: string;
  abilityText: string;
  favoriteButton: string;
  favoriteButtonActive: string;
  buttonText: string;
}

interface ThemeContextValue {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  background: '#f4f4f8',
  surface: '#ffffff',
  text: '#1f2933',
  secondaryText: '#52606d',
  border: '#d2d6dc',
  primary: '#ef4444',
  accent: '#fbbf24',
  error: '#ef4444',
  inputBackground: '#ffffff',
  placeholder: '#9aa5b1',
  card: '#ffffff',
  spinner: '#ef4444',
  headerBackground: '#ef4444',
  headerText: '#fdf2f2',
  headerButtonBackground: 'rgba(0,0,0,0.15)',
  headerButtonText: '#fdf2f2',
  listBackground: '#f4f4f8',
  emptyStateText: '#52606d',
  chipBackground: 'rgba(255, 255, 255, 0.7)',
  chipText: '#1f2933',
  abilityBackground: 'rgba(255, 255, 255, 0.8)',
  abilityText: '#1f2933',
  favoriteButton: '#64748b',
  favoriteButtonActive: '#22c55e',
  buttonText: '#f8fafc',
};

const darkColors: ThemeColors = {
  background: '#0f172a',
  surface: '#111c34',
  text: '#e2e8f0',
  secondaryText: '#94a3b8',
  border: '#1e293b',
  primary: '#f97316',
  accent: '#facc15',
  error: '#f87171',
  inputBackground: '#1e293b',
  placeholder: '#64748b',
  card: '#1e293b',
  spinner: '#facc15',
  headerBackground: '#0b1220',
  headerText: '#f8fafc',
  headerButtonBackground: 'rgba(148, 163, 184, 0.25)',
  headerButtonText: '#f8fafc',
  listBackground: '#0f172a',
  emptyStateText: '#cbd5f5',
  chipBackground: 'rgba(148, 163, 184, 0.2)',
  chipText: '#f8fafc',
  abilityBackground: 'rgba(30, 41, 59, 0.9)',
  abilityText: '#e2e8f0',
  favoriteButton: '#334155',
  favoriteButtonActive: '#16a34a',
  buttonText: '#f8fafc',
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<ThemeMode>(systemScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const colors = theme === 'light' ? lightColors : darkColors;

  const value = useMemo(
    () => ({
      theme,
      colors,
      toggleTheme,
    }),
    [theme, colors, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

