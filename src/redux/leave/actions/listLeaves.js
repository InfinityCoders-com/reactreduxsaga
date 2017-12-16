import {createAction} from 'redux-actions';
import * as _ from 'lodash';
import * as jwt from 'jwt-simple';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';

export function list_leaves_sucess (data) {
  return createAction(constants.ACTION_LIST_LEAVES_SUCCESS)(data);
}

export function list_leaves_empty (data) {
  return createAction(constants.ACTION_LIST_LEAVES_EMPTY)([]);
}

export function list_leaves_error (err) {
  return createAction(constants.ACTION_LIST_LEAVES_ERROR)('Error Occurs !!');
}

function async_getAllLeaves (from_date, to_date, no_of_days, reason) {
  return fireAjax('POST', '', {
    'action': 'get_all_leaves'
  });
}

export function getAllLeaves (role) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_getAllLeaves().then(
				(json) => {
  dispatch(hide_loading()); // hide loading icon
  if (json.error == 0) {
    dispatch(list_leaves_sucess(json.data));
    resolve();
  } else {
    dispatch(list_leaves_error(json.data.message));
  }
},
				(error) => {
  dispatch(hide_loading()); // hide loading icon
  dispatch(list_leaves_error(json.data.message));
}
			);
    });
  };
}
