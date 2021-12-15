import * as React from 'react';
import { SafeAreaView,ScrollView,View,Text,StyleSheet,Image,TextInput} from 'react-native';
import { Col, Row} from "react-native-easy-grid";

import {getCategoryById,postCategory, putCategory} from '../services/ppRest';
import {Category,Item} from '../models';
import style from '../components/style';

interface ItemsList{
  navigation: any;
  route: any;
}

export default function ItemsScreen(props: ItemsList) {

    const partyId = props.route.params.id;
    const CategoryId = props.route.params.categoryId;
    
    const [category, setCategory] = React.useState<Category>();
    const [itemList, setItemList] = React.useState<Item[]>([]);

    const [itemName, setItemname] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price,setPrice] = React.useState("");
    const [quantity, setQuantity] = React.useState(0);
    const [errorMessage, setErrorMessage] = React.useState("");

    async function getPartyData() {
        const response = await getCategoryById(partyId,CategoryId)
        if (response){
            setCategory(response)
            setItemList(response.items)
        }
    }

    async function createItem(){
        let newItem : Item ={
            'itemId':0,
            'name': itemName,
            'description': description,
            'price': Number(price),
            'quantity': quantity
        }
        setItemList([...itemList,newItem])
        setItemname('')
        setDescription('')
        setPrice('0.00 €')
        setQuantity(0)
    }

    async function deleteItem(name:String) {

        setItemList(itemList.filter(item => item.name !== name));
    }

    async function saveToDb(){
        if(category){
            console.log(category,itemList)
            let categoryLocal:Category = category;
            categoryLocal.items=itemList
            await postCategory(partyId,categoryLocal)
        }
    }

    function renderItem(item:Item){
        return(
            <View style={styles.spacing}>
                    <Row>
                        <Col>
                            <Text style={styles.inputField} >
                                {item.name}
                            </Text>
                        </Col>
                        <Col>
                            <Text style={styles.inputField} >
                                {item.price} €
                            </Text>
                        </Col>
                    </Row>
                    <Row>
                        <Text style={styles.inputField} >
                            {item.description}
                        </Text>
                    </Row>
                    <Row>
                        <Col size={20}></Col>
                        <Col size={40}>
            
                            <Text style={styles.label}>Qty: {item.quantity}</Text>
                        </Col>
                        <Col size={20}>
                            
                        </Col>
                        <Col size={100}>
                            <View style={[style.btnMedium,{borderColor: "#db00ff"}]}>
                                <Text style={styles.button} onPress={()=>{deleteItem(item.name)}}>Delete</Text>
                            </View>
                        </Col>
                    </Row>
                </View>
        )
    }

    React.useEffect(() => {
        getPartyData()
    }, []);

    React.useEffect(() => {
        saveToDb();
    }, [itemList]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.createPartyContainer}>
                <View style={styles.spacing}>
                    <Row>
                        <Col>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Item"
                                placeholderTextColor="#E6E6E6"
                                value={itemName} 
                                onChangeText={text => {setItemname(text)}}
                            />
                        </Col>
                        <Col>
                            <TextInput
                                style={styles.inputField}
                                placeholder="0.00 €"
                                placeholderTextColor="#E6E6E6" 
                                keyboardType={'numeric'}
                                value={price}
                                onChangeText={text => {setPrice(text)}}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Description"
                            placeholderTextColor="#E6E6E6" 
                            value={description}
                            onChangeText={text => {setDescription(text)}}
                        />
                    </Row>
                    <Row>
                        <Col size={20}></Col>
                        <Col size={20}>
                            <Text style={styles.label} onPress={ () => {if (quantity > 0) setQuantity(quantity - 1)} }>-</Text>
                        </Col>
                        <Col size={20}>
                            <Text style={styles.label}>{quantity}</Text>
                        </Col>
                        <Col size={20}>
                            <Text style={styles.label} onPress={ () => {setQuantity(quantity + 1)} }>+</Text>
                        </Col>
                        <Col size={100}>
                            <View style={[style.btnMedium,{borderColor: "#00ffff"}]}>
                                <Text style={styles.button} onPress={createItem}>Create</Text>
                            </View>
                        </Col>
                    </Row>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
                {itemList.map((item:Item,key)=>{
                    return(
                        renderItem(item)
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
    inputField:{
        fontSize: 20,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#3B3D44",
        color: '#fff',
        height: 40,
        width: '100%',
        paddingLeft: 10
    },
});
