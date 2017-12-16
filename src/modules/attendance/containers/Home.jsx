import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import UsersList from 'components/generic/UsersList';
import Header from 'components/generic/Header';
import UserMonthlyAttendance from 'components/attendance/UserMonthlyAttendance';
import UserDaySummary from 'modules/attendance/components/UserDaySummary';
import * as actionsUsersList from 'appRedux/generic/actions/usersList';
import * as actionsMonthlyAttendance from 'appRedux/attendance/actions/monthlyAttendance';
import * as actionsUserDaySummary from 'appRedux/attendance/actions/userDaySummary';
import * as actions from 'appRedux/actions';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
    this.state = {
      'defaultUserDisplay': '',
      'daysummary_userid':  '',
      'daysummary_date':    '',
      year:                 '',
      month:                ''
    };
    this.onUserClick = this.onUserClick.bind(this);
    this.onShowDaySummary = this.onShowDaySummary.bind(this);
    this.monthToggle = this.monthToggle.bind(this);
  }
  componentDidMount () {
    this.props.requestUsersList();
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1; // +1 since getMonth starts from 0
    this.setState({year: year, month: month});
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }

    if (props.userDaySummary.status_message !== '') {
      notify(props.userDaySummary.status_message);
    }

    if (this.state.defaultUserDisplay === '') {
      if (props.usersList.users && props.usersList.users.length > 0) {
        let firstUser = props.usersList.users[0];
        let defaultUserId = firstUser.user_Id;
        this.onUserClick(defaultUserId);
      }
    }
  }
  onUserClick (userid) {
    this.setState({'defaultUserDisplay': userid});
    this.props.requestUserAttendance({userid, year: this.state.year, month: this.state.month});
  }
  monthToggle (u, y, m) {
    this.setState({year: y, month: m});
    this.props.requestUserAttendance({userid: u, year: y, month: m});
  }
  onShowDaySummary (userid, date) {
    this.setState({daysummary_userid: userid, daysummary_date: date});
    this.props.requestUserDaySummary({userid, date});
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <UserDaySummary userid={this.state.daysummary_userid} date={this.state.daysummary_date} year={this.state.year} month={this.state.month} {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Users'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-2" id="fixedScroll">
                  <UsersList users={this.props.usersList.users} onUserClick={this.onUserClick} selectedUserId={this.props.monthlyAttendance.userid} top={10} />
                </div>
                <div className="col-md-10">
                  <UserMonthlyAttendance monthlyAttendance={this.props.monthlyAttendance} monthToggle={this.monthToggle} onShowDaySummary={this.onShowDaySummary} />
                </div>
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
    usersList:         state.usersList.toJS(),
    monthlyAttendance: state.monthlyAttendance.toJS(),
    userDaySummary:    state.userDaySummary.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
