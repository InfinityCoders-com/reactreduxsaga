import Immutable from 'immutable';

let initialState = {
  userProfileImage: '',
  userName:         '',
  userjobtitle:     '',
  userid:           '',
  month:            '',
  year:             '',
  monthName:        '',
  nextMonth:        {},
  previousMonth:    {},
  monthSummary:     {},
  attendance:       []
};

export function monthlyAttendance (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_USER_ATTENDANCE') {
    return state.set('userName', action.payload.userName)
        .set('userProfileImage', action.payload.userProfileImage)
        .set('userjobtitle', action.payload.userjobtitle)
        .set('userid', action.payload.userid)
        .set('month', action.payload.month)
        .set('year', action.payload.year)
        .set('monthName', action.payload.monthName)
        .set('monthSummary', action.payload.monthSummary)
        .set('nextMonth', action.payload.nextMonth)
        .set('previousMonth', action.payload.previousMonth)
        .set('attendance', action.payload.attendance);
  } else if (action.type === 'ACTION_EMPTY_USER_ATTENDANCE') {
    return state;
  } else if (action.type === 'ACTION_ERROR_USER_ATTENDANCE') {
    return state;
  } else {
    return state;
  }
}
