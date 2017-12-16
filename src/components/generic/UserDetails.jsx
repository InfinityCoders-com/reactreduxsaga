import React from 'react';
import PropTypes from 'prop-types';

const UserDetails = ({monthlyAttendance}) => {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="box p-a">
          <div className="pull-left m-r">
            <span className="w-40 avatar">
              <img src={monthlyAttendance.userProfileImage} />
            </span>
          </div>
          <div className="clear">
            <h4 className="m-a-0 text-lg">
            {monthlyAttendance.userName}
              <span className="text-sm"> </span></h4>
            <small className="text-muted">
              {monthlyAttendance.userjobtitle}
            </small>
            <br /><br />
          </div>
        </div>
      </div>
    </div>
  );
};

UserDetails.PropTypes = {
  monthlyAttendance: PropTypes.shape({
    userProfileImage: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userjobtitle: PropTypes.string.isRequired
  }).isRequired
};

export default UserDetails;
