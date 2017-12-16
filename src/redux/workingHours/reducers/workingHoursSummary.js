import Immutable from 'immutable';

let initialState = {
  status_message: '',
  month:          '',
  year:           '',
  monthName:      '',
  nextMonth:      {},
  previousMonth:  {},
  monthSummary:   []
};

export function workingHoursSummary (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_HOURS_SUMMARY') {
    return state.set('month', action.payload.month)
        .set('year', action.payload.year)
        .set('monthName', action.payload.monthName)
        .set('monthSummary', action.payload.monthSummary)
        .set('nextMonth', action.payload.nextMonth)
        .set('previousMonth', action.payload.previousMonth)
        .set('status_message', '');
  } else if (action.type === 'ACTION_EMPTY_HOURS_SUMMARY' || action.type === 'ACTION_EMPTY_UPDATE_HOURS_SUMMARY') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_ERROR_HOURS_SUMMARY') {
    return state.set('status_message', '');
  } else {
    return state.set('status_message', '');
  }
}
