// import node modules
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
// import project files
import Button from '../Button';
import { actionGetDevices} from '../../constants/actionRoutes';
import styles from '../styles/drawer/rightDrawer';
// export right drawer
export default ({_handleNavigate})=> (
    <View style={styles.container}>
         <Text style={styles.title}>Devices</Text>
         <Text style={styles.title}>Blocks</Text>
    </View>
);
