import Immutable from 'immutable';

let initialState = {
  status_message: ''
};

export function manageLeave (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_LEAVE_STATUS_CHANGE_SUCCESS') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_LEAVE_STATUS_CHANGE_FAIL') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_LEAVE_STATUS_CHANGE_ERROR') {
    return state.set('status_message', action.payload);
  } else {
    return state.set('status_message', '');
  }
}
