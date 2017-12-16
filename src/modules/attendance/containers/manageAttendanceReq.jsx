import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import LoadingIcon from 'components/generic/LoadingIcon';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import * as actions from 'appRedux/actions';
import {bindActionCreators} from 'redux';
import UserPendingAttendanceList from '../components/attendanceRequest/attendanceReq';
import * as actionsManageUserAttendance from 'appRedux/attendance/actions/attendanceRequests';

class ManageAttendanceRequest extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
    this.state = {
      'defaultUserDisplay':  '',
      'daysummary_date':     '',
      status_message:        '',
      active:                'active',
      firstArrow:            'show',
      pendingAttendanceList: 'show'
    };
  }

  componentWillMount () {
    this.props.requestUserDayAttendance();
  }
  componentWillReceiveProps (props) {
    // let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    // if (isNotValid.status) {
    //   this.props.router.push(isNotValid.redirectTo);
    // }
    let {route, router, loggedUser, attendanceReqList: {isError, message}} = props;
    if (isError) {
      notify('Error !', message, 'error');
    }
    if (message) {
      notify('Error !', message, 'error');
    }
  }

  openPage (toDisplay) {
    if (toDisplay === 'attendence_hour_list') {
      this.setState({
        pendingAttendanceList: 'row',
        firstArrow:            'show',
        pendingUserList:       'hidden',
        secondArrow:           'hidden'
      });
    } else if ((toDisplay === 'view_actions')) {
      this.setState({
        pendingAttendanceList: 'hidden',
        firstArrow:            'hidden',
        pendingUserList:       'row',
        secondArrow:           'show'
      });
    }
  }

  render () {
    let {status} = this.props.attendanceStatus;
    let {isLoading, data} = this.props.attendanceReqList;
    let attendance_hour_list = <UserPendingAttendanceList
      attandanceList={data} {...this.props} />;
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Manage Employee Pending Attendance Requests'} showLoading={isLoading} />
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
                        onClick={() => { this.openPage('attendence_hour_list'); }}
                        className={`nav-item ${this.state.active}`}>
                        <a className="nav-link"
                          href=""
                          data-toggle="tab"
                          data-target="#tab_1"
                          aria-expanded="true">Attendance Request List</a>
                        <div className={this.state.firstArrow}>
                          <span className="arrow bottom b-accent"></span></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="padding">
              <div className={this.state.pendingAttendanceList}>
                {attendance_hour_list}
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
    frontend:          state.frontend.toJS(),
    loggedUser:        state.logged_user.userLogin,
    attendanceReqList: state.attendanceReq.attendanceReqList,
    attendanceStatus:  state.attendanceReq.attendanceApproval
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const VisibleManageAttendanceRequest = connect(mapStateToProps, mapDispatchToProps)(ManageAttendanceRequest);

const RouterVisibleManageAttendanceRequest = withRouter(VisibleManageAttendanceRequest);

export default RouterVisibleManageAttendanceRequest;
