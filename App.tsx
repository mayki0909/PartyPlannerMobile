import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import style from './components/style';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return(
      <SafeAreaProvider style={style.body}>
          <Image 
            source={require('./assets/images/PP_logotip.svg')}
            style = {{ flex: 1, height: undefined, width: undefined, resizeMode: 'contain', margin:'40px'}}
          />
      </SafeAreaProvider>
    )
  } else {
    return (
      <SafeAreaProvider style={style.body}>
        <Navigation/>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
