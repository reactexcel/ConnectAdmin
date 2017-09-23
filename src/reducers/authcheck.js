import Immutable from 'immutable';
import * as constant from '../constants/authcheck';

const initialstate = {
  user: '',
  isSuccess: false,
  needVerifyEmail: false,
  didSentEmailVerification: false,
};

export default function userauth(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.USER_AUTH_VERIFY) {
    return state.set('user', action.payload);
  } else if (action.type === constant.USER_AUTH_ERROR) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === constant.NEED_VERIFY_EMAIL) {
    return state.set('needVerifyEmail', action.payload);
  } else if (action.type === constant.DID_SENT_EMAIL_VERIFICATION) {
    return state.set('didSentEmailVerification', action.payload);
  }
  return state;
}
