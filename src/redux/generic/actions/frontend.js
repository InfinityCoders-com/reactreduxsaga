import {createAction} from 'redux-actions';
import * as constants from 'appRedux/constants';

export function show_loading () {
  return createAction(constants.ACTION_SHOW_LOADING)();
}

export function hide_loading (data) {
  return createAction(constants.ACTION_HIDE_LOADING)();
}
