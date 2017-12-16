import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {notify} from 'src/services/notify';
import {isNotUserValid} from 'src/services/generic';
import GetLogo from 'components/auth/login/GetLogo';
import Navbar from 'components/auth/login/Navbar';
import LoginForm from 'modules/auth/components/login/LoginForm';
import LoginFormFooter from 'components/auth/login/LoginFormFooter';
import LoadingIcon from 'components/generic/LoadingIcon';
import * as actions from 'appRedux/actions';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
    this.doGuestLogin = this.doGuestLogin.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status && isNotValid.redirectTo !== '/logout') {
      this.props.router.push(isNotValid.redirectTo);
    }
    if (props.loggedUser.isError) {
      notify('Error !', props.loggedUser.message, 'error');
    }
  }
  doLogin (username, password) {
    this.props.userLoginRequest({username, password});
  }
  doGuestLogin (evt) {
    this.doLogin('global_guest', 'global_guest');
  }
  render () {
    return (
      <div>
        <div className="center-block w-xxl w-auto-xs p-y-md">
          <GetLogo />
          <Navbar />
          <div className="p-a-md box-color r box-shadow-z1 text-color auth-form">
            <LoadingIcon loading={this.props.loggedUser.isLoading} />
            <div className="m-y text-sm">Sign in with your username</div>
            <LoginForm onLogin={this.doLogin} {...this.props} />
            <LoginFormFooter doGuestLogin={this.doGuestLogin} />
          </div>
        </div>
      </div>
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

const VisibleLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

const RouterVisibleLogin = withRouter(VisibleLogin);

export default RouterVisibleLogin;
