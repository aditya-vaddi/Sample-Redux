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
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
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
  }
})

module.exports = styles;
