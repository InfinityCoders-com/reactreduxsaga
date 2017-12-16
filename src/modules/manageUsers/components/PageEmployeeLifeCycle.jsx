import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {notify} from 'src/services/notify';
import _ from 'lodash';
import {HighchartsChart, LineSeries, Chart, XAxis, YAxis, Title, Tooltip, Subtitle, Legend, ColumnSeries} from 'react-jsx-highcharts';

class PageEmployeeLifeCycle extends Component {
  constructor (props) {
    super(props);
    this.state = {
      start_year:   '',
      end_year:     '',
      empLifeCycle: ''
    };
    this.getByYearData = this.getByYearData.bind(this);
    this.handleStartYear = this.handleStartYear.bind(this);
    this.handleEndYear = this.handleEndYear.bind(this);
  }
  componentWillMount (props) {
    const d = new Date();
    const start_year = d.getFullYear();
    const end_year = d.getFullYear();
    const userId = localStorage.getItem('userid');
    this.setState({
      start_year:this.props.currentYear,
      end_year:this.props.currentYear,
      empLifeCycle: this.props.empLifeCycle
    });
  }

  componentWillReceiveProps (props) {
    this.setState({
      empLifeCycle: props.empLifeCycle
    });
  }

  handleStartYear(data){
    this.setState({ start_year: data });
    this.getByYearData({ start_year: data , change:'start_year'});
  }

  handleEndYear(data){
    this.setState({ end_year: data });
    this.getByYearData({ end_year: data , change:'end_year'});
  }

  getByYearData (data) {
    const userId = localStorage.getItem('userid');
    let start_year = this.state.start_year !== '' ? this.state.start_year : this.props.currentYear;
    let end_year = this.state.end_year !== '' ? this.state.end_year : this.props.currentYear;
    if(data.change === 'start_year'){
      start_year = data.start_year;
    }else if (data.change === 'end_year') {
      end_year = data.end_year;
    }
    if(start_year > end_year){
      notify('Error!', 'Please Check End Year', 'error');
    }else{
      this.props.requestEmployeLifeCycle({
        'start_year': start_year,
        'end_year':   end_year
      });
    }
  }
  render () {
    let yearS = [];
    let yearOptions = [];
    let endYearOptions = [];
    let noOfMonths = [];
    let countJoinees = [];
    let countTerminations = [];
    let EmpLife = this.state.empLifeCycle;
    let startYearOptions = _.map(this.props.year, (data, i) => {
      return (
      yearOptions.push(<option key={i} value={data}>{data}</option>)
      );
    });
    let endYearOption = _.map(this.props.year, (data, i) => {
      if(data >= this.state.start_year){
      return (
      endYearOptions.push(<option key={i} value={data}>{data}</option>)
      );
    }
    });
    if(EmpLife !== undefined && EmpLife.isSuccess){
    let EmpGraphData = _.map(EmpLife.data, (memberData, k) => {
      yearS.push(memberData.Year);
      let dataStatus = _.map(memberData.Stats, (empData, j) => {
        noOfMonths.push(empData.Month);
        countJoinees.push(empData.details[0].count_joinees);
        countTerminations.push(empData.details[0].count_terminations);
        return (
        <div></div>
        );
      });
    });
    }
    return (
      <div>
        <div className="team row p-a">
          <div className="col-xs-12 well">
            <HighchartsChart>
              <Chart backgroundColor={null} style={{'fontFamily': 'Dosis, sans-serif'}} />
              <Title style={{'fontSize': '16px', 'fontWeight': 'bold', 'textTransform': 'uppercase'}}>{'Employee Life Cycle in'}{yearS}</Title>
              <Subtitle>{'Employee Recruit and Leave'}</Subtitle>
              <Legend itemStyle={{'fontWeight': 'bold', 'fontSize': '13px'}} />
              <Tooltip backgroundColor={'rgba(219,219,216,0.8)'} shadow={false} borderWidth={0} />
              <XAxis id="x" categories={noOfMonths} title={{'style': {'textTransform': 'uppercase'}}} gridLineWidth={1} labels={{'style': {'fontSize': '12px'}}}>
                <XAxis.Title>Month</XAxis.Title>
              </XAxis>
              <YAxis id="y" title={{'style': {'textTransform': 'uppercase'}}} labels={{'style': {'fontSize': '12px'}}} >
                <YAxis.Title >No. of employee</YAxis.Title>
                <LineSeries id="countJoinees" name="Total Joining" data={countJoinees} />
                <LineSeries id="countTerminations" name="Total Terminations" data={countTerminations} />
              </YAxis>
            </HighchartsChart>
          </div>
        </div>
        <div className="container p-t">
          <div className="row">
            <div className="form-group col-xs-6 profile-input p-a">
              <label htmlFor="sel1">Start Year:</label>
              <select className="form-control" id="sel1" defaultValue={this.props.currentYear}
                onChange={(evt) => { this.handleStartYear(evt.target.value);}}>
                <option >Select Start Year</option>
                {yearOptions}
              </select>
            </div>
            <div className="form-group col-xs-6 profile-input p-a">
              <label htmlFor="sel1">End Year:</label>
              <select className="form-control" id="sel12" defaultValue={this.props.currentYear}
                onChange={(evt) => { this.handleEndYear(evt.target.value);}}>
                <option>Select End Year</option>
                {endYearOptions}
              </select>
            </div>
            {/* <div className="form-group col-md-2 col-sm-3 col-xs-3">
              <button type="button" onClick={(evt) => this.getByData()} className="btn btn-primary form-group m-t-md">Get Details</button>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default PageEmployeeLifeCycle;
