import * as React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import style from '../components/style';
import {getAllParties} from '../services/ppRest';

interface LandingProps{
  navigation: any;
}

const consoleData = async () => {
  const data = await getAllParties()
  console.log(data);
}


export default function LandingScreen(props: LandingProps) {
  return (
    <Grid style={styles.container}>
        <Row style={{backgroundColor: 'transparent'}} onTouchStart={async()=>{await consoleData()}}>
            <Text style={[style.btnBig, styles.btnBigBlue]}>+ CREATE PARTY</Text>
        </Row>
        <Row style={{backgroundColor: 'transparent'}}>
            <Text style={style.btnBig}>PARTY ARCHIVE</Text>
        </Row>
        <Row>
          <Col>
            <Text>Gapy rojstni dan</Text>
            <Text>21.03.21</Text>
          </Col>
          <Col>
            <Text>{'>'}</Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>Gapy rojstni dan</Text>
            <Text>21.03.21</Text>
          </Col>
          <Col>
            <Text>{'>'}</Text>
          </Col>
        </Row>
    </Grid>
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
    }

    // btnBigBlue:{
    //   border:"2px solid #00ffff",
    //   shadowColor: "#00ffff",
    //   shadowOffset: {
    //     width: 4,
    //     height: 4,
    //   },
    //   shadowOpacity: 1,
    //   shadowRadius: 10,
    // }

});
