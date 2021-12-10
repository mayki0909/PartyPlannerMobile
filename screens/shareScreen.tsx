import * as React from 'react';
import { StyleSheet,Clipboard} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import style from '../components/style';
import { Text, View } from '../components/Themed';

interface ShareProps{
  navigation: any;
  route: any;
}


export default function ShareScreen(props: ShareProps) {
  const partyId = props.route.params.id;
  const home = props.route.params;
  let link = window.location.href.replace('share','party')
  const copyIt = ()=> Clipboard.setString(link)
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        SHARE AN INVITE
      </Text>
      <Text onPress={copyIt}>
        {link}
      </Text>
      <Text style={[style.btnMedium, styles.btnBigBlue]}>
        Copy to clipboard
      </Text>
      <QRCode 
        value={link} />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height:'80%',
        borderRadius: 30,
        boxShadow: '4px 4px 10px #23242A, -4px -4px 10px #3B3D44',
    },
    heading:{

    },
    btnBigBlue:{
      color: "#00ffff",
    }
});
