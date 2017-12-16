import {handleActions} from 'redux-actions';
import * as constants from 'appRedux/constants';
import update from 'immutability-helper';
import 'appRedux/update';

let initialState = {
  attendanceReqList: {
    data:      [],
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  attendanceApproval: {
    data:      [],
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
};

const requestUserDayAttendance = (state, action) => update(state, {
  attendanceReqList: {$setRequestLoading: null}
});

const successUserDayAttendance = (state, action) => {
  return update(state, {
    attendanceReqList: {$setRequestSuccess: action.payload}
  });
};

const errorUserDayAttendance = (state, action) => update(state, {
  attendanceReqList: {$setRequestError: action.payload}
});

const requestUserAttendanceStatus = (state, action) => update(state, {
  attendanceApproval: {$setRequestLoading: null}
});

const successUserAttendanceStatus = (state, action) => {
  return update(state, {
    attendanceApproval: {$setRequestSuccess: action.payload}
  });
};

const errorUserAttendanceStatus = (state, action) => update(state, {
  attendanceApproval: {$setRequestError: action.payload}
});

export default handleActions({
  [constants.REQUEST_USER_ATTENDANCE_REQUEST]: requestUserDayAttendance,
  [constants.SUCCESS_USER_ATTENDANCE_REQUEST]: successUserDayAttendance,
  [constants.ERROR_USER_ATTENDANCE_REQUEST]:   errorUserDayAttendance,

  [constants.REQUEST_USER_ATTENDANCE_STATUS]: requestUserAttendanceStatus,
  [constants.SUCCESS_USER_ATTENDANCE_STATUS]: successUserAttendanceStatus,
  [constants.ERROR_USER_ATTENDANCE_STATUS]:   errorUserAttendanceStatus
}, initialState);
