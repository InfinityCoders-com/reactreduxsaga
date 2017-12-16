import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {
  HighchartsChart, Tooltip, Chart, XAxis, YAxis, Title, Legend, ColumnSeries, PieSeries, Subtitle
} from 'react-jsx-highcharts';

class PageUserDashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      teamGraphData: ''
    };
  }
  componentWillMount (props) {
    const userId = localStorage.getItem('userid');
    this.setState({
      teamGraphData: this.props.team
    });
  }

  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    this.setState({
      teamGraphData: this.props.team
    });
  }
  render () {
    let teamUser = this.state.teamGraphData;
    let UserList = _.map(teamUser, (teamData, key) => {
      let member = teamData.member;
      let noOfMonths = [];
      const pieData = [];
      let memberName = [];
      let data = teamData.name;
      let graphdata = _.map(member, (memberData, k) => {
        noOfMonths.push(memberData.number_of_months);
        memberName.push(memberData.name);
        pieData.push(memberData.name);
        return (
          <XAxis key={k} id="x" categories={memberName} ltitle={{'style': {'textTransform': 'uppercase'}}} gridLineWidth={1} labels={{'style': {'fontSize': '12px'}}} >
            <XAxis.Title>Employee Name</XAxis.Title>
          </XAxis>
        );
      });

      return (
        <div key={teamData.count_members}>
          {teamData.name !== ''
            ?
              <div  className="well p-t p-m">
                <HighchartsChart>
                  <Chart backgroundColor={null} style={{'fontFamily': 'Dosis, sans-serif'}} />
                  <Title style={{'fontSize': '16px', 'fontWeight': 'bold', 'textTransform': 'uppercase'}} >{teamData.name}</Title>
                  <Subtitle>{'Team Experience '}</Subtitle>
                  <Legend itemStyle={{'fontWeight': 'bold', 'fontSize': '13px'}} />
                  <Tooltip backgroundColor={'rgba(219,219,216,0.8)'} shadow={false} borderWidth={0} />
                  {graphdata}
                  <YAxis id="number" minorTickInterval={'auto'} title={{'style': {'textTransform': 'uppercase'}}} labels={{'style': {'fontSize': '12px'}}} >
                    <YAxis.Title>No. of Month Work</YAxis.Title>
                    <ColumnSeries id="employee" name="Employee Experience" data={noOfMonths} />
                    <PieSeries key={key} id="total-consumption"
                      name="Total consumption"
                      data={pieData}
                      center={[100, 80]}
                      size={200} />
                  </YAxis>
                </HighchartsChart>
              </div>
            : null
          }
        </div>
      );
    });
    return (
      <div>
        {UserList}
      </div>
    );
  }
}

export default PageUserDashboard;
