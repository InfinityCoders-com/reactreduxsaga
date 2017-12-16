import Immutable from 'immutable';

let initialState = {
  'users':          [],
  'disabled_users': []
};

export function usersList (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_USERSLIST') {
    return state.set('users', action.payload);
  } else if (action.type === 'ACTION_EMPTY_USERSLIST') {
    return state.set('users', action.payload);
  } else if (action.type === 'ACTION_ERROR_USERSLIST') {
    return state.set('users', action.payload);
  } else if (action.type === 'ACTION_SUCCESS_DISABLED_USERSLIST') {
    return state.set('disabled_users', action.payload);
  } else if (action.type === 'ACTION_ERROR_DISABLED_USERSLIST') {
    return state.set('disabled_users', action.payload);
  } else {
    return state;
  }
}
