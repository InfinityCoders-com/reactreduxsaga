import {handleActions} from 'redux-actions';
import * as constants from 'appRedux/constants';
import update from 'immutability-helper';
import 'appRedux/update';

let initialState = {
  allResult: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
};

const requestAllSearchResult = (state, action) => update(state, {
  allResult: {$setRequestLoading: null}
});

const successAllSearchResult = (state, action) => update(state, {
  allResult: {$setRequestSuccess: action.payload}
});

const errorAllSearchResult = (state, action) => update(state, {
  allResult: {$setRequestError: action.payload}
});

export default handleActions({
  [constants.REQUEST_ALL_SEARCH_RESULT]: requestAllSearchResult,
  [constants.SUCCESS_ALL_SEARCH_RESULT]: successAllSearchResult,
  [constants.ERROR_ALL_SEARCH_RESULT]:   errorAllSearchResult
}, initialState);
