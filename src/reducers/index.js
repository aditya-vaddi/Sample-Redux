import { combineReducers } from 'redux'
import navigationReducer from './navigationReducer'
import deviceReducer from './deviceReducer'
import listReducer from './listReducer'

const applicationReducers = {
  navigationReducer,
  deviceReducer,
  listReducer
};

export default function createReducer() {
  return combineReducers(applicationReducers);
}
