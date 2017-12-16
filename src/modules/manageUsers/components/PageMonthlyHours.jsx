import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {notify} from 'src/services/notify';
import _ from 'lodash';
import * as actions from 'appRedux/actions';
import {HighchartsChart, Chart, XAxis, Tooltip, YAxis, Title, Subtitle, Legend, ColumnSeries, LineSeries, SplineSeries, PieSeries} from 'react-jsx-highcharts';
import 'react-date-picker/index.css';
var moment = require('moment');
import DialogInOut from './DialogInOut';

class PageMonthlyHours extends Component {
  constructor (props) {
    super(props);
    this.state = {
      search:       '',
      date:   '',
      end_year:     '',
      userId:       '',
      pendingData:  '',
      year:         '',
      month:        '',
      monthlyHours: '',
      open:         false
    };
    this.getByData = this.getByData.bind(this);
    this.handleMonth = this.handleMonth.bind(this);
    this.handleYear = this.handleYear.bind(this);
    this.handleUserId = this.handleUserId.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillMount () {
    this.setState({
      month:this.props.currentMonth,
      year:this.props.currentYear,
      monthlyHours: this.props.monthlyHours
    });
  }
  componentWillReceiveProps (props) {
    this.setState({
      monthlyHours: this.props.monthlyHours.data
    });
  }

  handleMonth (data) {
    this.setState({month:data});
    this.getByData({month:data, change: 'month' });
  }

  handleYear (data) {
    this.setState({ year: data});
    this.getByData({ year: data, change: 'year' });
  }

  handleUserId (data) {
    this.setState({ userId: data});
    this.getByData({ userId: data, change: 'user_id' });
  }
  handleClick(data){
    let dateData = data.date.toString().length > 1 ? data.date : '0'+data.date;
    this.setState({ open : true, date : dateData });
  }
  handleClose(){
    this.setState({ open: false});
  }

  getByData (data) {
    let userId = this.state.userId;
    let year = this.state.year !== '' ? this.state.year : this.props.currentYear;
    let month = this.state.month !== '' ? this.state.month : this.props.currentMonth;
    if(data.change === 'month'){
      month=data.month;
    }else if (data.change === 'year') {
      year=data.year;
    }else if (data.change === 'user_id') {
      userId=data.userId;
    }
    if (userId === '') {
      notify('Error!', 'Please Select user', 'error');
    }else{
      this.props.requestEmployeeMonthlyHours({
        'id':    userId,
        'month': month,
        'year':  year
      });
    }
  }
  render () {
    let EmpMonthltHours = this.state.monthlyHours;
    var noOfDays = [];
    var activeHour = [];
    var totalHour = [];
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
    if (EmpMonthltHours[0] !== null && EmpMonthltHours[0] !== undefined) {
      let timeList = _.map(EmpMonthltHours[0].day_wise_detail, (Data, j) => {
        noOfDays.push(Data.day);
        activeHour.push({y:parseFloat(Data.active_hours.total_time),super:{...this}});
        totalHour.push({y:parseFloat(Data.total_hours.total_time),super:{...this}});
        return (
        <div></div>
        );
      });
    }
    const clickOptions= {
        line: {
          point: {
              events: {
                  click: function () {
                      const x = this.x+1;
                      this.super.handleClick({ date: x });
                  }
              }
          }
        }
    };
    return (
      <div>
        <DialogInOut open={this.state.open} handleClose={this.handleClose} date={this.state.date} userId={this.state.userId} selectedYear={this.state.year} selectedMonth={this.state.month} {...this.props} />
        <div className="team row p-a">
          <div className="col-xs-12 well">
            <HighchartsChart plotOptions={clickOptions} >
              <Chart backgroundColor={null} style={{'fontFamily': 'Dosis, sans-serif'}} />
              <Title style={{'fontSize': '16px', 'fontWeight': 'bold', 'textTransform': 'uppercase'}} >{'Employee Monthly Hours'}</Title>
              <Subtitle>{'Monthly Active Hour of Employee'}</Subtitle>
              <Legend itemStyle={{'fontWeight': 'bold', 'fontSize': '13px'}} />
              <Tooltip backgroundColor={'rgba(219,219,216,0.8)'} shadow={false} borderWidth={0} />
              <XAxis id="x" categories={noOfDays} title={{'style': {'textTransform': 'uppercase'}}} gridLineWidth={1} labels={{'style': {'fontSize': '12px'}}} >
                <XAxis.Title>Month Days</XAxis.Title>
              </XAxis>
              <YAxis id='activeHour' minorTickInterval={'auto'} title={{'style': {'textTransform': 'uppercase'}}} labels={{'style': {'fontSize': '12px'}}} >
                <YAxis.Title>No. of Hours</YAxis.Title>
                <LineSeries id='emp' name={'Active Hours'} key={'activeHour'} data={activeHour} />
                <LineSeries id='emp2' name={'Total Hours'} key={'totalHour'} data={totalHour} />
              </YAxis>
            </HighchartsChart>
          </div>
        </div>
        <div className="container p-t">
          <div className="form-group col-sm-4 col-xs-12 p-a">
            <label htmlFor="sel1">Select User</label>
            <select className="form-control" id="user"
              onChange={(evt) => {  this.handleUserId(evt.target.value); }}>
              <option>Select User</option>
              {userIdOptions}
            </select>
          </div>
          <div className="form-group col-sm-4 col-xs-6 p-a">
            <label htmlFor="sel1">Select Months:</label>
            <select className="form-control" id="sel1" defaultValue={this.props.currentMonth}
              onChange={(evt) => { this.handleMonth(evt.target.value);  }}>
              {monthOptions}
            </select>
          </div>
          <div className="form-group col-sm-4  col-xs-6 p-a">
            <label htmlFor="sel1">Select Year:</label>
            <select className="form-control" id="sel12" defaultValue={this.props.currentYear}
              onChange={(evt) => { this.handleYear(evt.target.value); }}>
              {yearOptions}
            </select>
          </div>
          {/* <div className="form-group col-md-3">
            <button type="button" onClick={(evt) => this.getByData()} className="btn btn-primary form-group m-t-md">Get Details</button>
          </div> */}
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
    empHours:     state.teamStats.empHours,
    monthlyHours: state.teamStats.monthlyHours
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageMonthlyHours));
