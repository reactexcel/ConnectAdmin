import { createAction } from 'redux-actions';
import * as action from '../api/api';
import * as constant from '../constants/updateProfile';
import { isLoading } from './loader';

function profileUpdateSuceess(data) {
  return createAction(constant.PROFILE_UPDATE_REQUEST)(data);
}
function isSuccess(data) {
  return createAction(constant.PROFILE_UPDATE_SUCCESS)(data);
}
function isError(data) {
  return createAction(constant.PROFILE_UPDATE_ERROR)(data);
}
function profileUpdateError(data) {
  return createAction(constant.PROFILE_UPDATE_ERRORS)(data);
}

export function userInfoUpdate(userId, fname, lname, token, avatar, businessname, reporting) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(isLoading(true));
      action.userProfileupdate(userId, fname, lname, token, avatar, businessname, reporting).then((val) => {
        resolve(val);
        dispatch(isSuccess(true));
        dispatch(profileUpdateSuceess(val));
        dispatch(isLoading(false));
      }, (error) => {
        dispatch(isLoading(false));
        dispatch(isError(true));
        dispatch(profileUpdateError(error));
      },
    );
    });
  };
}
export function upload(uri) {
  return function (dispatch, getState) {
    action.uploadImage(uri).then((val) => {
    });
  };
}
