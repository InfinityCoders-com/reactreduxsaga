import Immutable from 'immutable';

let initialState = {
  'employee': []
};

export function empSalaryList (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_USER_SALARY_DETAILS') {
    return state.set('employee', action.payload);
  } else if (action.type === 'ACTION_EMPTY_USER_SALARY_DETAILS') {
    return state.set('employee', action.payload);
  } else if (action.type === 'ACTION_ERROR_USER_SALARY_DETAILS') {
    return state.set('employee', action.payload);
  } else {
    return state;
  }
}
