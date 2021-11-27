import * as React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

// Screens
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';

const MyTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#303138',
    card: '#303138',
    text: '#ffffff',
    border: '#36373e',
    notification: '#ffffff',
  },
};

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={MyTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'TabOne'} component={TabOneScreen}></Stack.Screen>
      <Stack.Screen name={'TabTwo'} component={TabTwoScreen}></Stack.Screen>
      <Stack.Screen name={'NotFound'} component={NotFoundScreen}></Stack.Screen>
      <Stack.Screen name={'Modal'} component={ModalScreen}></Stack.Screen>   
    </Stack.Navigator>
  );
} 