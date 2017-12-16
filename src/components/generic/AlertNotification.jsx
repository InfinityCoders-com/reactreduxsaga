import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Snackbar from 'material-ui/Snackbar';

const AlertNotification = ({message}) => {
  let showAlert = false;
  let alertMessage = '';
  if (!_.isEmpty(message)) {
    showAlert = true;
    alertMessage = message;
  }
  return (
    <Snackbar
      open={showAlert}
      message={alertMessage}
      autoHideDuration={4000}
    />
  );
};

AlertNotification.PropTypes = {
  message: PropTypes.string.isRequired
};
export default AlertNotification;
