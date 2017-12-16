import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {GithubPicker} from 'react-color';
import {notify, confirm} from 'src/services/notify';
import {CONFIG} from 'src/config/index';
import 'react-date-picker/index.css';

export default class AddDeviceStatus extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      background:     '',
      colorPicker:    'hide',
      statusType:     '',
      checkValue:     '',
      status_message: ''
    };
    this.addMoreStatus = this.addMoreStatus.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.handleStatusClose = this.handleStatusClose.bind(this);
  }
  componentWillReceiveProps (props) {
    this.setState({
      statusList: props.deviceStatusList,
      open:       props.open
    });
  }

  addMoreStatus (event) {
    event.preventDefault();
    let statusValue = this.state.statusType.trim();
    let colorValue = this.state.background;
    if (colorValue && statusValue !== '') {
      this.props.callAddStatus(statusValue, colorValue);
      this.setState({
        statusType: '',
        background: ''
      });
    } else {
      notify('Warning !', 'First Fill Status Type & Color', 'warning');
    }
  }

  handleChangeComplete (color) {
    this.setState({background: color.hex});
  }

  handleDelete () {
    this.props.callDeleteDeviceStatus(this.state.checkValue);
  }

  handleStatusClose () {
    this.setState({
      openStatus: false,
      statusType: '',
      background: ''
    });
  }

  render () {
    const actions = [
      <FlatButton
        label="Delete"
        secondary
        onTouchTap={() => {
          if (this.state.checkValue !== '') {
            confirm('Are you sure ?', 'Do you want to delete this Device Status ?', 'warning').then((res) => {
              if (res) {
                this.handleDelete();
              }
            });
          }
        }} />,
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.handleStatusClose}
        style={{marginRight: 5}}
    />,
      <RaisedButton
        label="Submit"
        primary
        onTouchTap={this.addMoreStatus}
    />
    ];
    return (
      <div>
        <button className="md-btn md-raised m-b-sm indigo" onTouchTap={this.props.handleStatusOpen}>Add Status Type</button>
        <Dialog
          title={'ADD STATUS TYPE'}
          titleStyle={{opacity: '0.56'}}
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleStatusClose}
          autoScrollBodyContent >

          <div className="row m-0">
            <div className='col-sm-5' style={{overflowY: 'auto', maxHeight: '250px'}}>
              <label>Status Type List</label>
              <ol>
                {this.props.manageDevice.statusList.map((val, i) => {
                  let col = this.props.deviceStatusList.filter(data => data.status === val.status);
                  let statusColor;
                  if (col.length > 0) {
                    statusColor = col[0].color;
                  }
                  return <li key={i}>
                    <input
                      type='radio'
                      name="first"
                      value={val.status}
                      onChange={(e) => { this.setState({checkValue: e.target.value}); }}
                    />
                    {val.status}
                    <span style={{
                      background: statusColor,
                      marginLeft: '5%',
                      width:      '45px',
                      height:     '15px',
                      color:      statusColor
                    }}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </li>;
                })}
              </ol>
              <vr />
            </div>
            <div className='col-sm-7' style={{marginTop: '5%'}}>
              <div>
                <TextField
                  fullWidth
                  ref='value'
                  floatingLabelText={'Status Type'}
                  onBlur={(e) => { this.setState({statusType: this.state.statusType.trim(), colorPicker: 'hide'}); }}
                  onChange={(e) => { this.setState({colorPicker: 'show', statusType: e.target.value}); }}
                  value={this.state.statusType}
                />
              </div>
                {this.state.statusType
                  ? <div className='col-sm-12 well'>
                    <label>Add Color</label>
                    <div className='row'>
                      <div className='col-sm-6 '>
                        <GithubPicker color={this.state.background}
                          onChangeComplete={this.handleChangeComplete}
                          triangle={'top-left'} />
                      </div>
                      <div className="col-sm-6">
                        <div className="panel panel-default">
                          <div className="panel-heading">Selected Color</div>
                          <div style={{backgroundColor: this.state.background, height: '41px'}}
                            value={this.state.background} className="panel-body"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : null
                  }
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
