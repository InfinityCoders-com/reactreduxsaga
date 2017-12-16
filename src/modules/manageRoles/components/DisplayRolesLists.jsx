import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {confirm} from 'src/services/notify';
import _ from 'lodash';

const DisplayRolesList = ({displayData, handleChange, handleChangeNotification, handleDelete}) => {
  let rolesData = displayData.roles;
  let rolesList = _.map(rolesData, (value, key) => {
    let rolesId = value.id;
    let rolePages = _.map(value.role_pages, (v, k) => {
      let pageId = v.id;
      let roleActions = _.map(v.actions_list, (val, ke) => {
        let actionId = val.id;
        return (
          <li key={ke}>
            <input type="checkbox" id={'check_' + val.name} value={val.name} checked={val.is_assigned} onChange={(e) => { handleChange(e, actionId, rolesId); }} key={actionId} /> {val.name}
          </li>
        );
      });
      return (
        <li key={k}>
          <input type="checkbox" id={'check_' + v.name} value={v.name} checked={v.is_assigned} onChange={(e) => { handleChange(e, pageId, rolesId); }} key={pageId} /> {v.name}
          <ul className="m-b-xs m-l-md">{roleActions}</ul>
        </li>
      );
    });
    let roleNotification = _.map(value.role_notifications, (v, k) => {
      let notificationId = v.id;
      return (
        <div key={k}>
          <input
            type="checkbox"
            value={v.name}
            checked={v.is_assigned}
            onChange={() => { handleChangeNotification(notificationId, rolesId); }} key={notificationId}
          /> {v.name}
          <br />
        </div>
      );
    });
    let collapseLink = 'coll' + rolesId;
    return (
      <div className="panel panel-default" style={{'border': 0}} key={key}>
        <div className="panel-heading p-b-lg">
          <div className="panel-title p-b-md">
            <span className="col-xs-8 col-sm-9">
              <Link data-toggle="collapse" data-parent="#accordion" to={collapseLink} >
                <h4 className="m-b-xs text-lg col-xs-10">{value.name}</h4>
                <span className="col-xs-12 text-sm">{value.description}</span>
              </Link>
            </span>
            <Link to="/manage_roles" className="col-xs-4 col-sm-3 m-t-sm p-t-sm text-sm text-danger"
              onClick={() => {
                confirm('Are you sure ?', 'Do you want to Delete the Role ?', 'warning').then((res) => {
                  if (res) {
                    handleDelete(rolesId);
                  }
                });
              }}><i>Delete Role</i></Link>
          </div>
        </div>
        <div id={collapseLink} className="table-responsive panel-collapse collapse">
          <div className="navside panel-body p-a-xs">
            <table className="table table-condensed">
              <thead><tr><th>Pages - Actions</th><th> Notification </th></tr></thead>
              <tbody><tr><td><ul>{rolePages}</ul></td><td>{roleNotification}</td></tr></tbody>
            </table>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="row box p-t">
      <div className="col-xs-12 panel-group" id="accordion">{rolesList}</div>
    </div>
  );
};

export default DisplayRolesList;

DisplayRolesList.PropTypes = {
  displayData: PropTypes.shape({
    roles: PropTypes.object.isRequired
  }).isRequired,
  handleChange:             PropTypes.func.isRequired,
  handleChangeNotification: PropTypes.func.isRequired,
  handleDelete:             PropTypes.func.isRequired
};
