import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const DisplayUserDeviceDetails = ({userAssignMachine}) => {
  let machine = _.map(userAssignMachine, (val, i) => {
    console.log('val', val);
    return (
      <tr key={i}>
        <td>
          <span className='_800'>{val.machine_type}</span><br />
          {val.machine_name}
        </td>
        <td>
          <span className>S.No : {val.serial_number || ' - '}</span><br />
          <span className>{val.mac_address && 'Mac : ' + val.mac_address}</span>
        </td>
        <td>{val.assign_date}</td>
      </tr>
    );
  });
  let machineData = <span className="text-muted" style={{marginLeft: '16px'}}>Device Not Asssigned</span>;
  if (!_.isEmpty(machine)) {
    machineData = <table style={{fontSize: '13px'}} className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Device</th>
          <th>Details</th>
          <th>Assign Date</th>
        </tr>
      </thead>
      <tbody>
        {machine}
      </tbody>
    </table>;
  }
  return (
    <div>
      <h6 className="text-center">Asssigned Device Details</h6>
      <br />
      <div className="clear">
        {machineData}
      </div>
    </div>
  );
};

DisplayUserDeviceDetails.PropTypes = {
  userAssignMachine: PropTypes.array.isRequired
};

export default DisplayUserDeviceDetails;
