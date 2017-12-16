import {createAction} from 'redux-actions';
import {fireAjax} from 'src/services/index';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import * as constants from 'appRedux/constants';
// -------add New machine

export function success_add_new_machine (data) {
  return createAction(constants.ACTION_SUCCESS_ADD_NEW_MACHINE)(data);
}

export function error_add_new_machine (data) {
  return createAction(constants.ACTION_ERROR_ADD_NEW_MACHINE)(data);
}

function async_addNewMachine (
  n_machine_type,
  n_machine_name,
  n_machine_price,
  n_serial_no,
  n_purchase_date,
  n_mac_address,
  n_operating_system,
  n_status,
  n_comment,
  n_warranty,
  n_warranty_comment,
  n_repair_comment,
  n_bill_no,
  n_user_Id

) {
  return fireAjax('POST', '', {
    'action':           'add_office_machine',
    'machine_type':     n_machine_type,
    'machine_name':     n_machine_name,
    'machine_price':    n_machine_price,
    'serial_no':        n_serial_no,
    'purchase_date':    n_purchase_date,
    'mac_address':      n_mac_address,
    'operating_system': n_operating_system,
    'status':           n_status,
    'comment':          n_comment,
    'warranty':         n_warranty,
    'warranty_comment': n_warranty_comment,
    'repair_comment':   n_repair_comment,
    'bill_no':          n_bill_no,
    'user_id':          n_user_Id
  });
}

export function addNewMachine (new_machine_details) {
  return function (dispatch, getState) {
    let n_machine_type = '';
    let n_machine_name = '';
    let n_machine_price = '';
    let n_serial_no = '';
    let n_purchase_date = '';
    let n_mac_address = '';
    let n_operating_system = '';
    let n_status = '';
    let n_comment = '';
    let n_warranty = '';
    let n_warranty_comment = '';
    let n_repair_comment = '';
    let n_bill_no = '';
    let n_user_Id = '';

    if (typeof new_machine_details.machine_type === 'undefined' || new_machine_details.machine_type === '') {
      return Promise.reject('Machine Type is empty');
    } else {
      n_machine_type = new_machine_details.machine_type;
    }

    if (typeof new_machine_details.machine_name === 'undefined' || new_machine_details.machine_name.trim() === '') {
      return Promise.reject('Machine Name is empty');
    } else {
      n_machine_name = new_machine_details.machine_name;
    }

    if (typeof new_machine_details.machine_price === 'undefined' || new_machine_details.machine_price.trim() === '') {
      return Promise.reject('Machine Price is empty');
    } else {
      n_machine_price = new_machine_details.machine_price;
    }

    if (typeof new_machine_details.serial_no === 'undefined' || new_machine_details.serial_no.trim() === '') {
      return Promise.reject('Serial Number is empty');
    } else {
      n_serial_no = new_machine_details.serial_no;
    }

    if (typeof new_machine_details.purchase_date === 'undefined' || new_machine_details.purchase_date === '') {
      return Promise.reject('Date of Purchase is empty');
    } else {
      n_purchase_date = new_machine_details.purchase_date;
    }

    if (typeof new_machine_details.mac_address === 'undefined') {
      return Promise.reject('Mac Address is empty');
    } else {
      n_mac_address = new_machine_details.mac_address;
    }

    if (typeof new_machine_details.operating_system === 'undefined') {
      return Promise.reject('Operating System is empty');
    } else {
      n_operating_system = new_machine_details.operating_system;
    }

    if (typeof new_machine_details.status === 'undefined' || new_machine_details.status === '') {
      return Promise.reject('Status is empty');
    } else {
      n_status = new_machine_details.status;
    }
    if (typeof new_machine_details.comment === 'undefined') {
      return Promise.reject('Comment is empty');
    } else {
      n_comment = new_machine_details.comment;
    }
    if (typeof new_machine_details.bill_no === 'undefined' || new_machine_details.bill_no.trim() === '') {
      return Promise.reject('Bill No is empty');
    } else {
      n_bill_no = new_machine_details.bill_no;
    }

    if (typeof new_machine_details.warranty === 'undefined' || new_machine_details.warranty === '') {
      return Promise.reject('Warranty Expire Date is empty');
    } else {
      n_warranty = new_machine_details.warranty;
    }

    if (typeof new_machine_details.warranty_comment === 'undefined') {
      return Promise.reject('Warranty Comment is empty');
    } else {
      n_warranty_comment = new_machine_details.warranty_comment;
    }

    if (typeof new_machine_details.repair_comment === 'undefined') {
      return Promise.reject('Repair Comment is empty');
    } else {
      n_repair_comment = new_machine_details.repair_comment;
    }
    if (typeof new_machine_details.user_Id === 'undefined' || new_machine_details.user_Id === '') {
      return Promise.reject('User Not Assign');
    } else {
      n_user_Id = new_machine_details.user_Id;
    }

    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_addNewMachine(n_machine_type,
        n_machine_name,
        n_machine_price,
        n_serial_no,
        n_purchase_date,
        n_mac_address,
        n_operating_system,
        n_status,
        n_comment,
        n_warranty,
        n_warranty_comment,
        n_repair_comment,
        n_bill_no,
        n_user_Id).then((json) => {
          dispatch(hide_loading());
          dispatch(deviceCount());
          if (json.error === 0) {
            dispatch(success_add_new_machine(json.message));
            dispatch(get_machines_detail());
            resolve(json.message);
          } else {
            dispatch(error_add_new_machine(json.message));
            reject(json.message);
          }
        }, (error) => {
          dispatch(hide_loading());
          dispatch(error_add_new_machine('error occurs!!!'));
          reject('error occurs!!!');
        });
    });
  };
}

// Get Devicelist

export function success_device_list (data) {
  return createAction(constants.ACTION_SUCCESS_DEVICE_LIST)(data);
}

export function empty_device_list (data) {
  return createAction(constants.ACTION_EMPTY_DEVICE_LIST)(data);
}

export function error_device_list (data) {
  return createAction(constants.ACTION_ERROR_DEVICE_LIST)(data);
}

function async_get_AllDevice () {
  return fireAjax('POST', '', {'action': 'get_machines_detail'});
}

export function get_machines_detail () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_AllDevice().then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(success_device_list(json.data));

          resolve(json.data);
        } else {
          dispatch(empty_device_list([]));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        dispatch(error_device_list([]));
      });
    });
  };
}

export function success_getDevice (data) {
  return createAction(constants.ACTION_SUCCESS_GET_DEVICELIST)(data);
}

function getAsync_getDeviceById (id) {
  return fireAjax('POST', '', {
    'action': 'get_machine',
    'id':     id
  });
}

export function getDeviceById (id) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_getDeviceById(id).then((res) => {
        dispatch(hide_loading());
        if (res.data) {
          resolve(res.data);
          dispatch(success_getDevice(res.data));
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}

export function success_updateDevice (data) {
  return createAction(constants.ACTION_SUCCESS_UPDATE_DEVICELIST)(data);
}

function getAsync_updateDeviceById (deviceId, data) {
  return fireAjax('POST', '', {
    'action':           'update_office_machine',
    'id':               deviceId,
    'machine_type':     data.machine_type,
    'machine_name':     data.machine_name,
    'machine_price':    data.machine_price,
    'serial_no':        data.serial_no,
    'purchase_date':    data.purchase_date,
    'mac_address':      data.mac_address,
    'operating_system': data.operating_system,
    'status':           data.status,
    'comment':          data.comment,
    'warranty':         data.warranty,
    'warranty_comment': data.warranty_comment,
    'repair_comment':   data.repair_comment,
    'bill_no':          data.bill_no,
    'user_id':          data.user_Id
  });
}

export function updateDevice (id, data) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_updateDeviceById(id, data).then((res) => {
        dispatch(hide_loading());
        if (res.error === 0) {
          dispatch(deviceCount());
          dispatch(get_machines_detail());
          dispatch(success_updateDevice(res.message));
          resolve(res.message);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}

export function success_deleteDevice (data) {
  return createAction(constants.ACTION_SUCCESS_DELETE_DEVICELIST)(data);
}

function getAsync_deleteDeviceById (deviceId) {
  return fireAjax('POST', '', {
    'action': 'remove_machine_detail',
    'id':     deviceId
  });
}

export function deleteDevice (id) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_deleteDeviceById(id).then((res) => {
        dispatch(deviceCount());
        dispatch(get_machines_detail());
        dispatch(hide_loading());
        if (res.error === 0) {
          dispatch(success_deleteDevice(res.message));
          resolve(res.message);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}

export function success_assignDevice (data) {
  return createAction(constants.ACTION_SUCCESS_ASSIGN_DEVICE)(data);
}

export function error_assignDevice (data) {
  return createAction(constants.ACTION_ERROR_ASSIGN_DEVICE)(data);
}

function getAsync_assignDeviceToUser (deviceId, user_Id) {
  return fireAjax('POST', '', {
    'action':     'assign_user_machine',
    'machine_id': deviceId,
    'user_id':    user_Id
  });
}

export function assignDevice (deviceId, id) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_assignDeviceToUser(deviceId, id).then((res) => {
        dispatch(hide_loading());
        resolve(res.message);// }
      }, (error) => {
        dispatch(hide_loading());
        dispatch(error_assignDevice('error occurs!!!'));
        reject('error occurs!!!');
      });
    });
  };
}

export function success_deviceType (data) {
  return createAction(constants.ACTION_SUCCESS_DEVICE_TYPE)(data);
}

export function error_deviceType (data) {
  return createAction(constants.ACTION_ERROR_DEVICE_TYPE)(data);
}

function getAsync_assignDeviceType (deviceList) {
  var newDevice = JSON.stringify(deviceList);

  return fireAjax('POST', '', {
    'action': 'add_machine_type',
    'type':   'machine_type',
    'value':  newDevice
  });
}

export function assignDeviceType (newDevice) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_assignDeviceType(newDevice).then((res) => {
        dispatch(getDeviceType());
        resolve(res);
        dispatch(hide_loading());
      }, (error) => {
        dispatch(hide_loading());
        dispatch(error_deviceType('error occurs!!!'));
        reject('error occurs!!!');
      });
    });
  };
}

// Device Type List
export function success_getDeviceType (data) {
  return createAction(constants.ACTION_SUCCESS_GET_DEVICE_TYPE_LIST)(data);
}

function getAsync_getDeviceType () {
  return fireAjax('POST', '', {
    'action': 'get_machine_type_list'
  });
}

export function getDeviceType () {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_getDeviceType().then((res) => {
        dispatch(hide_loading());
        if (res.data) {
          var list = JSON.parse(res.data.value);
          resolve(list);
          dispatch(success_getDeviceType(list));
        }
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}
// Device Status---

export function success_deviceStatus (data) {
  return createAction(constants.ACTION_SUCCESS_DEVICE_STATUS)(data);
}

export function error_deviceStatus (data) {
  return createAction(constants.ACTION_ERROR_DEVICE_STATUS)(data);
}

function getAsync_assignDeviceStatus (statusValue, colorValue) {
  // var statusNew = JSON.stringify(statusType)
  // var colors = JSON.stringify(background)
  return fireAjax('POST', '', {
    'action': 'add_machine_status',
    'type':   'machine_status',
    'status': statusValue,
    'color':  colorValue

  });
}

export function assignDeviceStatus (statusValue, colorValue) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_assignDeviceStatus(statusValue, colorValue).then((res) => {
        // dispatch(getDeviceStatus())
        resolve(res.data.message);
        dispatch(hide_loading());
      }, (error) => {
        dispatch(hide_loading());
        dispatch(error_deviceType('error occurs!!!'));
        reject('error occurs!!!');
      });
    });
  };
}

export function success_getDeviceStatus (data) {
  return createAction(constants.ACTION_SUCCESS_GET_DEVICE_STATUS_LIST)(data);
}

function getAsync_getDeviceStatus () {
  return fireAjax('POST', '', {
    'action': 'get_machine_status_list'
  });
}

export function getDeviceStatus () {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_getDeviceStatus().then((res) => {
        dispatch(hide_loading());
        resolve(res.data);
        dispatch(success_getDeviceStatus(res.data));
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}

export function success_deleteDeviceStatus (data) {
  return createAction(constants.ACTION_SUCCESS_DELETE_DEVICE_STATUS_LIST)(data);
}

function getAsync_deleteDeviceStatus (checkValue) {
  return fireAjax('POST', '', {
    'action': 'delete_machine_status',
    'status': checkValue
  });
}

export function deleteDeviceStatus (checkValue) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsync_deleteDeviceStatus(checkValue).then((res) => {
        dispatch(hide_loading());
        resolve(res);
        dispatch(success_deleteDeviceStatus(res));
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}
export function successDeviceCount (data) {
  return createAction(constants.ACTION_SUCCESS_DEVICE_COUNT)(data);
}

function getAsyncDeviceCount () {
  return fireAjax('POST', '', {
    'action': 'get_machine_count'
  });
}

export function deviceCount () {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading());
      return getAsyncDeviceCount().then((res) => {
        dispatch(hide_loading());
        resolve(res.data);
        dispatch(successDeviceCount(res.data));
      }, (error) => {
        dispatch(hide_loading());
        reject(error);
      });
    });
  };
}
