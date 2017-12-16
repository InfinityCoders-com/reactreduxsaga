import React from 'react';
import 'react-date-picker/index.css';
import ButtonRaised from 'components/generic/buttons/ButtonRaised';
import {notify} from 'src/services/notify';

class AddAsHalfDayLeave extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      day_status:            '',
      pending_id:            '',
      year:                  '',
      month:                 '',
      userId:                '',
      half_day:              '0.5',
      full_day:              '1',
      'show_status_message': false
    };
    this._apply_half_day_1 = this._apply_half_day_1.bind(this);
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
    this.setState({
      pending_id: props.val.id,
      userId:     props.val.user_Id,
      year:       props.manageUserPendingHours.displayData.year,
      month:      props.manageUserPendingHours.displayData.month
    });
  }

  _apply_half_day_1 (shift) {
    if (shift === 1) {
      let day_status = '1';
      this.props.onApplyHalfLeave(
        this.state.half_day,
        this.state.userId,
        day_status,
        this.state.pending_id,
        this.state.year,
        this.state.month,
        ).then((data) => {
          notify('Success !','Half day leave Applied','success');
          this.setState({
            form_no_of_days:     '',
            pending_id:          '',
            year:                '',
            month:               '',
            userId:              '',
            show_status_message: true
          });
        }).catch((error) => {
          notify('Error !',error,'error');
        });
    } else if (shift === 2) {
      let day_status = '';
      this.props.onApplyHalfLeave(
        this.state.full_day,
        this.state.userId,
        day_status,
        this.state.pending_id,
        this.state.year,
        this.state.month,
        ).then((data) => {
          notify('Success !','full day leave Applied','success');
          this.setState({
            form_no_of_days:     '',
            pending_id:          '',
            year:                '',
            month:               '',
            userId:              '',
            show_status_message: true
          });
        }).catch((error) => {
          notify('Error !',error,'error');
        });
    }
  }

  render () {
    let status_message = '';
    if (this.props.applyLeave.status_message != '' && this.state.show_status_message == true) {
      status_message = <span className="well" style={{background: '#60cffa', padding: '5px', marginLeft: '8px'}}>
        {this.props.applyLeave.status_message}</span>;
    }

    let width = '63%';
    if (this.props.forAdmin == true) {
      width = '82%';
    }
    return (
      <div>
        <div>
          <ButtonRaised
            className="m-b-sm indigo"
            onClick={() => this._apply_half_day_1(1)} label="Apply Half Day Leave" />
          <br />
           <ButtonRaised
             className="m-b-sm indigo"
             onClick={() => this._apply_half_day_1(2)} label="Apply full Day Leave" />
           <br />
        </div>
      </div>
    );
  }
}

export default AddAsHalfDayLeave;
