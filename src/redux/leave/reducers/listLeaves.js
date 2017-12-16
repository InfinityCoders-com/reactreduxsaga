import Immutable from 'immutable';

let initialState = {
  all_leaves:    [],
  leaves:        [],
  selectedLeave: {}
};

export function listLeaves (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_LIST_LEAVES_SUCCESS') {
    return state.set('all_leaves', action.payload.leaves);
  } else if (action.type === 'ACTION_LIST_LEAVES_EMPTY') {
    return state;
  } else if (action.type === 'ACTION_LIST_LEAVES_ERROR') {
    return state;
  } else {
    return state;
  }
}
