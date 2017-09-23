import { createAction } from 'redux-actions';
import * as constant from '../constants/usertoken';
import * as firebase from 'firebase';
import { isLoading } from './loader';

function tokenrec(data) {
  return createAction(constant.USER_TOKEN_REQUEST)(data);
}
function tokenrecError(data) {
  return createAction(constant.USER_TOKEN_ERRORS)(data);
}
function isError(data) {
  return createAction(constant.USER_TOKEN_ERROR)(data);
}
function isSuccess(data) {
  return createAction(constant.USER_TOKEN_SUCCESS)(data);
}

export function getToken() {
  return function (dispatch) {
    return new Promise((reslove, reject) => {
      firebase.database()
                .ref('/userInfo/')
                .on('value', (snapshot) => {
                  setTimeout(() => {
                    const messages = snapshot.val() || [];
                    dispatch(tokenrec(messages));
                    reslove(messages);
                    dispatch(isSuccess(true));
                    dispatch(isError(false));
                  }, 0);
                }, (error) => {
                  dispatch(isError(true));
                  dispatch(isSuccess(false));
                  dispatch(tokenrecError(error));
                },
              );
    });
  };
}
