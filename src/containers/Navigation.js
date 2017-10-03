import { connect } from 'react-redux';
import NavigationComponent from '../components/Navigation';
import * as navigationActions from '../actions/navigationActions';

const makeMapStateToProps = (state) => { // state: not filtered yet

      const mapStateToProps = (state) => {
          return {
                navigation: state.navigationReducer,
                listOfDevices:state.deviceReducer
          };
      };
      return mapStateToProps; // state filtered by Selector
};

export default connect(
    makeMapStateToProps,
    {
      pushRoute: (route) => navigationActions.push(route),
      popRoute: () => navigationActions.pop(),
      singIn:(route)=> navigationActions.singIn(route),
      signInSuccess:(route,data)=> navigationActions.signInSuccess(route,data),
      getDevices:(route, navigateFrom) => navigationActions.getDevices(route, navigateFrom),
      MapHome:(route)=> navigationActions.MapHome(route)
    }
)(NavigationComponent);
