import {createAction} from 'redux-actions';
import * as _ from 'lodash';
import {fireAjax} from 'src/services/index';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
var moment = require('moment');
import * as constants from 'appRedux/constants';

export function success_user_profile (data, username) {
  return {
    type:     constants.ACTION_SUCCESS_USER_PROFILE,
    payload:  data,
    username: username
  };
}
export function empty_user_profile (data) {
  return createAction(constants.ACTION_EMPTY_USER_PROFILE)(data);
}
export function error_user_profile (data) {
  return createAction(constants.ACTION_ERROR_USER_PROFILE)(data);
}

function async_getUserProfileDetails (userid) {
  return fireAjax('POST', '', {
    'action':  'get_user_profile_detail_by_id',
    'user_id': userid
  });
}

export function getUserProfileDetails (userid, username) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_getUserProfileDetails(userid).then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(success_user_profile(json.data, username));
        } else {
          dispatch(empty_user_profile(json.data.message));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_user_profile('error occurs!!!'));
      });
    });
  };
}

// -------update profile details

export function success_update_user_profile_details (data) {
  return createAction(constants.ACTION_SUCCESS_UPDATE_USER_PROFILE_DETAILS)(data);
}
export function error_update_user_profile_details (data) {
  return createAction(constants.ACTION_ERROR_UPDATE_USER_PROFILE_DETAILS)(data);
}

function async_updateUserProfileDetails (n_user_id, n_name, n_jobtitle, n_team, n_dateofjoining, n_work_email, n_other_email, n_gender,
  n_dob, n_marital_status, n_address1, n_address2, n_emergency_ph1, n_emergency_ph2, n_blood_group, n_medical_condition,
  n_training_completion_date, n_termination_date, n_holding_comments, n_training_month, n_send_slack_msg, n_slack_msg) {
  return fireAjax('POST', '', {
    'action':                   'update_user_profile_detail_by_id',
    'user_id':                  n_user_id,
    'marital_status':           n_marital_status,
    'name':                     n_name,
    'jobtitle':                 n_jobtitle,
    'team':                     n_team,
    'dateofjoining':            n_dateofjoining,
    'work_email':               n_work_email,
    'other_email':              n_other_email,
    'gender':                   n_gender,
    'dob':                      n_dob,
    'permanent_address':        n_address2,
    'current_address':          n_address1,
    'emergency_ph1':            n_emergency_ph1,
    'emergency_ph2':            n_emergency_ph2,
    'blood_group':              n_blood_group,
    'medical_condition':        n_medical_condition,
    'training_completion_date': n_training_completion_date,
    'termination_date':         n_termination_date,
    'training_month':           n_training_month,
    'holding_comments':         n_holding_comments,
    'send_slack_msg':           n_send_slack_msg,
    'slack_msg':                n_slack_msg
  });
}

export function updateUserProfileDetails (new_profile_details) {
  return function (dispatch, getState) {
    let n_user_id = '';
    let n_name = '';
    let n_jobtitle = '';
    let n_team = '';
    let n_dateofjoining = '';
    let n_work_email = '';
    let n_other_email = '';
    let n_gender = '';
    let n_dob = '';
    let n_marital_status = '';
    let n_address1 = '';
    let n_address2 = '';
    let n_emergency_ph1 = '';
    let n_emergency_ph2 = '';
    let n_blood_group = '';
    let n_medical_condition = '';
    let n_send_slack_msg = new_profile_details.send_slack_msg;
    let n_slack_msg = new_profile_details.slack_msg;
    let n_training_completion_date = '';
    let n_termination_date = '';
    let n_holding_comments = '';
    let n_training_month = '';

    if (typeof new_profile_details.user_id !== 'undefined') {
      n_user_id = new_profile_details.user_id;
    }
    if (typeof new_profile_details.name !== 'undefined') {
      n_name = new_profile_details.name;
    }
    if (typeof new_profile_details.jobtitle !== 'undefined') {
      n_jobtitle = new_profile_details.jobtitle;
    }
    if (typeof new_profile_details.team !== 'undefined') {
      n_team = new_profile_details.team;
    }
    if (typeof new_profile_details.dateofjoining !== 'undefined' && new_profile_details.dateofjoining != null) {
      n_dateofjoining = new_profile_details.dateofjoining;
    }

    if (typeof new_profile_details.training_month !== 'undefined' && new_profile_details.training_month != null) {
      n_training_month = new_profile_details.training_month;
    }

    if (typeof new_profile_details.work_email !== 'undefined') {
      n_work_email = new_profile_details.work_email;
    }
    if (typeof new_profile_details.other_email !== 'undefined') {
      n_other_email = new_profile_details.other_email;
    }
    if (typeof new_profile_details.gender !== 'undefined') {
      n_gender = new_profile_details.gender;
    }
    if (typeof new_profile_details.dob !== 'undefined' && new_profile_details.dob != null) {
      var mydate = new Date(new_profile_details.dob);
      if (mydate) {
        n_dob = moment(mydate).format('YYYY-MM-DD');
      }
    }

    if (typeof new_profile_details.marital_status !== 'undefined') {
      n_marital_status = new_profile_details.marital_status;
    }

    if (typeof new_profile_details.address1 !== 'undefined') {
      n_address1 = new_profile_details.address1;
    }
    if (typeof new_profile_details.address2 !== 'undefined') {
      n_address2 = new_profile_details.address2;
    }
    if (typeof new_profile_details.emergency_ph1 !== 'undefined') {
      n_emergency_ph1 = new_profile_details.emergency_ph1;
    }
    if (typeof new_profile_details.emergency_ph2 !== 'undefined') {
      n_emergency_ph2 = new_profile_details.emergency_ph2;
    }
    if (typeof new_profile_details.blood_group !== 'undefined') {
      n_blood_group = new_profile_details.blood_group;
    }
    if (typeof new_profile_details.medical_condition !== 'undefined') {
      n_medical_condition = new_profile_details.medical_condition;
    }
    if (typeof new_profile_details.training_completion_date !== 'undefined' && new_profile_details.training_completion_date != null) {
      n_training_completion_date = new_profile_details.training_completion_date;
    }
    if (typeof new_profile_details.termination_date !== 'undefined' && new_profile_details.termination_date != null) {
      n_termination_date = new_profile_details.termination_date;
    }
    if (typeof new_profile_details.holding_comments !== 'undefined') {
      n_holding_comments = new_profile_details.holding_comments;
    }

    if (n_user_id.trim() === '') {
      return Promise.reject('User id is empty');
    }
    if (n_name.trim() === '') {
      return Promise.reject('Name is empty');
    }
    if (n_jobtitle.trim() === '') {
      return Promise.reject('Jobtitle is empty');
    }
    if (n_dateofjoining.trim() === '') {
      return Promise.reject('Joining date is empty');
    }
    if (n_work_email.trim() === '') {
      return Promise.reject('Work email is empty');
    }
    if (n_other_email.trim() === '') {
      return Promise.reject('Personal email is empty');
    }
    if (n_gender.trim() === '') {
      return Promise.reject('Gender is empty');
    }
    if (n_dob.trim() === '') {
      return Promise.reject('Date of birth is empty');
    }
    if (n_marital_status.trim() === '') {
      return Promise.reject('Marital status not selected');
    }
    if (n_address1.trim() === '') {
      return Promise.reject('Current address is empty');
    }
    if (n_address2.trim() === '') {
      return Promise.reject('Permanent address is empty');
    }
    if (n_emergency_ph1.trim() === '') {
      return Promise.reject('Emmergency contact 1 is empty');
    }
    if (n_emergency_ph2.trim() === '') {
      return Promise.reject('Emmergency contact 2 is empty');
    }
    if (n_blood_group.trim() === '') {
      return Promise.reject('Blood group not selected');
    }
    if (n_medical_condition.trim() === '') {
      return Promise.reject('Any medical conditions is empty');
    }

    if (n_training_month.trim() === '') {
      return Promise.reject('Training month is Empty');
    }
    // if (n_training_completion_date.trim() === "") {
    //   return Promise.reject('Training Completion Date  is empty')
    // }
    // if (n_termination_date.trim() === "") {
    //   return Promise.reject('Termination date empty')
    // }
    // if (n_holding_comments.trim() === "") {
    //   return Promise.reject('Holding amount comment is empty')
    // }
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_updateUserProfileDetails(n_user_id, n_name, n_jobtitle, n_team, n_dateofjoining, n_work_email, n_other_email, n_gender, n_dob, n_marital_status,
        n_address1, n_address2, n_emergency_ph1, n_emergency_ph2, n_blood_group, n_medical_condition, n_training_completion_date,
        n_termination_date, n_holding_comments, n_training_month, n_send_slack_msg, n_slack_msg).then((json) => {
          dispatch(hide_loading()); // hide loading icon
          if (json.error == 0) {
            dispatch(getUserProfileDetails(n_user_id));
            dispatch(success_update_user_profile_details(json.data.message));
          } else {
            dispatch(error_update_user_profile_details(json.data.message));
          }
        }, (error) => {
          dispatch(hide_loading()); // hide loading icon
          dispatch(error_update_user_profile_details('error occurs!!!'));
        });
    });
  };
}

// -------add New employee

export function success_add_new_employee (data) {
  return createAction(constants.ACTION_SUCCESS_ADD_NEW_EMPLOYEE)(data);
}

export function error_add_new_employee (data) {
  return createAction(constants.ACTION_ERROR_ADD_NEW_EMPLOYEE)(data);
}

function async_addNewEmployee (n_dateofjoining, n_name, n_jobtitle, n_gender, n_dob, n_username, n_training_month, n_workemail) {
  return fireAjax('POST', '', {
    'action':         'add_new_employee',
    'dateofjoining':  n_dateofjoining,
    'name':           n_name,
    'jobtitle':       n_jobtitle,
    'gender':         n_gender,
    'dob':            n_dob,
    'username':       n_username,
    'training_month': n_training_month,
    'workemail':      n_workemail
  });
}

export function addNewEmployee (new_employee_details) {
  return function (dispatch, getState) {
    let n_dateofjoining = '';
    let n_name = '';
    let n_jobtitle = '';
    let n_gender = '';
    let n_dob = '';
    let n_username = '';
    let n_training_month = '';
    let n_workemail = '';

    if (typeof new_employee_details.dateofjoining === 'undefined' || new_employee_details.dateofjoining == '') {
      return Promise.reject('Date of Joining is empty');
    } else {
      n_dateofjoining = new_employee_details.dateofjoining;
    }

    if (typeof new_employee_details.name === 'undefined' || new_employee_details.name == '') {
      return Promise.reject('Name is empty');
    } else {
      n_name = new_employee_details.name;
    }

    if (typeof new_employee_details.jobtitle === 'undefined' || new_employee_details.jobtitle == '') {
      return Promise.reject('Job Title is empty');
    } else {
      n_jobtitle = new_employee_details.jobtitle;
    }

    if (typeof new_employee_details.gender === 'undefined' || new_employee_details.gender == '') {
      return Promise.reject('Gender is empty');
    } else {
      n_gender = new_employee_details.gender;
    }

    if (typeof new_employee_details.dob === 'undefined' || new_employee_details.dob == '') {
      return Promise.reject('Date of birth is empty');
    } else {
      n_dob = new_employee_details.dob;
    }

    if (typeof new_employee_details.gender === 'undefined' || new_employee_details.gender == '') {
      return Promise.reject('Gender is empty');
    } else {
      n_gender = new_employee_details.gender;
    }

    if (typeof new_employee_details.username === 'undefined' || new_employee_details.username == '') {
      return Promise.reject('Username is empty');
    } else {
      n_username = new_employee_details.username;
    }

    if (typeof new_employee_details.training_month === 'undefined' || new_employee_details.training_month == '') {
      return Promise.reject('training month is empty');
    } else {
      n_training_month = new_employee_details.training_month;
    }

    if (typeof new_employee_details.workemail === 'undefined' || new_employee_details.workemail == '') {
      return Promise.reject('Work email is empty');
    } else {
      n_workemail = new_employee_details.workemail;
    }

    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_addNewEmployee(n_dateofjoining, n_name, n_jobtitle, n_gender, n_dob, n_username, n_training_month, n_workemail).then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(success_add_new_employee(json.data.message));
          resolve(json.data.message);
        } else {
          dispatch(error_add_new_employee(json.data.message));
          reject(json.data.message);
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_add_new_employee('error occurs!!!'));
        reject('error occurs!!!');
      });
    });
  };
}
// ---------get user document

export function success_user_document (data) {
  return createAction(constants.ACTION_SUCCESS_USER_DOCUMENT)(data);
}
export function error_user_document (data) {
  return createAction(constants.ACTION_ERROR_USER_DOCUMENT)(data);
}

function async_getUserDocument (userid) {
  return fireAjax('POST', '', {
    'action':  'get_user_document_by_id',
    'user_id': userid
  });
}

export function getUserDocument (userid) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_getUserDocument(userid).then((json) => {
        dispatch(hide_loading());
        if (json.error == 0) {
          dispatch(success_user_document(json.data));
          // resolve('disabled')
        } else {
          dispatch(error_user_document(json.data.message));
          // reject('response with Error')
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_user_document('error occurs!!!'));
        // reject('error occurs!!')
      });
    });
  };
}

// ------Delete user document
function async_deleteDocument (doc_id) {
  return fireAjax('POST', '', {
    'action': 'delete_user_document',
    'id':     doc_id
  });
}

export function deleteDocument (doc_id) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_deleteDocument(doc_id).then((json) => {
        dispatch(hide_loading());
        if (json.error == 0) {
          resolve(json.data.message);
        } else {
          reject(json.data.message);
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        reject('error occurs!!');
      });
    });
  };
}

// --------changeEmployeeStatus Enable/Disable user

function async_changeEmployeeStatus (userid, status) {
  return fireAjax('POST', '', {
    'action':  'change_employee_status',
    'user_id': userid,
    'status':  status
  });
}

export function changeEmployeeStatus (userid, status) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      async_changeEmployeeStatus(userid, status).then((json) => {
        if (json.error === 0) {
          resolve('User disabled');
        } else {
          reject(json.data.message);
        }
      }, (error) => {
        reject('error occurs!!');
      });
    });
  };
}

function successGetStep (data) {
  return createAction(constants.ACTION_SUCCESS_GET_STEPS)(data);
}
function errorGetStep (data) {
  return createAction(constants.ACTION_ERROR_GET_STEPS)(data);
}
function asyncGetSteps (userid) {
  return fireAjax('POST', '', {
    'action': 'get_employee_life_cycle',
    'userid': userid
  });
}

export function getSteps (userid) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      asyncGetSteps(userid).then((json) => {
        if (json.error == 0) {
          resolve(json.message);
          dispatch(successGetStep(json.data));
        } else {
          reject(json.data.message);
          dispatch(errorGetStep(json.data.message));
        }
      }, (error) => {
        reject('error occurs!!');
      });
    });
  };
}

function successEmployeeStep (data) {
  return createAction(constants.ACTION_SUCCESS_EMPLOYEE_STEPS)(data);
}
function errorEmployeeStep (data) {
  return createAction(constants.ACTION_ERROR_EMPLOYEE_STEPS)(data);
}

function asyncChangeSteps (userid, stepid) {
  return fireAjax('POST', '', {
    'action': 'update_employee_life_cycle',
    'userid': userid,
    'stepid': stepid
  });
}

export function changeSteps (userid, stepid) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      asyncChangeSteps(userid, stepid).then((json) => {
        if (json.error == 0) {
          resolve(json.data.message);
          dispatch(getSteps(userid));
          // dispatch(successEmployeeStep(json.data));
        } else {
          reject(json.data.message);
          dispatch(errorEmployeeStep(json.data.message));
        }
      }, (error) => {
        reject('error occurs!!');
      });
    });
  };
}
