import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from './LoadingIcon';

const Header = ({pageTitle, status, showLoading, userListHeader}) => {
  let userListHeaderIcon = '';
  if (userListHeader) {
    userListHeaderIcon = <div className="user-list-icon">
      <a data-toggle="modal" data-target="#user-list-header" className="hidden-sm hidden-md hidden-lg">
        <i className="material-icons">more_vert</i>
      </a>
    </div>;
  }
  return (
    <div className="app-header white box-shadow m-b">
      <div className="navbar">
        <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-md hidden-lg">
          <i className="material-icons">&#xe5d2;</i>
        </a>
        <div className="navbar-item pull-left h5" style={{marginTop: '-4px'}} id="pageTitle">{pageTitle}{status || null}</div>
        {userListHeaderIcon}
      </div>
      <div className="row no-gutter">
        <div className="col-12">
          <LoadingIcon loading={showLoading} />
        </div>
      </div>
    </div>
  );
};

Header.PropTypes = {
  pageTitle:   PropTypes.string.isRequired,
  status:      PropTypes.string,
  showLoading: PropTypes.bool.isRequired
};

export default Header;
