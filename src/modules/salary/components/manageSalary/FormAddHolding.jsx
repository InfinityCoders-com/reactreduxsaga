import React from 'react';
import * as _ from 'lodash';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';
import {ButtonRaised} from 'components/generic/buttons';

class FormAddHolding extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user_id:        '',
      holding_from:   '',
      holding_till:   '',
      holding_amount: '',
      reason:         ''
    };
    this.handleHoldingFrom = this.handleHoldingFrom.bind(this);
    this.handleHoldingTill = this.handleHoldingTill.bind(this);
  }
  handleHoldingFrom (date) {
    this.setState({
      holding_from: date
    });
  }
  handleHoldingTill (date) {
    this.setState({
      holding_till: date
    });
  }
  componentWillReceiveProps (props) {
    let holding_from = '';
    let holding_till = '';
    let holding_amount = '';
    let reason = '';
    // if( typeof props.user_latest_salary_details.Basic != 'undefined' ){
    //   basic = props.user_latest_salary_details.Basic
    // }
    this.setState({
      user_id:        props.userid,
      holding_from:   holding_from,
      holding_till:   holding_till,
      holding_amount: holding_amount,
      reason:         reason
    });
  }

  render () {
    let styles = _.cloneDeep(this.constructor.styles);
    let date = this.state.applicable_from;
    return (
      <div className="row no-gutter">
        <div className="row no-gutter">
          <div className="col-xs-12 p-r">
            <div className="form-group">
              <label>Holding From : {this.state.holding_from}</label>
              <DateField dateFormat="YYYY-MM-DD" onChange={this.handleHoldingFrom} className="form-control" />
            </div>
            <div className="form-group">
              <label>Holding Till : {this.state.holding_till}</label>
              <DateField dateFormat="YYYY-MM-DD" onChange={this.handleHoldingTill} className="form-control" />
            </div>
            <div className="form-group">
              <label>Holding Amount</label>
              <input type="text" className="form-control" ref="holding_amount" onChange={() => this.setState({holding_amount: this.refs.holding_amount.value})} value={this.state.holding_amount} />
            </div>
            <div className="form-group">
              <label>Reason</label>
              <input type="text" className="form-control" ref="reason" onChange={() => this.setState({reason: this.refs.reason.value})} value={this.state.reason} />
            </div>
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-12 p-r">
            <ButtonRaised className="col-md-btn md-raised indigo col-md-10 col-sm-12 col-xs-12 indigo" onClick={() => this.props.callAddUserHolding(this.state)} label="Add Holding" />
          </div>
        </div>
      </div>
    );
  }
}

FormAddHolding.styles = {
  leaveDiv: {
    'marginBottom': '10px'
  }
};

export default FormAddHolding;
