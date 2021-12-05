import * as React from 'react';
import { SafeAreaView,ScrollView,View,Text,StyleSheet } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import {Party} from '../models';
import style from '../components/style';
import {getAllParties} from '../services/ppRest';

interface LandingProps{
  navigation: any;
}

export default function LandingScreen(props: LandingProps) {
  const [parties, setParties] = React.useState<Party[]>();

  const getParties = async () => {
    const data = await getAllParties()
    setParties(data)
  }

  React.useEffect(() => {
    getParties();
  },[]);

  return (
    <SafeAreaView style={styles.container}>
  
        <View style={{backgroundColor: 'transparent'}} onTouchStart={async()=>{}}>
          <Text style={[style.btnBig, styles.btnBigBlue]}>+ CREATE PARTY</Text>
        </View>
        <ScrollView style={[style.content, styles.spacing]}>
          <Text style={styles.heading}>PARTY ARCHIVE</Text>
          <Grid>
              {parties?.map((party,key)=>{
                return(
                  <Row style={styles.spacing}>
                    <Col size={75}>
                      <Text style={styles.nameText}>{party.info.name}</Text>
                      <Text style={styles.dateText}>{party.info.dateFrom}</Text>
                    </Col>
                    <Col size={25} onPress={()=>{props.navigation.navigate('Party',{id:party.id})}}>
                      <img src={require('../assets/images/go.svg')} alt="Go to" />
                    </Col>
                  </Row>
                )
              })}
            </Grid>  
        </ScrollView>
 
    </SafeAreaView>
 
  );
}

const styles = StyleSheet.create({
    container:{
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      height:'80%',
    },
    btnBigBlue:{
      color: "#00ffff",
    },
    heading:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 250,
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    nameText:{
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    dateText:{
      color: '#fff',
      fontSize: 14,
    },
    goButton:{
      backgroundColor: "#00ffff",
      borderRadius: 120,
      width: 30,
      fontSize: 20,
      fontWeight: 'bold',
    },
    spacing:{
      marginTop:'20px',
    },
});
