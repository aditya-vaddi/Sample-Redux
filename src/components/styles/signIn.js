import React from 'react';
import {
StyleSheet
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build(styles);

const styles = EStyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 22,
    textAlign: 'center'
  },
  container: {
    paddingTop: 60
  },
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tan',
    padding: 20,
  },
  textEdit: {
    height: 40,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop:5,
    marginLeft:5,
    '@media android':{
      width:'80%'
    }
  },
  button: {
    height: 70,
    backgroundColor: '#22a3ed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: 'white'
  }
});


module.exports = styles;
