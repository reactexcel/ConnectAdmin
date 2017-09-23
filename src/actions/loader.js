import { createAction } from 'redux-actions';
import * as constants from '../constants/general';

export function isLoading(data) {
  return createAction(constants.LOADING)(data);
}
