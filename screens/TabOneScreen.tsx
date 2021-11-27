import * as React from 'react';
import { StyleSheet } from 'react-native';

import style from '../components/style';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

interface TabOneProps{
  navigation: any;
}

export default function TabOneScreen(props: TabOneProps) {
  return (
    <View style={style.body}>
      <View style={style.content}>
        <View style={style.btnSmall}>
            Back
        </View>
        <View style={style.btnSmall}>
            Back
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
