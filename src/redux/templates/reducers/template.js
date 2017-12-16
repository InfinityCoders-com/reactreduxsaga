import Immutable from 'immutable';

let initialState = {
  'status_message': '',
  'variable':       [],
  'templates':      []
};

export function template (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_VARIABLE_GET') {
    return state.set('variable', action.payload);
  } else if (action.type === 'ACTION_SUCCESS_ADD_VARIABLE') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_ERROR_ADD_VARIABLE') {
    return state.set('status_message', action.payload);
  } else if (action.type === 'ACTION_SUCCESS_GET_TEMPLATES') {
    return state.set('templates', action.payload);
  } else {
    return state.set('status_message', '');
  }
}
