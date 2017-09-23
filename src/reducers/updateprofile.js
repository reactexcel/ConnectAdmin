import Immutable from 'immutable';
import * as constant from '../constants/updateProfile';
import * as genral from '../constants/general';

const initialstate = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errors: [],
};
export function profileUpdate(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.PROFILE_UPDATE_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.PROFILE_UPDATE_SUCCESS) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === constant.PROFILE_UPDATE_ERROR) {
    return state.set('isError', action.payload);
  } else if (action.type === constant.PROFILE_UPDATE_ERRORS) {
    return state.set('errors', action.payload);
  } else if (action.type === genral.SIGNOUT_USER_REQUEST) {
    return state.set('data', action.payload);
  }
  return state;
}
