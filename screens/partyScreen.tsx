import * as React from 'react';
import { SafeAreaView,ScrollView,View,Text,StyleSheet } from 'react-native';
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

        <Row style={styles.spacing}>
            <Col size={150}>
                <Text style={styles.nameText}>ITEMS NEEDED</Text>
            </Col>
            <Col size={50} style={styles.image}>
                <img src={require('../assets/images/Beer.svg')} width="100"/>
            </Col>
        </Row>

        <Row style={styles.spacing}>
            <Col size={150}>
                <Text style={styles.nameText}>LOCATION</Text>
            </Col>
            <Col size={50} style={styles.image}>
                <img src={require('../assets/images/Pin.svg')} width="100"/>
            </Col>
        </Row>

        <Row style={styles.spacing}>
            <Col size={150}>
                <Text style={styles.nameText}>GUEST LIST</Text>
            </Col>
            <Col size={50} style={styles.image}>
                <img src={require('../assets/images/Person.svg')} width="100"/>
            </Col>
        </Row>

        <Row style={styles.spacing} onPress={props.navigation.navigate('Share',{id: partyId})}>
            <Col size={150} style={styles.addCategory}>
                <Text style={[styles.nameText, styles.addCategoryText]}>+ ADD CATEGORY</Text>
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
        marginTop:'8%',
        width: '80%',
        borderRadius: 30,
        boxShadow: '4px 4px 10px #23242A, -4px -4px 10px #3B3D44',
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
        fontSize:25,
        color: '#fff', 
        textAlign: 'left',
        paddingTop: '50px',
        paddingLeft: '30px',
        fontWeight: 'bold',
    },
    image:{
        paddingTop: '20px',
    }
});
