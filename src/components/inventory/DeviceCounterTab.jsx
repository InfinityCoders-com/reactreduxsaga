import 'react-date-picker/index.css';
import React from 'react';
import PropTypes from 'prop-types';
import DeviceCounter from './DeviceCounter';

const DeviceCounterTab = ({statusList, deviceCountList}) => {
  let total = 0;
  let newDeviceCountData = [];
  for (var key in deviceCountList) {
    if (deviceCountList.hasOwnProperty(key)) {
      let deviceData = deviceCountList[key];
      total = total + deviceData.total;
      newDeviceCountData.push(<DeviceCounter key={key} deviceData={deviceData} deviceName={key} />);
    }
  }
  let statusList1 = statusList.map((val, i) => {
    return <div className="col-xs-4 col-sm-4 col-md-3 col-lg-2" key={i} >
      <div className="p-a" style={{backgroundColor: val.color, margin: '2px 2px 2px 2px'}}>
        <h4></h4>
        <div className="h-3x text-u-c _600 text-sm" style={{paddingTop: '20%'}}>{val.status}</div>
      </div>
    </div>;
  });
  return (
    <div>
      <div className="col-xs-12">
        <div className='row'>
          <div className="box p-a" style={{height: '87px'}}>
            <div className="pull-left m-r">
              <span className="w-48 rounded primary">
                <i className="fa fa-pie-chart fa-lg" aria-hidden="true"></i>
              </span>
            </div>
            <div className="clear">
              <h4 className="m-a-0 text-lg _300"></h4>
              <small className="text-muted"> Total Device </small>
              <h1 style={{float: 'right', color: '#0E9BB1'}}>{total}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xs-12">
        <div className='row'>
          <div className="box">
            <div className="box-header">
              <small className="text-muted"> Device Status Overview </small>
            </div>
            <div className="box-body">
              <div className="row no-gutter m-b text-xs l-h-1x">
                <div className="row">
                  {statusList1}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        {newDeviceCountData}
      </div>
    </div>
  );
};

DeviceCounterTab.propTypes = {
  statusList: PropTypes.array.isRequired
};

export default DeviceCounterTab;
