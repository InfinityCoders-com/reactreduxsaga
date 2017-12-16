import {createAction} from 'redux-actions';
import * as _ from 'lodash';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import 'whatwg-fetch';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import * as constants from 'appRedux/constants';

export function success_salary_details (data) {
  return createAction(constants.ACTION_SUCCESS_SALARY_DETAILS)(data);
}

export function empty_salary_details (data) {
  return createAction(constants.ACTION_EMPTY_SALARY_DETAILS)(data);
}

function async_get_salary_details () {
  return fireAjax('POST', '', {
    'action': 'get_user_salary_info'
  });
}

export function getSalaryDetails () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_salary_details().then((json) => {
        dispatch(hide_loading()); // hide loading icon
        console.log('json', json);
        if (typeof json.data !== 'undefined' && typeof json.data.salary_details !== 'undefined') {
          // let data = json.data.salary_details.reverse()
          // dispatch( success_salary_details( data ) )
          resolve(json.data);
          dispatch(success_salary_details(json.data));
        } else {
          dispatch(empty_salary_details([]));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(success_salary_details([]));
      });
    });
  };
}

export function success_user_salary_details (data) {
  return createAction(constants.ACTION_SUCCESS_USER_SALARY_DETAILS)(data);
}

export function empty__user_salary_details (data) {
  return createAction(constants.ACTION_EMPTY_USER_SALARY_DETAILS)(data);
}

export function error_user_salary_details (data) {
  return createAction(constants.ACTION_ERROR_USER_SALARY_DETAILS)(data);
}

function async_fetch_users_salary_details () {
  return fireAjax('POST', '', {
    'action': 'get_all_users_detail'
  });
}

export function fetchUserSalaryDetails () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_fetch_users_salary_details().then((json) => {
        // console.log(json, "////////////////////");
        dispatch(hide_loading());
        if (typeof json.data !== 'undefined' && json.data.length > 0) {
          dispatch(success_user_salary_details(json.data));
          resolve();
        } else {
          dispatch(empty__user_salary_details([]));
          resolve();
        }
      }, (error) => {
        dispatch(hide_loading());
        resolve();
        dispatch(error_user_salary_details([]));
      });
    });
  };
}
