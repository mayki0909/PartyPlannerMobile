import * as React from 'react';
import { StyleSheet } from 'react-native';

import style from '../components/style';
import { Text, View } from '../components/Themed';
import {getAllParties} from '../services/ppRest';

interface LandingProps{
  navigation: any;
}

const consoleData = async () => {
  const data = await getAllParties()
  console.log(data);
}


export default function LandingScreen(props: LandingProps) {
  return (
    <View style={styles.container}>
        <View style={style.btnBig} onTouchStart={async()=>{await consoleData()}}>
            <Text>+ CREATE PARTY</Text>
        </View>
        <View style={style.btnBig} onTouchStart={()=>{props.navigation.navigate('archive')}}>
            <Text>PARTY ARCHIVE</Text>
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
    }
});
