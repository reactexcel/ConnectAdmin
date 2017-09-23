import Immutable from 'immutable';
import * as constant from '../constants/getuserprofile';
import * as general from '../constants/general';

const initialstate = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errors: [],
};
export default function getprofile(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.USER_PROFILE_REQUEST) {
    return state.set('data', action.payload);
  } else if (action.type === constant.USER_PROFILE_SUCCESS) {
    return state.set('isSuccess', action.payload);
  } else if (action.type === constant.USER_PROFILE_ERROR) {
    return state.set('isError', action.payload);
  } else if (action.type === constant.USER_PROFILE_ERRORS) {
    return state.set('errors', action.payload);
  } else if (action.type === general.SIGNOUT_USER_REQUEST) {
    return state.set('data', action.payload);
  }
  return state;
}
