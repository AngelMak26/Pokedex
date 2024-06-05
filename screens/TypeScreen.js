import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, ActivityIndicator, Appbar, Colors } from 'react-native-paper';
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
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Pokemon Types" />
      </Appbar.Header>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator animating={true} color={Colors.red800} size="large" />
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
                left={props => <List.Icon {...props} icon="pokeball" color={Colors.red500} />}
              />
            )}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  listItem: {
    marginVertical: 8,
    backgroundColor: '#fff',
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
