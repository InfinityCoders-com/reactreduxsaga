import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import * as actions from 'appRedux/actions';
import {HighchartsChart, AreaSplineSeries, Chart, XAxis, Tooltip, YAxis, Title, Subtitle, Legend, ColumnSeries, SplineSeries, PieSeries} from 'react-jsx-highcharts';
import 'react-date-picker/index.css';
var moment = require('moment');

class PageEmployeePerformance extends Component {
  constructor (props) {
    super(props);
    this.state = {
      search:              '',
      start_year:          '',
      end_year:            '',
      pendingData:         '',
      year:                '',
      month:               '',
      userId:              '',
      employeePerformance: ''
    };
    this.getByData = this.getByData.bind(this);
    this.handleMonth = this.handleMonth.bind(this);
    this.handleYear = this.handleYear.bind(this);
  }
  componentWillMount () {
    this.setState({
      year:this.props.currentYear,
      month:this.props.currentMonth,
      employeePerformance: this.props.employeePerformance
    });
  }
  componentWillReceiveProps (props) {
    this.setState({
      employeePerformance: props.employeePerformance
    });
  }

  handleMonth(data){
    this.setState({month:data});
    this.getByData({month:data, change: 'month' });
  }

  handleYear(data){
    this.setState({ year: data});
    this.getByData({ year: data, change: 'year' });
  }

  getByData (data) {
    const userId = localStorage.getItem('userid');
    let year = this.state.year !== '' ? this.state.year : this.props.currentYear;
    let month = this.state.month !== '' ? this.state.month : this.props.currentMonth;
    if(data.change === 'month'){
      month=data.month;
    }else if (data.change === 'year') {
      year=data.year;
    }
    this.props.requestEmployeePerformance({
      'month': month,
      'year':  year
    });
  }
  render () {
    let EmpPerformance = this.state.employeePerformance;
    var noOfDays = [];
    var noOfActiveHours = [];
    var noOfTotalHours = [];
    let monthOptions = [];
    let yearOptions = [];
    let monthOption = _.map(this.props.months, (monthData, i) => {
      monthOptions.push(<option key={i} value={monthData}>{monthData}</option>);
    });
    let yearOption = _.map(this.props.year, (data, i) => {
      return (
      yearOptions.push(<option key={i} value={data}>{data}</option>)
      );
    });
    if (EmpPerformance !== undefined && EmpPerformance.isSuccess) {
      let performanceData = EmpPerformance.data;
      let timeList = _.map(EmpPerformance.data, (performanceData, j) => {
        let date= this.props.currentDate.toString().split(" ");
        noOfDays.push(performanceData.day);
        let thedate=performanceData.day.split(" ");
        let dateData = thedate[0].toString().length > 1 ? thedate[0]: '0' + thedate[0];
        if(this.state.year === this.props.currentYear && this.state.month === this.props.currentMonth && dateData <= date[2]  ){
            if(parseFloat(performanceData.top_active_hrs.hours) > 0.0 ){
              noOfActiveHours.push({y:parseFloat(performanceData.top_active_hrs.hours),nameData:performanceData.top_active_hrs.username});
            }else if(parseFloat(performanceData.top_active_hrs.hours) === 0.0){
              noOfActiveHours.push({y:parseFloat(performanceData.top_active_hrs.hours),nameData:""});
            }
            if (parseFloat(performanceData.top_total_hrs.hours) > 0.0) {
             noOfTotalHours.push({y:parseFloat(performanceData.top_total_hrs.hours),nameData:performanceData.top_total_hrs.username});
           } else if ( parseFloat(performanceData.top_total_hrs.hours) === 0.0) {
              noOfTotalHours.push({y:parseFloat(performanceData.top_total_hrs.hours),nameData:""});
            }
          }else if( this.state.year !== this.props.currentYear || this.state.month !== this.props.currentMonth){
            if(parseFloat(performanceData.top_active_hrs.hours) > 0.0 ){
              noOfActiveHours.push({y:parseFloat(performanceData.top_active_hrs.hours),nameData:performanceData.top_active_hrs.username});
            }else if(parseFloat(performanceData.top_active_hrs.hours) === 0.0){
              noOfActiveHours.push({y:parseFloat(performanceData.top_active_hrs.hours),nameData:""});
            }
            if (parseFloat(performanceData.top_total_hrs.hours) > 0.0) {
             noOfTotalHours.push({y:parseFloat(performanceData.top_total_hrs.hours),nameData:performanceData.top_total_hrs.username});
           } else if ( parseFloat(performanceData.top_total_hrs.hours) === 0.0) {
              noOfTotalHours.push({y:parseFloat(performanceData.top_total_hrs.hours),nameData:""});
            }
        }
        return (
          <div></div>
        );
      });
    }
    const plotOptions= {
        spline: {
            dataLabels: {
                enabled: true,
                format: '{point.nameData} <br/> {point.y} hrs'
            },
        }
    };
    return (
      <div>
        <div className="row p-a">
          <div className="well p-a">
            <HighchartsChart plotOptions={plotOptions} >
              <Chart backgroundColor={null} style={{'fontFamily': 'Dosis, sans-serif'}} />
              <Title style={{'fontSize': '16px', 'fontWeight': 'bold', 'textTransform': 'uppercase'}}>{'Employee Monthly Performance'}</Title>
              <Subtitle>{'Active of Employee'}</Subtitle>
              <Legend itemStyle={{'fontWeight': 'bold', 'fontSize': '13px'}} />
              <Tooltip backgroundColor={'rgba(219,219,216,0.8)'} shadow={false} borderWidth={0}
                pointFormat={  '<span style="color:{point.color}">\u25CF</span> {series.name}:<br/>Name: <b>{point.nameData}</b><br/>Hours: <b>{point.y:.1f}</b><br/>'
                }
              />
              <XAxis id="x" categories={noOfDays} title={{'style': {'textTransform': 'uppercase'}}} gridLineWidth={1} labels={{'style': {'fontSize': '12px'}}} >
                <XAxis.Title>Days</XAxis.Title>
              </XAxis>
              <YAxis id='EmpPerformance' title={{'style': {'textTransform': 'uppercase'}}}  labels={{'style': {'fontSize': '12px'}}} >
                <YAxis.Title>No. of Hours</YAxis.Title>
                <SplineSeries id="emp" name="Active Hours"  data={noOfActiveHours}  />
                {/* <SplineSeries id="emp2" name="Total Hours" data={noOfTotalHours} color={'black'} /> */}
              </YAxis>
            </HighchartsChart>
          </div>
          <div className="well p-a">
            <HighchartsChart plotOptions={plotOptions} >
              <Chart backgroundColor={null} style={{'fontFamily': 'Dosis, sans-serif'}} />
              <Title style={{'fontSize': '16px', 'fontWeight': 'bold', 'textTransform': 'uppercase'}}>{'Employee Monthly Performance'}</Title>
              <Subtitle>{'Active of Employee'}</Subtitle>
              <Legend itemStyle={{'fontWeight': 'bold', 'fontSize': '13px'}} />
              <Tooltip backgroundColor={'rgba(219,219,216,0.8)'} shadow={false} borderWidth={0}
                pointFormat={  '<span style="color:{point.color}">\u25CF</span> {series.name}:<br/>Name: <b>{point.nameData}</b><br/>Hours: <b>{point.y:.1f}</b><br/>'
                }
              />
              <XAxis id="x" categories={noOfDays} title={{'style': {'textTransform': 'uppercase'}}} gridLineWidth={1} labels={{'style': {'fontSize': '12px'}}} >
                <XAxis.Title>Days</XAxis.Title>
              </XAxis>
              <YAxis id='EmpPerformance' title={{'style': {'textTransform': 'uppercase'}}}  labels={{'style': {'fontSize': '12px'}}} >
                <YAxis.Title>No. of Hours</YAxis.Title>
                {/* <SplineSeries id="emp" name="Active Hours"  data={noOfActiveHours}  /> */}
                <SplineSeries id="emp2" name="Total Hours" data={noOfTotalHours} color={'black'} />
              </YAxis>
            </HighchartsChart>
          </div>
        </div>
        <div className="container p-t ">
          <div className="row">
            <div className="form-group col-xs-6 profile-input p-a">
              <label htmlFor="sel1">Select Months:</label>
              <select className="form-control" id="sel1" defaultValue={this.props.currentMonth}
                onChange={(evt) => { this.handleMonth(evt.target.value); }}>
                {monthOptions}
              </select>
            </div>
            <div className="form-group col-xs-6 profile-input p-a">
              <label htmlFor="sel1">Select Year:</label>
              <select className="form-control" id="sel12" defaultValue={this.props.currentYear}
                onChange={(evt) => { this.handleYear(evt.target.value); }}>
                {yearOptions}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:       state.frontend.toJS(),
    loggedUser:     state.logged_user.userLogin,
    usersList:      state.usersList.toJS(),
    teamStats:      state.teamStats,
    empLifeCycle:   state.teamStats.empLifeCycle,
    empHours:       state.teamStats.empHours,
    monthlyHours:   state.teamStats.monthlyHours,
    empPerformance: state.teamStats.employeePerformance
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageEmployeePerformance));
