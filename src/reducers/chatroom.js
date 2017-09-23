import Immutable from 'immutable';
import * as constant from '../constants/chatroom';

const initialstate = {
  data: [],
  userData: [],
  isSuccess: false,
  isError: false,
  errors: [],
};

export default function chatdata(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.MSG_REC_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.MSG_REC_SUCCESS) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === constant.MSG_REC_ERROR) {
    return state.set('isError', action.payload);
  } else if (action.type === constant.MSG_REC_ERRORS) {
    return state.set('errors', action.payload);
  } else if (action.type === constant.SIGNOUT_USER_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.MSG_REC_USER) {
    return state.set('userData', action.payload);
  }
  return state;
}
