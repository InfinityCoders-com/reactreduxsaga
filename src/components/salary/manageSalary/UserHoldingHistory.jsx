import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const UserHoldingHistory = ({data}) => {
  let holdingHistoryHtml = _.map(data, (d, key) => {
    return (
      <div className="sl-item b-info"  key={key} >
        <div className="sl-content">
          <div className="sl-date text-muted">  Holding Amount  : <b>Rs.{d.holding_amt}</b></div>
          <div className="sl-date text-muted">  Start : {d.holding_start_date}</div>
          <div className="sl-date text-muted">  End : {d.holding_end_date} </div>
          <div className="sl-date text-muted">  Reason : {d.reason} </div>
          <div className="sl-date text-muted">  Updated on : {d.last_updated_on} </div>
        </div>
      </div>
    )
  });
  return (
    <div>
      <div className="box-body">
        <div className="streamline b-l m-l">
          {holdingHistoryHtml}
        </div>
      </div>
    </div>
  )
}

UserHoldingHistory.PropTypes = {
  data: PropTypes.array.isRequired
}

export default UserHoldingHistory;
