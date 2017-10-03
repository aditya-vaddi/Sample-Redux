/**
 * Created by ashwin sampath on 10/28/16.
 */
import { takeEvery,takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {
    GET_DEVICES,
    GET_DEVICES_SUCCESS,
    GET_DEVICES_FAIL
} from '../constants/actionTypes';
import {
  actionSignInFailureRoute,
  actionSignInSuccessRoute
} from '../constants/actionRoutes';
import { getDeviceList as device } from '../apis/devices';

function* deviceList(action) {
        try {
        const response = yield call(device, action);
        if(action.navigateFrom === 'Login')
            yield put({
                type: GET_DEVICES_SUCCESS,
                route: {
                    key: 'devicesSuccess',
                    title: 'DEVICES SUCCESS'
                },
                payload: {
                   devicesSuccessResponse: response
                }
            });
        else
            yield put({
                type: GET_DEVICES_SUCCESS,
                route: {
                  key: 'list',
                  title: 'List View'
                },
                payload: {
                   devicesSuccessResponse: response
                }
            });
    }
    catch (error) {
        yield put({
            type: GET_DEVICES_FAIL,
            route: {
                key: 'devicesFail',
                title: 'DEVICES FAILURE'
            },
            payload: {
                error,
                devicesErrorResponse: response,
            }
        });
    }
}

export function* listOfDevices() {
    yield* takeEvery(GET_DEVICES, deviceList);
}
