import {combineReducers} from 'redux';

import {frontend} from 'appRedux/generic/reducers/frontend';
import logged_user from 'appRedux/auth/reducers/logged_user';
import {monthlyAttendance} from 'appRedux/attendance/reducers/monthlyAttendance';
import {userDaySummary} from 'appRedux/attendance/reducers/userDaySummary';
import {usersList} from 'appRedux/generic/reducers/usersList';
import {workingHoursSummary} from 'appRedux/workingHours/reducers/workingHoursSummary';
import holidaysList from 'appRedux/holidays/reducers/holidaysList';
import {applyLeave} from 'appRedux/leave/reducers/applyLeave';
import {listLeaves} from 'appRedux/leave/reducers/listLeaves';
import {manageLeave} from 'appRedux/leave/reducers/manageLeave';
import {leavesSummary} from 'appRedux/leave/reducers/leavesSummary';
import {userLeaves} from 'appRedux/leave/reducers/userLeaves';
import {manageUserWorkingHours} from 'appRedux/workingHours/reducers/manageUserWorkingHours';
import {manageUserPendingHours} from 'appRedux/workingHours/reducers/manageUserPendingHour';
import {salary} from 'appRedux/salary/reducers/salary';
import {manageSalary} from 'appRedux/salary/reducers/manageSalary';
import {myProfile} from 'appRedux/myProfile/reducers/myProfile';
import {myDocument} from 'appRedux/myDocuments/reducers/myDocument';
import {manageUsers} from 'appRedux/manageUsers/reducers/manageUsers';
import {manageRoles} from 'appRedux/manageRoles/reducers/manageRoles';
import {managePayslips} from 'appRedux/salary/reducers/managePayslips';
import {empSalaryList} from 'appRedux/salary/reducers/empSalaryDetails';
import policyDocuments from 'appRedux/policyDocuments/reducers/policyDocuments';
import {template} from 'appRedux/templates/reducers/template';
import teamList from 'appRedux/team/reducers/teamList';
import teamStats from 'appRedux/manageUsers/reducers/dashboard';
import {manageDevice} from 'appRedux/inventory/reducers/inventory';
import attendanceReq from 'appRedux/attendance/reducers/attendanceReq';
import empDaySummary from 'appRedux/attendance/reducers/empDaySummary';

export default combineReducers({
  frontend,
  logged_user,
  monthlyAttendance,
  userDaySummary,
  usersList,
  workingHoursSummary,
  holidaysList,
  applyLeave,
  listLeaves,
  manageLeave,
  userLeaves,
  manageUserWorkingHours,
  manageUserPendingHours,
  leavesSummary,
  salary,
  manageSalary,
  myProfile,
  myDocument,
  manageUsers,
  manageRoles,
  managePayslips,
  empSalaryList,
  policyDocuments,
  template,
  teamList,
  teamStats,
  manageDevice,
  attendanceReq,
  empDaySummary
});
