import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import UserHorizontalView from 'components/generic/UserHorizontalView';
import DeviceDetails from 'components/inventory/deviceDetails';
import * as actionsMyProfile from 'appRedux/myProfile/actions/myProfile';
import * as actions from 'appRedux/actions';

class MyInventory extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      status_message:      '',
      user_profile_detail: {},
      user_assign_machine: []
    };
    this.props.onIsAlreadyLogin();
    this.callUpdateUserDeviceDetails = this.callUpdateUserDeviceDetails.bind(this);
  }
  componentWillMount () {
    this.props.onMyProfileDetails();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    this.setState({user_profile_detail: props.myProfile.user_profile_detail,
      user_assign_machine: props.myProfile.user_assign_machine});
  }

  callUpdateUserDeviceDetails (newDeviceDetails) {
    this.props.onUpdateDeviceDetails(newDeviceDetails).then((data) => {}, (error) => {
      notify('Error', error, 'error');
    });
  }

  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'My Inventory'} {...this.props} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row no-gutter m-b-md">
                <UserHorizontalView
                  profileImage={this.props.loggedUser.data.profileImage}
                  name={this.state.user_profile_detail.name}
                  jobtitle={this.state.user_profile_detail.jobtitle}
                  inventory
                />
              </div>
              <DeviceDetails
                userAssignMachine={this.state.user_assign_machine}
                callUpdateUserDeviceDetails={this.callUpdateUserDeviceDetails}
              />
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
    myProfile:  state.myProfile.toJS()
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
    onUpdateDeviceDetails: (newDeviceDetails) => {
      return dispatch(actionsMyProfile.updateUserDeviceDetails(newDeviceDetails));
    }
  };
};

const VisibleMyInventory = connect(mapStateToProps, mapDispatchToProps)(MyInventory);

const RouterVisibleMyInventory = withRouter(VisibleMyInventory);

export default RouterVisibleMyInventory;
