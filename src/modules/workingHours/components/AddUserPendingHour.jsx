import React from 'react';
import {CONFIG} from 'src/config/index';
import 'react-date-picker/index.css';
import ButtonRaised from 'components/generic/buttons/ButtonRaised';

class AddUserPendingHour extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      officetime:  '9:00',
      pendingTime: '',
      user_Id:     '',
      empId:       '',
      year:        '',
      month:       ''
    };
    this.handleAddData = this.handleAddData.bind(this);
  }
  componentWillMount () {
    this.setState({
      pendingTime: this.props.val.extra_time,
      user_Id:     this.props.val.user_Id,
      empId:       this.props.val.id,
      year:        this.props.manageUserPendingHours.year,
      month:       this.props.manageUserPendingHours.displayData.month
    });
  }
  componentWillReceiveProps (props) {
    this.setState({
      pendingTime: props.val.extra_time,
      user_Id:     props.val.user_Id,
      empId:       props.val.id,
      year:        props.manageUserPendingHours.year,
      month:       props.manageUserPendingHours.displayData.month
    });
  }

  handleAddData () {
    var min = this.state.officetime;
    var penMin = this.state.pendingTime;
    var times = [];
    var times1 = min.split(':');
    var times2 = penMin.split(':');

    for (var i = 0; i < 2; i++) {
      times1[i] = (isNaN(parseInt(times1[i]))) ? 0 : parseInt(times1[i]);
      times2[i] = (isNaN(parseInt(times2[i]))) ? 0 : parseInt(times2[i]);
      times[i] = times1[i] + times2[i];
    }

    var minutes = times[1];
    var hours = times[0];

    if (minutes % 60 === 0) {
      let res = minutes / 60;
      hours += res;
      minutes = minutes - (60 * res);
    }

    var pendingHour = (hours <= 9 ? ('0' + hours + ':' + minutes) : hours + ':' + minutes);
    const userId = this.state.user_Id;
    const empId = this.state.empId;
    this.props.callAddUserPendingHours(userId, pendingHour, empId, this.state.year, this.state.month);
  };
  render () {
    return (
      <div>
        <div>
          <ButtonRaised
            className="m-b-sm green"
            onClick={this.handleAddData}
            label={'Merge To Next Working Day'} />
        </div>
      </div>
    );
  }
}

export default AddUserPendingHour;
