import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {notify} from 'src/services/notify';
import _ from 'lodash';
import * as actions from 'appRedux/actions';
import {HighchartsChart, AreaSplineSeries, LineSeries, Chart, XAxis, YAxis, Title, Tooltip, Subtitle, Legend, ColumnSeries, SplineSeries, PieSeries} from 'react-jsx-highcharts';
import DatePicker from 'material-ui/DatePicker';
import 'react-date-picker/index.css';
var moment = require('moment');
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


class PageEmpHours extends Component {
  constructor (props) {
    super(props);
  }
  componentWillMount () {
    this.setState({
      empHours: this.props.empHours,
      date: this.props.currentDate
    });
    if(this.props.userId !== ''){
      this.props.requestEmployeeHours({
        'id':    this.props.userId,
        'date':  this.props.date,
        'month': this.props.selectedMonth,
        'year':  this.props.selectedYear
      });
    }
  }
  componentWillReceiveProps (props) {
    this.setState({
      empHours: props.empHours
    });
  }
  render () {
    let EmpTimeTable = this.state.empHours;
    var name = [];
    var date = [];
    var inTime = [];
    var outTime = [];
    let monthOptions = [];
    let yearOptions = [];
    let userIdOptions = [];
    let monthOption = _.map(this.props.months, (monthData, i) => {
      monthOptions.push(<option key={i} value={monthData}>{monthData}</option>);
    });
    let yearOption = _.map(this.props.year, (data, i) => {
      return (
      yearOptions.push(<option key={i} value={data}>{data}</option>)
      );
    });
    let userIdOption = _.map(this.props.employeeList.data, (userList, k) => {
      userIdOptions.push(<option key={k} value={userList.user_Id}>  {userList.name}</option>);
    });
    if(EmpTimeTable !== null && EmpTimeTable.isSuccess){
      date.push(EmpTimeTable.data.date);
      name.push(EmpTimeTable.data.employee_name);
    let inTimeList = _.map(EmpTimeTable.data.entry_time, (hoursData, j) => {
      inTime.push({y:parseFloat(hoursData.in_time),dateData:hoursData.in_time,status:'In-Time'});

    });
    let outTimeList = _.map(EmpTimeTable.data.exit_time, (hoursData, j) => {
      outTime.push({y:parseFloat(hoursData.out_time),dateData:hoursData.out_time,status:'Out-Time'});
    });
  }
  let inOutTime= _.concat(inTime,outTime);
  let timeData = inOutTime.sort(function compare(a, b) {
   var dateA = new Date('1970/01/01 ' + a.dateData);
   var dateB = new Date('1970/01/01 ' + b.dateData);
   return dateA - dateB;
 });
  let inTimeData = _.map(timeData, (hoursData, j) =>{
      let checkClass = 'b-success left100';
      if (hoursData.status === 'Out-Time') {
          checkClass = 'b-danger';
      }
      let showText = `In/Out time of ${this.state.empHours.data.employee_name}`;
      return (
        <div key={j} className={`sl-item ${checkClass}`}>
          <div className="sl-icon">
            <i className="fa fa-check"></i>
          </div>
          <div className="sl-content">
            <div>{hoursData.dateData}</div>
            <small>{hoursData.status}</small>
          </div>
        </div>
      );
    });
  return (
    <div className="col-md-12">
      <div className="row">
        <div className="col-xs-12 ">
          <div className="row text-center">
            <h3>{this.state.empHours.data.employee_name}</h3>
            <small>In time of {this.props.date} <sup className="sup-date" >th</sup> {this.props.selectedMonth}, {this.props.selectedYear}</small>
          </div>
          <div className="row m-x-auto p-t">
            <div className="streamline b-l m-l">
              {inTimeData}
            </div>
          </div>
        </div>
        <div className="col-md-2 col-sm-3 col-xs-3 pull-right">
          <RaisedButton onTouchTap={() => this.props.handleClose()} primary label="Close" />
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:     state.frontend.toJS(),
    loggedUser:   state.logged_user.userLogin,
    usersList:    state.usersList.toJS(),
    teamStats:    state.teamStats,
    empLifeCycle: state.teamStats.empLifeCycle,
    empHours:     state.teamStats.empHours
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageEmpHours));
