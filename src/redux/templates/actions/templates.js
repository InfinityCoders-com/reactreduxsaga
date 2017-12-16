import * as _ from 'lodash';
import {createAction} from 'redux-actions';
import {CONFIG} from 'src/config/index';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';
import 'whatwg-fetch';

// --------add new valiable-------

export function success_add_variable (data) {
  return createAction(constants.ACTION_SUCCESS_ADD_VARIABLE)(data);
}
export function error_add_varaible (data) {
  return createAction(constants.ACTION_ERROR_ADD_VARIABLE)(data);
}

function async_saveVariable (id, variable) {
  return fireAjax('POST', '', {
    action:        'create_template_variable',
    name:          variable.varCode,
    value:         variable.varValue,
    variable_type: variable.varType
  });
}

function async_editVariable (id, variable) {
  return fireAjax('POST', '', {
    action:        'update_template_variable',
    id:            id,
    name:          variable.varCode,
    value:         variable.varValue,
    variable_type: variable.varType
  });
}

export function saveVariable (id, variable) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      if (id == '') {
        async_saveVariable(id, variable).then((json) => {
          dispatch(hide_loading()); // hide loading icon
          if (json.error == 0) {
            dispatch(success_add_variable(json.data));
            dispatch(get_variable());
            resolve(json.data);
          } else {
            dispatch(error_add_varaible(json.error[0]));
          }
        },
        (error) => {
          dispatch(hide_loading()); // hide loading icon
          dispatch(error_add_varaible('error occurs'));
        }
);
      } else {
        async_editVariable(id, variable).then((json) => {
          dispatch(hide_loading()); // hide loading icon
          if (json.error == 0) {
            dispatch(success_add_variable(json.data));
            dispatch(get_variable());
            resolve(json.data);
          } else {
            dispatch(error_add_varaible(json.error[0]));
          }
        },
          (error) => {
            dispatch(hide_loading()); // hide loading icon
            dispatch(error_add_varaible('error occurs'));
          }
        );
      }
    });
  };
}

// ------------Get valiables---------

function async_get_variable () {
  return fireAjax('POST', '', {
    action: 'get_template_variable'
  });
}

export function success_variable_get (data) {
  return createAction(constants.ACTION_SUCCESS_VARIABLE_GET)(data);
}

export function get_variable () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_get_variable().then((json) => {
        dispatch(hide_loading());
        if (typeof json !== 'undefined' && json.length > 0) {
          let data = json;
          dispatch(success_variable_get(data));
          resolve(data);
        } else {
          dispatch(success_variable_get([]));
        }
      }, (error) => {
        dispatch(hide_loading());// hide loading icon
        dispatch(success_variable_get([]));
      }
			);
    });
  };
}

// ----------delete Variables---------------

function async_delete_variable (id) {
  return fireAjax('POST', '', {
    action: 'delete_template_variable',
    id:     id
  });
}

export function deleteVariable (id) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()); // show loading icon
      async_delete_variable(id).then((json) => {
        dispatch(hide_loading()); // hide loading icon
        if (json.error == 0) {
          dispatch(get_variable());
          resolve(json.data.message);
        } else {
          dispatch(get_variable());
          resolve(json.data.message);
        }
      }, (error) => {
        dispatch(hide_loading());// hide loading icon
        reject('error occurs!!');
      }
			);
    });
  };
}

// ----------------get templates -------------

export function success_get_template (data) {
  return createAction(constants.ACTION_SUCCESS_GET_TEMPLATES)(data);
}

function async_get_templates () {
  return fireAjax('POST', '', {
    action: 'get_email_template'
  });
}
export function get_templates () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_get_templates().then((json) => {
        dispatch(hide_loading());
        if (typeof json !== 'undefined' && json.length > 0) {
          let data = json;
          dispatch(success_get_template(data));
          resolve(data);
        } else {
          dispatch(success_get_template([]));
        }
      }, (error) => {
        dispatch(hide_loading()); // hide loading icon
        reject('error occurs!!');
      }
			);
    });
  };
}

// -------------------save template ------------

function async_save_template (t_name, t_subject, t_body) {
  return fireAjax('POST', '', {
    action:  'create_email_template',
    name:    t_name,
    subject: t_subject,
    body:    t_body
  });
}
function async_update_template (t_id, t_name, t_subject, t_body) {
  return fireAjax('POST', '', {
    action:  'update_email_template',
    id:      t_id,
    name:    t_name,
    subject: t_subject,
    body:    t_body
  });
}
export function save_templates (t_id, t_name, t_subject, t_body) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      if (_.isEmpty(t_id)) {
        async_save_template(t_name, t_subject, t_body).then((json) => {
          dispatch(hide_loading());
          dispatch(get_templates());
          resolve(json.data.message);
        },
					(error) => {
  dispatch(hide_loading()); // hide loading icon
  reject('error occurs!!');
});
      } else {
        async_update_template(t_id, t_name, t_subject, t_body).then((json) => {
          dispatch(hide_loading());
          dispatch(get_templates());
          resolve(json.data.message);
        }, (error) => {
          dispatch(hide_loading()); // hide loading icon
          reject('error occurs!!');
        }
				);
      }
    });
  };
}

// --------------Delete template-------------

function async_delete_template (t_id) {
  return fireAjax('POST', '', {
    action: 'delete_email_template',
    id:     t_id
  });
}

export function delete_template (t_id) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_delete_template(t_id).then((json) => {
        dispatch(hide_loading());
        if (json.error) {
          reject(json.data.message);
        } else {
          dispatch(get_templates());
          resolve();
        }
      }, (error) => {
        dispatch(hide_loading());
        reject('error occurs!!');
      }
			);
    });
  };
}

// ------------send_mail functionality------------

function async_send_mail (email) {
  return fireAjax('POST', '', {
    action: 'send_employee_email',
    email:  email
  });
}

export function send_mail (email) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_send_mail(email).then((json) => {
        dispatch(hide_loading());
        if (json.error) {
          reject(json.data.message);
        } else {
          dispatch(get_templates());
          resolve(json.data.message);
        }
      }, (error) => {
        dispatch(hide_loading());
        reject('error occurs!!');
      }
			);
    });
  };
}

// -------------------Download PDF ------------

function async_download_template (template, fileName) {
  return fireAjax('POST', '', {
    action:    'create_pdf',
    template:  template,
    file_name: fileName
  });
}
export function download_pdf (template, fileName) {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading());
      async_download_template(template, fileName).then((json) => {
        dispatch(hide_loading());
        resolve(json.data);
      }, (error) => {
        dispatch(hide_loading());
        reject('error occurs!!');
      }
				);
    });
  };
}

/* export function fetchVariable(){
	return (dispatch,getState)=>{
		return new Promise((resolve,reject)=>{
			Meteor.call('fetchAllVariable',(err,data)=>{
				if(err){
					reject(err)
				}else{
					if(data.length > 0){
						dispatch(success_fetch_variable(data))
						resolve('variable loading completed')
					}else{
						dispatch(success_fetch_variable(data))
						resolve('No variable in database')
					}
				}
			})
		})
	}
}

export function deleteVariable( id ){
	return (dispatch,getState) => {
		return new Promise( (resolve,reject) => {
			Meteor.call('deleteVariable', id , (err, data) => {
				if(err){
					reject(err)
				}else{
					dispatch ( fetchVariable(data) )
					resolve(data)
				}
			})
		})
	}
}

export function success_fetch_variable( data ){
	return createAction( ACTION_SUCCESS_FETCH_VARIABLE )( data )
}*/
