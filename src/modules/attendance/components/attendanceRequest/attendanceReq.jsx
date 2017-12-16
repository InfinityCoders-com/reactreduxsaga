import React from 'react';
import {isNotUserValid} from 'src/services/generic';
import _ from 'lodash';
import PropTypes from 'prop-types';
import 'react-date-picker/index.css';
import {CONFIG} from 'src/config/index';
import {notify} from 'src/services/notify';
import AttendanceApprove from './attendanceApprove';

export default class UserPendingAttendanceList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      pendingAttendanceList: {}
    };
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
  }

  render () {
    let {isLoading, data} = this.props.attendanceReqList;
  // Map UserPendingDetails -->
    let row = data.map((val, i) => {
      let AttandenceButtons = <AttendanceApprove status={this.props.attendanceStatus} val={val}{...this.props} />;
      return (
        <tr key={i}>
          <td className="p-r-xs">{val.id}</td>
          <td>{val.user_id}</td>
          <td>{val.timing}</td>
          <td></td>
          <td>{val.reason}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>{AttandenceButtons}</td>
        </tr>
      );
    });
    if (_.isEmpty(row)) {
      row = <tr>
        <td colSpan="10" className="text-center">{'No Pending Attendance Request '}
        </td>
      </tr>;
    }
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <div className="box">
              <div className="box">
                <div className="box-divider m-a-0"></div>
                <div className="table-responsive">
                  <table className="table table-striped" >
                    <thead className="success">
                      <tr>
                         <th className="p-r-xs">{'Sr.'}</th>
                         <th>User Name</th>
                         <th>Timing</th>
                         <th></th>
                         <th>Reason</th>
                         <th></th>
                         <th></th>
                         <th></th>
                         <th>Actions</th>
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
