// import node modules
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
// import project files
//import { actionLoginRoute } from '../constants/actionRoutes';
import styles from './styles/searchAccounts';
import Button from './Button';
// export home component
export default ({_handleNavigate}) => (
      <View style={styles.container}>
              <Text style={styles.title}>Search Accounts</Text>
              <TextInput
                style={styles.textEdit}
                placeholder     = ' Enter account number or name'
                autoCapitalize  = 'none'
                autoCorrect     = {false}
              />
              <Button
//                onPress={() => _handleNavigate(actionLoginRoute)}
                label='Search'
              />
      </View>
);
