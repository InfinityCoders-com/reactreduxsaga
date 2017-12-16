import React from 'react';
import PropTypes from 'prop-types';

const UserHorizontalView = ({profileImage, name, jobtitle, dateofjoining, gender, dob, workEmail, inventory}) => {
  let joining, details;
  if (!inventory) {
    joining = <h5 className="text-muted">Joining Date: <b>{dateofjoining}</b></h5>;
    details = <div className="col-xs-6 profile-input text-muted">
      <h5>Gender: <b>{gender}</b></h5>
      <h5>Date Of Birth: <b>{dob}</b></h5>
      <h5>Work Email: <b>{workEmail}</b></h5>
    </div>;
  }
  return (
    <div className="item">
      <div className="item-bg">
        <img src={profileImage} className="blur opacity-3" />
      </div>
      <div className="row padding-responsive">
        <div className="col-xs-12 m-b">
          <span className="avatar w-96 pointer">
            <img src={profileImage} />
            <i className="on b-white"></i>
          </span>
        </div>
        <div className="col-xs-6 profile-input">
          <h3 className="text-capitalize m-t-xs">{name}</h3>
          <h5 className="text-muted text-capitalize"><b>{jobtitle}</b></h5>
          {joining}
        </div>
        {details}
      </div>
    </div>
  );
};

UserHorizontalView.propTypes = {
  profileImage:  PropTypes.string,
  name:          PropTypes.string,
  jobtitle:      PropTypes.string,
  dateofjoining: PropTypes.string,
  dob:           PropTypes.string,
  gender:        PropTypes.string,
  workEmail:     PropTypes.string,
  inventory:     PropTypes.bool
};
UserHorizontalView.defaultProps = {
  profileImage:  null,
  name:          null,
  jobtitle:      null,
  dateofjoining: null,
  dob:           null,
  gender:        null,
  workEmail:     null,
  inventory:     false
};
export default UserHorizontalView;
