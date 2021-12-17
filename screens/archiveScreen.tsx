import * as React from 'react';
import { SafeAreaView,ScrollView,View,Text,StyleSheet,Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import {Party} from '../models';
import style from '../components/style';
import {getAllParties} from '../services/ppRest';
import moment from 'moment';

interface ArchiveProps{
  navigation: any;
}

export default function ArchiveScreen(props: ArchiveProps) {
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
        <View style={style.btnBig} onTouchStart={async()=>{props.navigation.navigate('CreateParty')}}>
          <Text style={styles.blueText}>+ CREATE PARTY</Text>
        </View>
        <ScrollView style={[style.content, styles.spacing]}>
          <Text style={styles.heading}>PARTY ARCHIVE</Text>
          <Grid>
            
              {parties?.map((party,key)=>{
                return(
                  <Row style={styles.spacing} key={key}>
                    <Col size={75}>
                      <Text style={styles.nameText}>{party.info.name}</Text>
                      <Text style={styles.dateText}>{moment(party.info.dateFrom).format('lll')}</Text>
                    </Col>
                    <Col size={15} onPress={()=>{props.navigation.navigate('Party',{id:party.id})}}>
                      <Image 
                        source={require('../assets/images/go.png')} 
                        style={{ width: 40, height: 40 }}
                      />
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
      height:'90%',
      marginTop: 40
    },
    blueText:{
      color: "#00ffff",
      fontWeight: 'bold',
      fontSize: 20
    },
    heading:{
      width: 250,
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
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
      marginTop:20,
    },
});
