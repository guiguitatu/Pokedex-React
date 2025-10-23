import React, { useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { useTheme } from '../contexts/ThemeContext';

export type RootStackParamList = {
  Home: undefined;
  Details: { pokemonName: string };
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { colors, toggleTheme, theme } = useTheme();

  const headerButtonLabel = useMemo(() => (theme === 'dark' ? '☀️' : '🌙'), [theme]);
  const headerButtonA11yLabel = useMemo(
    () => (theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'),
    [theme]
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.headerBackground,
          shadowColor: colors.border,
        },
        headerTintColor: colors.headerText,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.headerText,
        },
        headerTitleAlign: 'center',
        headerRightContainerStyle: { paddingRight: 8 },
        headerRight: () => (
          <TouchableOpacity
            onPress={toggleTheme}
            accessibilityRole="button"
            accessibilityLabel={headerButtonA11yLabel}
            accessibilityHint="Alterna entre os modos claro e escuro"
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
              backgroundColor: colors.headerButtonBackground,
            }}
          >
            <Text style={{ color: colors.headerButtonText, fontSize: 16 }}>{headerButtonLabel}</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Pokédex' }} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({
          title:
            route.params.pokemonName.charAt(0).toUpperCase() +
            route.params.pokemonName.slice(1),
        })}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Favoritos' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
