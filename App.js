import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import StackNavigator from './navigation/StackNavigator';

export default function App() {
  return (
    <PaperProvider>
      <StackNavigator />
    </PaperProvider>
  );
}
