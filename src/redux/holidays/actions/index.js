import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

export function* holidayList (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'get_holidays_list'
    });
    if (response.error === 0) {
      yield put(actions.successHolidayList(response.data));
    } else if (response.error === 1) {
      yield put(actions.errorHolidayList('API response error.'));
    }
  } catch (e) {
    yield put(actions.errorHolidayList('Error Occurs !!'));
    console.warn('Some error found in requestHolidayList action\n', e);
  }
}
