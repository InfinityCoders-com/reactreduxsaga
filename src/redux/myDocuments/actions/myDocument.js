import {createAction} from 'redux-actions';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import * as constants from 'appRedux/constants';

// ---------get user document

export function success_my_document (data) {
  return createAction(constants.ACTION_SUCCESS_MY_DOCUMENT)(data);
}
export function error_my_document (data) {
  return createAction(constants.ACTION_ERROR_MY_DOCUMENT)(data);
}

function async_getMyDocument () {
  return fireAjax('POST', '', {
    'action': 'get_user_document'
  });
}

export function getMyDocument () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_getMyDocument().then(

			(json) => {
  dispatch(hide_loading());
  if (json.error === 0) {
    dispatch(success_my_document(json.data));
					// resolve('disabled')
  } else {
    dispatch(error_my_document(json.data.message));
					// reject('response with Error')
  }
},
			(error) => {
  dispatch(hide_loading()); // hide loading icon
  dispatch(error_my_document('error occurs!!!'));
				// reject('error occurs!!')
}
			);
    });
  };
}
// ------Delete user document
function async_deleteDocument (doc_id) {
  return fireAjax('POST', '', {
    'action': 'delete_user_document',
    'id':     doc_id
  });
}

export function deleteDocument (doc_id) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_deleteDocument(doc_id).then(
        (json) => {
          dispatch(hide_loading());
          if (json.error === 0) {
            resolve(json.data.message);
          } else {
            reject(json.data.message);
          }
        },
        (error) => {
          dispatch(hide_loading()); // hide loading icon
          reject('error occurs!!');
        }
			);
    });
  };
}
