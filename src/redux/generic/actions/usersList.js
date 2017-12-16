import {createAction} from 'redux-actions';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';

//* *********************************
import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

export function* getUsersList (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'get_enable_user'
    });
    if (response.error === 0) {
      yield put(actions.successUsersList(response.data));
    } else {
      yield put(actions.errorUsersList(response.data.message));
    }
  } catch (e) {
    yield put(actions.errorUsersList('Error Occurs !!'));
    console.warn('Some error found in "get_enable_user" action\n', e);
  }
}
//* ************************************

export function success_usersList (data) {
  return createAction(constants.SUCCESS_USERSLIST)(data);
}

export function empty_usersList (data) {
  return createAction(constants.EMPTY_USERSLIST)(data);
}

export function error_usersList (data) {
  return createAction(constants.ERROR_USERSLIST)(data);
}

function async_get_users_list () {
  return fireAjax('POST', '', {'action': 'get_enable_user'});
}

export function get_users_list () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_users_list().then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(success_usersList(json.data));
          resolve(json.data);
        } else {
          dispatch(empty_usersList([]));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_usersList([]));
      });
    });
  };
}

// ------get disabled user list

export function success_disabled_user_list (data) {
  return createAction(constants.ACTION_SUCCESS_DISABLED_USERSLIST)(data);
}

export function error_disabled_users_list (data) {
  return createAction(constants.ACTION_ERROR_DISABLED_USERSLIST)(data);
}

function async_getDisabledUsersList () {
  return fireAjax('POST', '', {'action': 'show_disabled_users'});
}

export function getDisabledUsersList () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_getDisabledUsersList().then((json) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(success_disabled_user_list(json));
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_disabled_users_list([]));
      });
    });
  };
}
