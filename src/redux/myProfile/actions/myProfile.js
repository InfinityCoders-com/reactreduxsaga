import {createAction} from 'redux-actions';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import * as constants from 'appRedux/constants';

export function success_my_profile (data) {
  return createAction(constants.ACTION_SUCCESS_MY_PROFILE)(data);
}
export function empty_my_profile (data) {
  return createAction(constants.ACTION_EMPTY_MY_PROFILE)(data);
}
export function error_my_profile (data) {
  return createAction(constants.ACTION_ERROR_MY_PROFILE)(data);
}

function async_getMyProfileDetails () {
  return fireAjax('POST', '', {'action': 'get_user_profile_detail'});
}

export function getMyProfileDetails () {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(show_loading()); // show loading icon
      async_getMyProfileDetails().then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(success_my_profile(json.data));
        } else {
          dispatch(empty_my_profile(json.data.message));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_my_profile('error occurs!!!'));
      });
    });
  };
}
// -------update profile details

export function success_update_profile_details (data) {
  return createAction(constants.ACTION_SUCCESS_UPDATE_PROFILE_DETAILS)(data);
}
export function error_update_profile_details (data) {
  return createAction(constants.ACTION_ERROR_UPDATE_PROFILE_DETAILS)(data);
}

function async_updateProfileDetails (n_marital_status, n_dob, n_address1, n_address2, n_em_contact1, n_em_contact2, n_blood_group, n_medical_con, n_emp_email) {
  return fireAjax('POST', '', {
    'action':            'update_user_profile_detail',
    'permanent_address': n_address2,
    'current_address':   n_address1,
    'emergency_ph1':     n_em_contact1,
    'emergency_ph2':     n_em_contact2,
    'blood_group':       n_blood_group,
    'medical_condition': n_medical_con,
    'dob':               n_dob,
    'marital_status':    n_marital_status,
    'other_email':       n_emp_email
  });
}

export function updateProfileDetails (new_profile_details) {
  return function (dispatch, getState) {
    let n_marital_status = '';
    let n_dob = '';
    let n_address1 = '';
    let n_address2 = '';
    let n_em_contact1 = '';
    let n_em_contact2 = '';
    let n_blood_group = '';
    let n_medical_con = '';
    let n_emp_email = '';

    if (typeof new_profile_details.marital_status !== 'undefined') {
      n_marital_status = new_profile_details.marital_status;
    }
    if (typeof new_profile_details.dob !== 'undefined') {
      n_dob = new_profile_details.dob;
    }
    if (typeof new_profile_details.address1 !== 'undefined') {
      n_address1 = new_profile_details.address1;
    }
    if (typeof new_profile_details.address2 !== 'undefined') {
      n_address2 = new_profile_details.address2;
    }
    if (typeof new_profile_details.emr_con_1 !== 'undefined') {
      n_em_contact1 = new_profile_details.emr_con_1;
    }
    if (typeof new_profile_details.emr_con_2 !== 'undefined') {
      n_em_contact2 = new_profile_details.emr_con_2;
    }
    if (typeof new_profile_details.blood_group !== 'undefined') {
      n_blood_group = new_profile_details.blood_group;
    }
    if (typeof new_profile_details.medical_con !== 'undefined') {
      n_medical_con = new_profile_details.medical_con;
    }

    if (typeof new_profile_details.emp_email !== 'undefined') {
      n_emp_email = new_profile_details.emp_email;
    }

    if (n_marital_status.trim() === '') {
      return Promise.reject('Marital status is empty');
    }
    if (n_dob.trim() === '') {
      return Promise.reject('Date of birth is empty');
    }
    if (n_address1.trim() === '') {
      return Promise.reject('Current address is empty');
    }
    if (n_address2.trim() === '') {
      return Promise.reject('Permanent address is empty');
    }
    if (n_em_contact1.trim() === '') {
      return Promise.reject('Emmergency contact 1 is empty');
    }
    if (n_em_contact2.trim() === '') {
      return Promise.reject('Emmergency contact 2 is empty');
    }
    if (n_blood_group.trim() === '') {
      return Promise.reject('Blood group not selected');
    }
    if (n_medical_con.trim() === '') {
      return Promise.reject('Any medical conditions is empty');
    }

    if (n_emp_email.trim() === '') {
      return Promise.reject('Personal email is empty');
    }

    return new Promise((reslove, reject) => {
      dispatch(show_loading()); // show loading icon
      async_updateProfileDetails(
        n_marital_status,
        n_dob, n_address1,
        n_address2,
        n_em_contact1,
         n_em_contact2,
        n_blood_group,
        n_medical_con,
       n_emp_email
      ).then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(getMyProfileDetails());
          dispatch(success_update_profile_details(json.data.message));
        } else {
          dispatch(error_update_profile_details(json.data.message));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_update_profile_details('error occurs!!!'));
      });
    });
  };
}

// -------update bank details

export function success_update_bank_details (data) {
  return createAction(constants.ACTION_SUCCESS_UPDATE_BANK_DETAILS)(data);
}
export function error_update_bank_details (data) {
  return createAction(constants.ACTION_ERROR_UPDATE_BANK_DETAILS)(data);
}

function async_updateBankDetails (n_bank_account_no, n_bank_name, n_bank_address, n_ifsc) {
  return fireAjax('POST', '', {
    'action':          'update_user_bank_detail',
    'bank_account_no': n_bank_account_no,
    'bank_name':       n_bank_name,
    'bank_address':    n_bank_address,
    'ifsc':            n_ifsc
  });
}

export function updateBankDetails (new_bank_details) {
  return function (dispatch, getState) {
    let n_bank_name = '';
    let n_bank_address = '';
    let n_bank_account_no = '';
    let n_ifsc = '';

    if (typeof new_bank_details.bank_account_no !== 'undefined') {
      n_bank_account_no = new_bank_details.bank_account_no;
    }
    if (typeof new_bank_details.bank_name !== 'undefined') {
      n_bank_name = new_bank_details.bank_name;
    }
    if (typeof new_bank_details.bank_address !== 'undefined') {
      n_bank_address = new_bank_details.bank_address;
    }
    if (typeof new_bank_details.ifsc !== 'undefined') {
      n_ifsc = new_bank_details.ifsc;
    }
    if (n_bank_account_no === '') {
      return Promise.reject('Account number is empty');
    }
    if (n_bank_name === '') {
      return Promise.reject('Bank name is empty');
    }
    if (n_bank_address === '') {
      return Promise.reject('Bank address is empty');
    }
    if (n_ifsc === '') {
      return Promise.reject('IFSC is empty');
    }
    return new Promise((reslove, reject) => {
      dispatch(show_loading()); // show loading icon
      async_updateBankDetails(n_bank_account_no, n_bank_name, n_bank_address, n_ifsc).then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(getMyProfileDetails());
          dispatch(success_update_bank_details(json.data.message));
        } else {
          dispatch(error_update_bank_details(json.data.message));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_update_bank_details('error occurs!!!'));
      });
    });
  };
}

// -------update password

export function success_update_password (data) {
  return createAction(constants.ACTION_SUCCESS_UPDATE_PASSWORD)(data);
}
export function error_update_password (data) {
  return createAction(constants.ACTION_ERROR_UPDATE_PASSWORD)(data);
}

function async_updatePassword (n_new_password) {
  return fireAjax('POST', '', {
    'action':   'update_new_password',
    'password': n_new_password
  });
}

export function updatePassword (new_password) {
  return function (dispatch, getState) {
    let n_new_password = '';

    if (typeof new_password !== 'undefined' && new_password != '') {
      n_new_password = new_password;
    }

    if (n_new_password === '') {
      return Promise.reject('New Password is empty!!');
    }

    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_updatePassword(n_new_password).then((json) => {
        dispatch(hide_loading()); // hide loading icon

        if (typeof json.error !== 'undefined' && json.error == 0) {
          dispatch(success_update_password(json.data.message));
          resolve(json.data.message);
        } else {
          dispatch(error_update_password(json.data.message));
          reject(json.data.message);
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_update_password('error occurs!!!'));
        reject('error occurs!!!');
      });
    });
  };
}

// ------update document
function async_updateDocument (document_type, document_link, declearation) {
  let data = {
    'action':        'insert_user_document',
    'document_type': document_type,
    'document_link': document_link,
    'declearation':  declearation
  };
  return fireAjax('POST', '', data);
}

export function updateDocument (documents_link) {
  return function (dispatch, getState) {
    let document_type = '';
    let document_link = '';
    let declearation = documents_link.declearation;

    if (typeof documents_link.doc_type === 'undefined' || documents_link.doc_type == '') {
      return Promise.reject('Select document type');
    } else {
      document_type = documents_link.doc_type;
    }
    if (typeof documents_link.doc_link === 'undefined' || documents_link.doc_link.length == 0) {
      return Promise.reject('Enter document link');
    } else {
      document_link = documents_link.doc_link;
    }
    return new Promise((reslove, reject) => {
      _.map(document_link, (link) => {
        async_updateDocument(document_type, link, declearation).then((json) => {
          if (json.error == 0) {
            resolve('Document updated successfully');
          } else {
            reject('Response with error 1');
          }
        }, (error) => {
          reject('error occurs!!!');
        });
      });
    });
  };
}
