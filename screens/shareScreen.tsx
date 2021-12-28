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
  let link = 'http://app.partyplanner.si/invite/'+partyId
  const copyIt = ()=> Clipboard.setString(link)
  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <Text style={styles.heading}>
          SHARE AN INVITE
        </Text>
        <Text style={styles.url} >
          {link}
        </Text>
      <View style={[style.btnMedium,{borderColor: "#00ffff",width:150,marginTop: 20,marginBottom: 20}]} onTouchStart={copyIt}>
        <Text style={styles.btnBigBlue}>Copy to clipboard</Text>
      </View>
      </View>
      <View style={styles.border}>
        <Text style={styles.heading}>
          SCAN IT
        </Text>
        <QRCode  
          size={180}
          value={link} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'transparent',
        alignItems: 'center',
        // justifyContent: 'center',
        height:'60%',
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '10%',
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
      marginBottom: 20,
    },
    url:{
      color: '#FFF',
      fontSize: 15,
      margin: 10,
    },
    btnBigBlue:{
      color: "#00ffff",
    },
    border:{
      borderRadius: 40,
      borderWidth: 3,
      borderColor: "#3B3D44",
      backgroundColor: 'transparent',
      alignItems: 'center',
      minWidth: 320,
      marginBottom: 20,
      paddingBottom: 20
    }
});
