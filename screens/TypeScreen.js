import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const TypeScreen = ({ route, navigation }) => {
  const { typeName } = route.params;
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/type/${typeName}`)
      .then(response => {
        setPokemon(response.data.pokemon.map(p => p.pokemon));
      })
      .catch(error => {
        console.error(error);
      });
  }, [typeName]);

  return (
    <View>
      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { pokemonName: item.name })}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TypeScreen;
