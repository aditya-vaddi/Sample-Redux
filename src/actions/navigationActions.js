import  * as actionTypes from '../constants/actionTypes';

//pushing to other screen
export function push (route) {
  return {
    type: actionTypes.PUSH_ROUTE,
    route
  }
}

export function pop () {
  return {
    type: actionTypes.POP_ROUTE
  }
}

export function signInSuccess(route, data) {
  return {
    type: actionTypes.SIGN_IN,
    route, data
  }
}

//To get the Devices froom the AGtech Server
export function getDevices(route, navigateFrom) {
  return {
    type: actionTypes.GET_DEVICES,
    route, navigateFrom
  }
}

/////////To get Map
export function MapHome(route) {
  return {
    type: actionTypes.DISPLAY_MAP,
    route
  }
}

export function onHeaderClickAction(sectionID, expand) {
  return {
    type: actionTypes.HEADER_CLICK,
    sectionID,
    expand
  };
}
