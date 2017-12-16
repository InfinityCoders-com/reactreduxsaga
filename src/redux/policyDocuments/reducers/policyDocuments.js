import {handleActions} from 'redux-actions';
import * as constants from 'appRedux/constants';
import update from 'immutability-helper';
import 'appRedux/update';

let initialState = {
  policyDocument: {
    data:      [],
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
};

const successLogout = (state, action) => update(state, {
  policyDocument: {$setInitialState: null}
});

const requestPolicyDocument = (state, action) => update(state, {
  policyDocument: {$setRequestLoading: null}
});

const successPolicyDocument = (state, action) => update(state, {
  policyDocument: {$setRequestSuccess: action.payload}
});

const errorPolicyDocument = (state, action) => update(state, {
  policyDocument: {$setRequestError: action.payload}
});

const requestSubmitDocs = (state, action) => update(state, {
  policyDocument: {$setRequestLoading: null}
});

const successSubmitDocs = (state, action) => update(state, {
  policyDocument: {$setSuccessMessage: action.payload}
});

const errorSubmitDocs = (state, action) => update(state, {
  policyDocument: {$setRequestError: action.payload}
});

const requestUpdateRead = (state, action) => update(state, {
  policyDocument: {$setRequestLoading: null}
});

const successUpdateRead = (state, action) => update(state, {
  policyDocument: {$setSuccessMessage: action.payload}
});

const errorUpdateRead = (state, action) => update(state, {
  policyDocument: {$setRequestError: action.payload}
});

export default handleActions({
  [constants.REQUEST_POLICY_DOCUMENT]:      requestPolicyDocument,
  [constants.REQUEST_USER_POLICY_DOCUMENT]: requestPolicyDocument,
  [constants.SUCCESS_POLICY_DOCUMENT]:      successPolicyDocument,
  [constants.ERROR_POLICY_DOCUMENT]:        errorPolicyDocument,
  [constants.REQUEST_SUBMIT_DOCS]:          requestSubmitDocs,
  [constants.SUCCESS_SUBMIT_DOCS]:          successSubmitDocs,
  [constants.ERROR_SUBMIT_DOCS]:            errorSubmitDocs,
  [constants.REQUEST_UPDATE_READ]:          requestUpdateRead,
  [constants.SUCCESS_UPDATE_READ]:          successUpdateRead,
  [constants.ERROR_UPDATE_READ]:            errorUpdateRead,
  [constants.LOGOUT_SUCCESS]:               successLogout
}, initialState);
