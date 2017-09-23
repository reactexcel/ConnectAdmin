import Immutable from 'immutable';
import * as constant from '../constants/signup';
import * as general from '../constants/general';

const initialstate = {
  data: '',
  userprofile: '',
  userError: '',
  isLoading: false,
  isSuccess: false,
  isError: false,
  errors: [],
};

export default function signup(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.SIGNUP_USER_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.SIGNUP_USER_SUCCESS) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === constant.SIGNUP_USER_ERROR) {
    return state.set('isError', action.payload);
  } else if (action.type === constant.SIGNUP_USER_ERRORS) {
    return state.set('errors', action.payload);
  } else if (action.type === general.SIGNOUT_USER_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === general.SIGNOUT_SUCCESS_REQUEST) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === general.USER_PROFILE_UPDATE) {
    return state.set('userprofile', action.payload);
  } else if (action.type === general.USER_PROFILE_ERROR) {
    return state.set('userError', action.payload);
  }
  return state;
}
