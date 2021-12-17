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
                props.navigation.navigate('Details',{
                    id: response.id
                })
                setErrorMessage('')
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
                placeholderTextColor="#E6E6E6" 
                autoFocus={true}
                value={partyName}
                onChangeText={text => {setPartyName(text)}}
            />
            <View style={[style.btnMedium,{borderColor: "#00ffff",marginTop: 20}]}>
                <Text style={styles.button} onPress={callCreateApi}>Create</Text>
            </View>
            <Text style={styles.errorMessage}>{errorMessage} </Text>
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
        fontSize: 20,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#3B3D44",
        color: '#fff',
        height: 40,
        marginRight: 10,
        paddingLeft: 10
    },
    '::placeholder':{
        color: '#fff',
    },
    createPartyContainer: {
        width: '80%',
        height: '30%',
        minHeight: 200,
        margin: 10,
        backgroundColor: '#303138',
        paddingLeft: 20,
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        borderRadius: 30,
        borderWidth: 3,
        borderColor: "#3B3D44",
        display: 'flex',
        justifyContent: 'center',
      },
      button: {
        fontSize: 16,
        color: '#00ffff',
      },
      errorMessage: {
        color: 'red', 
        fontSize: 16,
        marginBottom: 20,
      }
});
