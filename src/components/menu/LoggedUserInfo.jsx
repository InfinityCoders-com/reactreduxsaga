import React from 'react';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';

const LoggedUserInfo = ({loggedUser}) => {
  let profileImage = <img src={loggedUser.profileImage} className="w-40 img-circle" />;
  if (loggedUser.profileImage === null) {
    profileImage = <Avatar>{loggedUser.name.charAt(0)}</Avatar>;
  }
  return (
    <div className="b-t">
      <div className="nav-fold">
        <span className="pull-left">{profileImage}</span>
      </div>
      <br />
      <div className="nav-fold">
        <span className="clear hidden-folded">
          <span className="block _500">{loggedUser.name}</span>
          <i><span className="block _500">{loggedUser.role}</span></i>
          <i><span className="block _500">{loggedUser.jobtitle}</span></i>
        </span>
      </div>
    </div>
  );
};

export default LoggedUserInfo;

LoggedUserInfo.PropTypes = {
  loggedUser: PropTypes.shape({
    profileImage: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    jobtitle: PropTypes.string
  }).isRequired
};
