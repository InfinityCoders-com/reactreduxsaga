import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import {notify} from 'src/services/notify';
import EmpDaySummary from 'modules/attendance/components/empDaySummary';
import UserMonthlyAttendance from 'components/attendance/UserMonthlyAttendance';
import * as actionsUserDaySummary from 'appRedux/attendance/actions/userDaySummary';
import * as actions from 'appRedux/actions';

class MonthlyAttendance extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
    this.state = {
      'defaultUserDisplay': '',
      'daysummary_userid':  '',
      'daysummary_date':    '',
      'year':               '',
      'month':              ''
    };
    this.onUserClick = this.onUserClick.bind(this);
    this.onShowDaySummary = this.onShowDaySummary.bind(this);
    this.monthToggle = this.monthToggle.bind(this);
  }
  componentWillMount () {
    this.props.isAlreadyLogin();
    let userId = this.props.loggedUser.data.id;
    this.setState({'defaultUserDisplay': userId});
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1; // +1 since getMonth starts from 0
    this.setState({year: year, month: month});
    this.props.requestUserAttendance({userid: userId, year: year, month: month});
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
  }
  onShowDaySummary (userid, date) {
    this.setState({daysummary_userid: userid, daysummary_date: date});
    this.props.requestUserDaySummary({userid, date});
  }
  onUserClick (userid) {
    this.setState({'defaultUserDisplay': userid});
    this.props.requestUserAttendance({userid, year: this.state.year, month: this.state.month});
  }
  monthToggle (u, y, m) {
    this.setState({year: y, month: m});
    this.props.requestUserAttendance({userid: u, year: y, month: m});
  }
  render () {
    // console.log('this', this.props.empDaySummary);
    return (
      <div >
        <Menu {...this.props} />
        <EmpDaySummary userid={this.state.daysummary_userid} date={this.state.daysummary_date} year={this.state.year} month={this.state.month} {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'My Attendance'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-1"></div>
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

MonthlyAttendance.styles = {
  height100per: {
    'minHeight': '150px'
  }
};

function mapStateToProps (state) {
  return {
    frontend:          state.frontend.toJS(),
    userDaySummary:    state.userDaySummary.toJS(),
    empDaySummary:     state.empDaySummary,
    loggedUser:        state.logged_user.userLogin,
    monthlyAttendance: state.monthlyAttendance.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MonthlyAttendance));
