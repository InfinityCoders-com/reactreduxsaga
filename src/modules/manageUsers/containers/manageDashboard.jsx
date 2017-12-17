import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {bindActionCreators} from 'redux';
import LoadingIcon from 'components/generic/LoadingIcon';
import * as actions from 'appRedux/actions';
import PageUserDashboard from 'modules/manageUsers/components/PageUserDashboard';
import PageMonthlyHours from 'modules/manageUsers/components/PageMonthlyHours';
import PageEmployeePerformance from 'modules/manageUsers/components/PageEmployeePerformance';
import PageEmployeeLifeCycle from 'modules/manageUsers/components/PageEmployeeLifeCycle';

class ManageDashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      defaultTeamDisplay: '',
      status_message:     '',
      active:             'active',
      firstArrow:         'hidden',
      secondArrow:        'hidden',
      thirdArrow:         'hidden',
      fourthArrow:        'hidden',
      fifthArrow:         'show',
      teamList:           'hidden',
      empLifeCycle:       'hidden',
      empHours:           'hidden',
      monthlyHours:       'hidden',
      empPerformance:     'show',
      empData:            '',
      currentDate:        '',
      currentYear:        '',
      currentMonth:       '',
      date:               '',
      months:             ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      years:              []
    };
    this.openPage = this.openPage.bind(this);
  }
  componentWillMount (props) {
    window.scrollTo(0, 0);
    const dateData = new Date();
    const dataDate = dateData.toString().split(" ");
    const year = dateData.getFullYear();
    const month = dateData.getMonth();
    const date = dataDate[2];
    const months = this.state.months;
    const userId = localStorage.getItem('userid');
    let startYear = 2010;
    let yearOptions = [];
    while (startYear <= year) {
      yearOptions.push(startYear);
      startYear++;
    }
    this.setState({
      currentMonth: months[month],
      currentYear:  year,
      currentDate:  date,
      years:        yearOptions,
      date:         dateData
    });
    this.props.requestEmployeeHours({
      'id':    userId,
      'date':  date,
      'month': months[month],
      'year':  year
    });
    this.props.requestUserList();
    this.props.requestTeamStats();
    this.props.requestEmployeLifeCycle({
      'start_year': year,
      'end_year':   year
    });
    this.props.requestEmployeeMonthlyHours({
      'id':    userId,
      'month': months[month],
      'year':  year
    });
    this.props.requestEmployeePerformance({
      'id':    userId,
      'month': months[month],
      'year':  year
    });
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
  componentWillReceiveProps (props) {
    this.setState({
      defaultTeamDisplay: props.teamStats.teamStats.data.teams,
      empData:            props.empHours
    });
  }

  openPage (toDisplay) {
    if (toDisplay === 'team_list') {
      this.setState({
        teamList:       'row',
        firstArrow:     'show',
        empLifeCycle:   'hidden',
        empHours:       'hidden',
        monthlyHours:   'hidden',
        empPerformance: 'hidden',
        secondArrow:    'hidden',
        thirdArrow:     'hidden',
        fourthArrow:    'hidden',
        fifthArrow:     'hidden'
      });
    } else if ((toDisplay === 'emp_life_cycle')) {
      this.setState({
        empLifeCycle:   'row',
        secondArrow:    'show',
        teamList:       'hidden',
        firstArrow:     'hidden',
        thirdArrow:     'hidden',
        fourthArrow:    'hidden',
        fifthArrow:     'hidden',
        empHours:       'hidden',
        monthlyHours:   'hidden',
        empPerformance: 'hidden'
      });
    } else if ((toDisplay === 'attendance_list')) {
      this.setState({
        empHours:       'row',
        thirdArrow:     'show',
        teamList:       'hidden',
        firstArrow:     'hidden',
        empLifeCycle:   'hidden',
        secondArrow:    'hidden',
        fourthArrow:    'hidden',
        fifthArrow:     'hidden',
        monthlyHours:   'hidden',
        empPerformance: 'hidden'
      });
    } else if ((toDisplay === 'monthlyHours')) {
      this.setState({
        monthlyHours:   'row',
        fourthArrow:    'show',
        empHours:       'hidden',
        thirdArrow:     'hidden',
        teamList:       'hidden',
        firstArrow:     'hidden',
        empLifeCycle:   'hidden',
        empPerformance: 'hidden',
        secondArrow:    'hidden',
        fifthArrow:     'hidden'
      });
    } else if ((toDisplay === 'employee_performance')) {
      this.setState({
        empPerformance: 'row',
        fifthArrow:     'show',
        monthlyHours:   'hidden',
        fourthArrow:    'hidden',
        empHours:       'hidden',
        thirdArrow:     'hidden',
        teamList:       'hidden',
        firstArrow:     'hidden',
        empLifeCycle:   'hidden',
        secondArrow:    'hidden'
      });
    }
  }
  render () {
    return (
      <div>
        <div id="content" className="app-content box-shadow-z0" role="main">
          <div className="nav-dashboard box-shadow m-b p-y-sm">
            <div className="navbar">
              <img className="p-0" style={{'marginTop': '0.7%'}} src="./logo.png" height="40" width="220"></img>
              <Link to="search">
                <p className='p-dashboard' data-toggle="tooltip" data-placement="bottom" title="Search">
                  <span className="glyphicon glyphicon-search"></span>
                </p>
              </Link>
              <Link to="page_login">
                <p className='p-dashboard'
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Login">
                  <i className="material-icons">power_settings_new</i>
                </p>
              </Link>
            </div>
          </div>
          <div className="app-body " id="view">
            <div className="padding">
              <LoadingIcon loading={this.props.teamStats.isLoading} />
            </div>
            <div className="p-a-lg">
              <div className="row">
                {this.state.role === 'admin' ?
                  <div className="col-xs-12 well box-shadow-deep p-a box">
                    <PageUserDashboard {...this.props} team={this.props.teamStats.teamStats.data.teams} />
                  </div>
                : null}
                <div className="col-xs-12 well box-shadow-deep p-a box">
                  <PageEmployeePerformance employeePerformance={this.props.employeePerformance} {...this.props} currentMonth={this.state.currentMonth} currentYear={this.state.currentYear} year={this.state.years} months={this.state.months} currentDate={this.state.date} />
                </div>
                <div className="col-xs-12 well box-shadow-deep p-a box">
                  <PageMonthlyHours monthlyHours={this.props.monthlyHours} {...this.props} currentMonth={this.state.currentMonth} currentYear={this.state.currentYear} year={this.state.years} months={this.state.months} />
                </div>
                {this.state.role === 'admin' ?
                  <div className="col-xs-12 well box-shadow-deep p-a box">
                    <PageEmployeeLifeCycle empLifeCycle={this.props.empLifeCycle} {...this.props} currentMonth={this.state.currentMonth} currentYear={this.state.currentYear} year={this.state.years} months={this.state.months} />
                  </div>
                : null}
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
    teamStats:              state.teamStats,
    empLifeCycle:           state.teamStats.empLifeCycle,
    manageUserPendingHours: state.manageUserPendingHours.toJS(),
    empHours:               state.teamStats.empHours,
    monthlyHours:           state.teamStats.monthlyHours,
    employeePerformance:    state.teamStats.employeePerformance,
    employeeList:           state.teamStats.employeeList
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const VisibleManageDashboard = connect(mapStateToProps, mapDispatchToProps)(ManageDashboard);

const RouterVisibleManageDashboard = withRouter(VisibleManageDashboard);

export default RouterVisibleManageDashboard;
