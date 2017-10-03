
import {
  View,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';
import React from 'react';
// Styles
import styles from './styles/list-row/deviceRow';
// Images
var imag = require('../../icons/react.png');
var trash = require('../../icons/delete.png');
var edit = require('../../icons/edit.png');

const DeviceRow = (props)=>{
    return(
      <View style={styles.container}>
          <View style={styles.row}>
            <Image source={imag}  />
            <Text style={styles.devicename}>{props.data.name}</Text>
            <Image source={edit} style={styles.cellImage} />
            <Image source={trash} style={styles.cellImage1} />
          </View>
          <View style={styles.row1}>
            <Text style={styles.texttitle}>Serial Number</Text>
            <Text style={styles.texttitle}>Latitude</Text>
            <Text style={styles.texttitle}>Longitude</Text>
          </View>
          <View style={styles.row1}>
            <Text style={styles.textdescription}>{props.data.serialNumber}</Text>
            <Text style={styles.textdescription}>{props.data.latitude}</Text>
            <Text style={styles.textdescription}>{props.data.longitude}</Text>
          </View>
            <View style={styles.line}/>
      </View>
    );
}

export default DeviceRow;
