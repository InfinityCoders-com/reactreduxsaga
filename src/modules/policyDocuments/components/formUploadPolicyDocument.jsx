import React from 'react';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class FormUploadPolicyDocument extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      nameofdoc: '',
      linkofdoc: '',
      errName:   '',
      errLink:   ''
    };
    this.submitDocs = this.submitDocs.bind(this);
  }
  submitDocs () {
    let name = this.state.nameofdoc.trim();
    let link = this.state.linkofdoc.trim();
    let state = true;
    this.setState({
      errName: '',
      errLink: ''
    });
    if (state && _.isEmpty(name)) {
      state = false;
      this.setState({
        errName: 'Please enter document name'
      });
    }
    if (state && _.isEmpty(link)) {
      state = false;
      this.setState({
        errLink: 'Please enter document link'
      });
    }
    if (state) {
      let docs = this.props.docs;
      docs.push({name: name, link: link});
      this.props.submitDocs(docs);
      this.setState({
        nameofdoc: '',
        linkofdoc: ''
      });
    }
  }
  render () {
    return (
      <Paper
        className="upload-doc-paper"
        zDepth={2} >
        <div className="row">
          <form className="form-inline">
            <div className="col-md-10 form-group m-x-lg">
              <TextField
                ref='name'
                fullWidth
                floatingLabelText="Name of doc"
                errorText={this.state.errName}
                value={this.state.nameofdoc}
                onChange={(e) => {
                  this.setState({
                    nameofdoc: e.target.value
                  });
                }}
              />
            </div>
            <div className="col-md-10 form-group m-x-lg">
              <TextField
                ref='link'
                fullWidth
                floatingLabelText="Link of doc"
                errorText={this.state.errLink}
                value={this.state.linkofdoc}
                onChange={(e) => {
                  this.setState({linkofdoc: e.target.value});
                }}
              />
            </div>
            <div className="col-xs-10 m-y-md ">
              <RaisedButton
                label="SUBMIT"
                primary
                className=" pull-right btn-responsive"
                onClick={this.submitDocs} />
            </div>
          </form>
        </div>
      </Paper>
    );
  }
}

export default FormUploadPolicyDocument;
