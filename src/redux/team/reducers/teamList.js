import {handleActions} from 'redux-actions';
import * as constants from 'appRedux/constants';
import update from 'immutability-helper';
import 'appRedux/update';

let initialState = {
  teamList: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  addTeam: {
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  team: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
};

const requestTeamList = (state, action) => update(state, {
  teamList: {$setRequestLoading: null}
});

const successTeamList = (state, action) => update(state, {
  teamList: {$setRequestSuccess: action.payload}
});

const errorTeamList = (state, action) => update(state, {
  teamList: {$setRequestError: action.payload}
});

const requestAddTeam = (state, action) => update(state, {
  addTeam: {$setRequestLoading: null}
});

const successAddTeam = (state, action) => update(state, {
  addTeam: {
    isLoading: {$set: false},
    isError:   {$set: false},
    isSuccess: {$set: true},
    message:   {$set: action.payload}
  }
});

const errorAddTeam = (state, action) => update(state, {
  addTeam: {$setRequestError: action.payload}
});

const requestGetTeam = (state, action) => update(state, {
  team: {$setRequestLoading: null}
});

const successGetTeam = (state, action) => update(state, {
  team: {$setRequestSuccess: action.payload}
});

const errorGetTeam = (state, action) => update(state, {
  team: {$setRequestError: action.payload}
});

export default handleActions({
  [constants.REQUEST_TEAM_LIST]: requestTeamList,
  [constants.SUCCESS_TEAM_LIST]: successTeamList,
  [constants.ERROR_TEAM_LIST]:   errorTeamList,
  [constants.REQUEST_ADD_TEAM]:  requestAddTeam,
  [constants.SUCCESS_ADD_TEAM]:  successAddTeam,
  [constants.ERROR_ADD_TEAM]:    errorAddTeam,
  [constants.REQUEST_GET_TEAM]:  requestGetTeam,
  [constants.SUCCESS_GET_TEAM]:  successGetTeam,
  [constants.ERROR_GET_TEAM]:    errorGetTeam
}, initialState);
