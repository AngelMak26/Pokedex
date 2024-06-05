import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TypeScreen from './screens/TypeScreen';
import DetailsScreen from './screens/DetailsScreen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3B4CCA',
    accent: '#FFDE00',
    background: '#F0F0F0',
    surface: '#FFFFFF',
    text: '#212121',
    error: '#B00020',
    notification: '#FF3D00',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
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
    </PaperProvider>
  );
}
