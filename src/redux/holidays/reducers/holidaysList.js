import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'appRedux/constants';
import 'appRedux/update';

let initialState = {
  holidaysList: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
};

const requestHolidaysList = (state, action) => update(state, {
  holidaysList: {$setRequestLoading: null}
});
const successHolidaysList = (state, action) => update(state, {
  holidaysList: {$setRequestSuccess: action.payload}
});
const errorHolidaysList = (state, action) => update(state, {
  holidaysList: {$setRequestError: action.payload}
});

export default handleActions({
  [constants.REQUEST_HOLIDAYSLIST]: requestHolidaysList,
  [constants.SUCCESS_HOLIDAYSLIST]: successHolidaysList,
  [constants.ERROR_HOLIDAYSLIST]:   errorHolidaysList
}, initialState);
