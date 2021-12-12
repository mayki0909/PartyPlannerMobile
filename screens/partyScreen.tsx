import * as React from 'react';
import { SafeAreaView,ScrollView,View,Text,StyleSheet,Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import {getPartyById} from '../services/ppRest';
import {Party} from '../models';

interface PartyProps{
  navigation: any;
  route: any;
}

export default function PartyScreen(props: PartyProps) {

    const partyId = props.route.params.id;
    const [party, setParty] = React.useState(null)

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
            <Row style={styles.spacing} onTouchStart={async()=>{props.navigation.navigate('Details',{id: partyId})}}>
                <Col size={130}>
                    <Text style={styles.nameText}>LOCATION</Text>
                </Col>
                <Col size={70} >
                    <Image source={require('../assets/images/Pin.png')} style={{flex: 1, width: 100, resizeMode: 'contain'}}/>
                </Col>
            </Row>
            <Row style={styles.spacing} onTouchStart={async()=>{props.navigation.navigate('Items',{id: partyId})}}>
                <Col size={130}>
                    <Text style={styles.nameText}>ITEMS NEEDED</Text>
                </Col>
                <Col size={70} >
                    <Image source={require('../assets/images/Beer.png')} style={{flex: 1, width: 100, resizeMode: 'contain'}}/>
                </Col>
            </Row>
            <Row style={styles.spacing} onTouchStart={async()=>{props.navigation.navigate('Guests',{id: partyId})}}>
                <Col size={130}>
                    <Text style={styles.nameText}>GUEST LIST</Text>
                </Col>
                <Col size={70} >
                    <Image source={require('../assets/images/Person.png')} style={{flex: 1, width: 100, resizeMode: 'contain'}}/>
                </Col>
            </Row>

            <Row style={styles.spacing} onTouchStart={async()=>{props.navigation.navigate('Calculate',{id: partyId})}}>
                <Col size={130}>
                    <Text style={styles.nameText}>CALCULATE</Text>
                </Col>
                <Col size={70} >
                    <Image source={require('../assets/images/Calculator.png')} style={{flex: 1, width: 100, resizeMode: 'contain'}}/>
                </Col>
            </Row>

            <Row style={styles.spacing} onTouchStart={async()=>{props.navigation.navigate('Share',{id: partyId})}}>
                <Col size={130}>
                    <Text style={styles.nameText}>SHARE</Text>
                </Col>
                <Col size={70}>
                    <Image source={require('../assets/images/share.png')} style={{flex: 1, width: 100, resizeMode: 'contain'}}/>
                </Col>
            </Row>
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
    spacing:{
        marginTop: 20,
        width: '80%',
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#3B3D44",
        //boxShadow: '4px 4px 10px #23242A, -4px -4px 10px #3B3D44',
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
        fontSize:22,
        color: '#fff', 
        textAlign: 'left',
        paddingTop: 35,
        paddingLeft: 20,
        fontWeight: 'bold',
    },
});
