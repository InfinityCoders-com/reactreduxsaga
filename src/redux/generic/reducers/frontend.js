import Immutable from 'immutable';

let initialState = {
  show_loading:         '',
  form_login_status:    '',
  form_adduser_status:  '',
  form_addpoll_title:   '',
  form_addpoll_options: Immutable.List([]),
  form_addpoll_status:  '',
  poll_vote_status:     '',
  voted_poll_ids:       Immutable.List([]),
  edit_poll_status:     ''
};

export function frontend (state = Immutable.Map(initialState), action) {
  if (action.type === 'ACTION_SHOW_LOADING') {
    return state.set('show_loading', '1');
  } else if (action.type === 'ACTION_HIDE_LOADING') {
    return state.set('show_loading', '');
  }	else if (action.type === 'ACTION_FORM_ADD_USER_STATUS_SUCCESS') {
    return state.set('form_adduser_status', action.payload);
  } else if (action.type === 'ACTION_FORM_ADD_USER_STATUS_FAIL') {
    return state.set('form_adduser_status', action.payload);
  } else if (action.type === 'ACTION_FRONTEND_ADD_POLL_OPTION') {
    let ss = state.get('form_addpoll_options');
    return state.set('form_addpoll_options', ss.push(action.payload));
  } else if (action.type === 'ACTION_FRONTEND_DELETE_ADD_POLL_OPTION') {
    let ss = state.get('form_addpoll_options');
    return state.set('form_addpoll_options', ss.delete(action.payload));
  } else if (action.type === 'ACTION_ADD_POLL_STATUS_SUCCESS') {
    // let ss = state.get('form_addpoll_options')
    return state.set('form_addpoll_options', Immutable.List([]))
    .set('form_addpoll_status', action.payload);
  } else if (action.type === 'ACTION_POLL_VOTE_SUCCESS') {
    return state.set('poll_vote_status', action.payload);
  } else if (action.type === 'ACTION_POLL_VOTE_FAIL') {
    return state.set('poll_vote_status', action.payload);
  } else if (action.type === 'ACTION_POLL_VOTE_ERROR') {
    return state.set('poll_vote_status', action.payload);
  } else if (action.type === 'ACTION_UPDATE_VOTED_POLLS_ID') {
    let ss = state.get('voted_poll_ids');
    return state.set('voted_poll_ids', ss.push(action.payload));
  } else if (action.type === 'ACTION_NEW_OPTION_ADDED_SUCCESS') {
    return state.set('edit_poll_status', action.payload);
  } else if (action.type === 'ACTION_NEW_OPTION_ADDED_FAIL') {
    return state.set('edit_poll_status', action.payload);
  } else if (action.type === 'ACTION_NEW_OPTION_ADDED_ERROR') {
    return state.set('edit_poll_status', action.payload);
  } else if (action.type === 'ACTION_DELETE_POLL_OPTION_SUCCESS') {
    return state.set('edit_poll_status', action.payload);
  } else if (action.type === 'ACTION_DELETE_POLL_OPTION_FAIL') {
    return state.set('edit_poll_status', action.payload);
  } else if (action.type === 'ACTION_DELETE_POLL_OPTION_ERROR') {
    return state.set('edit_poll_status', action.payload);
  } else if (action.type === 'ACTION_UPDATE_POLL_TITLE_SUCCESS') {
    return state.set('edit_poll_status', action.payload);
  } else if (action.type === 'ACTION_UPDATE_POLL_TITLE_FAIL') {
    return state.set('edit_poll_status', action.payload);
  } else if (action.type === 'ACTION_UPDATE_POLL_TITLE_ERROR') {
    return state.set('edit_poll_status', action.payload);
  } else if (action.type === 'ACTION_DELETE_POLL_SUCCESS') {
    return state.set('form_addpoll_status', action.payload);
  } else if (action.type === 'ACTION_DELETE_POLL_FAIL') {
    return state.set('form_addpoll_status', action.payload);
  } else {
    return state;
  }
}
