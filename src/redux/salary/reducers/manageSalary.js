import Immutable from 'immutable';

let initialState = {
  'status_message':   '',
  'salary_structure': {}
};

export function manageSalary (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_USER_SALARY_DETAILS') {
    return state.set('salary_structure', action.payload);
  } else if (action.type === 'ACTION_EMPTY_USER_SALARY_DETAILS') {
    return state.set('salary_structure', action.payload);
  } else if (action.type === 'ACTION_SUCCESS_ADD_USER_SALARY') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_error_ADD_USER_SALARY') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_SUCCESS_ADD_USER_HOLDING') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_ERROR_ADD_USER_HOLDING') {
    return state.set('status_message', action.payload);
  } else {
    return state.set('status_message', '');
  }
}
