import {createAction} from 'redux-actions';
import * as _ from 'lodash';
import * as jwt from 'jwt-simple';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import * as actions_listLeaves from './listLeaves';

export function leave_status_change_success (data) {
  return createAction(constants.ACTION_LEAVE_STATUS_CHANGE_SUCCESS)(data);
}

export function leave_status_change_fail (data) {
  return createAction(constants.ACTION_LEAVE_STATUS_CHANGE_FAIL)(data);
}

export function leave_status_change_error (err) {
  return createAction(constants.ACTION_LEAVE_STATUS_CHANGE_ERROR)(data);
}

function async_changeLeaveStatus (leaveid, newstatus, messagetouser) {
  return fireAjax('POST', '', {
    'action':        'change_leave_status',
    'leaveid':       leaveid,
    'newstatus':     newstatus,
    'messagetouser': messagetouser
  });
}

export function changeLeaveStatus (leaveid, newstatus, messagetouser) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(show_loading()); // show loading icon
      async_changeLeaveStatus(leaveid, newstatus, messagetouser).then(
				(json) => {
  dispatch(hide_loading()); // hide loading icon
  if (json.error == 0) {
    dispatch(leave_status_change_success(json.data.message));
    dispatch(actions_listLeaves.getAllLeaves());
		 			} else {
		 				dispatch(leave_status_change_fail(json.data.message));
		 			}
},
				(error) => {
  dispatch(hide_loading()); // hide loading icon
  dispatch(leave_status_change_error('error occurs'));
}
			);
    });
  };
}

function async_docRequired (leaveid, data, comment) {
  return fireAjax('POST', '', {
    'action':      'send_request_for_doc',
    'leaveid':     leaveid,
    'doc_request': data,
    'comment':     comment
  });
}

export function docRequired (leaveid, data, comment) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(show_loading()); // show loading icon
      async_docRequired(leaveid, data, comment).then(
				(json) => {
  dispatch(hide_loading()); // hide loading icon
  if (json.error == 0) {
    dispatch(actions_listLeaves.getAllLeaves());
  }
},
				(error) => {
  dispatch(actions_listLeaves.getAllLeaves());
  dispatch(hide_loading()); // hide loading icon
}
			);
    });
  };
}

function async_onAddExtraDay (leaveid, token, data) {
  return fireAjax('POST', '', {
    'action':    'add_extra_leave_day',
    'leaveid':   leaveid,
    'token':     token,
    'extra_day': data
  });
}

export function onAddExtraDay (leaveid, token, data) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(show_loading()); // show loading icon
      async_onAddExtraDay(leaveid, token, data).then(
				(json) => {
  dispatch(hide_loading()); // hide loading icon
  if (json.error == 0) {
    dispatch(actions_listLeaves.getAllLeaves());
		 			}
},
				(error) => {
  dispatch(actions_listLeaves.getAllLeaves());
  dispatch(hide_loading()); // hide loading icon
}
			);
    });
  };
}

function async_onAddDescription (leaveid, hr, data) {
  return fireAjax('POST', '', {
    'action':     'add_hr_comment',
    'leaveid':    leaveid,
    'hr_comment': hr,
    'hr_approve': data
  });
}

export function onAddDescription (leaveid, hr, data) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(show_loading()); // show loading icon
      async_onAddDescription(leaveid, hr, data).then(
				(json) => {
  reslove(json.data.leaveid);
  dispatch(hide_loading()); // hide loading icon
  if (json.error == 0) {
    dispatch(actions_listLeaves.getAllLeaves());
  }
},
				(error) => {
  dispatch(actions_listLeaves.getAllLeaves());
  dispatch(hide_loading()); // hide loading icon
}
			);
    });
  };
}
