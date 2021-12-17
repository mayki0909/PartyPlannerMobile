import * as React from 'react';
import { SafeAreaView,ScrollView,View,Text,StyleSheet,Image } from 'react-native';
import { Col, Row } from "react-native-easy-grid";

import {getPartyById} from '../services/ppRest';
import {Party, Category, Item, CategoryBudget} from '../models';

interface PartyProps{
  navigation: any;
  route: any;
}

export default function CalculateScreen(props: PartyProps) {

    
    const partyId = props.route.params.id;
    const [party, setParty] = React.useState<Party>()
    const [guests, setGuests] = React.useState(0)
    const [categoryBudget, setCategoryBudget] = React.useState<CategoryBudget[]>([])
    const [totalBudget,setTotalBudget] = React.useState(0);
    const [perPerson, setPerperson] = React.useState('0')
    
    async function getPartyData() {

        const response:Party = await getPartyById(partyId)

        if (response){
            setParty(response)
            setGuests(response.guests.length)

            const categories:Category[] = response.categories
            let temArr:CategoryBudget[]=[]
            let budget:number=0;

            categories.forEach((category:Category) => {
                let sum: number = 0;

                category.items.forEach((item:Item) =>{
                    if(item.price && item.quantity)
                        sum+= Number(item.price) * Number(item.quantity)

                })
                const name = category.name;
                temArr.push({name,sum})
                budget+=sum;
            });
            setTotalBudget(budget) 
            setCategoryBudget(temArr)
            if(Number(party?.info.budget) > 0) setTotalBudget(totalBudget + Number(party?.info.budget))
        }
    }

    React.useEffect(() => {
        getPartyData()
        setPerperson((guests > 0? (totalBudget / guests).toFixed(2) : '0'))
    }, []);

    React.useEffect(() => {
        setPerperson((guests > 0? (totalBudget / guests).toFixed(2) : '0'))
    }, [totalBudget]);

    return (
        <SafeAreaView style={styles.page}>
            <ScrollView style={styles.container}>
                    <Text style={styles.text}>PLAN FOR:</Text>
                    <Text style={styles.title}>{party?.info.name} party</Text>
                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1,
                        }}
                    />
                    <Row style={styles.spacing}>
                        <Col size={130} style={{justifyContent: 'center'}}>
                            <Text style={styles.nameText}>
                                {console.log(party?.info.budget)}
                                Place 
                                <Text style={styles.price}> {party?.info.budget}€</Text>
                            </Text>
                        </Col>
                        <Col size={30} style={{justifyContent: 'center'}}>
                            <Image source={require('../assets/images/Pin.png')} style={{flex: 1, width: 100, resizeMode: 'contain'}}/>
                        </Col>
                    </Row>
                    {categoryBudget.map((category,key)=>{
                        return(
                            <Row style={styles.spacing} key={key}>
                                <Col size={130} style={{justifyContent: 'center'}}>
                                    <Text style={styles.nameText}>{category.name}
                                        <Text style={styles.price}> {category.sum}€</Text>
                                    </Text>
                                </Col>
                                <Col size={30} style={{justifyContent: 'center'}}>
                                    <Image source={require('../assets/images/Beer.png')} style={{flex: 1, width: 100, resizeMode: 'contain'}}/>
                                </Col>
                            </Row>
                        )
                    })}
                    <Row style={styles.spacing}>
                        <Col size={130} style={{justifyContent: 'center'}}>
                            <Text style={styles.nameText}>People invited 
                                <Text style={styles.price}> {guests} </Text>
                            </Text>
                        </Col>
                        <Col size={30} style={{justifyContent: 'center'}}>
                            <Image source={require('../assets/images/Person.png')} style={{flex: 1, width: 100, resizeMode: 'contain'}}/>
                        </Col>
                    </Row>
            </ScrollView>

            <View style={styles.totalContainer}>
                    <Text style={styles.totalTitle}>TOTAL</Text>
                    <Text style={styles.total}>TOTAL {totalBudget}€</Text>
                    <Text style={styles.total}>GUESTS {guests}</Text>
                    <Text style={styles.total}>PER PERSON {perPerson}€</Text>
            </View>
            
        </SafeAreaView>
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
