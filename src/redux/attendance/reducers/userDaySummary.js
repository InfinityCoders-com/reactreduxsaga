import Immutable from 'immutable';

let initialState = {
  'status_message': '',
  'name':           '',
  'profileImage':   '',
  'userid':         '',
  'year':           '',
  'month':          '',
  'monthName':      '',
  'date':           '',
  'day':            '',
  'entry_time':     '',
  'exit_time':      '',
  'total_working':  ''
};

export function userDaySummary (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_USER_DAY_SUMMARY') {
    return state.set('name', action.payload.name)
        .set('profileImage', action.payload.profileImage)
        .set('userid', action.payload.userid)
        .set('year', action.payload.year)
        .set('month', action.payload.month)
        .set('monthName', action.payload.monthName)
        .set('date', action.payload.date)
        .set('day', action.payload.day)
        .set('entry_time', action.payload.entry_time)
        .set('exit_time', action.payload.exit_time)
        .set('total_working', action.payload.total_working)
        .set('status_message', '');
  } else if (action.type === 'ACTION_EMPTY_USER_DAY_SUMMARY') {
    return state.set('status_message', '');
  } else if (action.type === 'ACTION_ERROR_USER_DAY_SUMMARY') {
    return state.set('status_message', '');
  } else if (action.type === 'ACTION_SUCCESS_UPDATE_USER_DAY_SUMMARY') {
    return state.set('name', action.payload.name)
        .set('profileImage', action.payload.profileImage)
        .set('userid', action.payload.userid)
        .set('year', action.payload.year)
        .set('month', action.payload.month)
        .set('monthName', action.payload.monthName)
        .set('date', action.payload.date)
        .set('day', action.payload.day)
        .set('entry_time', action.payload.entry_time)
        .set('exit_time', action.payload.exit_time)
        .set('total_working', action.payload.total_working)
        .set('status_message', '');
  } else if (action.type === 'ACTION_EMPTY_UPDATE_USER_DAY_SUMMARY') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_ERROR_UPDATE_USER_DAY_SUMMARY') {
    return state.set('status_message', '');
  } else {
    return state.set('status_message', '');
  }
}
