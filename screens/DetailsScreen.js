import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
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
  }, []);

  if (!pokemonDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>{pokemonDetails.name}</Text>
      <Image source={{ uri: pokemonDetails.sprites.front_default }} style={{ width: 100, height: 100 }} />
      <Text>Height: {pokemonDetails.height}</Text>
      <Text>Weight: {pokemonDetails.weight}</Text>
      <Text>Type: {pokemonDetails.types.map(typeInfo => typeInfo.type.name).join(', ')}</Text>
    </View>
  );
};

export default DetailsScreen;
