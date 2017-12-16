import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import ViewLeavesSummary from 'components/leave/leavesSummary/ViewLeavesSummary';
import * as actions from 'appRedux/actions';
import * as actions_leavesSummary from 'appRedux/leave/actions/leavesSummary';

class LeavesSummary extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      'defaultUserDisplay': '',
      'daysummary_userid':  '',
      'daysummary_date':    ''
    };
  }
  componentWillMount () {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1; // +1 since getMonth starts from 0
    this.props.on_all_leaves_summary(year, month);
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Leaves Summary'} showLoading={this.props.frontend.show_loading} />
          <ViewLeavesSummary componentData={this.props.leavesSummary} on_all_leaves_summary={this.props.on_all_leaves_summary} />
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:      state.frontend.toJS(),
    loggedUser:    state.logged_user.userLogin,
    leavesSummary: state.leavesSummary.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    on_all_leaves_summary: (year, month) => {
      return dispatch(actions_leavesSummary.get_all_leaves_summary(year, month));
    }
  };
};

const VisibleLeavesSummary = connect(mapStateToProps, mapDispatchToProps)(LeavesSummary);

const RouterVisibleLeavesSummary = withRouter(VisibleLeavesSummary);

export default RouterVisibleLeavesSummary;
