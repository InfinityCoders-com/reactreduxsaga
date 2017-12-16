import React from 'react';
import Dialog from 'material-ui/Dialog';
import _ from 'lodash';
import {notify, confirm} from 'src/services/notify';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {CONFIG} from 'src/config/index';
import 'react-date-picker/index.css';

export default class AddDeviceDialoge extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      background: '',
      deviceType: '',
      open:       false,
      deviceList: [],
      checkValue: []
    };
    this.addMoreDevice = this.addMoreDevice.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setValue = this.setValue.bind(this);
  }
  componentWillReceiveProps (props) {
    this.setState({deviceList: props.deviceTypeList, open: props.open});
  }

  handleDelete () {
    let checkValue = this.state.checkValue;
    let deviceList = this.state.deviceList;
    checkValue.map((val) => {
      _.pull(deviceList, val);
    });
    this.props.onCallDeviceType(deviceList).then((val) => {
      if (val.data.not_delete) {
        this.setState({deviceList: this.state.deviceList, checkValue: []});
        notify('Oops', 'This Device Type Is In Use', 'error');
        this.props.handleClose();
      } else {
        this.setState({deviceList, deviceType: '', checkValue: []});
        notify('Success', 'Device Type Deleted', 'success');
        this.props.handleClose();
      }
    });
  }

  setValue (e) {
    if (e.target.checked) {
      let array = this.state.checkValue;
      array.push(e.target.value);
      this.setState({checkValue: array});
    } else if (!e.target.checked) {
      let array = this.state.checkValue;
      _.pull(array, e.target.value);
      this.setState({
        checkValue: array
      });
    }
  }

  addMoreDevice () {
    var deviceType = this.state.deviceType.trim();
    if (!_.isEmpty(deviceType)) {
      var deviceList = this.state.deviceList;
      let arr = _.filter(deviceList, device => device.toLowerCase() === deviceType.trim().toLowerCase());
      if (arr.length > 0) {
        notify('Oops', 'This Device Type Already In Use', 'error');
        this.setState({
          deviceType: ''
        });
      } else {
        deviceList.push(deviceType);
        this.setState({
          deviceType: '',
          deviceList: deviceList
        });
      }
      this.props.callAddDevice(this.state.deviceList);
    }
  }

  render () {
    const actions = [
      <FlatButton label="Delete" secondary style={{marginRight: 5}} onTouchTap={() => {
        if (this.state.checkValue !== '') {
          confirm('Are you sure ?', 'Do you want to delete this Device Type ?', 'warning').then((res) => {
            if (res) {
              this.handleDelete();
            }
          });
        }
      }} />,
      <FlatButton label="Cancel" primary onTouchTap={this.props.handleClose} style={{marginRight: 5}} />,
      <RaisedButton label="Submit" primary onTouchTap={this.addMoreDevice} />
    ];
    return (
      <div>
        <button className="md-btn md-raised m-b-sm indigo" onTouchTap={this.props.handleOpen}>Add Device Type</button>
        <Dialog
          title={'ADD DEVICE TYPE'}
          titleStyle={{opacity: '0.56'}}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.props.handleClose}
          autoScrollBodyContent
        >
          <div className="row m-0">
            <div className='col-sm-5'style={{overflowY: 'auto', maxHeight: '250px'}}>
              <label>Device Type List</label>
              <ol> {this.state.deviceList.map((val, i) => {
                return <li key={i}>
                  <input type='checkbox' name="checked" id={i} value={val} onChange={(e) => { this.setValue(e); }} />{val}
                </li>;
              })}
              </ol>
            </div>
            <div className='col-sm-7' style={{marginTop: '5%'}}>
              <TextField
                ref='value'
                floatingLabelText={'Device Type'}
                fullWidth
                value={this.state.deviceType}
                onBlur={(e) => { this.setState({deviceType: this.state.deviceType.trim()}); }}
                onChange={(e) => { this.setState({deviceType: e.target.value}); }}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
