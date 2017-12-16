import {createAction} from 'redux-actions';
import * as _ from 'lodash';
import {fireAjax} from 'src/services/index';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import * as constants from 'appRedux/constants';

export function success_user_salary_details (data) {
  return createAction(constants.ACTION_SUCCESS_USER_SALARY_DETAILS)(data);
}

export function empty_user_salary_details (data) {
  return createAction(constants.ACTION_EMPTY_USER_SALARY_DETAILS)(data);
}

function async_get_user_salary_details (userid) {
  return fireAjax('POST', '', {
    action:  'get_user_salary_info_by_id',
    user_id: userid
  });
}
export function get_user_salary_details (userid) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_user_salary_details(userid).then(
        (json) => {
          resolve(json);
          dispatch(hide_loading()); // hide loading icon
          if (typeof json.data !== 'undefined' && typeof json.data.salary_details !== 'undefined' && json.data.salary_details.length > 0) {
            let data = json.data;
            dispatch(success_user_salary_details(data));
          } else {
            dispatch(success_user_salary_details([]));
          }
        },
        (error) => {
          dispatch(hide_loading()); // hide loading icon
          dispatch(success_user_salary_details([]));
        }
      );
    });
  };
}

// -------------------

export function success_add_user_salary (data) {
  return createAction(constants.ACTION_SUCCESS_ADD_USER_SALARY)(data);
}
export function error_add_user_salary (data) {
  return createAction(constants.ACTION_ERROR_ADD_USER_SALARY)(data);
}

function async_add_user_new_salary (n_userid, n_applicable_from, n_applicable_till, n_total_salary, n_leave, n_basic, n_hra, n_conveyance, n_medical_allowance, n_special_allowance, n_arrear, n_epf, n_loan, n_advance, n_misc_deduction, n_tds) {
  return fireAjax('POST', '', {
    action:            'add_user_salary',
    user_id:           n_userid,
    applicable_from:   n_applicable_from,
    applicable_till:   n_applicable_till,
    total_salary:      n_total_salary,
    leave:             n_leave,
    basic:             n_basic,
    hra:               n_hra,
    conveyance:        n_conveyance,
    medical_allowance: n_medical_allowance,
    special_allowance: n_special_allowance,
    arrear:            n_arrear,
    epf:               n_epf,
    loan:              n_loan,
    advance:           n_advance,
    misc_deduction:    n_misc_deduction,
    tds:               n_tds
  });
}

export function add_user_new_salary (new_salary_data) {
  return function (dispatch, getState) {
    // n_userid,n_applicable_from,n_total_salary,n_leave,n_basic,n_hra,n_conveyance,n_medical_allowance,n_special_allowance,n_arrear,n_epf,n_loan,n_advance,n_misc_deduction,n_tds

    let n_userid = '';
    let n_applicable_from = '';
    let n_applicable_till = '';
    let n_total_salary = '';
    let n_leave = '';
    let n_basic = '';
    let n_hra = '';
    let n_conveyance = '';
    let n_medical_allowance = '';
    let n_special_allowance = '';
    let n_arrear = '';
    let n_epf = '';
    let n_loan = '';
    let n_advance = '';
    let n_misc_deduction = '';
    let n_tds = '';

    if (typeof new_salary_data.user_id !== 'undefined') {
      n_userid = new_salary_data.user_id;
    }
    if (typeof new_salary_data.applicable_from !== 'undefined') {
      n_applicable_from = new_salary_data.applicable_from;
    }
    if (typeof new_salary_data.applicable_till !== 'undefined') {
      n_applicable_till = new_salary_data.applicable_till;
    }
    if (typeof new_salary_data.total_salary !== 'undefined') {
      n_total_salary = new_salary_data.total_salary;
    }
    if (typeof new_salary_data.leave !== 'undefined') {
      n_leave = new_salary_data.leave;
    }
    if (typeof new_salary_data.basic !== 'undefined') {
      n_basic = new_salary_data.basic;
    }
    if (typeof new_salary_data.hra !== 'undefined') {
      n_hra = new_salary_data.hra;
    }
    if (typeof new_salary_data.conveyance !== 'undefined') {
      n_conveyance = new_salary_data.conveyance;
    }
    if (typeof new_salary_data.medical_allowance !== 'undefined') {
      n_medical_allowance = new_salary_data.medical_allowance;
    }
    if (typeof new_salary_data.special_allowance !== 'undefined') {
      n_special_allowance = new_salary_data.special_allowance;
    }
    if (typeof new_salary_data.arrear !== 'undefined') {
      n_arrear = new_salary_data.arrear;
    }
    if (typeof new_salary_data.epf !== 'undefined') {
      n_epf = new_salary_data.epf;
    }
    if (typeof new_salary_data.loan !== 'undefined') {
      n_loan = new_salary_data.loan;
    }
    if (typeof new_salary_data.advance !== 'undefined') {
      n_advance = new_salary_data.advance;
    }
    if (typeof new_salary_data.misc_deduction !== 'undefined') {
      n_misc_deduction = new_salary_data.misc_deduction;
    }
    if (typeof new_salary_data.tds !== 'undefined') {
      n_tds = new_salary_data.tds;
    }

    if (n_userid === '') {
      return Promise.reject('User Id is empty');
    }
    if (n_applicable_from === '') {
      return Promise.reject('Applicable from date is empty');
    }
    if (n_applicable_till === '') {
      return Promise.reject('Applicable till date is empty');
    }
    if (n_total_salary === '') {
      return Promise.reject('Total Salary is empty');
    }
    if (n_leave === '') {
      return Promise.reject('Leave is empty');
    }
    if (n_basic === '') {
      return Promise.reject('Basic is empty');
    }
    if (n_hra === '') {
      return Promise.reject('HRA date is empty');
    }
    if (n_conveyance === '') {
      return Promise.reject('Conveyance is empty');
    }
    if (n_medical_allowance === '') {
      return Promise.reject('Medical_allowance is empty');
    }
    if (n_special_allowance === '') {
      return Promise.reject('Special Allowance is empty');
    }
    if (n_arrear === '') {
      return Promise.reject('Arrear is empty');
    }
    if (n_epf === '') {
      return Promise.reject('EPF is empty');
    }
    if (n_loan === '') {
      return Promise.reject('Loan is empty');
    }
    if (n_advance === '') {
      return Promise.reject('Advance is empty');
    }
    if (n_misc_deduction === '') {
      return Promise.reject('Misc Deduction is empty');
    }
    if (n_tds === '') {
      return Promise.reject('TDS is empty');
    }

    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_add_user_new_salary(n_userid, n_applicable_from, n_applicable_till, n_total_salary, n_leave, n_basic, n_hra, n_conveyance, n_medical_allowance, n_special_allowance, n_arrear, n_epf, n_loan, n_advance, n_misc_deduction, n_tds).then(
        (json) => {
          dispatch(hide_loading()); // hide loading icon
          if (json.error.length == 0) {
            dispatch(success_add_user_salary(json.data));
            dispatch(get_user_salary_details(n_userid));
          } else {
            dispatch(error_add_user_salary(json.error[0]));
          }
        },
        (error) => {
          dispatch(hide_loading()); // hide loading icon
          dispatch(error_add_user_salary('error occurs'));
        }
      );
    });
  };
}

// /-----holding---------------------------------------------------------

export function success_add_user_holding (data) {
  return createAction(constants.ACTION_SUCCESS_ADD_USER_HOLDING)(data);
}
export function error_add_user_holding (data) {
  return createAction(constants.ACTION_ERROR_ADD_USER_HOLDING)(data);
}

function async_add_user_new_holding (n_userid, n_holding_from, n_holding_till, n_holding_amount, n_holding_reason) {
  return fireAjax('POST', '', {
    action:             'add_user_holding',
    user_id:            n_userid,
    holding_start_date: n_holding_from,
    holding_end_date:   n_holding_till,
    holding_amt:        n_holding_amount,
    reason:             n_holding_reason
  });
}

export function add_user_new_holding (data) {
  return function (dispatch, getState) {
    let n_userid = '';
    let n_holding_from = '';
    let n_holding_till = '';
    let n_holding_amount = '';
    let n_holding_reason = '';

    if (typeof data.user_id !== 'undefined') {
      n_userid = data.user_id;
    }
    if (typeof data.holding_from !== 'undefined') {
      n_holding_from = data.holding_from;
    }
    if (typeof data.holding_till !== 'undefined') {
      n_holding_till = data.holding_till;
    }
    if (typeof data.holding_amount !== 'undefined') {
      n_holding_amount = data.holding_amount;
    }
    if (typeof data.reason !== 'undefined') {
      n_holding_reason = data.reason;
    }

    if (n_userid === '') {
      return Promise.reject('User Id is empty');
    }
    if (n_holding_from === '') {
      return Promise.reject('Holding from date is empty');
    }
    if (n_holding_till === '') {
      return Promise.reject('Holding till date is empty');
    }
    if (n_holding_amount === '') {
      return Promise.reject('Holding amount is empty');
    }
    if (n_holding_reason === '') {
      return Promise.reject('Reason is empty');
    }

    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_add_user_new_holding(n_userid, n_holding_from, n_holding_till, n_holding_amount, n_holding_reason).then(
        (json) => {
          dispatch(hide_loading()); // hide loading icon
          if (json.error.length == 0) {
            dispatch(success_add_user_holding(json.data));
            dispatch(get_user_salary_details(n_userid));
          } else {
            dispatch(error_add_user_holding(json.error[0]));
          }
        },
        (error) => {
          dispatch(hide_loading()); // hide loading icon
          dispatch(error_add_user_holding('error occurs'));
        }
      );
    });
  };
}

// //---------------

export function success_delete_user_salary (data) {
  return createAction(constants.ACTION_SUCCESS_DELETE_USER_SALARY)(data);
}

export function error_delete_user_salary (data) {
  return createAction(constants.ACTION_ERROR_DELETE_USER_SALARY)(data);
}

function async_delete_user_salary (user_id, salary_id) {
  return fireAjax('GET', '', {
    action:    'delete_salary',
    user_id:   user_id,
    salary_id: salary_id
  });
}

export function delete_user_salary (user_id, salary_id) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_delete_user_salary(user_id, salary_id).then(
        (json) => {
          dispatch(hide_loading()); // hide loading icon
          if (typeof json.error !== 'undefined' && json.error == 0) {
            let message = json.data.message;
            dispatch(success_delete_user_salary(message));
            resolve(message);
          } else {
            dispatch(error_delete_user_salary('error'));
            reject('error occurs');
          }
        },
        (error) => {
          dispatch(hide_loading()); // hide loading icon
          dispatch(error_delete_user_salary('error'));
          reject('error occurs');
        }
      );
    });
  };
}
