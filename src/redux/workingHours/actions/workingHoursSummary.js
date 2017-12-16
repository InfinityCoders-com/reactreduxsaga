import {createAction} from 'redux-actions';
import _ from 'lodash';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';

export function success_hours_summary (data) {
  return createAction(constants.ACTION_SUCCESS_HOURS_SUMMARY)(data);
}

export function empty_hours_summary (data) {
  return createAction(constants.ACTION_EMPTY_HOURS_SUMMARY)(data);
}

export function error_hours_summary (data) {
  return createAction(constants.ACTION_ERROR_HOURS_SUMMARY)(data);
}

function async_get_working_hours_summary (year, month) {
  return fireAjax('POST', '', {
    action: 'working_hours_summary',
    year:   year,
    month:  month
  });
}

export function get_working_hours_summary (year, month) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_get_working_hours_summary(year, month).then(
        (json) => {
          dispatch(hide_loading());
          if (json.error === 0) {
            dispatch(success_hours_summary(json.data));
          } else {
            dispatch(error_hours_summary({}));
          }
        }, (error) => {
        dispatch(hide_loading());
        dispatch(error_hours_summary({}));
      }
      );
    });
  };
}

// ----update day working timr

export function empty_update_hours_summary (data) {
  return createAction(constants.ACTION_EMPTY_UPDATE_HOURS_SUMMARY)(data);
}

export function error_update_hours_summary (data) {
  return createAction(constants.ACTION_ERROR_UPDATE_HOURS_SUMMARY)(data);
}

function async_update_day_working_hours (date, time) {
  return fireAjax('POST', '', {
    action: 'update_day_working_hours',
    date:   date,
    time:   time
  });
}

export function update_day_working_hours (date, time) {
  return function (dispatch, getState) {
    if (_.isEmpty(date)) {
      return Promise.reject('date is empty');
    }
    if (_.isEmpty(time)) {
      return Promise.reject('time is empty');
    }

    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_update_day_working_hours(date, time).then(
        (json) => {
          dispatch(hide_loading()); // hide loading icon
          if (json.error === 0) {
// dispatch( success_hours_summary( json.data ) )
            dispatch(get_working_hours_summary(json.data.monthYear.year, json.data.monthYear.month));
          } else {
// dispatch( error_hours_summary( {} ) )
            dispatch(empty_update_hours_summary(json.data.message));
// dispatch( get_working_hours_summary( json.data.monthYear.year, json.data.monthYear.month ) )
          }
        },
        (error) => {
          dispatch(hide_loading()); // hide loading icon
          // dispatch( error_hours_summary( {}  ) )
          dispatch(error_update_hours_summary(''));
          // dispatch( get_working_hours_summary( json.data.monthYear.year, json.data.monthYear.month ) )
        }
      );
    });
  };
}
