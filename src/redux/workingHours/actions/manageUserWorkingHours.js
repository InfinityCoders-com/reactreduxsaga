import {createAction} from 'redux-actions';
import _ from 'lodash';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';

export function success_user_working_hours (data) {
  return createAction(constants.ACTION_SUCCESS_USER_WORKING_HOURS)(data);
}

export function empty_user_working_hours (data) {
  return createAction(constants.ACTION_EMPTY_USER_WORKING_HOURS)(data);
}

export function error_user_working_hours (data) {
  return createAction(constants.ACTION_ERROR_USER_WORKING_HOURS)(data);
}

function async_get_managed_user_working_hours (userid) {
  return fireAjax('POST', '', {
    action: 'get_managed_user_working_hours',
    userid: userid
  });
}

export function get_managed_user_working_hours (userid) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_managed_user_working_hours(userid).then(
				(json) => {
  dispatch(hide_loading()); // hide loading icon
  if (json.error === 0) {
    dispatch(success_user_working_hours(json.data));
  } else {
    dispatch(empty_user_working_hours(json.data));
  }
}, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_user_working_hours({}));
      }
			);
    });
  };
}

// /-------------------

export function success_add_user_working_hours (data) {
  return createAction(constants.ACTION_SUCCESS_ADD_USER_WORKING_HOURS)(data);
}
export function error_add_user_working_hours (data) {
  return createAction(constants.ACTION_ERROR_ADD_USER_WORKING_HOURS)(data);
}

function async_add_user_working_hours (userid, date, working_hours, reason) {
  return fireAjax('POST', '', {
    action:        'add_user_working_hours',
    userid:        userid,
    date:          date,
    working_hours: working_hours,
    reason:        reason
  });
}

export function add_user_working_hours (userid, date, working_hours, reason) {
  return function (dispatch, getState) {
    if (_.isEmpty(date)) {
      return Promise.reject('date is empty');
    }
    if (_.isEmpty(working_hours)) {
      return Promise.reject('Time is empty');
    }
    if (_.isEmpty(reason)) {
      return Promise.reject('Reason is empty');
    }

    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_add_user_working_hours(userid, date, working_hours, reason).then(
				(json) => {
  dispatch(hide_loading()); // hide loading icon
			        if (json.error == 0) {
			        	dispatch(success_add_user_working_hours(json.data.message));
			            dispatch(get_managed_user_working_hours(userid));
			          } else {
			            dispatch(error_add_user_working_hours(json.data.message));
			          }
},
				(error) => {
  dispatch(hide_loading()); // hide loading icon
  dispatch(error_add_user_working_hours('error occurs'));
}
			);
    });
  };
}
