import {createAction} from 'redux-actions';
import {fireAjax} from 'src/services/index';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import * as constants from 'appRedux/constants';

export function successAddNewRole (data) {
  return createAction(constants.ACTION_SUCCESS_ADD_ROLE)(data);
}

export function errorAddNewRole (data) {
  return createAction(constants.ACTION_ERROR_ADD_ROLE)(data);
}

function asyncAddNewRole (baseRoleId, name, description) {
  return fireAjax('POST', '', {
    'action':       'add_roles',
    'base_role_id': baseRoleId,
    'name':         name,
    'description':  description
  });
}

export function addNewRole (new_role) {
  return function (dispatch, getState) {
    let baseRoleId = new_role.baseRoleId;
    let name = '';
    let description = '';

    if (typeof new_role.name === 'undefined' || new_role.name == '') {
      return Promise.reject('Name is empty');
    } else {
      name = new_role.name;
    }

    if (typeof new_role.description === 'undefined' || new_role.description == '') {
      return Promise.reject('Description is empty');
    } else {
      description = new_role.description;
    }

    return new Promise(() => {
      dispatch(show_loading());
      asyncAddNewRole(baseRoleId, name, description).then((json) => {
        dispatch(hide_loading());
        if (json.error == 0) {
          dispatch(successAddNewRole(json.message));
          dispatch(getRolesList());
        } else {
          dispatch(errorAddNewRole(json.message));
        }
      }, (error) => {
        dispatch(hide_loading());
        dispatch(errorAddNewRole('error occurs!!!'));
        reject('error occurs!!!');
      });
    });
  };
}

export function successRolesList (data) {
  return createAction(constants.ACTION_SUCCESS_LIST_ROLES)(data);
}

export function emptyRolesList (data) {
  return createAction(constants.ACTION_EMPTY_LIST_ROLES)(data);
}

export function errorRolesList (data) {
  return createAction(constants.ACTION_ERROR_LIST_ROLES)(data);
}

function asyncGetRolesList () {
  return fireAjax('POST', '', {
    'action': 'list_all_roles'
  });
}

export function getRolesList () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      asyncGetRolesList().then((json) => {
        dispatch(hide_loading());
        if (json.error == 0) {
          dispatch(successRolesList(json.data));
        } else {
          dispatch(emptyRolesList([]));
        }
      }, (error) => {
        dispatch(hide_loading());
        dispatch(errorRolesList([]));
      }
			);
    });
  };
}

export function successUpdateRoles (data) {
  return createAction(constants.ACTION_SUCCESS_UPDATE_ROLES)(data);
}
export function errorUpdateRoles (data) {
  return createAction(constants.ACTION_ERROR_UPDATE_ROLES)(data);
}

function asyncUpdateRoles (notificationId, rolesId, actionId, pageId) {
  return fireAjax('POST', '', {
    'action':          'update_role',
    'role_id':         rolesId,
    'page_id':         pageId,
    'action_id':       actionId,
    'notification_id': notificationId
  });
}

export function updateRoles (roleUpdateDetails) {
  return function (dispatch, getState) {
    let rolesId = '';
    let actionId = '';
    let pageId = '';
    let notificationId = '';

    if (typeof roleUpdateDetails.notificationId !== 'undefined') { notificationId = roleUpdateDetails.notificationId; }
    if (typeof roleUpdateDetails.rolesId !== 'undefined') { rolesId = roleUpdateDetails.rolesId; }
    if (typeof roleUpdateDetails.actionId !== 'undefined') { actionId = roleUpdateDetails.actionId; }
    if (typeof roleUpdateDetails.pageId !== 'undefined') { pageId = roleUpdateDetails.pageId; }

    if (rolesId.trim() === '') { return Promise.reject('User id is empty'); }

    return new Promise(() => {
      dispatch(show_loading());
      asyncUpdateRoles(notificationId, rolesId, actionId, pageId).then((json) => {
        dispatch(hide_loading());
        if (json.error == 0) {
          dispatch(getRolesList());
          dispatch(successUpdateRoles(json.message));
        } else {
          dispatch(errorUpdateRoles(json.message));
        }
      }, (error) => {
        dispatch(hide_loading());
        dispatch(errorUpdateRoles('error occurs!!!'));
      });
    });
  };
}

export function successUpdateUserRole (data) {
  return createAction(constants.ACTION_SUCCESS_UPDATE_USER_ROLES)(data);
}
export function errorUpdateUserRole (data) {
  return createAction(constants.ACTION_ERROR_UPDATE_USER_ROLES)(data);
}

function asyncUpdateUserRole (userId, roleId) {
  return fireAjax('POST', '', {
    'action':  'assign_user_role',
    'user_id': userId,
    'role_id': roleId
  });
}

export function updateUserRole (userRoleUpdateDetails) {
  return function (dispatch, getState) {
    let roleId = '';
    let userId = '';

    if (typeof userRoleUpdateDetails.roleId !== 'undefined') { roleId = userRoleUpdateDetails.roleId; }
    if (typeof userRoleUpdateDetails.userId !== 'undefined') { userId = userRoleUpdateDetails.userId; }

    if (roleId.trim() === '') { return null; }
    if (userId.trim() === '') { return Promise.reject('User id is empty'); }

    return new Promise(() => {
      dispatch(show_loading());
      asyncUpdateUserRole(userId, roleId).then((json) => {
        dispatch(hide_loading());
        if (json.error == 0) {
          dispatch(successUpdateUserRole(json.message));
        } else {
          dispatch(errorUpdateUserRole(json.message));
        }
      }, (error) => {
        dispatch(hide_loading());
        dispatch(errorUpdateUserRole('error occurs!!!'));
      });
    });
  };
}

function asyncDeleteRole (id) {
  return fireAjax('POST', '', {
    'action':  'delete_role',
    'role_id': id
  });
}

export function deleteRole (id) {
  return function (dispatch, getState) {
    if (typeof id === 'undefined' || id == '') { return Promise.reject('Delete Id is empty'); }
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      asyncDeleteRole(id).then((json) => {
        dispatch(hide_loading());
        if (json.error == 0) {
          resolve(json.message);
          dispatch(getRolesList());
        } else {
          reject(json.message);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject('error occurs!!!');
      });
    });
  };
}
