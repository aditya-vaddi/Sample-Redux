import Immutable from 'immutable';
//Action types
import * as actionTypes from '../constants/actionTypes';

function listReducer (state = {}, action) { // do not assign routes array to state

  switch (action.type) {
    case actionTypes.HEADER_CLICK:
    state = Immutable
                .fromJS(state)
                .set('sectionID', action.sectionID)
                .set('expand', !action.expand)
                .toJS();
      return state;

    default:
      return state;
  }
}

export default listReducer;
