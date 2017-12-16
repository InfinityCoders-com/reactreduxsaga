import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const UserSalaryHistory = ({data, message, viewSalarySummary, callDeleteUserSalary}) => {
  let salaryHistoryDisplay = '';
  if (!_.isUndefined(message)) {
    salaryHistoryDisplay = (<div className="well well-lg" style={{'color':"red"}} >
      <i className="fa fa-exclamation-triangle fa-3x" aria-hidden="true"></i>
      {message} </div>)
  } else {
    salaryHistoryDisplay = _.map(data, (d, key) => {
      return (
        <div className="sl-item b-info"  key={key}  onClick={ () => viewSalarySummary( d.test.id ) } style={{'cursor':"pointer"}}>
          <div className="sl-content">
            <div className="sl-date text-muted">  Applicable From  : {d.test.applicable_from}</div>
            <div className="sl-date text-muted">  Applicable Till  : {d.test.applicable_till}</div>
            <div className="sl-date text-muted"> Updated on : {d.test.last_updated_on} </div>
            <div><b>Rs.{d.test.total_salary} </b></div>
            <div>
              <button className="btn-sm btn-outline b-danger text-danger" onClick={ () => callDeleteUserSalary( d.test.user_Id, d.test.id ) } >Delete Salary</button>
            </div>
          </div>
        </div>
      )
    })
  }
  return (
    <div>
      <div className="box-body">
        <div className="streamline b-l m-l">
          {salaryHistoryDisplay}
        </div>
      </div>
    </div>
  )
}

UserSalaryHistory.PropTypes = {
  data: PropTypes.array,
  message: PropTypes.string,
  viewSalarySummary: PropTypes.func.isRequired,
  callDeleteUserSalary: PropTypes.func.isRequired
}

export default UserSalaryHistory
