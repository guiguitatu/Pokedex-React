import React, { useState, useEffect, useContext, useMemo } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getPokemonDetails } from '../api/pokeapi';
import { PokemonDetails } from '../types/pokemon';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { RootStackParamList } from '../navigation/AppNavigator';
import axios from 'axios';
import typeColors from '../utils/typeColors';
import { useTheme, ThemeColors } from '../contexts/ThemeContext';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailsScreen = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const { pokemonName } = route.params;
  
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [abilitiesPT, setAbilitiesPT] = useState<string[]>([]);

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const details = await getPokemonDetails(pokemonName);
        setPokemon(details);
        // Buscar habilidades em português
        const abilities = await Promise.all(
          details.abilities.map(async ({ ability }) => {
            try {
              const res = await axios.get(ability.url);
              const ptEntry = res.data.names.find((n: any) => n.language.name === 'pt');
              return ptEntry ? ptEntry.name : ability.name;
            } catch {
              return ability.name;
            }
          })
        );
        setAbilitiesPT(abilities);
      } catch (err) {
        setError(`Pokémon "${pokemonName}" não encontrado.`);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [pokemonName]);

  const handleFavoritePress = () => {
    if (!pokemon) return;

    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };


  if (loading) {
    return <ActivityIndicator size="large" color={colors.spinner} style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!pokemon) {
    return null;
  }

  const favorite = isFavorite(pokemon.id);

  const mainType = pokemon.types[0]?.type.name;
  const accentColor = typeColors[mainType] || colors.accent;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <View style={[styles.card, { borderColor: colors.border }]}>
        <View style={[styles.imageWrapper, { backgroundColor: accentColor }]}>
          <Image
            source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
            style={styles.image}
          />
        </View>
        <Text style={styles.name}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
        <Text style={styles.pokedexNumber}>#{String(pokemon.id).padStart(3, '0')}</Text>
        <View style={styles.typesContainer}>
          {pokemon.types.map(({ type }) => (
            <Text
              key={type.name}
              style={[
                styles.type,
                {
                  backgroundColor: typeColors[type.name] || colors.chipBackground,
                  color: colors.chipText,
                },
              ]}
            >
              {type.name}
            </Text>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        <View style={styles.abilitiesContainer}>
          {abilitiesPT.map((name, idx) => (
            <View
              key={name + idx}
              style={[
                styles.abilityBox,
                { backgroundColor: colors.abilityBackground, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.abilityText, { color: colors.abilityText }]}>{name}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={handleFavoritePress}
          style={[
            styles.favoriteButton,
            { backgroundColor: favorite ? colors.favoriteButtonActive : colors.favoriteButton },
          ]}
        >
          <Text style={[styles.favoriteButtonText, { color: colors.buttonText }]}>
            {favorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      padding: 20,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: 24,
      alignItems: 'center',
    },
    card: {
      width: '100%',
      backgroundColor: colors.surface,
      borderRadius: 24,
      padding: 24,
      alignItems: 'center',
      borderWidth: 1,
      shadowColor: colors.border,
      shadowOpacity: 0.2,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    imageWrapper: {
      width: 220,
      height: 220,
      borderRadius: 110,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    image: { width: 200, height: 200 },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      marginTop: 8,
      color: colors.text,
      textTransform: 'capitalize',
    },
    pokedexNumber: { fontSize: 20, color: colors.secondaryText, marginBottom: 16 },
    typesContainer: {
      flexDirection: 'row',
      marginBottom: 24,
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    type: {
      paddingHorizontal: 15,
      paddingVertical: 6,
      borderRadius: 16,
      marginHorizontal: 6,
      marginVertical: 4,
      fontSize: 16,
      textTransform: 'capitalize',
      overflow: 'hidden',
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 12,
      color: colors.text,
      alignSelf: 'flex-start',
    },
    abilitiesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 10,
    },
    abilityBox: {
      paddingHorizontal: 15,
      paddingVertical: 6,
      borderRadius: 16,
      margin: 6,
      alignItems: 'center',
      borderWidth: 1,
    },
    abilityText: {
      fontSize: 16,
      textTransform: 'capitalize',
      fontWeight: 'bold',
    },
    errorText: { color: colors.error, fontSize: 18, textAlign: 'center' },
    favoriteButton: {
      marginTop: 30,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 24,
    },
    favoriteButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default DetailsScreen;