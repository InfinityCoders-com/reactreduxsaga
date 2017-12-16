import 'styles/main.scss';
import 'whatwg-fetch';
import 'sweetalert';
import 'sweetalert/dist/sweetalert.css';
import 'jquery';
import 'jquery-ui';
import 'tether';
import 'bootstrap';
import './themeFlatkit/scripts';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Page_Login from './modules/auth/containers/login';
import Page_Logout from './modules/auth/containers/logout';
import Page_ForgotPassword from './modules/auth/containers/forgotPassword';
import Page_ManageLeaves from './modules/leave/containers/manageLeaves';
import Page_LeavesSummary from './modules/leave/containers/leavesSummary';
import Page_ApplyLeave from './modules/leave/containers/applyLeave';
import Page_MyLeaves from './modules/leave/containers/myLeaves';
import Page_Holidays from './modules/holidays/containers/holidays';
import Page_PolicyDocument from './modules/policyDocuments/containers/PolicyDocument';
import Page_UploadPolicyDocument from './modules/policyDocuments/containers/uploadPolicyDocument';
import Page_ManageSalary from './modules/salary/containers/manageSalary';
import Page_ViewSalary from './modules/salary/containers/viewSalary';
import Page_Salary from './modules/salary/containers/salary';
import Page_ManagePayslips from './modules/salary/containers/managePayslips';
import Page_Home from './modules/attendance/containers/Home';
import Page_MonthlyAttendance from './modules/attendance/containers/monthlyAttendance';
import Page_UploadAttendance from './modules/attendance/containers/uploadAttendance';
import Page_MyDocuments from './modules/myDocuments/containers/myDocuments';
import PageManageUsers from './modules/manageUsers/containers/manageUsers';
import Page_ManageWorkingHours from './modules/workingHours/containers/manageWorkingHours';
import Page_ManageUserWorkingHours from './modules/workingHours/containers/manageUserWorkingHours';
import Page_InventorySystem from './modules/inventory/containers/manageInventory';
import Page_MyInventory from './modules/inventory/containers/myInventory';
import PageManageRoles from './modules/manageRoles/containers/manageRoles';
import Page_ManageUserPendingHours from './modules/workingHours/containers/manageUserPendingHours';
import PageDisabledEmployes from 'modules/manageUsers/containers/disabledEmployes';
import Page_mail_template from './modules/templates/containers/addTemplate';
import Page_AddVariables from './modules/templates/containers/addVariables';
import Page_TeamView from './modules/team/containers/viewTeam';
import Page_MyProfile from './modules/myProfile/containers/myProfile';
import PageManageDashboard from 'modules/manageUsers/containers/manageDashboard';
import Page_AttendanceReq from './modules/attendance/containers/manageAttendanceReq';

import store from './store';
// import APP from './App';

// -for iPhone iPad safari engine
if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
  fetch = require('whatwg-fetch');
}
const appHistory = useRouterHistory(createHashHistory)({queryKey: false});
injectTapEventPlugin();

export class APP extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

let render = (routerKey = null) => {
  ReactDOM.render((
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={appHistory} queryKey={false}>
          <Route path="/" component={APP}>
            <IndexRoute component={PageManageDashboard} />
            //this will be the default page which will opens when app starts
            <Route path="home" component={Page_Home} />
            <Route path="PageManageDashboard" component={PageManageDashboard} />
            <Route path="page_login" component={Page_Login} />
            <Route path="monthly_attendance" component={Page_MonthlyAttendance} />
            <Route path="manage_working_hours" component={Page_ManageWorkingHours} />
            <Route path="logout" component={Page_Logout} />
            <Route path="holidays" component={Page_Holidays} />
            <Route path="team_view" component={Page_TeamView} />
            <Route path="apply_leave" component={Page_ApplyLeave} />
            <Route path="manage_leaves" component={Page_ManageLeaves} />
            <Route path="my_leaves" component={Page_MyLeaves} />
            <Route path="disabled_employes" component={PageDisabledEmployes} />
            <Route path="manage_user_working_hours" component={Page_ManageUserWorkingHours} />
            <Route path="manage_user_pending_hours" component={Page_ManageUserPendingHours} />
            <Route path="leaves_summary" component={Page_LeavesSummary} />
            <Route path="salary" component={Page_Salary} />
            <Route path="manage_salary" component={Page_ManageSalary} />
            <Route path="my_profile" component={Page_MyProfile} />
            <Route path="my_inventory" component={Page_MyInventory} />
            <Route path="manage_users" component={PageManageUsers} />
            <Route path="manage_roles" component={PageManageRoles} />
            <Route path="manage_payslips" component={Page_ManagePayslips} />
            <Route path="forgot_password" component={Page_ForgotPassword} />
            <Route path="documents" component={Page_MyDocuments} />
            <Route path="uploadAttendance" component={Page_UploadAttendance} />
            <Route path="view_salary" component={Page_ViewSalary} />
            <Route path="policy_documents" component={Page_PolicyDocument} />
            <Route path="upload_policy_documents" component={Page_UploadPolicyDocument} />
            <Route path="add_variables" component={Page_AddVariables} />
            <Route path="mail_templates" component={Page_mail_template} />
            <Route path="inventory_system" component={Page_InventorySystem} />
            <Route path="attendanceReq" component={Page_AttendanceReq} />
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  ), document.querySelector('#myApp'));
};

render();
