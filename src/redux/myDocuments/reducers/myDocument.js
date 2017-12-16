import Immutable from 'immutable';

let initialState = {
  'status_message': '',
  'my_document':    []
};

export function myDocument (state = Immutable.fromJS(initialState), action) {
  if (action.type === 'ACTION_SUCCESS_MY_DOCUMENT') {
    return state.set('my_document', action.payload.user_document_info)
                    .set('status_message', '');
  } else if (action.type === 'ACTION_ERROR_MY_DOCUMENT') {
    return state.set('status_message', action.payload)
                    .set('my_document', []);
  } else {
    return state;
  }
}
