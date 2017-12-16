import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import ManagePayslipsUsersList from 'modules/salary/components/managePayslips/ManagePayslipsUsersList';
import FormGeneratePaySlip from 'modules/salary/components/managePayslips/FormGeneratePaySlip';
import EmployeeActualSalary from 'modules/salary/components/managePayslips/EmployeeActualSalary';
import UserPayslipsHistory from 'components/salary/managePayslips/UserPayslipsHistory';
import * as actions from 'appRedux/actions';
import * as actions_usersList from 'appRedux/generic/actions/usersList';
import * as actions_managePayslips from 'appRedux/salary/actions/managePayslips';

class ManagePayslips extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      year:                     '',
      month:                    '',
      'selected_user_name':     '',
      'selected_user_image':    '',
      'selected_user_jobtitle': '',
      'selected_user_id':       '',
      'defaultUserDisplay':     '',
      'user_data_for_payslip':  {},
      'user_payslip_history':   [],
      'google_drive_emailid':   '',
      'employee_actual_salary': {}
    };

    this.onUserClick = this.onUserClick.bind(this);
    this.callCreateUserPayslip = this.callCreateUserPayslip.bind(this);
    this.callEmailPayslips = this.callEmailPayslips.bind(this);
    this.callMonthlyPayslip = this.callMonthlyPayslip.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.saveArrear = this.saveArrear.bind(this);
  }
  componentWillMount () {
    this.props.onUsersList();
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    let s_google_drive_emailid = '';
    let s_user_data_for_payslip = {};
    let s_user_payslip_history = [];
    let s_all_users_latest_payslip = [];
    let s_employee_actual_salary = {};

    if (typeof props.managePayslips.user_data_for_payslip !== 'undefined') {
      s_user_data_for_payslip = props.managePayslips.user_data_for_payslip;
    }

    if (typeof props.managePayslips.user_payslip_history !== 'undefined') {
      s_user_payslip_history = props.managePayslips.user_payslip_history;
    }

    if (typeof props.managePayslips.all_users_latest_payslip !== 'undefined') {
      s_all_users_latest_payslip = props.managePayslips.all_users_latest_payslip;
    }

    if (typeof props.managePayslips.google_drive_emailid !== 'undefined') {
      s_google_drive_emailid = props.managePayslips.google_drive_emailid;
    }

    if (typeof props.managePayslips.employee_actual_salary !== 'undefined') {
      s_employee_actual_salary = props.managePayslips.employee_actual_salary;
    }

    this.setState({user_data_for_payslip: s_user_data_for_payslip, user_payslip_history: s_user_payslip_history, all_users_latest_payslip: s_all_users_latest_payslip, google_drive_emailid: s_google_drive_emailid, employee_actual_salary: s_employee_actual_salary});
  }

  componentDidUpdate () {
    if (this.state.defaultUserDisplay == '') {
      if (this.props.usersList.users.length > 0) {
        let firstUser = this.props.usersList.users[0];
        let defaultUserId = firstUser.user_Id;
        this.onUserClick(defaultUserId);
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
    this.setState({'defaultUserDisplay': userid, 'selected_user_name': selected_user_name, 'selected_user_image': selected_user_image, 'selected_user_jobtitle': selected_user_jobtitle, 'selected_user_id': selected_user_id});
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (this.state.year == '' && this.state.month == '') {
      this.props.onUserManagePayslipsData(userid);
    } else {
      this.props.onUserMonthlyManagePayslipsData(userid, this.state.year, this.state.month);
    }
  }
  saveArrear (user_id, extra_arrear, arrear_for_month) {
    // console.log(user_id,extra_arrear,arrear_for_month);
    this.props.onCreateArrear(user_id, extra_arrear, arrear_for_month);
  }

  callCreateUserPayslip (payslipData, evt) {
    // evt.preventDefault();
    this.props.onCreateUserPayslip(payslipData).then((data) => {
      this.onUserClick(this.state.selected_user_id);
    }, (error) => {
      notify(error);
    });
  }

  callMonthlyPayslip (userid, year, month) {
    this.setState({year: year, month: month});
    this.props.onUserMonthlyManagePayslipsData(userid, year, month);
  }

  callEmailPayslips (ids) {
    if (ids.length == 0) {
      notify('Select an employee!!!');
    } else {
      this.props.onEmailPayslips(ids).then((data) => {
        notify(data);
        this.props.onUsersList();
        this.onUserClick(this.state.selected_user_id);
      }, (error) => {
        notify(error);
      });
    }
  }

  responseGoogle (response) {
    let accessToken = response.getAuthResponse().access_token;
    if (accessToken == '') {
      notify('Access token is empty!!!');
    } else {
      this.props.onSaveGoogleAccessToken(accessToken).then((data) => {
        notify(data);
      }, (error) => {
        notify(error);
      });
    }
  }
  render () {
    let status_message = '';
    let selectedUserId = '';
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Manage Payslips' + status_message} {...this.props} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-3">
                  <ManagePayslipsUsersList users={this.props.usersList.users} selectedUserId={this.state.selected_user_id} onUserClick={this.onUserClick} all_users_latest_payslip={this.state.all_users_latest_payslip} callEmailPayslips={this.callEmailPayslips} onGetTransferList={this.props.onGetTransferList} google_drive_emailid={this.state.google_drive_emailid} {...this.props} />
                </div>
                <div className="col-md-9">
                  <div className="row no-gutter b-t">
                    <div className="col-xs-12 b-l">
                      <div className="p-a block box">
                        <h2>{this.state.selected_user_name}</h2>
                        <h6>Employee Id : {this.state.selected_user_id}</h6>
                        <h6 className="text-center">Generate Payslip</h6>
                        <hr />
                        <FormGeneratePaySlip user_id={this.state.selected_user_id} name={this.state.selected_user_name} designation={this.state.selected_user_jobtitle} user_data_for_payslip={this.state.user_data_for_payslip} callCreateUserPayslip={this.callCreateUserPayslip} callMonthlyPayslip={this.callMonthlyPayslip} pending_leaves={this.props.managePayslips.pending_leaves} saveArrear={this.saveArrear} actualSalary={this.state.employee_actual_salary} />
                      </div>
                      <div className="p-a block box">
                        <div className="row">
                          <div className="col-md-8 b-r">
                            <h6 className="text-center">
                              <u>EmployeeActualSalary</u>
                            </h6>
                            <hr />
                            <EmployeeActualSalary employee_actual_salary={this.state.employee_actual_salary} />
                          </div>
                          <div className="col-md-4">
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
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:       state.frontend.toJS(),
    loggedUser:     state.logged_user.userLogin,
    usersList:      state.usersList.toJS(),
    managePayslips: state.managePayslips.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onUsersList: () => {
      return dispatch(actions_usersList.get_users_list());
    },
    onUserManagePayslipsData: (userid) => {
      return dispatch(actions_managePayslips.get_user_manage_payslips_data(userid));
    },
    onUserMonthlyManagePayslipsData: (userid, year, month) => {
      return dispatch(actions_managePayslips.get_user_month_manage_payslips_data(userid, year, month));
    },
    onCreateUserPayslip: (payslipData) => {
      return dispatch(actions_managePayslips.create_user_payslip(payslipData));
    },
    onEmailPayslips: (payslips_ids) => {
      return dispatch(actions_managePayslips.email_payslips(payslips_ids));
    },
    onSaveGoogleAccessToken: (accessToken) => {
      return dispatch(actions_managePayslips.save_google_access_token(accessToken));
    },
    onCreateArrear: (user_id, extra_arrear, arrear_for_month) => {
      return dispatch(actions_managePayslips.create_arrear(user_id, extra_arrear, arrear_for_month));
    },
    onGetTransferList: (userIds) => {
      return dispatch(actions_managePayslips.getTransferList(userIds));
    }

  };
};

const VisibleManagePayslips = connect(mapStateToProps, mapDispatchToProps)(ManagePayslips);

const RouterVisibleManagePayslips = withRouter(VisibleManagePayslips);

export default RouterVisibleManagePayslips;
