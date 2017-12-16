import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

export function* getUserDayAttendance (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'manual'
    });
    if (response.error === 0) {
      yield put(actions.successUserDayAttendance(response.data));
    } else {
      yield put(actions.errorUserDayAttendance(response.message));
    }
  } catch (e) {
    yield put(actions.errorUserDayAttendance('Error Occurs !!'));
    console.warn('Some error found in "manual" action\n', e);
  }
}

export function* userAttendanceStatus (action) {
  const {status, id} = action.payload;
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'approval',
      'status': parseInt(status),
      'id':     id
    });
    if (response.error === 0) {
      yield put(actions.successUserAttendanceStatus(response.data));
      yield put(actions.requestUserDayAttendance());
    } else {
      yield put(actions.errorUserAttendanceStatus(response.message));
    }
  } catch (e) {
    yield put(actions.errorUserAttendanceStatus('Error Occurs !!'));
    console.warn('Some error found in "manual" action\n', e);
  }
}
