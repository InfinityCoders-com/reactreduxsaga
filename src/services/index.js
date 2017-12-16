import {CONFIG} from 'src/config/index';
import _ from 'lodash';
import {confirm} from 'src/services/notify';
import {getToken, resetLoggedUser} from 'src/services/generic';
import 'whatwg-fetch';

const actionsForOtherAPIurl = ['get_user_profile_detail', 'get_user_profile_detail_by_id', 'update_user_profile_detail_by_id', 'update_user_bank_detail',
  'update_user_profile_detail', 'get_user_manage_payslips_data', 'create_employee_salary_slip', 'delete_salary',
  'send_payslips_to_employees', 'get_user_document', 'insert_user_document', 'delete_user_document', 'get_all_users_detail',
  'create_template_variable', 'get_template_variable', 'delete_template_variable', 'update_template_variable', 'create_email_template',
  'get_email_template', 'delete_email_template', 'update_email_template', 'send_employee_email', 'create_pdf', 'get_policy_document',
  'save_policy_document', 'get_user_policy_document', 'update_user_policy_document', 'add_team_list', 'get_team_list',
  'get_team_users_detail', 'get_user_salary_info', 'get_user_salary_info_by_id' ];

const actionsForAPIurl = ['admin_user_apply_leave', 'change_employee_status', 'get_employee_life_cycle', 'update_employee_life_cycle', 'show_disabled_users', 'add_roles', 'list_all_roles', 'update_role', 'assign_user_role', 'delete_role', 'get_employee_monthly_hours', 'get_employee_performance'];

const actionForExpressWeburl = ['update_time_by_employee', 'manual', 'approval'];

export function fireAjax (method, url, data, api) {
  let URL = CONFIG.api_url + url;
  let action = data.action;
  let token = getToken();
  if (data.action !== 'get_team_stats' && data.action !== 'get_user_list' && data.action !== 'get_employee_hours' && data.action !== 'get_employee_performance' && data.action !== 'get_employee_monthly_hours' && data.action !== 'get_termination_joining_stats') {
    data.token = token;
  }
  let headers = {
    method: method,
    mode:   'cors',
    cache:  'no-cache',
    Accept: 'application/json',
    body:   JSON.stringify(data)
  };

  if (data.action === 'add_user_salary') {
    delete (data.action);
    headers.body = JSON.stringify(data);
    URL = CONFIG.api_url_salary + '/add_sal_structure.php';
  } else if (data.action === 'add_user_holding') {
    delete (data.action);
    headers.body = JSON.stringify(data);
    URL = CONFIG.api_url_salary + '/add_holding_info.php';
  } else if (_.indexOf(actionsForOtherAPIurl, data.action) >= 0) {
    headers.body = JSON.stringify(data);
    URL = CONFIG.other_api_url;
  } else if (_.indexOf(actionsForAPIurl, data.action) >= 0) {
    headers.body = JSON.stringify(data);
    URL = CONFIG.api_url;
  } else if (data.action === 'get_team_stats') {
    delete (data.action);
    headers.body = JSON.stringify(data);
    URL = CONFIG.expressApiUrl;
  } else if (data.action === 'get_termination_joining_stats') {
    delete (data.action);
    headers.body = JSON.stringify(data);
    URL = CONFIG.expressApiUrl;
  } else if (data.action === 'get_employee_hours') {
    delete (data.action);
    headers.body = JSON.stringify(data);
    URL = CONFIG.expressApiUrl;
  } else if (data.action === 'manual') {
    delete (data.action);
    headers.body = JSON.stringify(data);
    URL = CONFIG.expressApiurl + '/attendance/manual';
  } if (data.action === 'approval') {
    delete (data.action);
    headers.body = JSON.stringify(data);
    URL = CONFIG.expressApiUrl + '/attendance/approval';
  } else if (data.action === 'update_time_by_employee') {
    delete (data.action);
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    headers.body = JSON.stringify(data);
    URL = CONFIG.expressApiUrl + '/attendance/update_time_by_employee';
  } else if (data.action === 'get_employee_monthly_hours') {
    delete (data.action);
    headers.body = JSON.stringify(data);
    URL = CONFIG.expressApiUrl;
  } else if (data.action === 'get_employee_performance') {
    delete (data.action);
    headers.body = JSON.stringify(data);
    URL = CONFIG.expressApiUrl;
  } else if (data.action === 'get_user_list') {
    delete (data.action);
    headers.body = JSON.stringify(data);
    URL = CONFIG.expressApiUrl;
  }

  return fetch(URL, headers).then((response) => {
    if (response.status === 500) {
      return new Promise((resolve, reject) => {
        response.json().then((data) => {
          reject(data);
        });
      });
    } else if (response.status === 401) {
      confirm('401 Access Denied !', '<span style="color:#f27474;font-size:18px;font-weight:600">' + action + '</span><br/>You are unauthorized to the Action - Contact Admin!!', 'error').then((res) => {
        resetLoggedUser();
        location.href = CONFIG.BASE_URL;
      });
    } else {
      return response.json();
    }
  });
}
