import * as React from 'react';
import { SafeAreaView,ScrollView,View,Text,StyleSheet,Image,TextInput} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import {getPartyById,putGuest,deleteGuest,postGuestList} from '../services/ppRest';
import {Party,Guest} from '../models';
import style from '../components/style';

interface GuestsProps{
  navigation: any;
  route: any;
}

export default function GuestsScreen(props: GuestsProps) {

    const partyId = props.route.params.id;
    const [guests, setGuests] = React.useState<Guest[]>([]);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [meat, setMeat] = React.useState(false);
    const [vegan, setVegan] = React.useState(false);
    const [beer, setBeer] = React.useState(false);
    const [paid, setPaid] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    async function getPartyData() {
        const response = await getPartyById(partyId)
        if (response){
            console.log(response.guests)
            setGuests(response.guests)
        }
    }

    async function createGuest(){
        if(name != "" && email != ""){
            let newGuest: Guest = {
                'guestId': undefined,
                'name': name,
                'surname':'',
                'email': email,
                'phone': '',
                'host': false,
                'nonDrinker': beer,
                'paid':paid,
                'vegan': vegan,
                'vegetarian': meat,
            }
            const response = await putGuest(partyId,newGuest)
            setGuests([...guests,response])

        }else{
            setErrorMessage("Name and email are empty!")
        }
    }

    async function deleteGuestt(id:number|undefined){
        if(id){
            await deleteGuest(partyId,id)
            await getPartyData()
        }
    }

    async function updateGuestList(guest:Guest,type:String){
        if(type==='vegetarian')guest.vegetarian = !guest.vegetarian
        if(type==='vegan')guest.vegan = !guest.vegan
        if(type==='nonDrinker')guest.nonDrinker = !guest.nonDrinker
        if(type==='paid')guest.paid = !guest.paid

        const newGuests = [...guests,guest]
        const response = await postGuestList(partyId,newGuests)
        console.log(response) 
        setGuests(newGuests)
    }

    const renderImageMeat = (variable: Boolean) => {
        if (variable) {
            return require(`../assets/images/Meat_yes.png`);
        } else {
            return require(`../assets/images/Meat_no.png`);
        }
    }

    const renderImageVegan = (variable: Boolean) => {
        if (variable) {
            return require(`../assets/images/vegan_yes.png`);
        } else {
            return require(`../assets/images/vegan_no.png`);
        }
    }

    const renderImageBeer = (variable: Boolean) => {
        if (variable) {
            return require(`../assets/images/drinker_yes.png`);
        } else {
            return require(`../assets/images/drinker_no.png`);
        }
    }

    const renderImagePaid = (variable: Boolean) => {
        if (variable) {
            return require(`../assets/images/Paid_yes.png`);
        } else {
            return require(`../assets/images/Paid_no.png`);
        }
    }

    React.useEffect(() => {
        getPartyData()
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.createPartyContainer}>
                <View style={styles.spacing}>
                    <Text style={styles.label}>Add person</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Name Surname"
                        placeholderTextColor="#E6E6E6" 
                        autoFocus={true}
                        value={name}
                        onChangeText={text => {setName(text)}}
                    />
                    <TextInput
                        style={styles.inputField}
                        placeholder="name.surname@gmail.com"
                        placeholderTextColor="#E6E6E6" 
                        value={email}
                        onChangeText={text => {setEmail(text)}}
                    />
                  
                    <Row >
                        <Col size={15} onPress={()=>{setMeat(!meat)}}>
                            <Image source={renderImageMeat(meat)} style={{flex: 1, width: 30, resizeMode: 'contain'}}/>
                            <Text style={styles.smallLabel}>Meat</Text>      
                        </Col>
                        <Col size={15} onPress={()=>{setVegan(!vegan)}}>
                            <Image source={renderImageVegan(vegan)} style={{flex: 1, width: 30, resizeMode: 'contain'}}/>
                            <Text style={styles.smallLabel}>Vegan</Text>  
                        </Col>
                        <Col size={15} onPress={()=>{setBeer(!beer)}}>
                            <Image source={renderImageBeer(beer)} style={{flex: 1, width: 30, resizeMode: 'contain'}}/>
                            <Text style={styles.smallLabel}>Alcohol</Text> 
                        </Col>
                        <Col size={15} onPress={()=>{setPaid(!paid)}}>
                            <Image source={renderImagePaid(paid)} style={{flex: 1, width: 30, resizeMode: 'contain'}}/>
                            <Text style={styles.smallLabel}>Paid</Text> 
                        </Col>
                        <Col size={60}>
                            <View style={[style.btnMedium,{borderColor: "#00ffff",marginTop: 20}]}>
                                <Text style={styles.button} onPress={createGuest}>Create</Text>
                            </View>
                        </Col>
                    </Row>

                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                       
                </View>
                {guests?.map((guest:Guest,key)=>{
                    return(
                        <Grid style={styles.spacing} key={key} >
                            <Row>
                                <Col size={100}>
                                    <Text style={styles.nameText}>{guest.name}</Text>
                                </Col>
                                <Col size={20} onPress={ ()=>{deleteGuestt(guest.guestId)}}>
                                    <Image source={require('../assets/images/X.png')} style={{flex:1, width: 30, resizeMode: 'contain'}}/>
                                </Col>
                            </Row>

                            <Row style={{marginTop:5}}>
                                <Col>
                                    <Text style={styles.nameText}>{guest.email}</Text>
                                </Col>
                            </Row>
                            
                            <Row style={{marginTop:20,marginLeft: 20}}>
                                <Col size={30} onPress={async()=>{updateGuestList(guest,'vegetarian')}}>
                                    <Image source={renderImageMeat(guest.vegetarian)} style={{flex: 1, width: 30, resizeMode: 'contain'}}/>      
                                </Col>
                                <Col size={30} onPress={async()=>{updateGuestList(guest,'vegan')}}>
                                    <Image source={renderImageVegan(guest.vegan)} style={{flex: 1, width: 30, resizeMode: 'contain'}}/>
                                </Col>
                                <Col size={30} onPress={async()=>{updateGuestList(guest,'nonDrinker')}}>
                                    <Image source={renderImageBeer(guest.nonDrinker)} style={{flex: 1, width: 30, resizeMode: 'contain'}}/>
                                </Col>
                                <Col size={30} onPress={async()=>{updateGuestList(guest,'paid')}}>
                                    <Image source={renderImagePaid(guest.paid)} style={{flex: 1, width: 30, resizeMode: 'contain'}}/>
                                </Col>
                            </Row>
                            
                        </Grid>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%',
    },
    spacing:{
        marginTop: 20,
        padding: 10,
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
        paddingLeft: 20,
        fontWeight: 'bold',
        top: '40%',
    },
    createPartyContainer: {
        width: '80%',
        margin: 15,
      },
      button: {
        color: '#FFF',
        fontSize: 16,
      },
      errorMessage: {
        color: 'red', 
        fontSize: 16,
        marginTop: 10,
      },
      label:{
        fontSize: 16,
        color: '#fff',
        paddingBottom: 15,
        paddingTop: 20,
        textAlign: 'left',
    },
    smallLabel:{
        fontSize: 8,
        color: '#fff',
        textAlign: 'center',
    },
    inputField:{
        fontSize: 20,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#3B3D44",
        color: '#fff',
        height: 40,
        marginTop: 10,
        marginRight: 10,
        paddingLeft: 10

    },
});
