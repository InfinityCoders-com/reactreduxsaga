import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'appRedux/constants';

let initialState = {
  userLogin: {
    data:       {},
    isLoggedIn: false,
    isLoading:  false,
    isError:    false,
    isSuccess:  false,
    message:    ''
  },
  forgotPassword: {
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
};

const userLoginRequest = (state, action) => update(state, {
  userLogin: {
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  }
});
const userLoginSuccess = (state, action) => update(state, {
  userLogin: {
    data:       {$set: action.payload},
    isLoggedIn: {$set: true},
    isLoading:  {$set: false},
    isError:    {$set: false},
    isSuccess:  {$set: true},
    message:    {$set: 'Login success'}
  }
});
const userLoginFail = (state, action) => update(state, {
  userLogin: {
    isLoading: {$set: false},
    isSuccess: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});
const userLoginError = (state, action) => update(state, {
  userLogin: {
    isLoading: {$set: false},
    isSuccess: {$set: false},
    isError:   {$set: true},
    message:   {$set: action.payload}
  }
});
const userLogout = (state, action) => update(state, {
  userLogin: {$set: initialState}
});
const requestForgotPassword = (state, action) => update(state, {
  forgotPassword: {
    isLoading: true,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
});
const successForgotPassword = (state, action) => update(state, {
  forgotPassword: {
    isLoading: false,
    isError:   false,
    isSuccess: true,
    message:   {$set: action.payload}
  }
});
const errorForgotPassword = (state, action) => update(state, {
  forgotPassword: {
    isLoading: false,
    isError:   true,
    isSuccess: false,
    message:   {$set: action.payload}
  }
});
export default handleActions({
  [constants.USER_LOGIN_REQUEST]: userLoginRequest,
  [constants.USER_LOGIN_SUCCESS]: userLoginSuccess,
  [constants.USER_LOGIN_FAIL]:    userLoginFail,
  [constants.USER_LOGIN_ERROR]:   userLoginError,
  [constants.LOGOUT_SUCCESS]:     userLogout,

  [constants.REQUEST_FORGOT_PASSWORD]: requestForgotPassword,
  [constants.SUCCESS_FORGOT_PASSWORD]: successForgotPassword,
  [constants.ERROR_FORGOT_PASSWORD]:   errorForgotPassword

}, initialState);
