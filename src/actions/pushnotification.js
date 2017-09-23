import { createAction } from 'redux-actions';
import * as action from '../api/api';
import * as constant from '../constants/pushnotification';


function pushSuccess(data) {
  return createAction(constant.PUSH_REQUEST)(data);
}
function isSuccess(data) {
  return createAction(constant.PUSH_SUCCESS)(data);
}
function pushError(data) {
  return createAction(constant.PUSH_ERROR)(data);
}
function isError(data) {
  return createAction(constant.PUSH_ERRORS)(data);
}
export function sendNotification(body, type) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      action.sendData(body, type).then((val) => {
        reslove(val);
        dispatch(pushSuccess(val.headers));
        dispatch(isSuccess(true));
      }, (error) => {
        dispatch(isError(true));
        dispatch(pushError(error));
      },
    );
    });
  };
}
export function seenMsg(userid, key) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      action.userStatusUpdate(userid, key);
    });
  };
}
