import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import ToggleButton from 'react-toggle-button';
import PropTypes from 'prop-types';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import UsersList from 'components/generic/UsersList';
import UsersListHeader from 'components/generic/UsersListHeader';
import UpdateEmployeeDocument from 'modules/manageUsers/components/UpdateEmployeeDocument';
import Button from 'components/generic/buttons/Button';
import AlertNotification from 'components/generic/AlertNotification';
import DisplayUserBankDetails from 'components/manageUser/DisplayUserBankDetails';
import DisplayUserDeviceDetails from 'components/manageUser/DisplayUserDeviceDetails';
import UserPayslipsHistory from 'components/salary/managePayslips/UserPayslipsHistory';
import FormAddNewEmployee from 'modules/manageUsers/components/FormAddNewEmployee';
import FormUserProfileDetails from 'modules/manageUsers/components/FormUserProfileDetails';
import EmployeeLifeCycle from 'modules/manageUsers/components/EmployeeLifeCycle';
import * as actions from 'appRedux/actions';
import * as actionsUsersList from 'appRedux/generic/actions/usersList';
import * as actionsManageUsers from 'src/redux/manageUsers/actions/manageUsers';
import * as actionsManagePayslips from 'appRedux/salary/actions/managePayslips';

class ManageUsers extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      status_message:       '',
      'defaultUserDisplay': '',
      user_profile_detail:  {},
      user_bank_detail:     [],
      user_assign_machine:  [],
      user_documents:       {},
      user_payslip_history: [],
      employee_life_cycle:  {},
      'openIframe':         false,
      username:             ''
    };
    this.onUserClick = this.onUserClick.bind(this);
    this.callUpdateUserBankDetails = this.callUpdateUserBankDetails.bind(this);
    this.callUpdateUserDeviceDetails = this.callUpdateUserDeviceDetails.bind(this);
    this.callUpdateUserProfileDetails = this.callUpdateUserProfileDetails.bind(this);
    this.callAddNewEmployee = this.callAddNewEmployee.bind(this);
    this.handleOpenIframe = this.handleOpenIframe.bind(this);
    this.handleCloseIframe = this.handleCloseIframe.bind(this);
    this.changeEmployeeStatus = this.changeEmployeeStatus.bind(this);
    this.handleChangeSteps = this.handleChangeSteps.bind(this);
  }
  componentWillMount () {
    this.props.onUsersList();
    this.props.onFetchTeam();
  }
  componentWillReceiveProps (props) {
    let {route, loggedUser, managePayslips:{user_payslip_history}, manageUsers:{username, user_profile_detail, user_bank_detail, user_assign_machine, user_documents, stages}} = props;
    let isNotValid = isNotUserValid(route.path, loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    this.setState({
      user_payslip_history: user_payslip_history,
      username:             username,
      user_profile_detail:  user_profile_detail,
      user_bank_detail:     user_bank_detail,
      user_assign_machine:  user_assign_machine,
      user_documents:       user_documents
    });
    if (this.state.employee_life_cycle_stages !== stages) {
      this.setState({
        employee_life_cycle: stages.employee_life_cycle
      });
    }
  }
  componentDidUpdate () {
    if (this.state.defaultUserDisplay === '') {
      if (this.props.usersList.users.length > 0) {
        let firstUser = this.props.usersList.users[0];
        let defaultUserId = firstUser.user_Id;
        let defaultUserName = firstUser.username;
        this.onUserClick(defaultUserId, defaultUserName);
      }
    }
  }
  onUserClick (userid, username) {
    let selectedUserName = '';
    let selectedUserImage = '';
    let selectedUserJobtitle = '';
    let selectedUserId = '';
    if (this.props.usersList.users.length > 0) {
      let userDetails = _.find(this.props.usersList.users, {'user_Id': userid});
      if (typeof userDetails !== 'undefined') {
        selectedUserName = userDetails.name;
        selectedUserImage = userDetails.slack_profile.image_192;
        selectedUserJobtitle = userDetails.jobtitle;
        selectedUserId = userDetails.user_Id;
      }
    }
    this.setState({
      'defaultUserDisplay':     userid,
      'selected_user_name':     selectedUserName,
      'selected_user_image':    selectedUserImage,
      'selected_user_jobtitle': selectedUserJobtitle,
      'selected_user_id':       selectedUserId
    });
    this.props.onUserProfileDetails(userid, username);
    this.props.onGetUserDocument(userid);
    this.props.onUserManagePayslipsData(userid);
    this.props.onGetStages(userid);
  }
  callUpdateUserBankDetails (newBankDetails) {
    this.props.onUpdateUserBankDetails(newBankDetails).then((data) => {}, (error) => {
      notify(error);
    });
  }
  callUpdateUserDeviceDetails (newDeviceDetails) {
    this.props.onUpdateUserDeviceDetails(newDeviceDetails).then((data) => {}, (error) => {
      notify(error);
    });
  }
  callUpdateUserProfileDetails (newProfileDetails) {
    this.props.onUpdateUserProfileDetails(newProfileDetails).then((data) => {}, (error) => {
      notify(error);
    });
  }
  callAddNewEmployee (newEmployeeDetails) {
    this.props.onAddNewEmployee(newEmployeeDetails).then((data) => {
      notify(data);
      this.props.onUsersList();
    }, (error) => {
      notify(error);
    });
  }
  changeEmployeeStatus (userid, status) {
    this.props.onChangeEmployeeStatus(userid, status).then((msg) => {
      notify('Success!', msg, 'success');
      this.props.onUsersList().then(() => {
        if (this.props.usersList.users.length > 0) {
          let firstUser = this.props.usersList.users[0];
          let defaultUserId = firstUser.user_Id;
          this.onUserClick(defaultUserId);
        }
      });
    }).catch((err) => {
      notify('Error!', err, 'error');
    });
  }
  handleChangeSteps (stepid, userid) {
    let {employee_life_cycle} = this.state;
    _.map(employee_life_cycle, (stage, key) => {
      _.map(stage.steps, (step, k) => {
        if (step.id === stepid) {
          step.status = !step.status;
        }
      });
    });
    this.setState({
      employee_life_cycle
    });
    this.props.onHandleChangeSteps(userid, stepid);
  }
  handleOpenIframe () {
    this.setState({openIframe: true});
  }
  handleCloseIframe () {
    this.setState({openIframe: false});
  }
  render () {
    return (
      <div>
        <AlertNotification message={this.props.manageUsers.status_message} />
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Manage Employees Profile'} showLoading={this.props.frontend.show_loading} userListHeader />
          <UsersListHeader users={this.props.usersList.users} selectedUserId={this.state.selected_user_id} onUserClick={this.onUserClick} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-2 col-sm-3 hidden-xs" id="fixedScroll">
                  <UsersList
                    users={this.props.usersList.users}
                    selectedUserId={this.state.selected_user_id}
                    onUserClick={this.onUserClick}
                    top={5} {...this.props}
                  />
                </div>
                <div className="col-md-10 col-sm-9 col-xs-12 p">
                  <div className="row emp-action-btn p-b">
                    <div className="add-new-emp">
                      <FormAddNewEmployee callAddNewEmployee={this.callAddNewEmployee} />
                    </div>
                    <div className="disable-user">
                      <Button className="btn-fw btn-danger responsive-p-x-sm" label={'Disable Selected User'} onClick={() => this.changeEmployeeStatus(this.state.selected_user_id, 'Disabled')} />
                    </div>
                    <div className="slack-notification">
                      <div className="btn-wrapper">
                        <label>
                          <i className="fa fa-bell-slash fa-lg" aria-hidden="true"></i> Slack Notifications
                        </label>
                        <span>
                          <ToggleButton
                            value={this.state.user_profile_detail.slack_msg === '0' || false}
                            onToggle={() => {
                              let user = this.refs.userForm.state;
                              if (user.slack_msg === '0') user.slack_msg = '1';
                              else if (user.slack_msg === '1') user.slack_msg = '0';
                              this.callUpdateUserProfileDetails(user);
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row box">
                    <EmployeeLifeCycle employee_life_cycle={this.state.employee_life_cycle} handleChangeSteps={(stepid) => this.handleChangeSteps(stepid, this.state.selected_user_id)} />
                  </div>
                  <div className="row box">
                    <div className="col-md-7 p-t p-b p-r p-l b-r">
                      <FormUserProfileDetails
                        ref="userForm"
                        user_profile_detail={this.state.user_profile_detail}
                        callUpdateUserProfileDetails={this.callUpdateUserProfileDetails}
                        username={this.state.username} {...this.props}
                      />
                    </div>
                    <div className="col-md-5 p-t p-b">
                      <div className="col-xs-6 col-md-12 profile-input">
                        <DisplayUserBankDetails userBankDetails={this.state.user_bank_detail} />
                      </div>
                      <div className="col-xs-6 col-md-12 profile-input">
                        <DisplayUserDeviceDetails userAssignMachine={this.state.user_assign_machine} />
                      </div>
                      <div className="col-xs-6 col-md-12 profile-input">
                        <UpdateEmployeeDocument
                          user_documents={this.state.user_documents}
                          user_id={this.state.selected_user_id}
                          onUpdatedocuments={this.props.onUpdatedocuments} {...this.props}
                        />
                      </div>
                      <div className="col-xs-6 col-md-12 profile-input">
                        <h6 className="text-center">
                          <u>Previous Payslips</u>
                        </h6>
                        <hr />
                        <UserPayslipsHistory user_payslip_history={this.state.user_payslip_history} />
                      </div>
                    </div>
                  </div>
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
    frontend:       state.frontend.toJS(),
    managePayslips: state.managePayslips.toJS(),
    loggedUser:     state.logged_user.userLogin,
    usersList:      state.usersList.toJS(),
    manageUsers:    state.manageUsers.toJS(),
    teamList:       state.teamList.teamList
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
    onUserProfileDetails: (userid, username) => {
      return dispatch(actionsManageUsers.getUserProfileDetails(userid, username));
    },
    onUpdateUserBankDetails: (newBankDetails) => {
      return dispatch(actionsManageUsers.updateUserBankDetails(newBankDetails));
    },
    onUpdateUserProfileDetails: (newProfileDetails) => {
      return dispatch(actionsManageUsers.updateUserProfileDetails(newProfileDetails));
    },
    onUpdateUserDeviceDetails: (newDeviceDetails) => {
      return dispatch(actionsManageUsers.updateUserDeviceDetails(newDeviceDetails));
    },
    onAddNewEmployee: (newEmployeeDetails) => {
      return dispatch(actionsManageUsers.addNewEmployee(newEmployeeDetails));
    },
    onUpdatedocuments: (documentLink) => {
      return dispatch(actionsManageUsers.updateDocument(documentLink));
    },
    onChangeEmployeeStatus: (userid, status) => {
      return dispatch(actionsManageUsers.changeEmployeeStatus(userid, status));
    },
    onGetUserDocument: (userid) => {
      return dispatch(actionsManageUsers.getUserDocument(userid));
    },
    onDeleteDocument: (docId) => {
      return dispatch(actionsManageUsers.deleteDocument(docId));
    },
    onUserManagePayslipsData: (userid) => {
      return dispatch(actionsManagePayslips.get_user_manage_payslips_data(userid));
    },
    onFetchTeam: () => {
      return dispatch(actions.requestGetTeam());
    },
    onGetStages: (id) => {
      return dispatch(actionsManageUsers.getSteps(id));
    },
    onHandleChangeSteps: (userid, stepid) => {
      return dispatch(actionsManageUsers.changeSteps(userid, stepid));
    }
  };
};

const VisibleManageUsers = connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
const RouterVisibleManageUsers = withRouter(VisibleManageUsers);

export default RouterVisibleManageUsers;

ManageUsers.PropTypes = {
  onIsAlreadyLogin:           PropTypes.func.isRequired,
  onFetchTeam:                PropTypes.func.isRequired,
  onUserProfileDetails:       React.PropTypes.func.isRequired,
  onGetUserDocument:          PropTypes.func.isRequired,
  onUserManagePayslipsData:   PropTypes.func.isRequired,
  onUpdateUserBankDetails:    PropTypes.func.isRequired,
  onUpdateUserDeviceDetails:  PropTypes.func.isRequired,
  onUpdateUserProfileDetails: PropTypes.func.isRequired,
  onAddNewEmployee:           PropTypes.func.isRequired,
  onChangeEmployeeStatus:     PropTypes.func.isRequired,
  onUsersList:                React.PropTypes.func.isRequired,
  onUpdatedocuments:          PropTypes.func.isRequired,
  usersList:                  PropTypes.object.isRequired,
  manageUsers:                PropTypes.object.isRequired,
  router:                     PropTypes.object.isRequired
};
