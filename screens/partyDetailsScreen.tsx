import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import style from '../components/style';
import { Text, View } from '../components/Themed';
import {putParty} from '../services/ppRest';
import { Col, Row, Grid } from "react-native-easy-grid";
import {getPartyById} from '../services/ppRest';
import {Party} from '../models';


interface DetailProps{
    navigation: any;
    route: any;
  }

export default function DetailsScreen(props: DetailProps) {

    const partyId = props.route.params.id;
    const [party, setParty] = React.useState<Party|undefined>();

    async function callCreateApi() {
        if(streetAddress != "" && apartment != "" && date != null && description != "" && price != "" && days != 0){
             const response = await putParty(partyName)
             if (response.id){
                 props.navigation.navigate('Details',{
                     id: response.id
                 })
             }
         }
         setErrorMessage("Please fill in all the fields!")
     }

    const [errorMessage, setErrorMessage] = React.useState("");
    const [partyName, setPartyName] = React.useState("");

    const [streetAddress, setStreetAddress] = React.useState("");
    const [apartment, setApartment] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");


    // Date
    const [days, setDays] = React.useState(0);
    const [date, setDate] = React.useState(new Date(1598051730000));

    const onChange = () => {
        setDate(date);
      };

    async function getPartyData() {
        const response = await getPartyById(partyId)
        if (response){
            setParty(response)
            console.log(response)
        }
    }

    React.useEffect(() => {
        getPartyData()
    }, []);

    return (
    <View style={styles.container}>
        <Text style={styles.title}>{party?.info.name} party</Text>
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
                <DateTimePicker
                    value={date}
                    is24Hour={true}
                    onChange={onChange}
                    />
                </Col>
                <Col size={40}></Col>
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
                <Col>
                    <TextInput
                        style={styles.inputField}
                        placeholder="€"
                        value={price}
                        keyboardType={'numeric'}
                        onChangeText={text => {setPrice(text)}}
                    ></TextInput>
                </Col>
                <Col>
                    <Text style={styles.text}>Days:</Text>
                </Col>
                <Col>
                    <Text style={styles.number}>{days}</Text>
                </Col>
                <Col>
                    <Text style={styles.count} onPress={ () => {setDays(days + 1)} }>+</Text>
                    <Text style={[styles.count, styles.left]} onPress={ () => {if (days > 0) setDays(days - 1)} }>-</Text>
                </Col>
            </Row>
        </View>
        <Text style={[style.btnMedium, styles.button]} onPress={callCreateApi}>Create</Text>
                {errorMessage && (<Text style={styles.errorMessage}> {errorMessage} </Text>
        )}
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
    number: {
        color: '#fff',
        fontSize: 14,
        marginTop: 10,
    },
    count: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 10,
        marginTop: -5,
    },
    left: {
        paddingLeft: 2,
    },
    title: {
        color: '#fff',
        fontSize: 40, 
        fontWeight: 'bold', 
        marginBottom: 30,
        textAlign: 'center',
        marginTop: '5%',
    },
    button: {
        fontSize: 16,
        marginTop: 20,
    },
    errorMessage: {
        color: 'red', 
        fontSize: 16,
        marginTop: 10,
    },
});