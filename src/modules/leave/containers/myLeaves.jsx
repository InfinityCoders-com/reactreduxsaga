import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import UserLeavesList from 'modules/leave/components/myLeaves/UserLeavesList';
import * as actions from 'appRedux/actions';
import * as actions_myLeaves from 'appRedux/leave/actions/myLeaves';

class MyLeaves extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
  }
  componentWillMount () {
    this.props.onMyLeavesList();
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
          <Header pageTitle={'My Leaves'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-12">
                  <UserLeavesList {...this.props} />
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
    userLeaves: state.userLeaves.toJS(),
    applyLeave: state.applyLeave.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onMyLeavesList: () => {
      return dispatch(actions_myLeaves.getMyLeaves());
    },
    onCancelLeave: (userId, from_date) => {
      return dispatch(actions_myLeaves.cancelLeave(userId, from_date));
    }
  };
};

const VisibleMyLeaves = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyLeaves);

const RouterVisibleMyLeaves = withRouter(VisibleMyLeaves);

export default RouterVisibleMyLeaves;
