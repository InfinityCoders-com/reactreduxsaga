import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import PageEmpHours from './PageEmpHours';


class DialogInOut extends Component {
  constructor(props){
    super(props);
  }

  render() {
  //  const title = (<h3>In/Out Time on <span className="text-muted p-a">{this.props.date} <sup className="sup-date" >th</sup> {this.props.selectedMonth}, {this.props.selectedYear}</span></h3>);
    return (
      <div>
        <Dialog
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          autoScrollBodyContent
          contentClassName="dialog-inout-time"
        >
          <PageEmpHours {...this.props} state={this.props.state} date={this.props.date} selectedMonth={this.props.selectedMonth} selectedYear={this.props.selectedYear} close={this.props.handleClose} />
        </Dialog>
      </div>
    );
  }
}

export default DialogInOut;
