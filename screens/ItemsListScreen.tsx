import * as React from 'react';
import { SafeAreaView,ScrollView,View,Text,StyleSheet,Image,TextInput} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import {getCategoryList,putCategory,deleteCategory} from '../services/ppRest';
import {Party,Category} from '../models';
import style from '../components/style';

interface ItemsList{
  navigation: any;
  route: any;
}

export default function ItemsListScreen(props: ItemsList) {

    const partyId = props.route.params.id;
    const [items, setItems] = React.useState<Category[]>([]);
    const [categoryName, setCategoryName] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    async function getPartyData() {
        const response = await getCategoryList(partyId)
        if (response){
            setItems([...response.categories])
        }
    }

    async function createCategory() {
        if(categoryName != ''){
            let newCategory: Category = {
                'categoryId':0,
                'name':categoryName,
                'description':'',
                'items':[],
                'proposedTotal':0,
                'budgetPercentage':0
            }
            const response = await putCategory(partyId,newCategory);
            if (response){
                setItems([...items, response])
                setCategoryName('')
                setErrorMessage('')
            }
        } else{
            setErrorMessage('Category name is empty!')
        }
    }

    async function deleteCategoryHandler(key:Number) {
        await setItems(items.filter(item => item.categoryId !== key));
        await deleteCategory(partyId,key);
    }

    function navigateCategory(categoryId:Number){
        props.navigation.navigate('Items',{id:partyId,categoryId:categoryId})
    }

    React.useEffect(() => {
        getPartyData()
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.createPartyContainer}>
                <View style={styles.spacing}>
                    <Text style={styles.label}>Name your category:</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="CATEGORY"
                        placeholderTextColor="#E6E6E6" 
                        autoFocus={true}
                        value={categoryName}
                        onChangeText={text => {setCategoryName(text)}}
                    />
                    <View style={[style.btnMedium,{borderColor: "#00ffff",marginTop: 20}]}>
                        <Text style={styles.button} onPress={createCategory}>Create</Text>
                    </View>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
                {items?.map((category:Category,key)=>{
                    return(
                        <Row style={styles.spacing} key={key}>
                            <Col size={110} onPress={()=>{navigateCategory(category.categoryId)}}>
                                <Text style={styles.nameText}>{category.name}</Text>
                            </Col>
                            <Col size={70} onPress={()=>{navigateCategory(category.categoryId)}}>
                                <Image source={require('../assets/images/food_category.png')} style={{flex: 1, width: 100, resizeMode: 'contain'}}/>
                            </Col>
                            <Col size={20} onPress={async()=>{await deleteCategoryHandler(category.categoryId)}}>
                                <Image source={require('../assets/images/X.png')} style={{flex: 1, width: 30, resizeMode: 'contain'}}/>
                            </Col>
                        </Row>
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
        paddingRight: 20,
      },
      button: {
        color: '#FFF',
        fontSize: 16,
      },
      errorMessage: {
        color: 'red', 
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
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
        marginRight: 10,
        paddingLeft: 10
    },
});
