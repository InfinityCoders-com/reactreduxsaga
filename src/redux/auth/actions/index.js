import {setLoggedUser, getLoggedUser, resetLoggedUser} from 'src/services/generic';
import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

export function* loginRequest (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':   'login',
      'username': action.payload.username,
      'password': action.payload.password
    });
    if (response.error === 0) {
      let {token, userid} = response.data;
      yield put(actions.userLoginSuccess(setLoggedUser(token, userid)));
    } else if (response.error === 1) {
      yield put(actions.userLoginFail(response.data.message || 'Invalid Login...'));
    }
  } catch (e) {
    yield put(actions.userLoginError('Error Occurs !!'));
    console.warn('Some error found in "logingRequest" action\n', e);
  }
}

export function* isAlreadyLoggedIn (action) {
  let {token, data} = getLoggedUser();
  if (token) {
    yield put(actions.userLoginSuccess(setLoggedUser(token, data.id)));
  } else {
    yield put(actions.logoutSuccess());
  }
}

export function* forgotPassword (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':   'forgot_password',
      'username': action.payload.username
    });
    yield put(actions.forgotPasswordSuccess(response.data.message));
  } catch (e) {
    yield put(actions.forgotPasswordError('Error Occurs !!'));
    console.warn('Some error found in "forgotPassword" action\n', e);
  }
}

export function* logout (action) {
  try {
    yield call(fireAjax, 'POST', '', {
      'action': 'logout'
    });
    resetLoggedUser();
    yield put(actions.logoutSuccess());
  } catch (e) {
    console.warn('Some error found in "logout" action\n', e);
  }
}
