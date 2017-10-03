import React from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import Button from './Button';
import { connect } from 'react-redux';
import styles from './styles/signIn';
//routes
import * as actionRoutes from '../constants/actionRoutes';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username : '',
            password : ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode='contain' source={require('../../icons/app-logo.png')} style={{width:150,height:153,marginBottom:30}} />
                <TextInput
                    style={styles.textEdit}
                    placeholder     = ' Username'
                    autoCapitalize  = 'none'
                    autoCorrect     = {false}
                    value           = ''
                    onChangeText    = {(text)=>{this.setState({username:text.trim()})}}
                />
                <TextInput
                    ref = 'someref'
                    secureTextEntry = {true}
                    style={styles.textEdit}
                    placeholder=' Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value = ''
                    onChangeText = {(text)=>{this.setState({password:text.trim()})}}
                />
                <Button onPress={()=>{ const signin = {
                   type: 'signInSuccess',
                   route: {
                     key: 'home',
                     title: 'Search Accounts'
                   },
                   data:{
                     'username':'',
                     'password':''
                   }
                 }
                 this.props._handleNavigate(signin)}} label='Sign In'/>
                <Button onPress={() => this.props._handleNavigate(actionRoutes.actionShowMap)} label='Go To Map' />
            </View>
        );
    }
}

export default SignIn;
