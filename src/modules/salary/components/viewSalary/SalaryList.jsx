import React from 'react';
import * as _ from 'lodash';
const classNames = require('classnames');
var moment = require('moment');

class SalaryList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      empList: this.props.empList
    };
    this.search = this.search.bind(this);
  }
  search (searchValue) {
    if (searchValue !== 'null' && searchValue !== '') {
      var emps = [];
      _.forEach(this.props.empList, function (emp, i) {
        if ((emp.empName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) ||
         (emp.designation.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) ||
         (emp.salary.indexOf(searchValue) !== -1) ||
         (emp.dateOfJoining.indexOf(searchValue) !== -1) ||
         (emp.noOfDaysSinceJoined.indexOf(searchValue) !== -1) ||
         (emp.preSalaryIncDetail.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) ||
         (emp.nextSallaryInc.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)) {
          emps.push({
            'image':               emp.image,
            'empName':             emp.empName,
            'designation':         emp.designation,
            'salary':              emp.salary,
            'holdingAmountDetail': emp.holdingAmountDetail,
            'dateOfJoining':       emp.dateOfJoining,
            'noOfDaysSinceJoined': emp.noOfDaysSinceJoined,
            'preSalaryIncDetail':  emp.preSalaryIncDetail,
            'nextSallaryInc':      emp.nextSallaryInc
          });
        }
      });
      this.setState({
        empList: emps
      });
    } else {
      this.setState({
        empList: this.props.empList
      });
    }
  }
  render () {
    let row = _.map(this.state.empList, (emp, key) => {
      return (
        <tr key={key}>
          <td>
            <div className="list-left">
              <span className="w-40 avatar">
                <img src={emp.image} />
              </span>
            </div>
          </td>
          <td>{emp.empName}</td>
          <td>{emp.designation}</td>
          <td>{emp.salary}</td>
          <td>{emp.holdingAmountDetail != ''
            ? <ul>
              <li>Holding amount : {emp.holdingAmountDetail.holding_amt}</li>
              <li>Start date : {emp.holdingAmountDetail.holding_start_date}</li>
              <li>End date : {emp.holdingAmountDetail.holding_end_date}</li>
              <li>Reason : {emp.holdingAmountDetail.reason}</li>
            </ul> : ''
          }</td>
          <td>{moment(emp.dateOfJoining).format('Do MMMM YYYY')}</td>
          <td>{emp.noOfDaysSinceJoined}</td>
          <td>{emp.preSalaryIncDetail}</td>
          <td>{moment(emp.nextSallaryInc).format('Do MMMM YYYY')}</td>
        </tr>
      );
    });
    return (
      <div>
        <div className="row no-gutter">
          <div className="col-md-6 p-r">
            <div className="form-group">
              <label style={{'fontSize': 15}}>Search:</label>
              <input type="text" className="form-control" ref="search" onChange={() => this.search(this.refs.search.value)} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="box">
              <div className="box">
                <div className="box-divider m-a-0"></div>
                <div className="table-responsive">
                  <table className="table">
                    <thead className="success">
                      <tr>
                        <th >Image</th>
                        <th>Employe name</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th style={{'textAlign': 'center'}} >Holding Amount Details</th>
                        <th>Date of Joining</th>
                        <th >No of Days Since Joined</th>
                        <th >Previous Increment Details</th>
                        <th >Next Increment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {row}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SalaryList;
