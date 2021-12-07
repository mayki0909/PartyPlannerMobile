import * as React from 'react';
import { SegmentedControlIOSComponent, StyleSheet, TextInput } from 'react-native';

import style from '../components/style';
import { Text, View } from '../components/Themed';
import {getPartyById} from '../services/ppRest';

interface PartyProps{
  navigation: any;
  route: any
}

export default function PartyScreen(props: PartyProps) {
    const partyId = props.route.params.partyId;
    const [party, setParty] = React.useState(null)
    console.log(partyId)
    
    async function getPartyData() {
        // TODO Check if party name not null and show error
        const response = await getPartyById(partyId)
        if (response){
            setParty(response)
            console.log(response)
        }
        // TODO Show error ...
    }

    React.useEffect(() => {
        getPartyData()
    }, []);

    return (
    <View style={styles.container}>
        <View style={styles.createPartyContainer}>
            <Text style={styles.label}>Party page</Text>
                
              
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
    label:{
        fontSize: 16,
        color: '#fff',
        paddingBottom: 15,
        paddingLeft: 20,
        textAlign: 'left',
    },
    inputField:{
        fontSize: 24,
        borderRadius: 10,
        borderColor: '#fff',
        height: 40,
        marginLeft: 20,
        marginRight: 10,
        paddingLeft: 10
    },
    createPartyContainer: {
        width: '80%',
        height: '20%',
        margin: '10px',
        backgroundColor: '#303138',
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        borderRadius: 30,
        boxShadow: '4px 4px 10px #23242A, -4px -4px 10px #3B3D44',
        display: 'flex',
        justifyContent: 'center',
      }
});
