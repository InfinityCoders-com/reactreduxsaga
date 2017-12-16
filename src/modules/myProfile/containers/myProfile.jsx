import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import UserHorizontalView from 'components/generic/UserHorizontalView';
import PayslipHistory from 'components/salary/userSalary/PayslipHistory';
import FormProfileDetails from 'modules/myProfile/components/FormProfileDetails';
import FormBankDetails from 'modules/myProfile/components/FormBankDetails';
import FormUpdatePassword from 'modules/myProfile/components/FormUpdatePassword';
import * as actions from 'appRedux/actions';
import * as actionsMyProfile from 'appRedux/myProfile/actions/myProfile';
import * as actionsSalary from 'appRedux/salary/actions/viewSalary';

class MyProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      status_message:      '',
      user_profile_detail: {},
      user_bank_detail:    [],
      payslip_history:     [],
      user_assign_machine: []
    };
    this.props.onIsAlreadyLogin();
    this.callUpdateBankDetails = this.callUpdateBankDetails.bind(this);
    this.callUpdateProfileDetails = this.callUpdateProfileDetails.bind(this);
    this.callUpdateUserDeviceDetails = this.callUpdateUserDeviceDetails.bind(this);
    this.callUpdatePassword = this.callUpdatePassword.bind(this);
  }
  componentWillMount () {
    this.props.onMyProfileDetails();
    this.props.onSalaryDetails();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    let s_payslip_history = [];

    if (typeof props.salary.payslip_history !== 'undefined' && props.salary.payslip_history.length > 0) {
      s_payslip_history = props.salary.payslip_history;
    }
    this.setState({user_profile_detail: props.myProfile.user_profile_detail, user_assign_machine: props.myProfile.user_assign_machine, user_bank_detail: props.myProfile.user_bank_detail, payslip_history: s_payslip_history});
  }
  callUpdateBankDetails (new_bank_details) {
    this.props.onUpdateBankDetails(new_bank_details).then((data) => {}, (error) => {
      notify(error);
    });
  }
  callUpdateUserDeviceDetails (new_device_details) {
    this.props.onUpdateDeviceDetails(new_device_details).then((data) => {}, (error) => {
      notify(error);
    });
  }
  callUpdateProfileDetails (new_profile_details) {
    this.props.onUpdateProfileDetails(new_profile_details).then((data) => {}, (error) => {
      notify(error);
    });
  }
  callUpdatePassword (new_password) {
    new_password = new_password.trim();
    if (new_password === '') {
      notify('Enter Password !!');
    } else {
      this.props.onUpdatePassword(new_password).then((data) => {
        notify(data);
        this.props.onMyProfileDetails();
      }, (error) => {
        notify(error);
      });
    }
  }
  render () {
    let {name, jobtitle, dateofjoining, gender, dob, work_email} = this.state.user_profile_detail;
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'My Profile'} {...this.props} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row no-gutter">
                <UserHorizontalView
                  profileImage={this.props.loggedUser.data.profileImage}
                  name={name}
                  jobtitle={jobtitle}
                  dateofjoining={dateofjoining}
                  gender={gender}
                  dob={dob}
                  workEmail={work_email}
                />
              </div>
              <div className="row no-gutter">
                <div className="col-sm-6 p-a b-r m-b-md">
                  <FormProfileDetails user_profile_detail={this.state.user_profile_detail} callUpdateProfileDetails={this.callUpdateProfileDetails} />
                </div>
                <div className="col-sm-6 p-a m-b-md">
                  <FormBankDetails user_bank_detail={this.state.user_bank_detail} callUpdateBankDetails={this.callUpdateBankDetails} />
                </div>
                <div className="col-sm-6 p-a m-b-md">
                  <FormUpdatePassword callUpdatePassword={this.callUpdatePassword} />
                </div>
                <div className="col-sm-6 p-a">
                  <PayslipHistory payslip_history={this.state.payslip_history} />
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
    frontend:   state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin,
    myProfile:  state.myProfile.toJS(),
    salary:     state.salary.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onMyProfileDetails: () => {
      return dispatch(actionsMyProfile.getMyProfileDetails());
    },
    onUpdateBankDetails: (new_bank_details) => {
      return dispatch(actionsMyProfile.updateBankDetails(new_bank_details));
    },
    onUpdateProfileDetails: (new_profile_details) => {
      return dispatch(actionsMyProfile.updateProfileDetails(new_profile_details));
    },
    onUpdateDeviceDetails: (new_device_details) => {
      return dispatch(actionsMyProfile.updateUserDeviceDetails(new_device_details));
    },
    onUpdatePassword: (new_password) => {
      return dispatch(actionsMyProfile.updatePassword(new_password));
    },
    onSalaryDetails: () => {
      return dispatch(actionsSalary.getSalaryDetails());
    }
  };
};
MyProfile.propTypes = {
  user_bank_detail:    PropTypes.array,
  user_profile_detail: PropTypes.object,
  payslip_history:     PropTypes.array,
  user_assign_machine: PropTypes.array
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyProfile));
