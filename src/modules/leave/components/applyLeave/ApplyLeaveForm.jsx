import React, {Component} from 'react';
import moment from 'moment';
import {Calendar} from 'react-date-range';
import {notify} from 'src/services/notify';
import {Button, ButtonFlat} from 'components/generic/buttons';

class ApplyLeaveForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      form_from_date:       '',
      form_to_date:         '',
      form_no_of_days:      '',
      form_reason:          '',
      day_status:           '',
      show_half_day_button: '',
      leaveType:            '',
      late_reason:          ''
    };
    this.doApplyLeave = this.doApplyLeave.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this._apply_half_day_1 = this._apply_half_day_1.bind(this);
  }
  componentDidMount () {}

  componentDidUpdate () {
    if (this.state.form_from_date != '' && this.state.form_to_date != '' && this.state.form_no_of_days == '') {
      this.props.onDaysBetweenLeaves(this.state.form_from_date, this.state.form_to_date);
    }
  }

  _apply_half_day_1 (shift) {
    if (shift == 1) {
      this.setState({
        form_no_of_days: '0.5',
        day_status:      '1'
      });
    } else if (shift == 2) {
      this.setState({
        form_no_of_days: '0.5',
        day_status:      '2'
      });
    }
  }

  handleStartDate (date) {
    let startDate = date.format('YYYY-MM-DD');
    this.setState({form_from_date: startDate, form_no_of_days: ''});
  }
  handleEndDate (date) {
    let endDate = date.format('YYYY-MM-DD');
    this.setState({form_to_date: endDate, form_no_of_days: ''});
  }

  doApplyLeave (evt) {
    evt.preventDefault();
    if (this.props.forAdmin == true) {
      this.props.doApplyLeave(this.state.form_from_date, this.state.form_to_date, this.state.form_no_of_days, this.state.form_reason, this.props.selectedUserId, this.state.day_status, this.state.leaveType, this.state.late_reason);
      this.setState({
        form_from_date:       '',
        form_to_date:         '',
        form_no_of_days:      '',
        form_reason:          '',
        show_half_day_button: '',
        day_status:           '',
        leaveType:            '',
        late_reason:          ''
      });
      // notify("leave Applied");
    } else {
      this.props.doApplyLeave(this.state.form_from_date, this.state.form_to_date, this.state.form_no_of_days, this.state.form_reason, '', this.state.day_status, this.state.leaveType, this.state.late_reason);
      this.setState({
        form_from_date:       '',
        form_to_date:         '',
        form_no_of_days:      '',
        form_reason:          '',
        show_half_day_button: '',
        day_status:           '',
        leaveType:            '',
        late_reason:          ''
      });
    }
  }
  componentWillReceiveProps (props) {
    let num_working_days = '0';
    if (props.applyLeave.count_working_days != '' && props.applyLeave.count_working_days != 0) {
      num_working_days = props.applyLeave.count_working_days;
    }

    this.setState({form_from_date: props.applyLeave.start_date, form_to_date: props.applyLeave.end_date, form_no_of_days: num_working_days});
  }
  render () {
    let policyLink = this.props.policyDocuments.data.map((val, i) => {
      if (val.name === 'Leave Policy') {
        return <a key={i} href={val.link} target="_blank" ><label key={i} className="pointer m-t-xs">Read Leave Policy</label></a>;
      }
    });
    let dateDiff = moment(moment().format('YYYY-MM-DD')).diff(this.state.form_from_date || moment().format('YYYY-MM-DD'), 'days');
    let apply_half_day_button_1 = '';
    let apply_half_day_button_2 = '';
    if (this.state.form_no_of_days == 1) {
      apply_half_day_button_1 = <ButtonFlat className="text-accent" onClick={() => this._apply_half_day_1(1)} label="Apply Leave For First Half" />;
      apply_half_day_button_2 = <ButtonFlat className="text-accent" onClick={() => this._apply_half_day_1(2)} label="Apply Leave For Second Half" />;
    }
    let width = '63%';
    if (this.props.forAdmin == true) {
      width = '82%';
    }
    return (
      <div className="row">
        <div className="col-xs-6 col-md-4 text-center calendar">
          <h6>Select Start Date</h6>
          <Calendar onChange={this.handleStartDate} />
        </div>
        <div className="col-xs-6 col-md-4 text-center calendar">
          <h6>Select End Date</h6>
          <Calendar onChange={this.handleEndDate} />
        </div>
        <div className="col-xs-12 col-md-4">
          <h5>Leave Summary</h5>
          <br />
          <form role="form" onSubmit={this.doApplyLeave}>
            <div className="box-body">
              <div className="streamline b-l m-l">
                <div className="sl-item b-success">
                  <div className="sl-icon">
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="sl-content">
                    <div className="sl-date text-muted">Your leave starts from</div>
                    <div>
                      {this.state.form_from_date}
                    </div>
                  </div>
                </div>
                <div className="sl-item b-info">
                  <div className="sl-content">
                    <div style={{width: width}}>
                      <select value={this.state.leaveType} onChange={(e) => { this.setState({leaveType: e.target.value}); }} className="form-control" required>
                        <option value='' disabled>Select Option</option>
                        <option value='Casual Leave'> Casual Leave </option>
                        <option value='Sick Leave'> Sick Leave </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="sl-item b-info">
                  <div className="sl-content">
                    <div className="sl-date text-muted">No. of days</div>
                    <div>
                      {this.state.form_no_of_days}
                    </div>
                    <div>
                      {apply_half_day_button_1}
                      {apply_half_day_button_2}
                    </div>
                  </div>
                </div>
                {
                  dateDiff > 0
                   ? <div className="sl-item b-warning">
                      <div className="sl-content">
                        <div className="sl-date text-muted">Reason For Late Applying</div>
                        <div><input type="text" onChange={(e) => this.setState({late_reason: e.target.value})} value={this.state.late_reason} required /></div>
                        <div style={{marginTop: '10px', width: '63%', paddingLeft: '10px', background: 'blanchedalmond'}}>{policyLink}</div>
                      </div>
                    </div> : null
                }
                <div className="sl-item b-warning">
                  <div className="sl-content">
                    <div className="sl-date text-muted">Reason</div>
                    <div><input type="text" ref="reason" onChange={() => this.setState({form_reason: this.refs.reason.value})} value={this.state.form_reason} /></div>
                  </div>
                </div>
                <div className="sl-item b-success">
                  <div className="sl-icon">
                    <i className="fa fa-check red"></i>
                  </div>
                  <div className="sl-content">
                    <div className="sl-date text-muted">Your leave ends on</div>
                    <div>
                      {this.state.form_to_date}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group row m-t-md">
              <div className="col-xs-12 col-md-6 text-center">
                <Button type="submit" className="green apply-leave-btn" label="Apply" />
              </div>
            </div>
          </form>

        </div>
      </div>

    );
  }
}
ApplyLeaveForm.propTypes = {
  doApplyLeave: React.PropTypes.func.isRequired,
  applyLeave:   React.PropTypes.shape({start_date: React.PropTypes.String, end_date: React.PropTypes.String})
};
export default ApplyLeaveForm;
