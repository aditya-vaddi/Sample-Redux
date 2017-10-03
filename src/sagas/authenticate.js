// import node modules
import { takeEvery, takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
// import project files
import  * as actionTypes from '../constants/actionTypes'
import { actionSignInFailureRoute, actionSignInSuccessRoute } from '../constants/actionRoutes';
import { authenticateUSer as _auth } from '../apis/userAuth';

function* runAuth(action) {

    try {
          const response = yield call(_auth, action);
          yield put({
              type: actionTypes.SIGNIN_SUCCESS_ROUTE,
              route: {
                  key: 'home',
                  title: 'Search Accounts'
              },
              payload: {
                 authSuccessResponse: response
              }
          });
    }
    catch (error) {
          yield put({
              type: actionTypes.SIGNIN_ERROR_ROUTE,
              route: {
                  key: 'signInFailure',
                  title: 'SIGIN FAILURE'
              },
              payload: {
                  error,
                  authErrorResponse: response
              }
          });
    }
}

export function* authenticate() {
    yield* takeEvery(actionTypes.SIGN_IN, runAuth);
}
