import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

export function* userMonthlyAttendance (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      action: 'month_attendance',
      userid: action.payload.userid,
      year:   action.payload.year,
      month:  action.payload.month
    });
    if (response.error === 0) {
      yield put(actions.successUserAttendance(response.data));
    } else {
      yield put(actions.errorUserAttendance(response.message));
    }
  } catch (e) {
    yield put(actions.errorUserAttendance('Error Occurs !!'));
    console.warn('Some error found in "month_attendance" action\n', e);
  }
}
