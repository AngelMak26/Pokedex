import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

const TypeScreen = ({ route, navigation }) => {
  const { typeUrl } = route.params;
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(typeUrl)
      .then(response => {
        setPokemon(response.data.pokemon.map(p => p.pokemon));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [typeUrl]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FlatList
          data={pokemon}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              onPress={() => navigation.navigate('Details', { pokemonName: item.name })}
              style={styles.listItem}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  listItem: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
});

export default TypeScreen;
