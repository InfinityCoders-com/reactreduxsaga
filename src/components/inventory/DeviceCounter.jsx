import React from 'react';
import PropTypes from 'prop-types';

const DeviceCounter = ({deviceData, deviceName}) => {
  let list = Object.keys(deviceData).map((k, idx) => {
    if (k === 'User_Assign' || k === 'User_Not_Assign' || k === 'Assigned') {
      return;
    } else {
      return <li key={idx}> {k} : {deviceData[k]}</li>;
    }
  });
  return (
    <div className="col-xs-11 col-sm-4">
      <div className="box p-a" style={{height: '350px'}}>
        <div className="pull-left m-r">
          <span className="w-48 rounded accent">
            <i className="fa fa-check-circle" aria-hidden="true"></i>
          </span>
        </div>
        <div className="clear">
          <h4 className="m-a-0 text-lg _300"></h4>
          <small className="text-muted" style={{color: '#000'}}>{deviceName} </small>
          <h4 style={{float: 'right', marginTop: '-1%', color: '#0E9BB1'}}>{deviceData.total}</h4>
        </div>
        <div className='well'>
          <ul className='text-muted'>
            <li>
              <h4 className="m-a-0 text-lg _300"></h4>
              <small className="text-muted" style={{color: '#000'}}>Assigned To User </small>
              <h4 style={{float: 'right', marginTop: '-1%', color: '#838383'}}>
                {deviceData.User_Assign ? deviceData.User_Assign : '0'}
              </h4>
            </li>
            <li>
              <h4 className="m-a-0 text-lg _300"></h4>
              <small className="text-muted" style={{color: '#000'}}>Not Assigned </small>
              <h4 style={{float: 'right', marginTop: '-1%', color: '#838383'}}>
                {deviceData.User_Not_Assign ? deviceData.User_Not_Assign : '0'}
              </h4>
            </li>
          </ul>
        </div>
        <br />
        <ul className='text-muted'>
          {list}
        </ul>
      </div>
    </div>
  );
};

DeviceCounter.propTypes = {
  deviceData: PropTypes.shape({
    total:           PropTypes.number.isRequired,
    User_Assign:     PropTypes.number,
    User_Not_Assign: PropTypes.number
  }),
  deviceName: PropTypes.string.isRequired
};

export default DeviceCounter;
