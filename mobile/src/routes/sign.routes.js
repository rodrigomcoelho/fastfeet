import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import SignIn from '~/pages/SignIn';

const Stack = createStackNavigator();

export default function Sign() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Stack.Navigator
        screenOptions={{ headerTransparent: true, headerTitle: '' }}>
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </>
  );
}
