import { createAction } from 'redux-actions';
import * as action from '../api/api';
import * as constant from '../constants/login';
import { isLoading } from './loader';

function loginSuccess(data) {
  return createAction(constant.LOGIN_USER_REQUEST)(data);
}
function isSuccess(data) {
  return createAction(constant.LOGIN_USER_SUCCESS)(data);
}
function isError(data) {
  return createAction(constant.LOGIN_USER_ERROR)(data);
}
function loginError(data) {
  return createAction(constant.LOGIN_USER_ERRORS)(data);
}
function openDrawerNow(data) {
  return createAction(constant.OPEN_USER_DRAWER)(data);
}
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
export function login(email, password) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(isLoading(true));
      action.userLogin(email, password).then((val) => {
        reslove(val);
        dispatch(isLoading(false));
        dispatch(loginSuccess(val.uid));
        dispatch(isSuccess(true));
      }, (error) => {
        dispatch(isLoading(false));
        dispatch(isError(true));
        dispatch(loginError(error));
      },
    );
    });
  };
}
export function sendToken(userid, token) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      action.userTokenUpdate(userid, token);
    });
  };
}
export function openDrawer() {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(openDrawerNow(true));
    });
  };
}
export function closeDrawer() {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(openDrawerNow(false));
    });
  };
}
