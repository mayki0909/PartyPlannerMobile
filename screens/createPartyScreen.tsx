import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import style from '../components/style';
import { Text, View } from '../components/Themed';
import {putParty} from '../services/ppRest';


interface CreatePartyProps{
  navigation: any;
}


export default function CreatePartyScreen(props: CreatePartyProps) {
  
    const [partyName, setPartyName] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    async function callCreateApi() {
       if(partyName != ""){
            const response = await putParty(partyName)
            if (response.id){
                props.navigation.navigate('Party',{
                    id: response.id
                })
            }
        }
        setErrorMessage("The party name can't be empty!")
    }

    return (
    <View style={styles.container}>
        <View style={styles.createPartyContainer}>
            <Text style={styles.label}>Name your party:</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="Name your party"
                    autoFocus={true}
                    value={partyName}
                    onChangeText={text => {setPartyName(text)}}
                ></TextInput>
                <Text style={[style.btnMedium, styles.button]} onPress={callCreateApi}>Create</Text>
                {errorMessage && (<Text style={styles.errorMessage}> {errorMessage} </Text>
                )}
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
        paddingTop: 20,
        textAlign: 'left',
    },
    inputField:{
        fontSize: 24,
        borderRadius: 10,
        color: '#fff',
        height: 40,
        marginRight: 10,
        paddingLeft: 10
    },
    createPartyContainer: {
        width: '80%',
        height: '30%',
        margin: '10px',
        backgroundColor: '#303138',
        paddingLeft: 20,
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        borderRadius: 30,
        boxShadow: '4px 4px 10px #23242A, -4px -4px 10px #3B3D44',
        display: 'flex',
        justifyContent: 'center',
      },
      button: {
        fontSize: 16,
        marginTop: 20,
      },
      errorMessage: {
        color: 'red', 
        fontSize: 16,
        marginTop: 10,
      }
});
