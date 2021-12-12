import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View,Image } from 'react-native';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

// Screens
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import LandingScreen from '../screens/landingScreen';
import ArchiveScreen from '../screens/archiveScreen';

import PartyScreen from '../screens/partyScreen';
import CreatePartyScreen from '../screens/createPartyScreen';
import PartyDetailsScreen from '../screens/partyDetailsScreen';

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

function LogoTitle() {
  return (
    <Image
      style={{flex: 1, height: 80, width: 100, resizeMode: 'center',}}
      source={require('../assets/images/PP_logotip.png')}
    />
  );
}

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={MyTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name={'Landing'}
        component={LandingScreen} 
        options={{ headerTitle: (props) => <LogoTitle /> }}
      ></Stack.Screen>
      <Stack.Screen 
        name={'Archive'}
        component={ArchiveScreen} 
        options={{ headerTitle: (props) => <LogoTitle /> }}
      ></Stack.Screen>
      <Stack.Screen 
        name={'CreateParty'}
        component={CreatePartyScreen} 
        options={{ headerTitle: (props) => <LogoTitle /> }}
      ></Stack.Screen>
      <Stack.Screen 
        name={'Party'}
        component={PartyScreen} 
        options={{ headerTitle: (props) => <LogoTitle /> }}
      ></Stack.Screen>
      <Stack.Screen 
        name={'Details'}
        component={PartyDetailsScreen} 
        options={{ headerTitle: (props) => <LogoTitle /> }}
      ></Stack.Screen>
      <Stack.Screen name={'TabOne'} component={TabOneScreen}></Stack.Screen>
      <Stack.Screen name={'TabTwo'} component={TabTwoScreen}></Stack.Screen>
      <Stack.Screen name={'NotFound'} component={NotFoundScreen}></Stack.Screen>
      <Stack.Screen name={'Modal'} component={ModalScreen}></Stack.Screen>   
    </Stack.Navigator>
  );
} 
