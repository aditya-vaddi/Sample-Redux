// import node modules
import React,{ Component } from 'react';
import {
  BackAndroid,
  NavigationExperimental,
  TouchableHighlight,
  Image,
  StyleSheet,
  View,
  Platform
} from 'react-native';
import Drawer from 'react-native-drawer';
// import project files
import { actionSignInRoute } from '../constants/actionRoutes';
import styles from './styles/navigation';
import SearchAccounts from './SearchAccounts';
import SignIn from './SignIn';
import RightDrawer from './drawer/RightDrawer';
import MapHome from './Map/MapHome'
// global initialization
const {
  Card: NavigationCard,
  StateUtils: NavigationStateUtils,
  Header: NavigationHeader,
  Transitioner: NavigationTransitioner,
} = NavigationExperimental;

class NavigationRoot extends Component {

  constructor (props) {
    super(props)
    this._renderScene = this._renderScene.bind(this)
    this._handleBackAction = this._handleBackAction.bind(this)
    this._handleBackAction = this._handleBackAction.bind(this)
    this._renderTitleComponent = this._renderTitleComponent.bind(this);
    this._renderLeftComponent = this._renderLeftComponent.bind(this);
    this._renderRightComponent = this._renderRightComponent.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
  }

  _renderScene (props) {

        const { route } = props.scene;
        var navigationMainRef = this.refs.navigator;

        if (route.key ===  'home') {
            return <SearchAccounts _handleNavigate={this._handleNavigate.bind(this)} />
        }
        if(route.key === 'RightMenu') {
            return(<RightDrawer
                  _handleNavigate={this._handleNavigate.bind(this)}
                  _goBack={this._handleBackAction.bind(this)}
            />);
        }
        if (route.key === 'signin') {
            return <SignIn _handleNavigate={this._handleNavigate.bind(this)}/>;
        }
        if (route.key === 'MapHome') {
            return <MapHome _handleNavigate={this._handleNavigate.bind(this)}/>;
        }
  }

  _handleBackAction () {
        if (this.props.navigation.index === 0) {
          return false;
        }
        this.props.popRoute();
        return true;
  }

  _handleNavigate(action) {

      switch (action && action.type) {
          case 'push':
              this.props.pushRoute(action.route);
              return true;
          case 'pop':
              return this._handleBackAction();
          case 'signInSuccess':
              this.props.signInSuccess(action.route,action.data);
              return true;
          case 'MapHome':
              this.props.MapHome(action.route,action.data);
              return true;              
          default:
              return false;
      }
  }

  _renderTitleComponent= (props) => {
      const title = props.scene.route.title;
      return <NavigationHeader.Title>{title}</NavigationHeader.Title>;
  }

  _renderRightComponent= (props) => {
      if(props.scene.route.key === 'signin') {
            return <View />;
      }
      return <TouchableHighlight underlayColor='gray' style={styles.rightMenu} onPress={()=> this.openDrawer() }>
                <Image resizeMode='contain' source={require('../../icons/menu.png')} />
             </TouchableHighlight>;
  }

  _renderLeftComponent= (props) => {
        if(props.scene.route.key === 'signin') {
              return <View />;
        }
        return (
            <TouchableHighlight
                underlayColor='gray'
                style={styles.usericon}
                onPress={() => this._handleBackAction(this)}
            >
                <Image
                    resizeMode='contain'
                    source={
                        (props.scene.route.key === 'signin') ?
                        require('../../icons/user-login.png') :
                        require('../../icons/back-arrow.png')
                    }
                />
            </TouchableHighlight>
        );
  }

  _renderHeader= (props) => {
      return (
          !isModalVisible ?
          <NavigationHeader {...props} ref='navigatorHeaderRef' visible={false}
                 renderTitleComponent={ this._renderTitleComponent }
                 renderRightComponent={ this._renderRightComponent }
                 renderLeftComponent={ this._renderLeftComponent }
          />
          : null
      );
      return null;
  }

  openDrawer() {
      this.refs.drawerRef.open();
  }

  closeDrawer() {
      this.refs.drawerRef.close();
  }

  _closeRightDrawer(action) {
      this.refs.drawerRef.close();
      this._handleNavigate(action);
  }

  render() {

    const RightMenuBar =  (<RightDrawer _handleNavigate={ this._closeRightDrawer.bind(this)} closeDrawer={this.closeDrawer.bind(this)}/>);
    var drawerProperties  = {
      content: RightMenuBar,
      ref: 'drawerRef', //this ref's are used to open and close the drawer from other components (drawerRef_right and drawerRef_left)
      openDrawerOffset: 0.2,
      panCloseMask: 0, // Device width Can be Used instead
      acceptTap:true,
      panOpenMask: Platform.OS =='ios' ? 0 : 50, // Because of this issue: https://github.com/root-two/react-native-drawer/issues/65 (Android, but figured it was transferable; no dice)
      type: 'overlay',
      side: 'right',
      onClose:() => {
        this.refs.drawerRef.close();
      }
    }
    let { navigation,navigationState } = this.props;

    return(
      <Drawer {...drawerProperties}>

        <NavigationTransitioner ref='navigator' navigationState={navigation === undefined?  navigationState :navigation }
         style={{flex:1}}
         render={props => (
           <View style={{flex:1}}>

              <NavigationCard  {...props} ref='navigationCardRef' onNavigate={this._handleNavigate}
               renderScene={this._renderScene} key={props.scene.route.key}
                  />
              <NavigationHeader {...props} ref='navigatorHeaderRef' style={{ backgroundColor: 'lightblue',height:60}}
                     renderTitleComponent={ this._renderTitleComponent }
                     renderRightComponent={ this._renderRightComponent }
                     renderLeftComponent={ this._renderLeftComponent } />
          </View>
        )}
        />
      </Drawer>
    );
  } // return function end
} // NavigationRoot Component end

export default NavigationRoot;
