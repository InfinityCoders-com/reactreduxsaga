import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import * as actions from 'appRedux/actions';

class Logout extends React.Component {
  constructor (props) {
    super(props);
  }
  componentWillMount () {
    if (this.props.loggedUser.isLoggedIn) {
      this.props.requestLogout();
    } else {
      this.props.router.push('/');
    }
  }
  componentWillReceiveProps (props) {
    props.router.push('/');
  }
  render () {
    return (
      <div></div>
    );
  }
}

function mapStateToProps (state) {
  return {
    loggedUser: state.logged_user.userLogin
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const VisibleLogout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

const RouterVisibleLogout = withRouter(VisibleLogout);

export default RouterVisibleLogout;
