import {createAction} from 'redux-actions';
import * as _ from 'lodash';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import * as constants from 'appRedux/constants';

export function success_leaves_summary (data) {
  return createAction(constants.ACTION_SUCCESS_LEAVES_SUMMARY)(data);
}

export function empty_leaves_summary (data) {
  return createAction(constants.ACTION_EMPTY_LEAVES_SUMMARY)(data);
}

export function error_leaves_summary (data) {
  return createAction(constants.ACTION_ERROR_LEAVES_SUMMARY)(data);
}

function async_get_all_leaves_summary (year, month) {
  return fireAjax('POST', '', {
    action: 'get_all_leaves_summary',
    year:   year,
    month:  month
  });
}

export function get_all_leaves_summary (year, month) {
  //  console.log(userid, year, month);
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_all_leaves_summary(year, month).then((json) => {
        resolve(json);
        // console.log(json);
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(success_leaves_summary(json.data));
        } else {
          dispatch(empty_leaves_summary({}));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_leaves_summary({}));
      });
    });
  };
}
