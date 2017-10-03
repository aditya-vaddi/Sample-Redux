// import node modules
import { NavigationExperimental } from 'react-native';
import { fromJS } from 'immutable';
// import project files
import  * as actionTypes from '../constants/actionTypes';
import  { actionSignInRoute } from '../constants/actionRoutes';
// global initialization
const { StateUtils: NavigationStateUtils } = NavigationExperimental;
const initialState = actionSignInRoute;
// export navigation reducer pure function
export default (state = initialState, action) => {

      switch (action.type) {

            case actionTypes.PUSH_ROUTE:
                if (state.routes[state.index].key === (action.route && action.route.key))
                    return state;
                return NavigationStateUtils.push(state, action.route);

            case actionTypes.POP_ROUTE:
                if (state.index === 0 || state.routes.length === 1)
                    return state;
                return NavigationStateUtils.pop(state);

            case actionTypes.SIGNIN_SUCCESS_ROUTE:
                // return state.set('items', fromJS(action.payload.todos)).set('error', null);
                state.SignInpayload=action.payload.authSuccessResponse;
                return NavigationStateUtils.push(state, action.route);

            case actionTypes.SIGNIN_ERROR_ROUTE:
                state.SignInErrorpayload=action.payload.authErrorResponse;
                return NavigationStateUtils.push(state, action.route);

            case actionTypes.GET_DEVICES_SUCCESS:
                return NavigationStateUtils.push(state,action.route);
            //Map
            case actionTypes.DISPLAY_MAP:
                return NavigationStateUtils.push(state,action.route);

            default:
                return state;
      } // switch end
} // function end
