import React, { useState, useEffect, useMemo } from 'react';
import { View, FlatList, Button, StyleSheet, ActivityIndicator, Text, TextInput } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getPokemonList } from '../api/pokeapi';
import { PokemonListItem } from '../types/pokemon';
import PokemonCard from '../components/PokemonCard';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme, ThemeColors } from '../contexts/ThemeContext';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const fetchPokemons = async (url?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPokemonList(url);
      setPokemonList((prevList) => url ? [...prevList, ...data.results] : data.results);
      setNextUrl(data.next);
    } catch (err) {
      setError('Falha ao carregar os Pokémon. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleLoadMore = () => {
    if (nextUrl && !loading) {
      fetchPokemons(nextUrl);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('Details', { pokemonName: searchQuery.trim() });
    }
  };

  if (loading && pokemonList.length === 0) {
    return <ActivityIndicator size="large" color={colors.spinner} style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar Novamente" onPress={() => fetchPokemons()} color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome ou número"
            placeholderTextColor={colors.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
        />
        <Button title="Buscar" onPress={handleSearch} color={colors.primary} />
      </View>
       <Button title="Ver Favoritos" onPress={() => navigation.navigate('Favorites')} color={colors.accent} />
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            url={item.url}
            onPress={() => navigation.navigate('Details', { pokemonName: item.name })}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color={colors.spinner} /> : null}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 8 },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginTop: 12,
      marginBottom: 12,
      shadowColor: colors.border,
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    searchInput: {
      flex: 1,
      height: 44,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      marginRight: 10,
      paddingHorizontal: 12,
      backgroundColor: colors.inputBackground,
      color: colors.text,
    },
    list: {
      paddingBottom: 16,
      paddingHorizontal: 4,
      backgroundColor: colors.listBackground,
    },
    errorText: { color: colors.error, marginBottom: 10, textAlign: 'center' },
  });

export default HomeScreen;