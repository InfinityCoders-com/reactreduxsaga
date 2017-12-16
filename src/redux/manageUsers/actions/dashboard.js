import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';
import {CONFIG} from 'src/config/index';

export function* getTeamStats (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':                 'get_team_stats',
      'express_request_url':    CONFIG.expressRequestUrl + '/reports/get_team_stats',
      'express_request_method': 'POST',
      'express_request_body':   ''
    });
    if (response.error === 0) {
      yield put(actions.successTeamStats(response.data));
    } else {
      yield put(actions.errorTeamStats(response.message));
    }
  } catch (e) {
    yield put(actions.errorTeamStats('Error Occurs !!'));
    console.warn('Some error found in "get_team_stats" Request action\n', e);
  }
}

export function* getEmployeLifeCycle (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':                 'get_termination_joining_stats',
      'express_request_url':    CONFIG.expressRequestUrl + '/reports/get_termination_joining_stats',
      'express_request_method': 'POST',
      'express_request_body':   {
        'startYear': action.payload.start_year,
        'endYear':   action.payload.end_year
      }
    });
    if (response.error === 0) {
      yield put(actions.successEmployeLifeCycle(response.data));
    } else {
      yield put(actions.errorEmployeLifeCycle(response.message));
    }
  } catch (e) {
    yield put(actions.errorEmployeLifeCycle('Error Occurs !!'));
    console.warn('Some error found in "get_termination_joining_stats" Request action\n', e);
  }
}

export function* getUserIdList (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':                 'get_user_list',
      'express_request_url':    CONFIG.expressRequestUrl + '/user/get_user_list',
      'express_request_method': 'POST',
      'express_request_body':   ''
    });
    if (response.error === 0) {
      yield put(actions.successUserList(response.data));
    } else {
      yield put(actions.errorUserList(response.message));
    }
  } catch (e) {
    yield put(actions.errorUserList('Error Occurs !!'));
    console.warn('Some error found in "get_user_list" Request action\n', e);
  }
}

export function* getEmployeeHours (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':                 'get_employee_hours',
      'express_request_url':    CONFIG.expressRequestUrl + '/reports/get_employee_hours',
      'express_request_method': 'POST',
      'express_request_body':   {
        'user_id': action.payload.id,
        'date': action.payload.date,
        'month':   action.payload.month,
        'year':    action.payload.year
      }
    });
    if (response.error === 0) {
      yield put(actions.successEmployeeHours(response.data));
    } else {
      yield put(actions.errorEmployeeHours(response.message));
    }
  } catch (e) {
    yield put(actions.errorEmployeeHours('Error Occurs !!'));
    console.warn('Some error found in "get_employee_hours" Request action\n', e);
  }
}

export function* getEmployeeMonthlyHours (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':                 'get_employee_monthly_hours',
      'express_request_url':    CONFIG.expressRequestUrl + '/reports/get_monthly_report',
      'express_request_method': 'POST',
      'express_request_body':   {
        'user_id': action.payload.id,
        'month':   action.payload.month,
        'year':    action.payload.year
      }
    });
    if (response.error === 0) {
      yield put(actions.successEmployeeMonthlyHours(response.data));
    } else {
      yield put(actions.errorEmployeeMonthlyHours(response.message));
    }
  } catch (e) {
    yield put(actions.errorEmployeeMonthlyHours('Error Occurs !!'));
    console.warn('Some error found in "get_employee_hours" Request action\n', e);
  }
}

export function* getEmployeePerformance (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action':                 'get_employee_performance',
      'express_request_url':    CONFIG.expressRequestUrl + '/reports/get_monthly_performance',
      'express_request_method': 'POST',
      'express_request_body':   {
        'month': action.payload.month,
        'year':  action.payload.year
      }
    });
    if (response.error === 0) {
      yield put(actions.successEmployeePerformance(response.data));
    } else {
      yield put(actions.errorEmployeePerformance(response.message));
    }
  } catch (e) {
    yield put(actions.errorEmployeePerformance('Error Occurs !!'));
    console.warn('Some error found in "get_employee_hours" Request action\n', e);
  }
}
