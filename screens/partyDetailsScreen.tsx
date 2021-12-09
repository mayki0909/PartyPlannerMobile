import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import style from '../components/style';
import { Text, View } from '../components/Themed';
import {putParty} from '../services/ppRest';
import { Col, Row, Grid } from "react-native-easy-grid";


interface CreatePartyProps{
  navigation: any;
}


export default function CreatePartyScreen(props: CreatePartyProps) {
  
    const [partyName, setPartyName] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const [streetAddress, setStreetAddress] = React.useState("");
    const [apartment, setApartment] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");

    const [days, setDays] = React.useState(0);

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
            <Row>
                <Col size={120}>
                    <Text style={styles.label}>Party address</Text>
                </Col>
            </Row>
            <Row>
                <Col size={120}>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Street address and building number"
                        autoFocus={true}
                        value={streetAddress}
                        onChangeText={text => {setStreetAddress(text)}}
                    ></TextInput>
                </Col>
            </Row>
            <Row>
                <Col size={120}>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Staircase / apartment / floor / other"
                        value={apartment}
                        onChangeText={text => {setApartment(text)}}
                    ></TextInput>
                </Col>
            </Row>
            <Row>
                <Col size={120}>
                    <Text style={styles.label}>Date</Text>
                </Col>
            </Row>
            <Row>
                <Col size={80}>
                    
                </Col>
                <Col size={40}>
                    
                </Col>
            </Row>
            <Row>
                <Col size={120}>
                    <Text style={styles.label}>Description</Text>
                </Col>
            </Row>
            <Row>
                <Col size={120}>
                    <TextInput
                        style={styles.inputFieldLarge}
                        placeholder="Describe the party place"
                        value={description}
                        onChangeText={text => {setDescription(text)}}
                    ></TextInput>
                </Col>
            </Row>
            <Row>
                <Col size={120}>
                    <Text style={styles.label}>Pricing</Text>
                </Col>
            </Row>
            <Row>
                <Col size={40}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="€"
                            value={price}
                            keyboardType={'numeric'}
                            onChangeText={text => {setPrice(text)}}
                        ></TextInput>
                </Col>
                <Col size={20}>
                    <Text style={styles.text}>Days:</Text>
                </Col>
                <Col size={20}>
                    <Text style={styles.text}>{days}</Text>
                </Col>
                <Col size={30}>
                    <Text style={styles.count} onPress={ () => {setDays(days + 1)} }>+</Text>
                    <Text style={styles.count} onPress={ () => {setDays(days - 1)} }>-</Text>
                </Col>
            </Row>

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
        fontSize: 18,
        color: '#fff',
        paddingBottom: 5,
        paddingTop: 20,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    inputField:{
        fontSize: 16,
        borderRadius: 10,
        color: '#fff',
        borderColor: '#fff',
        height: 40,
        marginRight: 30,
        paddingLeft: 10
    },
    inputFieldLarge:{
        fontSize: 16,
        borderRadius: 10,
        color: '#fff',
        borderColor: '#fff',
        height: 200,
        marginRight: 30,
        paddingLeft: 10
    },
    createPartyContainer: {
        width: '80%',
        height: '80%',
        margin: '10px',
        backgroundColor: '#303138',
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        borderRadius: 30,
        boxShadow: '4px 4px 10px #23242A, -4px -4px 10px #3B3D44',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 30,
      },
    text: {
        color: '#fff',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'right',
        marginRight: 10,
    }, 
    count: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 10,
        marginTop: -5,
    }

});