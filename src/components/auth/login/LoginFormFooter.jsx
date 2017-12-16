import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

export const LoginFormFooter = ({doGuestLogin}) => {
  return (
    <div className="text-sm text-center">
      <br />
      <button className="md-btn md-flat text-accent" onClick={doGuestLogin}>Click for guest Login</button>
      <br />
      <button className="md-btn md-flat text-accent">
        <Link to='/forgot_password'>Forgot Password</Link>
      </button>
    </div>
  );
};

LoginFormFooter.PropTypes = {
  doGuestLogin: PropTypes.func.isRequired
};

export default LoginFormFooter;
