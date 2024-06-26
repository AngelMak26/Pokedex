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
        <ActivityIndicator animating={true} size="large" color="#3B4CCA" />
      ) : (
        <FlatList
          data={pokemon}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              onPress={() => navigation.navigate('Details', { pokemonName: item.name })}
              style={styles.listItem}
              titleStyle={styles.listItemText}
              left={props => <List.Icon {...props} icon="pokeball" color="#3B4CCA" />}
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
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  listItem: {
    marginVertical: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
  },
  listItemText: {
    fontSize: 18,
    textTransform: 'capitalize',
    color: '#3B4CCA',
  },
});

export default TypeScreen;
