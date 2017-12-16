import {createAction} from 'redux-actions';
import _ from 'lodash';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';

export function successUserPendingHours (data) {
  return createAction(constants.ACTION_SUCCESS_USER_PENDING_HOURS)(data);
}

export function emptyUserPendingHours (data) {
  return createAction(constants.ACTION_EMPTY_USER_PENDING_HOURS)(data);
}

export function errorUserPendingHours (data) {
  return createAction(constants.ACTION_ERROR_USER_PENDING_HOURS)(data);
}

function asyncGetUserPendingHours (year, month) {
  return fireAjax('POST', '', {
    action: 'get_all_user_previous_month_time',
    year:   year,
    month:  month
  });
}

export function getUserPendingHourList (year, month) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      asyncGetUserPendingHours(year, month).then((json) => {
        dispatch(hide_loading());
        if (json.data !== null) {
          dispatch(successUserPendingHours(json.data));
        } else {
          dispatch(emptyUserPendingHours());
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(errorUserPendingHours({}));
      }
			);
    });
  };
}

// /-------------------

export function successAddUserPendingHours (data) {
  return createAction(constants.ACTION_SUCCESS_ADD_USER_PENDING_HOURS)(data);
}
export function errorAddUserPendingHours (data) {
  return createAction(constants.ACTION_ERROR_ADD_USER_PENDING_HOURS)(data);
}

function asyncAddUserPendingHours (userid, pendingHour, empId, year, month) {
  return fireAjax('POST', '', {
    action:        'add_user_working_hours',
    userid:        userid,
    working_hours: pendingHour,
    pending_id:    empId
  });
}

export function addUserPendingHour (userid, pendingHour, empId, year, month) {
  return function (dispatch, getState) {
    if (_.isEmpty(pendingHour)) {
      return Promise.reject('Time is empty');
    }
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon

      asyncAddUserPendingHours(userid, pendingHour, empId, year, month).then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(successAddUserPendingHours(json.data.message));
          resolve(json.data.message);
          dispatch(getUserPendingHourList(year, month));
        } else {
          dispatch(errorAddUserPendingHours(json.data.message));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(errorAddUserPendingHours('error occurs'));
      }
			);
    });
  };
}
