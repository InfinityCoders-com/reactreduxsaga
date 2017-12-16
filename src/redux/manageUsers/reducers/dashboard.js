import {handleActions} from 'redux-actions';
import * as constants from 'appRedux/constants';
import update from 'immutability-helper';
import 'appRedux/update';

let initialState = {
  teamStats: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  empLifeCycle: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  empHours: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  monthlyHours: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  employeePerformance: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  employeeList: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
};

const requestTeamStats = (state, action) => update(state, {
  teamStats: {$setRequestLoading: null}
});

const successTeamStats = (state, action) => {
  return update(state, {
    teamStats: {$setRequestSuccess: action.payload}
  });
};

const errorTeamStats = (state, action) => update(state, {
  teamStats: {$setRequestError: action.payload}
});

// empLifeCycle
const requestEmployeLifeCycle = (state, action) => update(state, {
  empLifeCycle: {$setRequestLoading: null}
});

const successEmployeLifeCycle = (state, action) => {
  return update(state, {
    empLifeCycle: {$setRequestSuccess: action.payload}
  });
};

const errorEmployeLifeCycle = (state, action) => update(state, {
  empLifeCycle: {$setRequestError: action.payload}
});

// empHours
const requestEmployeeHours = (state, action) => update(state, {
  empHours: {$setRequestLoading: null}
});
const successEmployeeHours = (state, action) => {
  return update(state, {
    empHours: {$setRequestSuccess: action.payload}
  });
};

const errorEmployeeHours = (state, action) => update(state, {
  empHours: {$setRequestError: action.payload}
});
// employee monthly Hours
const requestEmployeeMonthlyHours = (state, action) => update(state, {
  monthlyHours: {$setRequestLoading: null}
});

const successEmployeeMonthlyHours = (state, action) => {
  return update(state, {
    monthlyHours: {$setRequestSuccess: action.payload}
  });
};

const errorEmployeeMonthlyHours = (state, action) => update(state, {
  monthlyHours: {$setRequestError: action.payload}
});
// employee performance
const requestEmployeePerformance = (state, action) => update(state, {
  employeePerformance: {$setRequestLoading: null}
});

const successEmployeePerformance = (state, action) => update(state, {
  employeePerformance: {$setRequestSuccess: action.payload}
});

const errorEmployeePerformance = (state, action) => update(state, {
  employeePerformance: {$setRequestError: action.payload}
});
// User List
const requestUsersList = (state, action) => update(state, {
  employeeList: {$setRequestLoading: null}
});

const successUsersList = (state, action) => {
  return update(state, {
    employeeList: {$setRequestSuccess: action.payload}
  });
};

const errorUsersList = (state, action) => update(state, {
  employeeList: {$setRequestError: action.payload}
});

export default handleActions({
  [constants.REQUEST_TEAM_STATS]: requestTeamStats,
  [constants.SUCCESS_TEAM_STATS]: successTeamStats,
  [constants.ERROR_TEAM_STATS]:   errorTeamStats,

  [constants.REQUEST_EMP_LIFE_CYCLE]: requestEmployeLifeCycle,
  [constants.SUCCESS_EMP_LIFE_CYCLE]: successEmployeLifeCycle,
  [constants.ERROR_EMP_LIFE_CYCLE]:   errorEmployeLifeCycle,

  [constants.REQUEST_EMP_HOURS]: requestEmployeeHours,
  [constants.SUCCESS_EMP_HOURS]: successEmployeeHours,
  [constants.ERROR_EMP_HOURS]:   errorEmployeeHours,

  [constants.REQUEST_EMP_MONTHLY_HOURS]: requestEmployeeMonthlyHours,
  [constants.SUCCESS_EMP_MONTHLY_HOURS]: successEmployeeMonthlyHours,
  [constants.ERROR_EMP_MONTHLY_HOURS]:   errorEmployeeMonthlyHours,

  [constants.REQUEST_EMP_PERFORMANCE]: requestEmployeePerformance,
  [constants.SUCCESS_EMP_PERFORMANCE]: successEmployeePerformance,
  [constants.ERROR_EMP_PERFORMANCE]:   errorEmployeePerformance,

  [constants.REQUEST_USER_LIST]: requestUsersList,
  [constants.SUCCESS_USER_LIST]: successUsersList,
  [constants.ERROR_USER_LIST]:   errorUsersList
}, initialState);
