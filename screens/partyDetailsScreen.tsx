import * as React from 'react';
import { StyleSheet, TextInput,Text, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import DateTimePicker from '@react-native-community/datetimepicker';

import style from '../components/style';
import {putParty,getPartyById} from '../services/ppRest';
import {Party} from '../models';


interface DetailProps{
    navigation: any;
    route: any;
  }

export default function DetailsScreen(props: DetailProps) {

    const partyId = props.route.params.id;
    const [party, setParty] = React.useState<Party|undefined>();

    const [errorMessage, setErrorMessage] = React.useState("");
    const [partyName, setPartyName] = React.useState("");

    const [streetAddress, setStreetAddress] = React.useState("");
    const [apartment, setApartment] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");


    // Date
    const [show, setShow] = React.useState(false);
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

    React.useEffect(() => {
        getPartyData()
    }, []);

    return (
    <SafeAreaView  style={styles.container}>
        <ScrollView style={styles.createPartyContainer}>
            <Text style={styles.title}>{party?.info.name} party</Text>
            <Grid >
                <Row>
                    <Col size={120}>
                        <Text style={styles.label}>Party address</Text>
                    </Col>
                </Row>
                <Row>
                    <Col size={120}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Street address"
                            placeholderTextColor="#E6E6E6" 
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
                            placeholder="Apartment / floor / other"
                            placeholderTextColor="#E6E6E6" 
                            value={apartment}
                            onChangeText={text => {setApartment(text)}}
                        ></TextInput>
                    </Col>
                </Row>
                <Row>
                    <Text style={styles.label}>Date</Text>
                </Row>
                <Row>
                    <Col size={80}>
                        {/* <DateTimePicker
                            value={date}
                            is24Hour={true}
                            onChange={onChange}
                        /> */}
                    </Col>
                    <Col size={40}></Col>
                </Row>
                <Row>
                    <Col size={40}>
                        <Text style={styles.text}>Days:</Text>
                    </Col>
                    <Col size={10}>
                        <Text style={styles.count} onPress={ () => {if (days > 0) setDays(days - 1)} }>-</Text>
                    </Col>
                    <Col size={10}>
                        <Text style={styles.number}>{days}</Text>
                    </Col>
                    <Col size={10}>
                        <Text style={styles.count} onPress={ () => {setDays(days + 1)} }>+</Text>
                    </Col>
                </Row>
                <Row>
                    <Text style={styles.label}>Description</Text>       
                </Row>
                <Row>
                    <Col size={120}>
                        <TextInput
                            style={styles.inputFieldLarge}
                            placeholder="Describe the party place"
                            placeholderTextColor="#E6E6E6" 
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
                    <Col size={60}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="€"
                            placeholderTextColor="#E6E6E6" 
                            value={price}
                            keyboardType={'numeric'}
                            onChangeText={text => {setPrice(text)}}
                        ></TextInput>
                    </Col>
                    <Col size={60}>
                    </Col>
                </Row>
            </Grid>
            <View style={[style.btnMedium,{borderColor: "#00ffff",marginTop: 40}]}>
                <Text style={styles.button} onPress={callCreateApi}>Create</Text>
            </View>
            <Text style={styles.errorMessage}> {errorMessage} </Text>
        </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height:'90%',
        marginTop: 20,
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
        fontSize: 20,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#3B3D44",
        color: '#fff',
        height: 40,
        marginRight: 10,
        paddingLeft: 10
    },
    inputFieldLarge:{
        color: '#fff',
        fontSize: 16,
        borderRadius: 20,
        borderColor: '#3B3D44',
        borderWidth: 3,
        height: 80,
        paddingLeft: 10
    },
    createPartyContainer: {
        width: '80%',
        margin: 10,
        backgroundColor: '#303138',
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        borderRadius: 30,
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
        fontSize: 20,
    },
    count: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
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
        color: '#00ffff',
    },
    errorMessage: {
        color: 'red', 
        fontSize: 16,
        marginTop: 10,
    },
});