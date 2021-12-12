import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  body:{
    backgroundColor: '#303138',
    color: 'white',
    fontFamily: 'Raleway',
  },
  content: {
    margin: 21,
    backgroundColor: '#303138',
    borderRadius: 30,
    padding: 10,
    //boxShadow: '4px 4px 10px #23242A, -4px -4px 10px #3B3D44',
  },
  btnSmall: {
    width: 50,
    height: 50,
    backgroundColor: '#303138',
    color: '#fff',
    fontSize: 8,
    borderRadius: 20,
    //boxShadow: '2px 2px 4px #23242A, -2px -2px 4px #3B3D44',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnMedium: {
    width: 120,
    height: 40,
    margin: 10,
    backgroundColor: '#303138',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#3B3D44",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBig: {
    width: 250,
    height: 60,
    margin: 10,
    backgroundColor: '#303138',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#3B3D44",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryColor: {
    color: '#00ffff',
  }, 
  secondaryColor: {
    color: '#D300FF',
  },
  createPartyContainer: {
    width: '80%',
    height: '20%',
    margin: 10,
    backgroundColor: '#303138',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    borderRadius: 30,
    //boxShadow: '4px 4px 10px #23242A, -4px -4px 10px #3B3D44',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 30,
  }

});