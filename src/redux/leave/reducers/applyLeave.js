import Immutable from 'immutable';

let initialState = {
  'status_message':      '',
  'count_working_days':  '',
  'count_holidays':      '',
  'count_weekends':      '',
  'days_between_leaves': [],
  'start_date':          '',
  'end_date':            ''

};

export function applyLeave (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_LEAVE_SUCCESS') {
    return state.set('status_message', action.payload)
        .set('count_working_days', '')
        .set('count_holidays', '')
        .set('count_weekends', '')
        .set('days_between_leaves', '')
        .set('end_date', '');
  } else if (action.type === 'ACTION_LEAVE_FAIL') {
    return state.set('status_message', action.payload)
        .set('count_working_days', '')
        .set('count_holidays', '')
        .set('count_weekends', '')
        .set('days_between_leaves', '')
        .set('end_date', '');
  } else if (action.type === 'ACTION_LEAVE_ERROR') {
    return state.set('status_message', action.payload)
        .set('count_working_days', '')
        .set('count_holidays', '')
        .set('count_weekends', '')
        .set('days_between_leaves', '')
        .set('end_date', '');
  } else if (action.type === 'ACTION_DAYS_BETWEEN_LEAVES_SUCCESS') {
    return state.set('count_working_days', action.payload.working_days)
        .set('count_holidays', action.payload.holidays)
        .set('count_weekends', action.payload.holidays)
        .set('days_between_leaves', action.payload.days)
        .set('start_date', action.payload.start_date)
        .set('end_date', action.payload.end_date)
        .set('status_message', '');
  } else {
    return state.set('status_message', '')
        .set('count_working_days', '')
        .set('count_holidays', '')
        .set('count_weekends', '')
        .set('days_between_leaves', '')
        .set('end_date', '');
  }
}
