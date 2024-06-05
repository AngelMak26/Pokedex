import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TypeScreen from './screens/TypeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Pokedex' }}
        />
        <Stack.Screen 
          name="Type" 
          component={TypeScreen} 
          options={{ title: 'Pokemon Types' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Pokemon Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
