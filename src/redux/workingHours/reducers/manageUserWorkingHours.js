import Immutable from 'immutable';

let initialState = {
  status_message: '',
  displayData:    [],
  userInfo:       {}
};

export function manageUserWorkingHours (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_USER_WORKING_HOURS') {
    return state.set('displayData', action.payload.list)
        .set('userInfo', action.payload.userInfo)
        .set('status_message', action.payload.message);
  } else if (action.type === 'ACTION_EMPTY_USER_WORKING_HOURS') {
    return state.set('displayData', action.payload.list)
        .set('userInfo', action.payload.userInfo)
        .set('status_message', '');
  } else if (action.type === 'ACTION_ERROR_USER_WORKING_HOURS') {
    return state.set('status_message', '');
  } else if (action.type === 'ACTION_ERROR_ADD_USER_WORKING_HOURS') {
    return state.set('status_message', action.payload);
  } else {
    return state.set('status_message', '');
  }
}
