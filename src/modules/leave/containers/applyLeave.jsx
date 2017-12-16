import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import {CONFIG} from 'src/config/index';
import UsersList from 'components/generic/UsersList';
import Header from 'components/generic/Header';
import UsersListHeader from 'components/generic/UsersListHeader';
import ApplyLeaveForm from 'modules/leave/components/applyLeave/ApplyLeaveForm';
import * as actions from 'appRedux/actions';
import * as actions_usersList from 'appRedux/generic/actions/usersList';
import * as actions_policy from 'appRedux/policyDocuments/actions/index';
import * as actions_apply_leave from 'appRedux/leave/actions/applyLeave';

class ApplyLeave extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      'defaultUserDisplay':     '',
      'selected_user_name':     '',
      'selected_user_image':    '',
      'selected_user_jobtitle': '',
      'selected_user_id':       '',
      'show_status_message':    true
    };
    this.onUserClick = this.onUserClick.bind(this);
    this.doApplyLeave = this.doApplyLeave.bind(this);
  }
  componentWillMount () {
    this.props.onFetchUserPolicyDocument();
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    if (props.loggedUser.data.role === CONFIG.ADMIN || props.loggedUser.data.role === CONFIG.HR) {
      if (this.state.defaultUserDisplay === '') {
        props.onUsersList();
      }
    }
  }
  componentDidUpdate () {
    if (this.props.loggedUser.data.role === CONFIG.ADMIN || this.props.loggedUser.data.role === CONFIG.HR) {
      if (this.state.defaultUserDisplay === '') {
        if (this.props.usersList.users.length > 0) {
          let firstUser = this.props.usersList.users[0];
          let defaultUserId = firstUser.user_Id;
          this.onUserClick(defaultUserId);
        }
      }
    }
  }
  onUserClick (userid) {
    let selected_user_name = '';
    let selected_user_image = '';
    let selected_user_jobtitle = '';
    let selected_user_id = '';

    if (this.props.usersList.users.length > 0) {
      let userDetails = _.find(this.props.usersList.users, {'user_Id': userid});
      if (typeof userDetails !== 'undefined') {
        selected_user_name = userDetails.name;
        selected_user_image = userDetails.slack_profile.image_192;
        selected_user_jobtitle = userDetails.jobtitle;
        selected_user_id = userDetails.user_Id;
      }
    }
    this.setState({
      'defaultUserDisplay':     userid,
      'selected_user_name':     selected_user_name,
      'selected_user_image':    selected_user_image,
      'selected_user_jobtitle': selected_user_jobtitle,
      'selected_user_id':       selected_user_id,
      'show_status_message':    false
    });
  }
  doApplyLeave (start, end, days, reason, userid, day_status, leaveType, late_reason) {
    this.setState({show_status_message: true});
    this.props.onApplyLeave(start, end, days, reason, userid, day_status, leaveType, late_reason).then((data) => {
      notify('Success !', data, 'success');
    }).catch((error) => {
      notify('Error !', error, 'error');
    });
  }

  render () {
    let status_message = '';
    if (this.props.applyLeave.status_message !== '' && this.state.show_status_message === true) {
      status_message = <span className="well" style={{background: '#60cffa', padding: '5px', marginLeft: '8px'}}>
        {this.props.applyLeave.status_message}</span>;
    }

    let mainDivs = (this.props.loggedUser.data.role === CONFIG.ADMIN || this.props.loggedUser.data.role === CONFIG.HR
      ? <div className="row">
        <div className="col-sm-3 hidden-xs" id="fixedScroll">
          <UsersList users={this.props.usersList.users} selectedUserId={this.state.selected_user_id} onUserClick={this.onUserClick} props={this.props} top={10} />
        </div>
        <div className="col-xs-12 col-sm-9">
          <div className="box">
            <div className="p-a text-center">
              <a href="" className="text-md m-t block">{this.state.selected_user_name}</a>
              <p>
                <small>{this.state.selected_user_jobtitle}</small>
              </p>
            </div>
          </div>
          <div className="box">
            <div className="box-body">
              <ApplyLeaveForm forAdmin doApplyLeave={this.doApplyLeave} selectedUserId={this.state.selected_user_id} {...this.props} />
            </div>
          </div>
        </div>
      </div>
      : <div className="box">
        <div className="box-body">
          <ApplyLeaveForm doApplyLeave={this.doApplyLeave} forAdmin={false} {...this.props} />
        </div>
      </div>);

    return (
      <div >
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Apply Leave'} status={status_message} showLoading={this.props.frontend.show_loading} userListHeader />
          <UsersListHeader users={this.props.usersList.users} selectedUserId={this.state.selected_user_id} onUserClick={this.onUserClick} />
          <div className="app-body" id="view">
            <div className="padding p-t-lg">
              {mainDivs}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ApplyLeave.styles = {
  height100per: {
    'minHeight': '150px'
  }
};

function mapStateToProps (state) {
  return {
    frontend:        state.frontend.toJS(),
    loggedUser:      state.logged_user.userLogin,
    usersList:       state.usersList.toJS(),
    applyLeave:      state.applyLeave.toJS(),
    policyDocuments: state.policyDocuments.policyDocument
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onApplyLeave: (from_date, to_date, no_of_days, reason, userId, day_status, leaveType, late_reason) => {
      return dispatch(actions_apply_leave.apply_leave(from_date, to_date, no_of_days, reason, userId, day_status, leaveType, late_reason));
    },
    onDaysBetweenLeaves: (startDate, endDate) => {
      return dispatch(actions_apply_leave.getDaysBetweenLeaves(startDate, endDate));
    },
    onUsersList: () => {
      return dispatch(actions_usersList.get_users_list());
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actions.requestUserPolicyDocument());
    }
  };
};

const VisibleApplyLeave = connect(mapStateToProps, mapDispatchToProps)(ApplyLeave);

const RouterVisibleApplyLeave = withRouter(VisibleApplyLeave);

export default RouterVisibleApplyLeave;
