// All app themes, fonts will go here

//font Families
import { Platform } from 'react-native';
var    mediumFont   = 'NHaasGroteskDSPro-65Md'
var    regularFont  = 'NHaasGroteskDSPro-55Rg'
var    liteFont     = 'NHaasGroteskDSPro-45lt'
var    platFormFont = 'Roboto'

if(Platform.OS === 'ios'){
    platFormFont = 'AvenirNext-Bold'
}

var color={
      color1:'#FFFFFF' //pure white
};

export default {
  //common properties
  // layout
  deviceHeight     : '100%',
  deviceWidth      : '100%',
  inputTextFontSize: 0.3,
  // font
  appBackgroundColor: color.color1,
  fontSize: 15,

  fontFamily: {
    mediumFont   : mediumFont,
    regularFont  : regularFont,
    liteFont     : liteFont
  },

  screens:{
	    login:{
	      // All fonts properties for text
	      fontFamily   : { signInReg: mediumFont},
	      fontSize    : { signInReg: 15},
	      fontColor   : { signInReg: color.color1},
	      backgroundColor : { bg: color.color10 }
	    }
  }
}
