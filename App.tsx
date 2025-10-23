import 'react-native-gesture-handler'; // Importe no topo
import React, { useMemo } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';

const NavigationRoot = () => {
  const { theme, colors } = useTheme();

  const navigationTheme = useMemo(() => {
    const baseTheme = theme === 'dark' ? DarkTheme : DefaultTheme;
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: colors.background,
        card: colors.headerBackground,
        text: colors.text,
        border: colors.border,
        primary: colors.primary,
      },
    };
  }, [theme, colors]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <NavigationRoot />
      </FavoritesProvider>
    </ThemeProvider>
  );
}

