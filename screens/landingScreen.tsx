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
        <View style={style.btnBig} onTouchStart={async()=>{props.navigation.navigate('CreateParty')}}>
            <Text style={styles.blueText}>+ CREATE PARTY</Text>
        </View>
        <View style={style.btnBig} onTouchStart={()=>{props.navigation.navigate('Archive')}}>
            <Text style={styles.whiteText}>PARTY ARCHIVE</Text>
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
    blueText:{
      color: "#00ffff",
      fontWeight: 'bold',
      fontSize: 20
    },
    whiteText:{
      color: "#fff",
      fontWeight: 'bold',
      fontSize: 20
    }
});
