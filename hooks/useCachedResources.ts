import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          'raleway': require('../assets/fonts/Raleway-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.log('problem')
        console.warn(e);
      } finally {
        setTimeout(()=>{
          setLoadingComplete(true);
          SplashScreen.hideAsync();
        },150) //Set to 1500
        
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
