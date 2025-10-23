import React, { useContext, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FavoritesContext } from '../contexts/FavoritesContext';
import PokemonCard from '../components/PokemonCard';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme, ThemeColors } from '../contexts/ThemeContext';

const FavoritesScreen = () => {
  const { favorites } = useContext(FavoritesContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Você ainda não tem Pokémon favoritos.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.listContainer}
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <PokemonCard
          name={item.name}
          // A URL não está no objeto de detalhes, então a montamos
          url={`https://pokeapi.co/api/v2/pokemon/${item.id}/`}
          onPress={() => navigation.navigate('Details', { pokemonName: item.name })}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.background,
    },
    emptyText: {
      fontSize: 18,
      color: colors.emptyStateText,
      textAlign: 'center',
    },
    listContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    list: {
      padding: 8,
      backgroundColor: colors.listBackground,
    },
  });

export default FavoritesScreen;