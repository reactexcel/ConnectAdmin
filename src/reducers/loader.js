import Immutable from 'immutable';
import * as constant from '../constants/general';

const initialstate = {
  isLoading: false,
};
export default function loader(state = Immutable.fromJS(initialstate), action) {
  if (action.type === constant.LOADING) {
    return state.set('isLoading', action.payload);
  }
  return state;
}
