import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  progressWidth: {
    'width': '100%'
  },
  loadingDivHeight: {
    'height': '10px'
  }
};

const LoadingIcon = ({loading}) => {
  if (loading === true) {
    return (
      <div style={styles.loadingDivHeight}>
        <div className="progress progress-striped active">
           <div className="progress-bar info" style={styles.progressWidth}></div>
       </div>
      </div>
    );
  }
  return (
    <div></div>
  );
};

LoadingIcon.PropTypes = {
  loading: PropTypes.bool
};

export default LoadingIcon;
