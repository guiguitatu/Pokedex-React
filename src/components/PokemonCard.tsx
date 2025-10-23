import React, { useMemo } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, ThemeColors } from '../contexts/ThemeContext';

interface PokemonCardProps {
  name: string;
  url: string;
  onPress: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url, onPress }) => {
  // Extrai o ID do Pokémon da URL para montar a URL da imagem
  const pokemonId = url.split('/')[url.split('/').length - 2];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      flex: 1,
      margin: 8,
      padding: 16,
      borderRadius: 14,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.border,
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    image: {
      width: 100,
      height: 100,
    },
    name: {
      marginTop: 8,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
  });

export default PokemonCard;