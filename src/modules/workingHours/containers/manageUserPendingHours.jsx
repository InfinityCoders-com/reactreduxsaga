import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import LoadingIcon from 'components/generic/LoadingIcon';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import UsersList from 'components/generic/UsersList';
import AddAsLeaveHour from '../components/AddAsLeaveHour';
import * as actions from 'appRedux/actions';
import UserPendingHoursList from '../components/UserPendingHoursList';
import * as actionsUsersList from 'appRedux/generic/actions/usersList';
import * as actionPendingHour from 'appRedux/workingHours/actions/managePendingLeave';
import * as actions_apply_leave from 'appRedux/leave/actions/applyLeave';
import * as actionsManageUserPendingHours from 'appRedux/workingHours/actions/manageUserPendingHour';

class ManageUserPendingHours extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      'defaultUserDisplay': '',
      'daysummary_date':    '',
      status_message:       '',
      active:               'active',
      firstArrow:           'show',
      secondArrow:          'hidden',
      thirdArrow:           'hidden',
      pendingList:          'show',
      pendingUserList:      'hidden',
      open:                 false,
      edit:                 false
    };
    this.callAddUserPendingHours = this.callAddUserPendingHours.bind(this);
    this.callFetchPendingUserList = this.callFetchPendingUserList.bind(this);
    this.doApplyLeave = this.doApplyLeave.bind(this);
    this.callOnDaysBetweenLeaves = this.callOnDaysBetweenLeaves.bind(this);
  }
  componentWillMount () {
    let d = new Date();
    let year = d.getFullYear().toString();
    let months = ('0' + (d.getMonth() + 1)).slice(-2).toString();
    this.props.onUserPendingHoursData(year, months);
    this.props.onUsersList();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
  }

  componentDidUpdate () {
    if (this.state.defaultUserDisplay === '') {
      if (this.props.usersList.users.length > 0) {
        let firstUser = this.props.usersList.users[0];
        let defaultUserName = firstUser.username;
      }
    }
  }

  callAddUserPendingHours (userid, pendingHour, empId) {
    this.setState({show_status_message: true});
    this.props.onAddUserPendingHours(userid, pendingHour, empId).then((message) => {
      notify('Success !', message, 'success');
    }).catch((error) => {
      notify('Error !', error, 'error');
    });
  }

  callFetchPendingUserList () {
    this.onUserPendingHoursData();
  }

  doApplyLeave (start, end, days, reason, userid, day_status, leaveType, late_reason, pending_id, year, month) {
    this.setState({show_status_message: true});
    this.props.onApplyLeave(start, end, days, reason, userid, day_status, leaveType, late_reason, pending_id, year, month).then((data) => {
      notify('Success !', data, 'success');
    }).catch((error) => {
      notify('Error !', error, 'error');
    });
  }

  callOnDaysBetweenLeaves () {
    this.props.onDaysBetweenLeaves();
  }
  openPage (toDisplay) {
    if (toDisplay === 'pending_hour_list') {
      this.setState({
        pendingList:     'row',
        firstArrow:      'show',
        pendingUserList: 'hidden',
        secondArrow:     'hidden'
      });
    } else if ((toDisplay === 'view_user_pending_hours')) {
      this.setState({
        pendingList:     'hidden',
        firstArrow:      'hidden',
        pendingUserList: 'row',
        secondArrow:     'show'
      });
    }
  }

  render () {
    let pending_hour_list = <UserPendingHoursList
      callFetchPendingUserList={this.callFetchPendingUserList}
      manageUserPendingHours={this.props.manageUserPendingHours}
      onUserPendingHoursData={this.props.onUserPendingHoursData}
      doApplyLeave={this.props.doApplyLeave}
      doApplyHalfLeave={this.props.doApplyHalfLeave}
      callOnDaysBetweenLeaves={this.props.callOnDaysBetweenLeaves}
      {...this.props} />;

    let statusMessage = '';
    if (this.props.manageUserPendingHours.status_message !== '') {
      statusMessage = <span className="label label-lg primary pos-rlt m-r-xs">
        <b className="arrow left b-primary"></b>{this.props.manageUserPendingHours.status_message}</span>;
    }

    return (
      <div>
        <Menu {...this.props} />

        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Manage Employee Pending Hours'} {...this.props} />
          <div className="app-footer">
            <div></div>
          </div>
          <div className="app-body" id="view">
            <div className="row">
              <div className="col-12">
                <LoadingIcon loading={this.props.frontend.show_loading} />
              </div>
            </div>
            {this.state.secondArrow === 'show' ? null
              : <div className="row" style={{marginTop: '2%', marginLeft: '4%'}}>
                <div className="col-md-11 col-xs-offset-0">
                </div>
              </div>
            }
            <div className="dker p-x">
              <div className="row">
                <div className="col-sm-6 pull-sm-6">
                  <div className="p-y-md clearfix nav-active-primary">
                    <ul className="nav nav-pills nav-sm" style={{marginLeft: '4%'}}>
                      <li
                        onClick={() => { this.openPage('pending_hour_list'); }}
                        className={`nav-item ${this.state.active}`}>
                        <a className="nav-link"
                          href=""
                          data-toggle="tab"
                          data-target="#tab_1"
                          aria-expanded="true">Pending Hour List</a>
                        <div className={this.state.firstArrow}>
                          <span className="arrow bottom b-accent"></span></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="padding">
              <div className={this.state.pendingList}>
                {pending_hour_list}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:               state.frontend.toJS(),
    loggedUser:             state.logged_user.userLogin,
    usersList:              state.usersList.toJS(),
    manageUserPendingHours: state.manageUserPendingHours.toJS(),
    applyLeave:             state.applyLeave.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onUsersList: () => {
      return dispatch(actionsUsersList.get_users_list());
    },
    onUserPendingHoursData: (year, month) => {
      return dispatch(actionsManageUserPendingHours.getUserPendingHourList(year, month));
    },
    onAddUserPendingHours: (userId, pendingHour, empId, year, month) => {
      return dispatch(actionsManageUserPendingHours.addUserPendingHour(userId, pendingHour, empId, year, month));
    },
    onApplyHalfLeave: (no_of_days, userId, day_status, pending_id, year, month) => {
      return dispatch(actionPendingHour.applyPendingLeave(no_of_days, userId, day_status, pending_id, year, month));
    },
    onApplyLeave: (from_date, to_date, no_of_days, reason, userId, day_status, leaveType, late_reason, pending_id, year, month) => {
      return dispatch(actions_apply_leave.apply_leave(from_date, to_date, no_of_days, reason, userId, day_status, leaveType, late_reason, pending_id, year, month));
    },
    onDaysBetweenLeaves: (startDate, endDate) => {
      return dispatch(actions_apply_leave.getDaysBetweenLeaves(startDate, endDate));
    }

  };
};

const VisibleManageUserPendingHours = connect(mapStateToProps, mapDispatchToProps)(ManageUserPendingHours);

const RouterVisibleManageUserPendingHours = withRouter(VisibleManageUserPendingHours);

export default RouterVisibleManageUserPendingHours;
