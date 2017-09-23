import { createAction } from 'redux-actions';
import { NavigationActions } from 'react-navigation';
import * as action from '../api/api';
import * as constant from '../constants/signup';
import { isLoading } from './loader';
import * as general from '../constants/general';
import { AsyncStorage } from 'react-native';

function signupSuccess(data) {
  return createAction(constant.SIGNUP_USER_REQUEST)(data);
}
function isSuccess(data) {
  return createAction(constant.SIGNUP_USER_SUCCESS)(data);
}
function isError(data) {
  return createAction(constant.SIGNUP_USER_ERROR)(data);
}
function userProfileupdate(data) {
  return createAction(constant.USER_PROFILE_UPDATE)(data);
}
function userProfileupdateError(data) {
  return createAction(constant.USER_PROFILE_ERROR)(data);
}
function signupError(data) {
  return createAction(constant.SIGNUP_USER_ERRORS)(data);
}
function signoutSuccess(data) {
  return createAction(general.SIGNOUT_USER_REQUEST)(data);
}
function signoutDone(data) {
  return createAction(general.SIGNOUT_SUCCESS_REQUEST)(data);
}
export function signup(fname, lname, email, password, token) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(isLoading(true));
      action.userRegister(email, password).then((val) => {
        reslove(val);
        const data = val.uid;
        action.userToken(data, fname, lname, token);
        dispatch(isLoading(false));
        dispatch(signupSuccess(data));
        dispatch(isSuccess(true));

        action.sendEmailVerification().then(
          res => { console.log('send email verification success')},
          err => {
            console.log('send email verfication error');
            console.log(err);
          }
        );
      },
      (error) => {
        dispatch(isLoading(false));
        dispatch(isError(true));
        dispatch(signupError(error));
      },
    );
    });
  };
}
export function signout() {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      action.getSignOut().then((val) => {
        // const resetNavigator = NavigationActions.reset({
        //   index: 0,
        //   actions: [
        //     NavigationActions.navigate({
        //       routeName: 'Unauthorized',
        //     }),
        //   ],
        //   key: null,
        // });
        // dispatch(resetNavigator);
        dispatch(isLoading(true));
        // dispatch(signoutSuccess(''));
        AsyncStorage.setItem('msg', 'signout');
        dispatch(signoutDone(false));
        dispatch(isLoading(false));
      },
      (error) => {
        dispatch(signoutDone(error));
      },
    );
    });
  };
}
export function userProfile(data, fname, lname, token) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      // dispatch(isLoading(true));
      action.userToken(data, fname, lname, token).then((val) => {
        dispatch(userProfileupdate(val));
        // dispatch(isLoading(false));
      },
      (error) => {
        dispatch(userProfileupdateError(error));
      },
    );
    });
  };
}

export function resetPassword(email) {
  return function (dispatch, getState) {
    return new Promise( (resolve, reject) => {
      dispatch(isLoading(true));
      action.resetPassword(email).then(
        res => {
          resolve(res);
          dispatch(isLoading(false));
        },
        err => {
          reject(err);
          dispatch(isLoading(false));
        }
      )
    } )
  }
}

export function sendEmailVerification(email) {
  return function (dispatch, getState) {
    return new Promise( (resolve, reject) => {
      action.sendEmailVerification().then(
        res => { console.log('send email verification success')},
        err => {
          console.log('send email verfication error');
          console.log(err);
        }
      );
    } )
  }
}