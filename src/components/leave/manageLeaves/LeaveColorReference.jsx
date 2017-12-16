import React from 'react';
import PropTypes from 'prop-types';
import {CONFIG} from 'src/config/index';

const LeaveColorReference = ({filterLeaveList, selectedTab, userRole}) => {
  if (userRole === CONFIG.ADMIN) {
    return (
      <div className="row no-gutter m-b text-xs l-h-1x">
        <div className="col-xs-6 col-sm-3 text-center leaves-tab" onClick={() => filterLeaveList('ApprovedByHr')} >
          <div className={'top-bar ' + (selectedTab === 'ApprovedByHr' ? 'active-tab' : '')}></div>
          <div className="p-a blue">
            <h4></h4>
            <div className="text-u-c _600 text-sm" >Approved By HR</div>
          </div>
        </div>
        <div className="col-xs-6 col-sm-3 text-center leaves-tab" onClick={() => filterLeaveList('NotApprovedByHr')} >
          <div className={'top-bar ' + (selectedTab === 'NotApprovedByHr' ? 'active-tab' : '')} ></div>
          <div className="p-a yellow-A200">
            <h4></h4>
            <div className=" text-u-c _600 text-sm" >Not Approved By HR</div>
          </div>
        </div>
        <div className="col-xs-6 col-sm-3 text-center leaves-tab" onClick={() => filterLeaveList('Approved')} >
          <div className={'top-bar ' + (selectedTab === 'Approved' ? 'active-tab' : '')} ></div>
          <div className="p-a green-A200">
            <h4></h4>
            <div className=" text-u-c _600 text-sm" >Approved</div>
          </div>
        </div>
        <div className="col-xs-6 col-sm-3 text-center leaves-tab" onClick={() => filterLeaveList('Rejected')} >
          <div className={'top-bar ' + (selectedTab === 'Rejected' ? 'active-tab' : '')} ></div>
          <div className="p-a red-500">
            <h4></h4>
            <div className="text-u-c _600 text-sm" >Rejected</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="row no-gutter m-b text-xs l-h-1x">
      <div className="col-xs-4 text-center" onClick={() => filterLeaveList('Pending')} >
        <div className={'top-bar ' + (selectedTab === 'Pending' ? 'active-tab' : '')} ></div>
        <div className="p-a blue">
          <h4></h4>
          <div className="text-u-c _600 text-sm" >Pending Leave Requests</div>
        </div>
      </div>
      <div className="col-xs-3 text-center" onClick={() => filterLeaveList('ApprovedByHr')} >
        <div className={'top-bar ' + (selectedTab === 'ApprovedByHr' ? 'active-tab' : '')} ></div>
        <div className="p-a green-A200">
          <h4></h4>
          <div className=" text-u-c _600 text-sm" >Approved By HR</div>
        </div>
      </div>
    </div>
  );
};

LeaveColorReference.PropTypes = {
  filterLeaveList: PropTypes.func.isRequired,
  selectedTab:     PropTypes.string.isRequired,
  userRole:        PropTypes.string.isRequired
};

export default LeaveColorReference;
