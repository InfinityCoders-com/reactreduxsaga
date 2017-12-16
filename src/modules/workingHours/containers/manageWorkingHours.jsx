import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import WorkingHoursSummary from 'components/workingHours/WorkingHoursSummary';
import * as actions from 'appRedux/actions';
import * as actionsWorkingHoursSummary from 'appRedux/workingHours/actions/workingHoursSummary';

class ManageWorkingHours extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      'defaultUserDisplay': '',
      'daysummary_userid':  '',
      'daysummary_date':    ''
    };
    this.onWorkingHoursChange = this.onWorkingHoursChange.bind(this);
  }
  componentWillMount () {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    this.props.onWorkingHoursSummary(year, month);
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    if (props.workingHoursSummary.status_message !== '') {
      notify(props.workingHoursSummary.status_message);
    }
  }
  onWorkingHoursChange (date, hours) {
    if (hours !== '') {
      this.props.onUpdateDayWorkingHours(date, hours).then((data) => {}, (error) => {
        notify(error);
      });
    }
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main" >
          <Header pageTitle={'Manage Working Hours'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-12">
                  <WorkingHoursSummary workingHoursSummary={this.props.workingHoursSummary} onWorkingHoursChange={this.onWorkingHoursChange} onWorkingHoursSummary={this.props.onWorkingHoursSummary} />
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
    frontend:            state.frontend.toJS(),
    loggedUser:          state.logged_user.userLogin,
    userDaySummary:      state.userDaySummary.toJS(),
    workingHoursSummary: state.workingHoursSummary.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onWorkingHoursSummary: (year, month) => {
      return dispatch(actionsWorkingHoursSummary.get_working_hours_summary(year, month));
    },
    onUpdateDayWorkingHours: (date, time) => {
      return dispatch(actionsWorkingHoursSummary.update_day_working_hours(date, time));
    }
  };
};

const VisibleManageWorkingHours = connect(mapStateToProps, mapDispatchToProps)(ManageWorkingHours);

const RouterVisibleManageWorkingHours = withRouter(VisibleManageWorkingHours);

export default RouterVisibleManageWorkingHours;
