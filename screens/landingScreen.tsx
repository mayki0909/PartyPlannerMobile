import * as React from 'react';
import { StyleSheet } from 'react-native';

import style from '../components/style';
import { Text, View } from '../components/Themed';

interface LandingProps{
  navigation: any;
}


export default function LandingScreen(props: LandingProps) {
  return (
    <View style={styles.container}>
        <View style={{backgroundColor: 'transparent'}} onTouchStart={async()=>{props.navigation.navigate('CreateParty')}}>
            <Text style={[style.btnBig, styles.btnBigBlue]}>+ CREATE PARTY</Text>
        </View>
        <View style={{backgroundColor: 'transparent'}} onTouchStart={()=>{props.navigation.navigate('Archive')}}>
            <Text style={style.btnBig}>PARTY ARCHIVE</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height:'80%',
    },
    btnBigBlue:{
      color: "#00ffff",
    }
});
