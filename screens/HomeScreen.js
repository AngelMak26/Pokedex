import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { List } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/type')
      .then(response => {
        setTypes(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={types}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.listItem}
            onPress={() => navigation.navigate('Type', { typeName: item.name, typeUrl: item.url })}
          >
            <List.Item
              title={item.name}
              titleStyle={styles.listItemText}
              left={props => <List.Icon {...props} icon="pokeball" color="#3B4CCA" />}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default HomeScreen;

