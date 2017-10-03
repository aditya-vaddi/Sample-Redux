import * as actionTypes from '../constants/actionTypes';

export const actionSignInRoute = {
    index: 0,
    key: 'root',
    routes: [{
        key: 'signin',
        title: 'Sign In'
    }]
};

export const  actionHomeRoute = {
    type: 'home',
    route: {
        key: 'home',
        title: 'Search Accounts'
    }
};

export const actionShowMap = {
    type: 'MapHome',
    route: {
      key: 'MapHome',
      title: 'DESIGN'
    }
};

export const actionGetDevices = {
    type: 'getDevices',
    route: {
      key: 'getDevices',
      title: 'DEVICES'
    }
};
