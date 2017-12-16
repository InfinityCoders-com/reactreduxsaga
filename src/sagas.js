import {takeLatest} from 'redux-saga/effects';
import * as constants from 'appRedux/constants';
import {loginRequest, isAlreadyLoggedIn, forgotPassword, logout} from 'appRedux/auth/actions';
import {holidayList} from 'appRedux/holidays/actions';
import {getTeamStats, getEmployeLifeCycle, getEmployeeHours, getEmployeeMonthlyHours, getEmployeePerformance, getUserIdList} from 'appRedux/manageUsers/actions/dashboard';
import {userMonthlyAttendance} from 'appRedux/attendance/actions/monthlyAttendance';
import {getUserDayAttendance, userAttendanceStatus} from 'appRedux/attendance/actions/attendanceRequests';
import {getUserDaySummary, updateUserDaySummary, empUpdateDaySummary} from 'appRedux/attendance/actions/userDaySummary';
import {getUsersList} from 'appRedux/generic/actions/usersList';
import {fetchUserPolicyDocument, submitPolicyDocs, updateReadStatus, fetchPolicyDocument} from 'appRedux/policyDocuments/actions/index';
import {getTeamList, saveTeam, getTeam} from 'appRedux/team/actions/teamList';

export function* watchActions () {
  yield takeLatest(constants.USER_LOGIN_REQUEST, loginRequest);
  yield takeLatest(constants.IS_ALREADY_LOGGED_IN, isAlreadyLoggedIn);
  yield takeLatest(constants.REQUEST_FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(constants.REQUEST_LOGOUT, logout);

  yield takeLatest(constants.REQUEST_HOLIDAYSLIST, holidayList);

  yield takeLatest(constants.REQUEST_USER_ATTENDANCE, userMonthlyAttendance);
  yield takeLatest(constants.REQUEST_USER_DAY_SUMMARY, getUserDaySummary);
  yield takeLatest(constants.REQUEST_UPDATE_USER_DAY_SUMMARY, updateUserDaySummary);

  yield takeLatest(constants.REQUEST_USER_ATTENDANCE_REQUEST, getUserDayAttendance);
  yield takeLatest(constants.REQUEST_USER_ATTENDANCE_STATUS, userAttendanceStatus);
  yield takeLatest(constants.REQUEST_UPDATE_EMP_DAY_SUMMARY, empUpdateDaySummary);

  yield takeLatest(constants.REQUEST_USERSLIST, getUsersList);

  yield takeLatest(constants.REQUEST_TEAM_STATS, getTeamStats);
  yield takeLatest(constants.REQUEST_EMP_LIFE_CYCLE, getEmployeLifeCycle);
  yield takeLatest(constants.REQUEST_EMP_HOURS, getEmployeeHours);
  yield takeLatest(constants.REQUEST_EMP_MONTHLY_HOURS, getEmployeeMonthlyHours);
  yield takeLatest(constants.REQUEST_EMP_PERFORMANCE, getEmployeePerformance);
  yield takeLatest(constants.REQUEST_USER_LIST, getUserIdList);

  yield takeLatest(constants.REQUEST_USER_POLICY_DOCUMENT, fetchUserPolicyDocument);

  yield takeLatest(constants.REQUEST_SUBMIT_DOCS, submitPolicyDocs);
  yield takeLatest(constants.REQUEST_UPDATE_READ, updateReadStatus);

  yield takeLatest(constants.REQUEST_POLICY_DOCUMENT, fetchPolicyDocument);
  yield takeLatest(constants.REQUEST_TEAM_LIST, getTeamList);
  yield takeLatest(constants.REQUEST_ADD_TEAM, saveTeam);
  yield takeLatest(constants.REQUEST_GET_TEAM, getTeam);
}

export default function* rootSaga () {
  yield [
    watchActions()
  ];
}
