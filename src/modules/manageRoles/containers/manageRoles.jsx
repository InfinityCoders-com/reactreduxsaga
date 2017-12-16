import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {notify} from 'src/services/notify';
import Menu from 'components/generic/Menu';
import Header from 'components/generic/Header';
import {isNotUserValid} from 'src/services/generic';
import AlertNotification from 'components/generic/AlertNotification';
import AddRolesForm from 'modules/manageRoles/components/AddRolesForm';
import DisplayRolesLists from 'modules/manageRoles/components/DisplayRolesLists';
import UsersRolesList from 'components/generic/UsersRolesList';
import * as actions from 'appRedux/actions';
import * as actionsManageRoles from 'src/redux/manageRoles/actions/manageRoles';

class ManageRoles extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      status_message: '',
      rolesData:      [],
      updateRole:     {rolesId: '', actionId: '', pageId: '', notificationId: ''}
    };
    this.callAddNewRole = this.callAddNewRole.bind(this);
    this.handleChangeNotification = this.handleChangeNotification.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount () {
    this.props.onRolesList();
  }
  componentWillReceiveProps (props) {
    let {loggedUser, route, router, manageRoles:{rolesData}} = props;
    let isNotValid = isNotUserValid(route.path, loggedUser);
    if (isNotValid.status) {
      router.push(isNotValid.redirectTo);
    }
    if (rolesData !== this.state.rolesData) {
      this.setState({
        rolesData
      });
    }
  }
  callAddNewRole (newRoleDetails) {
    this.props.onAddNewRole(newRoleDetails);
  }
  handleChangeNotification (id2, id1) {
    let {updateRole} = this.state;
    updateRole.rolesId = id1;
    updateRole.notificationId = id2;
    this.props.onUpdateRole(updateRole);
  }
  onUserClick (userId, roleId) {
    let userRoleUpdateDetails = {userId: userId, roleId: roleId};
    if (roleId !== '-1') {
      this.props.onUpdateUserRole(userRoleUpdateDetails);
      this.props.onRolesList();
    }
  }
  handleDelete (id) {
    this.props.onDelete(id).then((data) => { notify('Success!', data, 'success'); }, (error) => { notify('Error!', error, 'error'); });
  }
  handleChange (e, targetId, roleId) {
    let rolesData = this.state.rolesData;
    let updateRole = _.clone(this.state.updateRole);
    _.map(rolesData.roles, (role, key) => {
      if (role.id === roleId) {
        _.map(role.role_pages, (page, k) => {
          if (page.id === targetId) {
            page.is_assigned = e.target.checked;
            updateRole.pageId = targetId;
            _.map(page.actions_list, (action, ke) => {
              action.is_assigned = e.target.checked;
            });
          } else {
            _.map(page.actions_list, (action, ke) => {
              if (action.id === targetId) {
                action.is_assigned = e.target.checked;
                updateRole.actionId = targetId;
              }
            });
          }
        });
      }
    });
    updateRole.rolesId = roleId;
    this.setState({rolesData});
    this.props.onUpdateRole(updateRole);
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <AlertNotification message={this.props.manageRoles.status_message} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Manage Roles'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <AddRolesForm callAddNewRole={this.callAddNewRole} displayData={this.state.rolesData} />
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <DisplayRolesLists
                    displayData={this.state.rolesData}
                    handleClick={(id) => this.click(id)}
                    handleChange={this.handleChange}
                    handleChangeNotification={(notificationId, rolesId) => this.handleChangeNotification(notificationId, rolesId)}
                    handleDelete={(id) => { this.handleDelete(id); this.setState({deleteId: id}); }}
                  />
                </div>
                <div className="col-sm-4">
                  <UsersRolesList users={this.state.rolesData} onChange={(userId, roleId) => { this.onUserClick(userId, roleId); }} />
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
    frontend:    state.frontend.toJS(),
    loggedUser:  state.logged_user.userLogin,
    usersList:   state.usersList.toJS(),
    manageRoles: state.manageRoles.toJS()
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => { return dispatch(actions.isAlreadyLogin()); },
    onAddNewRole:     (newRoleDetails) => { return dispatch(actionsManageRoles.addNewRole(newRoleDetails)); },
    onRolesList:      () => { return dispatch(actionsManageRoles.getRolesList()); },
    onUpdateRole:     (roleUpdateDetails) => { return dispatch(actionsManageRoles.updateRoles(roleUpdateDetails)); },
    onUpdateUserRole: (userRoleUpdateDetails) => { return dispatch(actionsManageRoles.updateUserRole(userRoleUpdateDetails)); },
    onDelete:         (id) => { return dispatch(actionsManageRoles.deleteRole(id)); }
  };
};

const VisibleManageUsers = connect(mapStateToProps, mapDispatchToProps)(ManageRoles);
const RouterVisibleManageUsers = withRouter(VisibleManageUsers);
export default RouterVisibleManageUsers;

ManageRoles.PropTypes = {
  onIsAlreadyLogin:          PropTypes.func.isRequired,
  onFetchUserPolicyDocument: PropTypes.func.isRequired,
  onRolesList:               PropTypes.func.isRequired,
  route:                     PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
  loggedUser: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    data:       PropTypes.object.isRequired
  }).isRequired,
  policy_documents: PropTypes.shape({
    policyDocuments: PropTypes.object
  }).isRequired,
  usersList: PropTypes.object.isRequired,
  router:    PropTypes.object.isRequired
};
