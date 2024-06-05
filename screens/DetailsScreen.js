import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Card, Title, Paragraph, ActivityIndicator, Colors } from 'react-native-paper';

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
    return <ActivityIndicator animating={true} color={Colors.red800} size="large" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: pokemonDetails.sprites.front_default }} style={styles.image} />
        <Card.Content>
          <Title style={styles.title}>{pokemonDetails.name.toUpperCase()}</Title>
          <Paragraph style={styles.details}>Height: {pokemonDetails.height}</Paragraph>
          <Paragraph style={styles.details}>Weight: {pokemonDetails.weight}</Paragraph>
          <Paragraph style={styles.details}>Base Experience: {pokemonDetails.base_experience}</Paragraph>
          <Paragraph style={styles.details}>Abilities:</Paragraph>
          {pokemonDetails.abilities.map((ability, index) => (
            <Paragraph key={index} style={styles.detailItem}>- {ability.ability.name}</Paragraph>
          ))}
          <Paragraph style={styles.details}>Types:</Paragraph>
          {pokemonDetails.types.map((type, index) => (
            <Paragraph key={index} style={styles.detailItem}>- {type.type.name}</Paragraph>
          ))}
          <Paragraph style={styles.details}>Stats:</Paragraph>
          {pokemonDetails.stats.map((stat, index) => (
            <Paragraph key={index} style={styles.detailItem}>- {stat.stat.name}: {stat.base_stat}</Paragraph>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3B4CCA',
  },
  details: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  detailItem: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default DetailsScreen;
