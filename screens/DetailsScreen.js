import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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
    <View>
      <Text>Name: {pokemonDetails.name}</Text>
      <Text>Height: {pokemonDetails.height}</Text>
      <Text>Weight: {pokemonDetails.weight}</Text>
      <Text>Base Experience: {pokemonDetails.base_experience}</Text>
    </View>
  );
};

export default DetailsScreen;

