import {createAction} from 'redux-actions';
import * as _ from 'lodash';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import * as constants from 'appRedux/constants';

export function success_user_manage_payslips_data (data) {
  return createAction(constants.ACTION_SUCCESS_USER_MANAGE_PAYSLIPS_DATA)(data);
}

export function error_user_manage_payslips_data (data) {
  return createAction(constants.ACTION_ERROR_USER_MANAGE_PAYSLIPS_DATA)(data);
}

function async_get_user_manage_payslips_data (userid) {
  return fireAjax('POST', '', {
    action:  'get_user_manage_payslips_data',
    user_id: userid
  });
}

export function get_user_manage_payslips_data (userid) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_user_manage_payslips_data(userid).then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (typeof json.data !== 'undefined') {
          // let data = json.data.salary_details.reverse()
          let data = json.data;
          dispatch(success_user_manage_payslips_data(data));
        } else {
          dispatch(success_user_manage_payslips_data([]));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_user_manage_payslips_data([]));
      });
    });
  };
}

// /month payslip genrater

function async_get_user_month_manage_payslips_data (userid, year, month) {
  return fireAjax('POST', '', {
    action:  'get_user_manage_payslips_data',
    user_id: userid,
    year:    year,
    month:   month
  });
}

export function get_user_month_manage_payslips_data (userid, year, month) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_user_month_manage_payslips_data(userid, year, month).then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (typeof json.data !== 'undefined') {
          // let data = json.data.salary_details.reverse()
          let data = json.data;
          dispatch(success_user_manage_payslips_data(data));
        } else {
          dispatch(success_user_manage_payslips_data([]));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_user_manage_payslips_data([]));
      });
    });
  };
}

// /create arrear

function async_create_arrear (userid, extraA, arrearMonth) {
  return fireAjax('POST', '', {
    action:           'get_user_manage_payslips_data',
    user_id:          userid,
    extra_arrear:     extraA,
    arrear_for_month: arrearMonth
  });
}
export function create_arrear (userid, extraA, arrearMonth) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_create_arrear(userid, extraA, arrearMonth).then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (typeof json.data !== 'undefined') {
          let data = json.data;
          dispatch(success_user_manage_payslips_data(data));
        } else {
          dispatch(success_user_manage_payslips_data([]));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
      });
    });
  };
}

// create user payslip

export function success_create_user_salary_slip (data) {
  return createAction(constants.ACTION_SUCCESS_CREATE_USER_SALARY_SLIP)(data);
}
export function error_create_user_salary_slip (data) {
  return createAction(constants.ACTION_ERROR_CREATE_USER_SALARY_SLIP)(data);
}

function async_create_user_payslip (n_userid, n_year, n_month, n_name, n_designation, n_joining_date, n_total_working_days, n_days_present, n_paid_leaves, n_unpaid_leaves, n_total_leave_taken, n_allocated_leaves, n_leave_balance, n_final_leave_balance, n_basic, n_epf, n_hra, n_loan, n_conveyance, n_advance, n_medical_allowance, n_misc_deduction, n_misc_deduction_2, n_special_allowance, n_tds, n_arrear, n_bonus, n_total_earning, n_total_deduction, n_net_salary, n_send_email, send_slack_msg, n_key) {
  let data = {
    action:              'create_employee_salary_slip',
    user_id:             n_userid,
    year:                n_year,
    month:               n_month,
    name:                n_name,
    designation:         n_designation,
    joining_date:        n_joining_date,
    total_working_days:  n_total_working_days,
    days_present:        n_days_present,
    paid_leaves:         n_paid_leaves,
    unpaid_leaves:       n_unpaid_leaves,
    total_leave_taken:   n_total_leave_taken,
    allocated_leaves:    n_allocated_leaves,
    leave_balance:       n_leave_balance,
    final_leave_balance: n_final_leave_balance,
    basic:               n_basic,
    epf:                 n_epf,
    hra:                 n_hra,
    loan:                n_loan,
    conveyance:          n_conveyance,
    advance:             n_advance,
    medical_allowance:   n_medical_allowance,
    misc_deduction:      n_misc_deduction,
    misc_deduction_2:    n_misc_deduction_2,
    tds:                 n_tds,
    arrear:              n_arrear,
    bonus:               n_bonus,
    total_earning:       n_total_earning,
    total_deduction:     n_total_deduction,
    net_salary:          n_net_salary,
    send_email:          n_send_email,
    send_slack_msg:      send_slack_msg
  };
  if (n_key == 1) {
    data.special_allowance = n_special_allowance;
  } else if (n_key == 2) {
    data.loyalty_bonus = n_special_allowance;
  }
  return fireAjax('POST', '', data);
}

export function create_user_payslip (new_salary_slip_data) {
  return function (dispatch, getState) {
    let n_userid = '';
    let n_year = '';
    let n_month = '';
    let n_name = '';
    let n_designation = '';
    let n_joining_date = '';
    let n_total_working_days = '';
    let n_days_present = '';
    let n_paid_leaves = '';
    let n_unpaid_leaves = '';
    let n_total_leave_taken = '';
    let n_allocated_leaves = '';
    let n_leave_balance = '';
    let n_final_leave_balance = '';
    let n_basic = '';
    let n_epf = '';
    let n_hra = '';
    let n_loan = '';
    let n_conveyance = '';
    let n_advance = '';
    let n_medical_allowance = '';
    let n_misc_deduction = '';
    let n_misc_deduction_2 = '';
    let n_special_allowance = '';
    let n_tds = '';
    let n_arrear = '';
    let n_bonus = '';
    let n_total_earning = '';
    let n_total_deduction = '';
    let n_net_salary = '';
    let n_send_email = '';
    let send_slack_msg = '';
    let n_key = '';

    if (typeof new_salary_slip_data.user_id === 'undefined' || new_salary_slip_data.user_id == '') {
      return Promise.reject('User Id is empty');
    } else {
      n_userid = new_salary_slip_data.user_id;
    }

    if (typeof new_salary_slip_data.name === 'undefined' || new_salary_slip_data.name == '') {
      return Promise.reject('Name is empty');
    } else {
      n_name = new_salary_slip_data.name;
    }

    if (typeof new_salary_slip_data.year === 'undefined' || new_salary_slip_data.year == '') {
      return Promise.reject('Year is empty');
    } else {
      n_year = new_salary_slip_data.year;
    }

    if (typeof new_salary_slip_data.month === 'undefined' || new_salary_slip_data.month == '') {
      return Promise.reject('Month is empty');
    } else {
      n_month = new_salary_slip_data.month;
    }

    if (typeof new_salary_slip_data.designation === 'undefined' || new_salary_slip_data.designation == '') {
      return Promise.reject('Designation is empty');
    } else {
      n_designation = new_salary_slip_data.designation;
    }

    if (typeof new_salary_slip_data.joining_date === 'undefined' || new_salary_slip_data.joining_date == '') {
      return Promise.reject('Joining date is empty');
    } else {
      n_joining_date = new_salary_slip_data.joining_date;
    }

    if (typeof new_salary_slip_data.total_working_days === 'undefined' || new_salary_slip_data.total_working_days === '') {
      return Promise.reject('Total working days is empty');
    } else {
      n_total_working_days = new_salary_slip_data.total_working_days;
    }

    if (typeof new_salary_slip_data.days_present === 'undefined' || new_salary_slip_data.days_present === '') {
      return Promise.reject('Days present is empty');
    } else {
      n_days_present = new_salary_slip_data.days_present;
    }

    if (typeof new_salary_slip_data.paid_leaves === 'undefined' || new_salary_slip_data.paid_leaves === '') {
      return Promise.reject('Paid leaves is empty');
    } else {
      n_paid_leaves = new_salary_slip_data.paid_leaves;
    }

    if (typeof new_salary_slip_data.unpaid_leaves === 'undefined' || new_salary_slip_data.unpaid_leaves === '') {
      return Promise.reject('Unpaid leaves is empty');
    } else {
      n_unpaid_leaves = new_salary_slip_data.unpaid_leaves;
    }

    if (typeof new_salary_slip_data.total_leave_taken === 'undefined' || new_salary_slip_data.total_leave_taken === '') {
      return Promise.reject('Total leave taken is empty');
    } else {
      n_total_leave_taken = new_salary_slip_data.total_leave_taken;
    }

    if (typeof new_salary_slip_data.allocated_leaves === 'undefined' || new_salary_slip_data.allocated_leaves === '') {
      return Promise.reject('Allocated leaves is empty');
    } else {
      n_allocated_leaves = new_salary_slip_data.allocated_leaves;
    }

    if (typeof new_salary_slip_data.leave_balance === 'undefined' || new_salary_slip_data.leave_balance === '') {
      return Promise.reject('Leave balance is empty');
    } else {
      n_leave_balance = new_salary_slip_data.leave_balance;
    }

    if (typeof new_salary_slip_data.final_leave_balance === 'undefined' || new_salary_slip_data.final_leave_balance === '') {
      return Promise.reject('Final leave balance is empty');
    } else {
      n_final_leave_balance = new_salary_slip_data.final_leave_balance;
    }

    if (typeof new_salary_slip_data.basic === 'undefined' || new_salary_slip_data.basic === '') {
      return Promise.reject('Basic is empty');
    } else {
      n_basic = new_salary_slip_data.basic;
    }

    if (typeof new_salary_slip_data.epf === 'undefined' || new_salary_slip_data.epf === '') {
      return Promise.reject('EPF is empty');
    } else {
      n_epf = new_salary_slip_data.epf;
    }

    if (typeof new_salary_slip_data.hra === 'undefined' || new_salary_slip_data.hra === '') {
      return Promise.reject('HRA is empty');
    } else {
      n_hra = new_salary_slip_data.hra;
    }

    if (typeof new_salary_slip_data.loan === 'undefined' || new_salary_slip_data.loan === '') {
      return Promise.reject('Loan is empty');
    } else {
      n_loan = new_salary_slip_data.loan;
    }

    if (typeof new_salary_slip_data.conveyance === 'undefined' || new_salary_slip_data.conveyance === '') {
      return Promise.reject('Conveyance is empty');
    } else {
      n_conveyance = new_salary_slip_data.conveyance;
    }

    if (typeof new_salary_slip_data.advance === 'undefined' || new_salary_slip_data.advance === '') {
      return Promise.reject('Advance is empty');
    } else {
      n_advance = new_salary_slip_data.advance;
    }

    if (typeof new_salary_slip_data.medical_allowance === 'undefined' || new_salary_slip_data.medical_allowance === '') {
      return Promise.reject('Medical allowance is empty');
    } else {
      n_medical_allowance = new_salary_slip_data.medical_allowance;
    }

    if (typeof new_salary_slip_data.misc_deduction === 'undefined' || new_salary_slip_data.misc_deduction === '') {
      return Promise.reject('Holding is empty');
    } else {
      n_misc_deduction = new_salary_slip_data.misc_deduction;
    }

    if (typeof new_salary_slip_data.misc_deduction_2 === 'undefined' || new_salary_slip_data.misc_deduction_2 === '') {
      return Promise.reject('Misc deduction  is empty');
    } else {
      n_misc_deduction_2 = new_salary_slip_data.misc_deduction_2;
    }

    if (typeof new_salary_slip_data.special_allowance === 'undefined' || new_salary_slip_data.special_allowance === '') {
      return Promise.reject('Special allowance is empty');
    } else {
      n_special_allowance = new_salary_slip_data.special_allowance;
    }

    if (typeof new_salary_slip_data.tds === 'undefined' || new_salary_slip_data.tds === '') {
      return Promise.reject('TDS is empty');
    } else {
      n_tds = new_salary_slip_data.tds;
    }

    if (typeof new_salary_slip_data.arrear === 'undefined' || new_salary_slip_data.arrear === '') {
      return Promise.reject('Advance is empty');
    } else {
      n_arrear = new_salary_slip_data.arrear;
    }

    if (typeof new_salary_slip_data.bonus === 'undefined' || new_salary_slip_data.bonus === '') {
      return Promise.reject('Bonus is empty');
    } else {
      n_bonus = new_salary_slip_data.bonus;
    }

    if (typeof new_salary_slip_data.total_earning === 'undefined' || new_salary_slip_data.total_earning === '') {
      return Promise.reject('Total earning is empty');
    } else {
      n_total_earning = new_salary_slip_data.total_earning;
    }

    if (typeof new_salary_slip_data.total_deduction === 'undefined' || new_salary_slip_data.total_deduction === '') {
      return Promise.reject('Total deduction is empty');
    } else {
      n_total_deduction = new_salary_slip_data.total_deduction;
    }

    if (typeof new_salary_slip_data.net_salary === 'undefined' || new_salary_slip_data.net_salary === '') {
      return Promise.reject('Net salary is empty');
    } else {
      n_net_salary = new_salary_slip_data.net_salary;
    }

    if (typeof new_salary_slip_data.send_email_only !== 'undefined') {
      n_send_email = new_salary_slip_data.send_email_only;
    }
    if (typeof new_salary_slip_data.send_slack_message !== 'undefined') {
      send_slack_msg = new_salary_slip_data.send_slack_message;
    }
    if (typeof new_salary_slip_data.key !== 'undefined') {
      n_key = new_salary_slip_data.key;
    }

    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_create_user_payslip(n_userid, n_year, n_month, n_name, n_designation, n_joining_date, n_total_working_days, n_days_present, n_paid_leaves, n_unpaid_leaves, n_total_leave_taken, n_allocated_leaves, n_leave_balance, n_final_leave_balance, n_basic, n_epf, n_hra, n_loan, n_conveyance, n_advance, n_medical_allowance, n_misc_deduction, n_misc_deduction_2, n_special_allowance, n_tds, n_arrear, n_bonus, n_total_earning, n_total_deduction, n_net_salary, n_send_email, send_slack_msg, n_key).then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(success_create_user_salary_slip(json.data));
          resolve('Payslip generated!!');
        } else {
          dispatch(error_create_user_salary_slip(json.data.message));
          reject(json.data.message);
        }
      }, (error) => {
        console.log('Tell Arun error occurs on Action - create_user_payslip');
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_create_user_salary_slip('error occurs!!'));
        reject('error occurs!!');
      });
    });
  };
}
// ------email payslips

export function success_email_payslips (data) {
  return createAction(constants.ACTION_SUCCESS_EMAIL_PAYSLIPS)(data);
}

export function error_email_payslips (data) {
  return createAction(constants.ACTION_ERROR_EMAIL_PAYSLIPS)(data);
}

function async_email_payslips (payslips_ids) {
  return fireAjax('POST', '', {
    action:      'send_payslips_to_employees',
    payslip_ids: payslips_ids
  });
}

export function email_payslips (payslips_ids) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_email_payslips(payslips_ids).then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (typeof json.error !== 'undefined' && json.error == 0) {
          // let data = json.data.salary_details.reverse()
          dispatch(success_user_manage_payslips_data(json.data.message));
          resolve(json.data.message);
        } else {
          dispatch(error_email_payslips('error occurs!!'));
          reject('error occurs!!');
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_email_payslips('error occurs!!'));
        reject('error occurs!!');
      });
    });
  };
}

// ------save google access token

export function success_save_google_access_token (data) {
  return createAction(constants.ACTION_SUCCESS_SAVE_GOOGLE_ACCESS_TOKEN)(data);
}

export function error_save_google_access_token (data) {
  return createAction(constants.ACTION_ERROR_SAVE_GOOGLE_ACCESS_TOKEN)(data);
}

function async_save_google_access_token (accessToken) {
  return fireAjax('POST', '', {
    action:              'save_google_payslip_drive_access_token',
    google_access_token: accessToken
  });
}

export function save_google_access_token (accessToken) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_save_google_access_token(accessToken).then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (typeof json.error !== 'undefined' && json.error == 0) {
          // let data = json.data.salary_details.reverse()
          let message = json.data.message;
          dispatch(success_save_google_access_token(message));
          resolve(message);
        } else {
          dispatch(error_save_google_access_token('error occurs!!'));
          reject('error occurs!!');
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_save_google_access_token('error occurs!!'));
        reject('error occurs!!');
      });
    });
  };
}

// ----get transfer list
export function success_get_transfer_list (data) {
  return createAction('ACTION_SUCCESS_GET_TRANSFER')(data);
}

export function error_get_transfer_list (data) {
  return createAction('ACTION_ERROR_GET_TRANSFER')(data);
}

function async_getTransferList (userIds) {
  return fireAjax('POST', '', {
    action:  'get_users_bankaccount_no',
    user_id: userIds
  });
}

export function getTransferList (userIds) {
  return function (dispatch, getState) {
    if (userIds.length == 0) {
      return Promise.reject('No user selected');
    }
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_getTransferList(userIds).then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(success_get_transfer_list(json.data));
          resolve(json.data);
        } else {
          dispatch(error_get_transfer_list(json.data.message));
          reject(json.data.message);
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_get_transfer_list('error occurs!!'));
        reject('error occurs!!');
      });
    });
  };
}
