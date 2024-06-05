import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const DetailsScreen = ({ route }) => {
  const { pokemonName } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => {
        setPokemonDetails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [pokemonName]);

  if (!pokemonDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{pokemonDetails.name.toUpperCase()}</Text>
      <Image
        source={{ uri: pokemonDetails.sprites.front_default }}
        style={styles.image}
      />
      <Text style={styles.details}>Height: {pokemonDetails.height}</Text>
      <Text style={styles.details}>Weight: {pokemonDetails.weight}</Text>
      <Text style={styles.details}>Base Experience: {pokemonDetails.base_experience}</Text>
      <Text style={styles.details}>Abilities:</Text>
      {pokemonDetails.abilities.map((ability, index) => (
        <Text key={index} style={styles.detailItem}>- {ability.ability.name}</Text>
      ))}
      <Text style={styles.details}>Types:</Text>
      {pokemonDetails.types.map((type, index) => (
        <Text key={index} style={styles.detailItem}>- {type.type.name}</Text>
      ))}
      <Text style={styles.details}>Stats:</Text>
      {pokemonDetails.stats.map((stat, index) => (
        <Text key={index} style={styles.detailItem}>- {stat.stat.name}: {stat.base_stat}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  details: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  detailItem: {
    fontSize: 16,
  },
});

export default DetailsScreen;

