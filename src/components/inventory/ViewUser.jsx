import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Paper from 'material-ui/Paper';

const ViewUserDevice = ({userAssignMachine}) => {
  let rows = _.map(userAssignMachine, (device, i) => {
    return (<tr key={i}>
      <td style={{marginRight: '0%'}}>{i + 1}</td>
      <td>{device.machine_type}</td>
      <td>{device.machine_name}</td>
      <td>{device.mac_address}</td>
      <td>{device.assign_date}</td>
    </tr>);
  });
  return (
    <div>
      <div className="col-md-9">
        <h6 className="text-center">Asssigned Device Details</h6>
        <hr />
        <br />
        <div className='row'>
          <div className='col-xs-12'>
            <div style={{'marginTop': '2%'}}>
              {_.isEmpty(rows) ? <div className="col-xs-6 col-xs-offset-3 well">
                <i className="fa fa-exclamation-triangle fa-2x" style={{marginLeft: '45%', opacity: '0.56'}} aria-hidden="true"></i>
                <h5 style={{marginLeft: '33%', opacity: '0.56'}}>Device not Asssigned !</h5>
              </div>
                : <Paper zDepth={3} style={{marginBottom: '10px'}} >
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Sr. No</th>
                        <th>Device Type</th>
                        <th>Name</th>
                        <th>Mac Address</th>
                        <th>Assign Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows}
                    </tbody>
                  </table>
                </Paper>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ViewUserDevice.propTypes = {
  userAssignMachine: PropTypes.array.isRequired
};

export default ViewUserDevice;
