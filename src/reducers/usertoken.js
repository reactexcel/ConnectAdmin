import Immutable from 'immutable';
import * as constant from '../constants/usertoken';
import * as general from '../constants/general';

const initialstate = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errors: [],
};
export default function usertoken(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.USER_TOKEN_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.USER_TOKEN_SUCCESS) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === constant.USER_TOKEN_ERROR) {
    return state.set('isError', action.payload);
  } else if (action.type === constant.USER_TOKEN_ERRORS) {
    return state.set('errors', action.payload);
  }
  return state;
}
