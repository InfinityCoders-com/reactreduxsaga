import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import 'react-date-picker/index.css';
import {CONFIG} from 'src/config/index';
import {notify} from 'src/services/notify';
import PendingHourSummary from './PendingHourSummary';
import AddUserPendingHour from './AddUserPendingHour';
import AddAsLeaveHour from './AddAsLeaveHour';
import AddAsHalfDayLeave from './AddAsHalfDayLeave';

export default class UserPendingHoursList extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      pendingTimeList: {},
      usersList:       [],
      openMerge:       false,
      openLeave:       false
    };
    this.callAddUserPendingHours = this.callAddUserPendingHours.bind(this);
    this.handleCloseMerge = this.handleCloseMerge.bind(this);
    this.handOpenMerge = this.handleOpenMerge.bind(this);
    this.handOpenLeave = this.handleOpenLeave.bind(this);
    this.handleCloseLeave = this.handleCloseLeave.bind(this);
  }

  componentWillMount () {
    this.setState({
      pendingTimeList: this.props.manageUserPendingHours,
      usersList:       this.props.manageUserPendingHours.displayData.user_list
    });
  }

  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    if (!props.loggedUser.isLoggedIn) {
      this.props.router.push('/logout');
    } else {
      if (props.loggedUser.data.role === CONFIG.ADMIN) {
      } else {
        this.props.router.push('/home');
      }
    }

    this.setState({
      pendingTimeList: props.manageUserPendingHours,
      usersList:       props.manageUserPendingHours.displayData.user_list
    });
  }

  callAddUserPendingHours (userId, pendingHour, date, reason, empId, year, month) {
    this.props.onAddUserPendingHours(userId, pendingHour, date, reason, empId, year, month).then((message) => {
      this.setState({
        reason: ''
      });
      notify('Success !', message, 'success');
      this.handleCloseMerge();
    }, (error) => {
      notify('Error !', error, 'error');
    });
  }
  handleOpenMerge () {
    this.setState({
      openMerge: true
    });
  }
  handleCloseMerge () {
    this.setState({
      openMerge: false,
      reason:    ''
    });
  }

  handleOpenLeave () {
    this.setState({
      openLeave: true
    });
  }
  handleCloseLeave () {
    this.setState({
      openMerge: false,
      reason:    ''
    });
  }

  render () {
  // Map UserPendingDetails -->
    var pendingList = this.state.usersList || [];
    let pendingTimeMap = pendingList.map((val, i) => {
      let addButton = <AddUserPendingHour val={val}
        handleCloseMerge={this.handleCloseMerge}
        handleOpenMerge={this.props.handleOpenMerge}
        callAddUserPendingHours={this.callAddUserPendingHours}
        {...this.props} />;
      let HalfdayButton = <AddAsHalfDayLeave val={val} {...this.props} />;
      <br />;
      let leaveButton = <AddAsLeaveHour val={val}
        {...this.props} />;

      // Map pendingMessage -->
      let pendingMessage = val.time_detail.t_detail;
      let pendingMsgMap = pendingMessage.map((msg, i) => {
        return (
          <ul style={{padding: '0 0 0 17px', marginTop: '10px'}} key={i}>
            <li style={{aling: 'center', fontSize: '11px'}}>{msg.message} </li>
          </ul>
        );
      });

      return (
        <tr key={i}>
          <td className="p-r-xs">{i + 1}</td>
          <td>{val.name}</td>
          {val.pending_hour >= 9
            ? <td><mark style={{color: '#ffffff', aling: 'center', backgroundColor: '#ff0000'}}>
            {val.pending_hour} {'hr'} {val.pending_minute} {'min'}</mark>
          {pendingMsgMap}
            </td>
            : <td><mark> {val.pending_hour} {'hr'} {val.pending_minute} {'min'} </mark>
          {pendingMsgMap}
            </td>
          }

          {val.status
            ? <td className="max-w-200">
            {'Updated On : '}{val.date}
              <br />
              {val.status}

            </td>
            : <td><mark>{'Pending'}</mark></td>
        }
        {val.status_merged === '0'
          ? <td>{addButton} {HalfdayButton} {leaveButton}</td>
          : <td> <mark>{'No Action Required'} </mark></td>
      }
        </tr>
      );
    });

    return (
      <div>
        <div className="app-body" id="view">
          <div className="padding">
            <div className="row">
              <PendingHourSummary
                callFetchPendingTime={this.callFetchPendingUserList}
                manageUserPendingHours={this.props.manageUserPendingHours}
                onUserPendingHoursData={this.props.onUserPendingHoursData}
                {...this.props} />

              <div className="col-md-12 b-r box table-responsive">
                <div className="p-a block">
                    {
                      pendingTimeMap.length > 0
                      ? <table key='' className="table table-striped">
                        <thead className="active">
                          <tr>
                            <th className="p-r-xs">{'Sr.'}</th>
                            <th>User Name</th>
                            <th className="text-center">Pending Time</th>
                            <th >Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingTimeMap}
                        </tbody>
                      </table>
                      : <div>
                        <h5 className="text-center">
                          {'Not Updated !'}
                        </h5>
                      </div>
                    }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  }
