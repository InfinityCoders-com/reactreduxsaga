import _ from 'lodash';
import * as jwt from 'jwt-simple';
import {CONFIG} from 'src/config/index';

export function isNotUserValid (path, loggedUser) {
  let tokenData = getLoggedUser().data || [];

  let isEmpty = _.isEmpty(_.find(tokenData.role_pages, ['page_name', path]));
  if (!loggedUser.isLoggedIn) {
    return {status: true, redirectTo: '/logout'};
  } else if (loggedUser.data.is_policy_documents_read_by_user === 0) {
    return {status: true, redirectTo: '/policy_documents'};
  } else if (isEmpty) {
    return {status: true, redirectTo: '/' + tokenData.role_pages && tokenData.role_pages[0].page_name};
  } else {
    return {status: false, redirectTo: ''};
  }
}

export function setLoggedUser (token, userid) {
  localStorage.setItem('userToken', token);
  localStorage.setItem('userid', userid);
  return jwt.decode(token, CONFIG.jwt_secret_key);
}

export function getLoggedUser () {
  const token = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userid');
  if (_.isUndefined(token) || _.isEmpty(token) || _.isNull(token)) {
    return {token: false, userId: false, data: false};
  }
  return {token, userId, data: jwt.decode(token, CONFIG.jwt_secret_key)};
}

export function getToken () {
  return localStorage.getItem('userToken');
}

export function resetLoggedUser () {
  return localStorage.clear();
}

export function getLowerCase (text) {
  return text.trim().toLowerCase();
}
