/**
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// screens
import Dashboard from './screens/Dashboard';
import FlashcardStack from './screens/FlashcardStack';

export type RootStackParamList = {
  Dashboard: undefined;
  FlashcardStack: {stackId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{title: 'Overview'}}
        />

        <Stack.Screen
          name="FlashcardStack"
          component={FlashcardStack}
          options={{title: 'Flashcard'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
