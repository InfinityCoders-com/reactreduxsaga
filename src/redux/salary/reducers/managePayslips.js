import Immutable from 'immutable';
import * as _ from 'lodash';

let initialState = {
  'status_message':           '',
  'user_data_for_payslip':    {},
  'user_payslip_history':     [],
  'all_users_latest_payslip': [],
  'google_drive_emailid':     '',
  'employee_actual_salary':   {},
  'employee_account_no':      []
};

export function managePayslips (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_USER_MANAGE_PAYSLIPS_DATA') {
    return state.set('user_data_for_payslip', action.payload.user_data_for_payslip)
        .set('user_payslip_history', action.payload.user_payslip_history)
        .set('all_users_latest_payslip', action.payload.all_users_latest_payslip)
        .set('google_drive_emailid', action.payload.google_drive_emailid)
        .set('employee_actual_salary', action.payload.employee_actual_salary)
        .set('pending_leaves', action.payload.employee_pending_leave);
  } else if (action.type === 'ACTION_ERROR_USER_MANAGE_PAYSLIPS_DATA') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_SUCCESS_GET_TRANSFER') {
    return state.set('employee_account_no', action.payload);
  } else if (action.type === 'ACTION_ERROR_GET_TRANSFER') {
    return state.set('employee_account_no', []);
  } else {
    return state.set('status_message', '');
  }
}
