import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {notify} from 'src/services/notify';
import {isNotUserValid} from 'src/services/generic';
import GetLogo from 'components/auth/login/GetLogo';
import Navbar from 'components/auth/login/Navbar';
import LoadingIcon from 'components/generic/LoadingIcon';
import {Button} from 'components/generic/buttons';
import * as actions from 'appRedux/actions';

class ForgotPassword extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
    this.state = {
      form_username: ''
    };
    this.doResetPassword = this.doResetPassword.bind(this);
  }
  componentWillReceiveProps (props) {
    let {route, router, loggedUser, forgotPassword: {isError, isSuccess, message}} = props;
    let isNotValid = isNotUserValid(route.path, loggedUser);
    if (isNotValid.status && isNotValid.redirectTo !== '/logout') {
      router.push(isNotValid.redirectTo);
    }
    if (isError || isSuccess) {
      let megType = isError ? 'error' : 'success';
      notify(megType + ' ! ', message, megType);
    }
  }
  doResetPassword (evt) {
    evt.preventDefault();

    if (this.state.form_username === '') {
      notify('Warning !', 'Enter Username', 'warning');
    } else {
      this.props.requestForgotPassword({username: this.state.form_username});
    }
  }
  render () {
    return (
      <div className="center-block w-xxl w-auto-xs p-y-md">
        <GetLogo />
        <Navbar />
        <div className="p-a-md box-color r box-shadow-z1 text-color m-a">
          <LoadingIcon loading={this.props.forgotPassword.isLoading} />
          <br />
          <div className="m-b text-sm">
            Reset Your Password
          </div>
          <form name="form" onSubmit={this.doResetPassword}>
            <div className="md-form-group float-label">
              <input
                className="md-input"
                required type="text"
                onChange={(e) => this.setState({form_username: e.target.value})}
                value={this.state.form_username} />
              <label>Enter Username</label>
            </div>
            <Button type="submit" className="btn primary btn-block p-x-md" label="Reset Password" />
          </form>
          <div className="m-b text-sm text-center">
            <br />
            <button className="md-btn md-flat text-accent">
              <Link to='/'>Login</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    loggedUser:     state.logged_user.userLogin,
    forgotPassword: state.logged_user.forgotPassword
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const VisibleForgotPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

const RouterVisibleForgotPassword = withRouter(VisibleForgotPassword);

export default RouterVisibleForgotPassword;
