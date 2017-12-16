import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Avatar from 'material-ui/Avatar';

const UsersList = ({users, selectedUserId, onUserClick, disabledUser, header, top}) => {
  const userClick = (param) => {
    onUserClick(param);
    header && $('#user-list-header').modal('hide');
  };
  $(window).scroll(function () {
    let scrollAmount = $(document).scrollTop();
    if (scrollAmount > top) {
      $('#fixedScroll').addClass('fixedScroll');
    } else {
      $('#fixedScroll').removeClass('fixedScroll');
    }
  });
  let usersList = _.map(users, (user, key) => {
    let avatar = '';
    let param = '';
    let arrow = '';
    let profileImae = '';
    let backgroundClass = 'pointer';
    if (selectedUserId === user.user_Id) {
      backgroundClass = 'selected-user';
      arrow = <span className="arrow right b-blue"></span>;
    }
    if (_.isUndefined(disabledUser)) {
      profileImae = user.slack_profile.image_72;
      avatar = <img src={profileImae} />;
      param = user.user_Id;
    } else {
      profileImae = user.name.charAt(0);
      avatar = <Avatar>{profileImae}</Avatar>;
      param = user;
    }
    return (
      <li className={'list-item ' + backgroundClass} key={key} onClick={() => userClick(param)}>
        <div>
          <div className="list-left">
            <span className="w-40 avatar">{avatar}</span>
          </div>
          <div className="list-body">
            <div className="text-ellipsis">{user.name}</div>
            <small className="text-muted text-ellipsis">{user.jobtitle}</small>
            <small className="text-muted text-ellipsis"><b>Emp Id : {user.user_Id}</b></small>
          </div>
        </div>
        {arrow}
      </li>
    );
  });
  return (
    <div id="userListWrapper" className="row">
      <div className="col-sm-12">
        <div className="list-box">
          <div className={'user-list-container ' + (!header && 'p-r-8')} id="userList">
            <ul className="box list no-border p-b">
              {usersList}
            </ul>
          </div>
        </div>
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

export default UsersList;
