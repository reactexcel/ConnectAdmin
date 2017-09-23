import { createAction } from 'redux-actions';
import * as action from '../api/api';
import * as constant from '../constants/getuserprofile';
import { isLoading } from './loader';

function profileSuccess(data) {
  return createAction(constant.USER_PROFILE_REQUEST)(data);
}
function isSuccess(data) {
  return createAction(constant.USER_PROFILE_SUCCESS)(data);
}
function isError(data) {
  return createAction(constant.USER_PROFILE_ERROR)(data);
}
function loginError(data) {
  return createAction(constant.USER_PROFILE_ERRORS)(data);
}
export function getUserInfo(userId) {
  return function (dispatch) {
    return new Promise((reslove, reject) => {
      dispatch(isLoading(true));
      action.userInfo(userId).then((val) => {
        reslove(val);
        dispatch(isLoading(false));
        dispatch(profileSuccess(val));
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
