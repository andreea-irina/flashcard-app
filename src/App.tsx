/**
 * @format
 */

import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// screens
import Dashboard from './screens/Dashboard';
import FlashcardStack from './screens/FlashcardStack';

export type RootStackParamList = {
  Dashboard: undefined;
  FlashcardStack: {stackId: string; stackName: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{headerShown: false}}>
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
      </ApplicationProvider>
    </>
  );
}

export default App;
