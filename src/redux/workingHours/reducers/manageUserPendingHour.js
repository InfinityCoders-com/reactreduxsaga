import Immutable from 'immutable';

let initialState = {
  status_message: '',
  year:           '',
  monthName:      '',
  nextMonth:      {},
  previousMonth:  {},
  displayData:    [],
  userInfo:       []
};

export function manageUserPendingHours (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_USER_PENDING_HOURS') {
    return state.set('displayData', action.payload)
    .set('userInfo', action.payload.user_list)
    .set('year', action.payload.year)
    .set('monthName', action.payload.monthName)
    .set('nextMonth', action.payload.nextMonth)
    .set('previousMonth', action.payload.previousMonth)
    .set('status_message', '');
  } else if (action.type === 'ACTION_EMPTY_USER_PENDING_HOURS') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_ERROR_USER_PENDING_HOURS') {
    return state.set('status_message', '');
  } else if (action.type === 'ACTION_ERROR_ADD_USER_PENDING_HOURS') {
    return state.set('status_message', action.payload);
  } else {
    return state.set('status_message', '');
  }
}
