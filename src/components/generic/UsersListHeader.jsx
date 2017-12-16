import React from 'react';
import PropTypes from 'prop-types';
import UsersList from 'components/generic/UsersList';

const UsersListHeader = ({users, selectedUserId, onUserClick, disabledUser}) => {
  return (
    <div id="user-list-header" className="modal fade nav-dropdown hidden-md hidden-lg">
      <div className="right navside dark dk">
        <UsersList
          users={users}
          selectedUserId={selectedUserId}
          onUserClick={onUserClick}
          disabledUser={disabledUser}
          header
        />
      </div>
    </div>
  );
};

UsersList.PropTypes = {
  users:          PropTypes.array.isRequired,
  selectedUserId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onUserClick:  PropTypes.func.isRequired,
  disabledUser: PropTypes.bool
};

export default UsersListHeader;
