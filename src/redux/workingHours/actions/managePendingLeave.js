import {createAction} from 'redux-actions';
import _ from 'lodash';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';

export function pendingLeaveSucess (data) {
  return createAction(constants.ACTION_PENDING_LEAVE_SUCCESS)(data);
}

export function pendingLeaveFail (data) {
  return createAction(constants.ACTION_PENDING_LEAVE_FAIL)('Leave Apply Fail');
}

export function pendingLeaveError (err) {
  return createAction(constants.ACTION_PENDING_LEAVE_ERROR)('Error Occurs !!');
}

function asyncApplyEmployeLeave (no_of_days, userId, day_status, pending_id, year, month) {
  return fireAjax('POST', '', {
    'action':     'admin_user_apply_leave',
    'no_of_days': no_of_days,
    'user_id':    userId,
    'day_status': day_status,
    'pending_id': pending_id
  });
}

export function applyPendingLeave (no_of_days, userId, day_status, pending_id, year, month) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(show_loading()); // show loading icon
      asyncApplyEmployeLeave(
        no_of_days,
        userId,
        day_status,
        pending_id).then((json) => {
          dispatch(hide_loading()); // hide loading icon
          if (json.error == 0) {
            reslove(json.data.message);
            dispatch(pendingLeaveSucess(json.data.message));
          } else {
            dispatch(pendingLeaveFail(json.data.message));
            reject(json.data.message);
          }
        }, (error) => {
          dispatch(hide_loading()); // hide loading icon
          dispatch(pendingLeaveError('error occurs'));
          reject('error occurs');
        }
      );
    });
  };
}
