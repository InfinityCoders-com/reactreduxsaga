import React from 'react';
import PropTypes from 'prop-types';
import {ButtonInfo, Button} from 'components/generic/buttons';

const MyLeavesList = ({leave, handleOpen, cancelLeave}) => {
  let s = leave.status;
  let f_char = s.charAt(0);
  let leaveStatusColor = '';
  if (s === 'Approved') {
    leaveStatusColor = 'green-A200';
  } else if (s === 'Pending') {
    leaveStatusColor = 'blue';
  } else if (s === 'Rejected') {
    leaveStatusColor = 'red-500';
  } else if (s === 'Cancelled Request') {
    leaveStatusColor = 'red-100';
  }

  return (
    <div className={`list-item b-l b-l-2x b-${leaveStatusColor}`}>
      <div className="list-left">
        <span className={`w-40 avatar ${leaveStatusColor}`}>
          {f_char}
        </span>
      </div>
      <div className="list-body">
        <div className="pull-right text-muted text-xs">
        </div>
        <div>
          <span className="_500">Status : {leave.status}</span>
        </div>
        <div>
          <span className="_500">Apply on : {leave.applied_on}</span>
        </div>
        <div>
          <span className="_500">From {leave.from_date} to {leave.to_date}</span>
          &nbsp;&nbsp;&nbsp;<span className="label cyan">{leave.no_of_days} Day</span>
        <span className="label cyan m-l-xs" onClick={() => cancelLeave(leave.user_Id, leave.from_date)}>Cancel</span>
        </div>
        <div className="text-ellipsis text-muted text-sm">Reason : {leave.reason}</div>
        {
          leave.leave_type !== ''
          ? <div className="text-ellipsis text-muted text-sm">Leave Type : {leave.leave_type}</div>
          : null
        }
        {
          leave.late_reason !== ''
          ? <div className="text-ellipsis text-muted text-sm">Reason For Late Applying : {leave.late_reason}</div>
          : null
        }
        {
          leave.comment !== ''
          ? <div className="text-ellipsis text-muted text-sm">comment : {leave.comment}</div>
          : null
        }
      </div>

      <div className="row">
        {
          leave.doc_require !== '0'
          ? <div className="col-xs-12 row">
            <button
              onClick={() => { handleOpen(leave.id); }}
              className="btn btn-info btn-responsive btn-res col-xs-2">{'Upload Leave Document'}
            </button>
          {
            leave.doc_link === ''
            ? null
            : <div>
              <form method="get" target="_blank" action={leave.doc_link}>
                <button
                  className="btn btn-primary btn-responsive btn-res col-xs-2">
                  {'View Document'}
                </button>
              </form>
            </div>
        }
          </div>
          : null
        }
      </div>
    </div>
  );
};

MyLeavesList.PropTypes = {
  leave: PropTypes.shape({
    status:      PropTypes.string.isRequired,
    applied_on:  PropTypes.string.isRequired,
    from_date:   PropTypes.string.isRequired,
    to_date:     PropTypes.string.isRequired,
    no_of_days:  PropTypes.number.isRequired,
    user_Id:     PropTypes.number.isRequired,
    reason:      PropTypes.string.isRequired,
    leave_type:  PropTypes.string.isRequired,
    late_reason: PropTypes.string.isRequired,
    comment:     PropTypes.string.isRequired
  }).isRequired,
  handleOpen:  PropTypes.func.isRequired,
  cancelLeave: PropTypes.func.isRequired
};

export default MyLeavesList;
