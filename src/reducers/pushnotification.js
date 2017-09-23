import Immutable from 'immutable';
import * as constant from '../constants/pushnotification';
import * as general from '../constants/general';

const initialstate = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errors: [],
};
export function pushnotification(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.PUSH_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.PUSH_SUCCESS) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === constant.PUSH_ERROR) {
    return state.set('isError', action.payload);
  } else if (action.type === constant.PUSH_ERRORS) {
    return state.set('errors', action.payload);
  } else if (action.type === general.SIGNOUT_USER_REQUEST) {
    return state.set('data', action.payload);
  }
  return state;
}
