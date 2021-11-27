import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  body:{
    backgroundColor: '#303138',
    color: 'white',
    fontFamily: 'Raleway',
  },
  content: {
    margin: '21px 21px 21px 21px',
    backgroundColor: '#303138',
    borderRadius: 30,
    padding: '10px',
    boxShadow: '4px 4px 10px #23242A, -4px -4px 10px #3B3D44',
  },
  btnSmall: {
    width: '50px',
    height: '50px',
    backgroundColor: '#303138',
    color: '#fff',
    fontSize: '8px',
    borderRadius: 20,
    boxShadow: '2px 2px 4px #23242A, -2px -2px 4px #3B3D44',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnMedium: {
    width: '120px',
    height: '40px',
    backgroundColor: '#303138',
    color: '#fff',
    fontRize: '12px',
    borderRadius: 30,
    boxShadow: '3px 3px 6px #23242A, -3px -3px 6px #3B3D44',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    flexWrap: 'wrap' 
  },
  btnBig: {
    width: '250px',
    height: '60px',
    backgroundColor: '#303138',
    color: '#fff',
    fontSize: '25px',
    borderRadius: 30,
    boxShadow: '4px 4px 10px #23242A, -4px -4px 10px #3B3D44',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

});