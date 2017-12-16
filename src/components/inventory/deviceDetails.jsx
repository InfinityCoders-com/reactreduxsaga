import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import 'react-date-picker/index.css';

const DeviceDetails = ({userAssignMachine}) => {
  let machineList = _.map(userAssignMachine, (val, i) => {
    return (<tr key={i}>
      <td>{val.machine_type}</td>
      <td>{val.machine_name}</td>
      <td>{val.mac_address}</td>
      <td>{val.serial_number}</td>
      <td>{val.assign_date}</td>
    </tr>);
  });
  if (_.isEmpty(machineList)) {
    machineList = <tr><td colSpan="5"><h5 className="text-center text-danger">{'Device Not Asssigned'}</h5></td></tr>;
  }

  return (
    <div className="row no-gutter box">
      <h6 className="text-center">Asssigned Device Details</h6>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Device Type</th>
              <th>Name</th>
              <th>Mac Address</th>
              <th>Serial Number</th>
              <th>Assign Date</th>
            </tr>
          </thead>
          <tbody>
            {machineList}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DeviceDetails.propTypes = {
  userAssignMachine: PropTypes.array.isRequired
};

export default DeviceDetails;
