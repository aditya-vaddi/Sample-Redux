
import Immutable from 'immutable';
//Action types
import  * as actionTypes from '../constants/actionTypes';

export default (state = {}, action) => { // do not assign routes array to state

      switch (action.type) {

          case actionTypes.GET_DEVICES_SUCCESS:
            state = Immutable
                    .fromJS(state)
                    .set('devicesPayload', action.payload.devicesSuccessResponse)
                    .toJS();
            return state;

          case actionTypes.GET_DEVICES_FAIL:
            state = Immutable
                    .fromJS(state)
                    .set('errorMessage', action.payload.message)
                    .toJS();
            return state;

          default:
            return state;
      }
}
