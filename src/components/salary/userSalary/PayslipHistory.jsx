import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const PayslipHistory = ({payslip_history}) => {
  let previousPayslips = _.map(payslip_history, (d, key) => {
    return (
      <div className="sl-item b-info" key={key} >
        <div className="sl-content">
          <div className="sl-date text-muted"><b>{d.month}</b></div>
          <div className="sl-date text-muted"><b>{d.total_leave_taken}</b> : Total Leave Taken</div>
          <div className="sl-date text-muted"><b>{d.leave_balance}</b> : Leave Balance</div>
          <div className="sl-date text-muted"><b>{d.allocated_leaves} : Allocated Leaves</b></div>
          <div className="sl-date text-muted"><b>{d.paid_leaves} : Paid Leaves</b></div>
          <div className="sl-date text-muted"><b>{d.unpaid_leaves} : Unpaid Leaves</b></div>
          <div className="sl-date text-muted"><b>{d.final_leave_balance} : Final Leave Balance</b></div>
          <div className="sl-date text-muted">
            {parseInt(d.status) !== 0 ? <a href={`${d.payslip_url}`} target="_BLANK">View Payslip</a> : ''}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="streamline b-l m-l">
        {previousPayslips}
      </div>
    </div>
  );
};

PayslipHistory.PropTypes = {
  payslip_history: PropTypes.array.isRequired
};

export default PayslipHistory;
