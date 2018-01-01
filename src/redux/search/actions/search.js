import {fireAjax} from 'src/services/index';
import {call, put} from 'redux-saga/effects';
import * as actions from 'appRedux/actions';

export function* getAllSearchResult (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'get_all_search_result'
    });
    if (response.error === 0) {
      yield put(actions.successAllSearchResult(response.data));
    } else {
      yield put(actions.errorAllSearchResult(response.message));
    }
  } catch (e) {
    yield put(actions.errorTeamList('Error Occurs !!'));
    console.warn('Some error found in "get_all_search_result" Request action\n', e);
  }
}

export function* addSubmitNewIssue (action) {
  try {
    const response = yield call(fireAjax, 'POST', '', {
      'action': 'add_new_search_issue',
      'data':   action.payload
    });
    if (response.error === 0) {
      yield put(actions.successAddNewIssue(response.data));
    } else {
      yield put(actions.errorAddNewIssue(response.message));
    }
  } catch (e) {
    yield put(actions.errorAddNewIssue('Error Occurs !!'));
    console.warn('Some error found in "add_new_search_issue" Request action\n', e);
  }
}
