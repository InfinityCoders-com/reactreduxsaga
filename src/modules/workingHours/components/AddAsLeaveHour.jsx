import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import {CONFIG} from 'src/config/index';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';
import {Button, ButtonFlat} from 'components/generic/buttons';
import ButtonRaised from 'components/generic/buttons/ButtonRaised';
import {Calendar} from 'react-date-range';
import {notify} from 'src/services/notify';

var moment = require('moment');

class AddAsLeaveHour extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open:                  false,
      form_from_date:        '',
      form_to_date:          '',
      form_no_of_days:       '',
      form_reason:           '',
      day_status:            '',
      show_half_day_button:  '',
      leaveType:             '',
      late_reason:           '',
      pending_id:            '',
      year:                  '',
      month:                 '',
      userId:                '',
      'show_status_message': false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.doApplyLeave = this.doApplyLeave.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this._apply_half_day_1 = this._apply_half_day_1.bind(this);
  }

  componentDidUpdate () {
    if (this.state.form_from_date != '' && this.state.form_to_date != '' && this.state.form_no_of_days == '') {
      this.props.onDaysBetweenLeaves(this.state.form_from_date, this.state.form_to_date);
    }
  }

  componentWillMount () {
    this.setState({
      userId:     this.props.val.user_Id,
      pending_id: this.props.val.id,
      year:       this.props.manageUserPendingHours.year,
      month:      this.props.manageUserPendingHours.displayData.month
    });
  }
  componentWillReceiveProps (props) {
    let num_working_days = '0';
    if (props.applyLeave.count_working_days != '' && props.applyLeave.count_working_days != 0) {
      num_working_days = props.applyLeave.count_working_days;
    }
    this.setState({
      form_from_date:  props.applyLeave.start_date,
      form_to_date:    props.applyLeave.end_date,
      pending_id:      props.val.id,
      userId:          props.val.user_Id,
      year:            props.manageUserPendingHours.displayData.year,
      month:           props.manageUserPendingHours.displayData.month,
      form_no_of_days: num_working_days});
  }

  handleOpen () {
    this.setState({
      open: true
    });
  }
  handleClose () {
    this.setState({
      open:                 false,
      form_from_date:       '',
      form_to_date:         '',
      form_no_of_days:      '',
      form_reason:          '',
      show_half_day_button: '',
      day_status:           '',
      leaveType:            '',
      late_reason:          '',
      pending_id:           '',
      year:                 '',
      userId:               '',
      month:                ''
    });
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
    this.props.onApplyLeave(
      this.state.form_from_date,
      this.state.form_to_date,
      this.state.form_no_of_days,
      this.state.form_reason,
      this.state.userId,
      this.state.day_status,
      this.state.leaveType,
      this.state.late_reason,
      this.state.pending_id,
      this.state.year,
      this.state.month,
      ).then((data) => {
        notify('Success','leave Applied','success');
        this.handleClose();
        // this.props.onUserPendingHoursData(this.state.year, this.state.month);
        this.setState({
          form_from_date:       '',
          form_to_date:         '',
          form_no_of_days:      '',
          form_reason:          '',
          show_half_day_button: '',
          day_status:           '',
          leaveType:            '',
          late_reason:          '',
          pending_id:           '',
          year:                 '',
          month:                '',
          userId:               '',
          show_status_message:  true
        });
      }).catch((error) => {
        notify('Error !',error,'error');
      });
  }

  render () {
    let status_message = '';
    if (this.props.applyLeave.status_message != '' && this.state.show_status_message == true) {
      status_message = <span className="well" style={{background: '#60cffa', padding: '5px', marginLeft: '8px'}}>
        {this.props.applyLeave.status_message}</span>;
    }

    let dateDiff = moment(moment().format('YYYY-MM-DD')).diff(this.state.form_from_date || moment().format('YYYY-MM-DD'), 'days');
    let apply_half_day_button_1 = '';
    let apply_half_day_button_2 = '';
    if (this.state.form_no_of_days == 1) {
      apply_half_day_button_1 = <ButtonFlat className="text-accent"
        onClick={() => this._apply_half_day_1(1)} label="Apply Leave For First Half" />;
      apply_half_day_button_2 = <ButtonFlat className="text-accent"
        onClick={() => this._apply_half_day_1(2)} label="Apply Leave For Second Half" />;
    }

    let width = '63%';
    if (this.props.forAdmin == true) {
      width = '82%';
    }
    return (
      <div>
        <ButtonRaised
          className="m-b-sm indigo"
          onClick={this.handleOpen}
          label={'Apply Leave'} />

        <Dialog
          title="Add As Leave "
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width: '80%', maxWidth: 'auto'}}
          autoScrollBodyContent>
          <div className="row">
            <div className="col-sm-4 text-center">
              <h6>Select Start Date</h6>
              <Calendar onChange={this.handleStartDate} />
            </div>
            <div className="col-sm-4 text-center">
              <h6>Select End Date</h6>
              <Calendar onChange={this.handleEndDate} />
            </div>
            <div className="col-sm-4">
              <h5 className="text-center">Leave Summary</h5>
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
                          <select value={this.state.leaveType}
                            onChange={(e) => { this.setState({leaveType: e.target.value}); }}
                            className="form-control" required>
                            <option value='' disabled>Select Option</option>
                            <option value='Casual Leave'> Casual Leave </option>
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
                          <small style={{fontSize: '12px'}}>{apply_half_day_button_1}</small>
                          <small style={{fontSize: '12px'}}>{apply_half_day_button_2}</small>

                        </div>
                      </div>
                    </div>
                      {
                        dateDiff > 0
                          ? <div className="sl-item b-warning">
                            <div className="sl-content">
                              <div className="sl-date text-muted">Reason For Late Applying</div>
                                <div className="form-group">
                                  <input type="text"
                                    className="form-control"
                                    onChange={(e) => this.setState({late_reason: e.target.value})}
                                    value={this.state.late_reason} required /></div>
                                </div>
                              </div> : null
                        }
                    <div className="sl-item b-warning">
                      <div className="sl-content">
                        <div className="sl-date text-muted">Reason</div>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="text"
                            ref="reason"
                            onChange={() => this.setState({form_reason: this.refs.reason.value})}
                            value={this.state.form_reason} /></div>
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
                  <div className="text-center">
                    <Button type="submit" className="md-btn md-raised m-b-sm green" label="Apply Leave" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default AddAsLeaveHour;
