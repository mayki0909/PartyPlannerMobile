import * as React from 'react';
import { SafeAreaView,ScrollView,View,Text,StyleSheet,Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import {getPartyById} from '../services/ppRest';
import {Party} from '../models';

interface PartyProps{
  navigation: any;
  route: any;
}

export default function CalculateScreen(props: PartyProps) {

    
    const partyId = props.route.params.id;
    const [party, setParty] = React.useState<Party>()

    const [location, setLocation] = React.useState(0)
    const [food, setFood] = React.useState(0)
    const [drinks, setDrinks] = React.useState(0)
    const [people, setPeople] = React.useState(0)
    const [total, setTotal] = React.useState(0)
    const [guests, setGuests] = React.useState(0)
    
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
    <View style={styles.page}>
        <View style={styles.container}>
                <Text style={styles.text}>PLAN FOR:</Text>
                <Text style={styles.title}>{party?.info.name} party</Text>
                <View
                    style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                    }}
                />
                <Row style={styles.spacing}>
                    <Col size={130}>
                        <Text style={styles.nameText}>
                            <Text style={styles.price}>{location}€</Text>
                        </Text>
                    </Col>
                    <Col size={30} >
                        <Image source={require('../assets/images/Pin.png')} style={{flex: 1, width: 100, resizeMode: 'contain'}}/>
                    </Col>
                </Row>

                <Row style={styles.spacing}>
                    <Col size={130}>
                        <Text style={styles.nameText}>Food 
                            <Text style={styles.price}> {food}€</Text>
                            <Text>
                            {party?.categories.forEach(element => {
                                const keys = Object.keys(element);
                                
                                keys.forEach((key, index) => {
                                    if(key == "items"){
                                        console.log(`${key}: ${element[key]}`);

                                        const items = Object.keys(element[key])

                                        items.forEach((item, i) => {
                                            
                                            console.log(`${item}: ${element[key]}`)

                                        });
                                    }
                                });
                            })};
                            
                            </Text>
                        </Text>
                    </Col>
                    <Col size={30} >
                        <Image source={require('../assets/images/Beer.png')} style={{flex: 1, width: 100, resizeMode: 'contain'}}/>
                    </Col>
                </Row>

                <Row style={styles.spacing}>
                    <Col size={130}>
                        <Text style={styles.nameText}>Drinks
                            <Text style={styles.price}> {drinks}€</Text>
                        </Text>
                    </Col>
                    <Col size={30} >
                        <Image source={require('../assets/images/Beer.png')} style={{flex: 1, width: 100, resizeMode: 'contain'}}/>
                    </Col>
                </Row>

                <Row style={styles.spacing}>
                    <Col size={130}>
                        <Text style={styles.nameText}>People invited 
                            <Text style={styles.price}> {people} </Text>
                        </Text>
                    </Col>
                    <Col size={30} >
                        <Image source={require('../assets/images/Person.png')} style={{flex: 1, width: 100, resizeMode: 'contain'}}/>
                    </Col>
                </Row>
        </View>

        <View style={styles.totalContainer}>
                <Text style={styles.totalTitle}>TOTAL</Text>
                <Text style={styles.total}>TOTAL {total}€</Text>
                <Text style={styles.total}>GUESTS {guests}</Text>
                <Text style={styles.total}>PER PERSON {people / total}€</Text>
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'transparent',
        height:'60%',
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#3B3D44",
        margin: 20,
        padding: 15,
    },
    totalContainer:{
        backgroundColor: 'transparent',
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#3B3D44",
        margin: 20,
        padding: 15,
    },
    page: {
        height: '100%',
    },
    spacing:{
        marginTop: 20,
        width: '80%',
    },
    totalTitle:{
        color: '#00ffff',
        paddingLeft: 20,
        fontWeight: 'bold',
        fontSize: 24,
        paddingBottom: 10,
    },
    total:{
        color: '#fff',
        fontSize: 16,
        paddingLeft: 20,
        paddingBottom: 5,
    },
    addCategory: {
        backgroundColor: '#7F818B',
        borderRadius: 30,
    },
    addCategoryText: {
        color: '#000',
        fontWeight: 'bold',
    },
    nameText:{
        fontSize:18,
        color: '#fff', 
        textAlign: 'left',
        paddingTop: 30,
        paddingLeft: 20,
    },
    price:{
        fontWeight: 'bold',
    },
    title:{
        fontSize: 22,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    text:{
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
});
