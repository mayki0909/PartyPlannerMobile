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
  let link = 'http://app.partyplanner.si/party?'+partyId
  const copyIt = ()=> Clipboard.setString(link)
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        SHARE AN INVITE
      </Text>
      <Text style={styles.url} onPress={copyIt}>
        {link}
      </Text>
      <Text style={[style.btnMedium, styles.btnBigBlue]}>
        Copy to clipboard
      </Text>
      <Text style={styles.heading}>
        SCAN IT
      </Text>
      <QRCode size={150}
        value={link} />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'transparent',
        alignItems: 'center',
        height:'60%',
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '20%',
        borderRadius: 30,
        shadowColor: '#23242A',
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 1,
        shadowRadius: 30,
    },
    heading:{
      color: '#FFF',
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 30,
    },
    url:{
      color: '#FFF',
      fontSize: 15,
      margin: 10,
    },
    btnBigBlue:{
      color: "#00ffff",
      marginTop: 10,
      marginBottom: 50,
    }
});
