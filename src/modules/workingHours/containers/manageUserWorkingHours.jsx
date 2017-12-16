import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import Header from 'components/generic/Header';
import {isNotUserValid} from 'src/services/generic';
import UsersList from 'components/generic/UsersList';
import UsersListHeader from 'components/generic/UsersListHeader';
import ListUserWorkingHours from 'components/workingHours/ListUserWorkingHours';
import FormAddUserWorkingHours from 'modules/workingHours/components/FormAddUserWorkingHours';
import * as actions from 'appRedux/actions';
import * as actionsUsersList from 'appRedux/generic/actions/usersList';
import * as actionsManageUserWorkingHours from 'appRedux/workingHours/actions/manageUserWorkingHours';

class ManageUserWorkingHours extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      'defaultUserDisplay': '',
      'daysummary_userid':  '',
      'daysummary_date':    ''
    };
    this.onUserClick = this.onUserClick.bind(this);
    this.onShowDaySummary = this.onShowDaySummary.bind(this);
    this.callAddUserWorkingHours = this.callAddUserWorkingHours.bind(this);
  }
  componentWillMount () {
    this.props.onUsersList();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }

    if (this.state.defaultUserDisplay === '') {
      if (props.usersList.users.length > 0) {
        let firstUser = props.usersList.users[0];
        let defaultUserId = firstUser.user_Id;
        this.onUserClick(defaultUserId);
      }
    }
  }
  onUserClick (userid) {
    this.setState({'defaultUserDisplay': userid});
    this.props.onUserWorkingHoursData(userid);
  }
  onShowDaySummary (userid, date) {
    this.setState({daysummary_userid: userid, daysummary_date: date});
    this.props.onUserDaySummary(userid, date);
  }

  callAddUserWorkingHours (userid, date, workingHours, reason) {
    this.props.onAddUserWorkingHours(userid, date, workingHours, reason).then((data) => {}, (error) => {
      notify(error);
    });
  }

  render () {
    let statusMessage = '';
    if (this.props.manageUserWorkingHours.status_message !== '') {
      statusMessage = <span className="label label-lg primary pos-rlt m-r-xs">
        <b className="arrow left b-primary"></b>{this.props.manageUserWorkingHours.status_message}</span>;
    }

    let selectedUserImage = '';
    let selectedUserName = '';
    let selectedUserJobtitle = '';
    let selectedUserId = '';
    try {
      selectedUserImage = this.props.manageUserWorkingHours.userInfo.slack_profile.profile.image_192;
      selectedUserName = this.props.manageUserWorkingHours.userInfo.name;
      selectedUserJobtitle = this.props.manageUserWorkingHours.userInfo.jobtitle;
      selectedUserId = this.props.manageUserWorkingHours.userInfo.user_Id;
    } catch (err) {}

    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Manage Employees Working Hours' + statusMessage} showLoading={this.props.frontend.show_loading} userListHeader />
          <UsersListHeader
            users={this.props.usersList.users}
            selectedUserId={this.state.selected_user_id}
            onUserClick={this.onUserClick}
              />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-sm-3 hidden-xs" id="fixedScroll">
                  <UsersList users={this.props.usersList.users}
                    selectedUserId={this.state.defaultUserDisplay}
                    onUserClick={this.onUserClick}
                    top={10}
                    />
                </div>
                <div className="col-md-9 col-xs-12 col-sm-9">
                  <div className="box">
                    <div className="item">
                      <div className="item-bg">
                        <img src={selectedUserImage} className="blur" />
                      </div>
                      <div className="p-a-lg pos-rlt text-center">
                        <img src={selectedUserImage} className="img-circle w-56" />
                      </div>
                    </div>
                    <div className="p-a text-center">
                      <a href="" className="text-md m-t block">{selectedUserName}</a>
                      <p>
                        <small>{selectedUserJobtitle}</small>
                      </p>
                    </div>
                  </div>
                  <div className="row no-gutter b-t box ">

                    <div className="col-md-9 col-xs-12 b-r box">
                      <div className="p-a block">
                        <h6 className="text-center">Add New</h6>
                        <hr />
                        <FormAddUserWorkingHours {...this.props}
                          userid={this.state.defaultUserDisplay}
                          callAddUserWorkingHours={this.callAddUserWorkingHours}
                          />
                      </div>
                    </div>
                    <div className="col-md-3 col-xs-12  b-r box ">
                      <div className="p-a block ">
                        <h6 className="text-center">Existing Working Hours</h6>
                        <hr />
                        <div className="hour-overflow ">
                          <ListUserWorkingHours displayData={this.props.manageUserWorkingHours.displayData} />
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
    frontend:               state.frontend.toJS(),
    loggedUser:             state.logged_user.userLogin,
    usersList:              state.usersList.toJS(),
    manageUserWorkingHours: state.manageUserWorkingHours.toJS()
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
    onUserWorkingHoursData: (userid) => {
      return dispatch(actionsManageUserWorkingHours.get_managed_user_working_hours(userid));
    },
    onAddUserWorkingHours: (userid, date, workingHours, reason) => {
      return dispatch(actionsManageUserWorkingHours.add_user_working_hours(userid, date, workingHours, reason));
    }
  };
};

const VisibleManageUserWorkingHours = connect(mapStateToProps, mapDispatchToProps)(ManageUserWorkingHours);

const RouterVisibleManageUserWorkingHours = withRouter(VisibleManageUserWorkingHours);

export default RouterVisibleManageUserWorkingHours;
