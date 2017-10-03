import React from 'react';
import {
StyleSheet
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  usericon:{
    '@media ios': {
      marginLeft: 15
    },
    '@media android': {
      marginLeft: 10,
      marginTop: 10
    }
 },
  rightMenu : {
    '@media ios': {
     marginRight:20,
     marginTop:10
   },
   '@media android': {
     marginRight: 20,
     marginTop: 15
   }
  }
});

module.exports = styles;
