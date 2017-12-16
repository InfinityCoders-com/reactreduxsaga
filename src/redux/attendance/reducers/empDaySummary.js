import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'appRedux/constants';
import 'appRedux/update';

let initialState = {
  empDaySummary: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   '',
    reason:    ''
  }
};

const requestUpdateEmpDaySummary = (state, action) => update(state, {
  empDaySummary: {$setRequestLoading: null}
});
const successUpdateEmpDaySummary = (state, action) => {
  return update(state, {
    empDaySummary: {$setRequestSuccess: action.payload}
  });
};
const errorUpdateEmpDaySummary = (state, action) => update(state, {
  empDaySummary: {$setRequestError: action.payload}
});

export default handleActions({
  [constants.REQUEST_UPDATE_EMP_DAY_SUMMARY]: requestUpdateEmpDaySummary,
  [constants.SUCCESS_UPDATE_EMP_DAY_SUMMARY]: successUpdateEmpDaySummary,
  [constants.ACTION_ERROR_EMP_DAY_SUMMARY]:   errorUpdateEmpDaySummary
}, initialState);
