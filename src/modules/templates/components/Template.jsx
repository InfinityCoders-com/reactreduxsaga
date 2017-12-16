import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import RichTextEditor from 'react-rte';
import update from 'react/lib/update';
import Paper from 'material-ui/Paper';
import {CONFIG} from 'src/config/index';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import {confirm} from 'src/services/notify';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Delete from 'material-ui/svg-icons/action/delete';
import LoadingIcon from 'components/generic/LoadingIcon';
import EditableDiv from 'components/editor/EditableDiv';
import FilterLabel from 'components/template/FilterLabel';
import {getToken} from 'src/services/generic';
var FormData = require('form-data');
var moment = require('moment');

class Variables extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      usersList:            [],
      openDialog:           false,
      templateId:           '',
      templateName:         '',
      templateSubject:      '',
      templateBody:         RichTextEditor.createEmptyValue(),
      errName:              '',
      errSubject:           '',
      pValue:               [],
      openSendMailDialog:   false,
      recipient:            [],
      cc:                   [],
      bcc:                  [],
      recipientType:        'Recipient',
      openVarDialog:        false,
      openPreview:          false,
      sentMail:             {},
      recipientEmailId:     '',
      recipientNotFound:    false,
      emailValidationError: '',
      upload_file:          [],
      uploadedPDF:          [],
      LinearProgressBar:    [],
      header:               ''
    };

    this.openCreateTemplate = this.openCreateTemplate.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleCloseDialog1 = this.handleCloseDialog1.bind(this);
    this.saveTemplate = this.saveTemplate.bind(this);
    this.editTemplate = this.editTemplate.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
    this.forwardTemplate = this.forwardTemplate.bind(this);
    this.onClickLabel = this.onClickLabel.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.sendMail = this.sendMail.bind(this);
    this.applyVariables = this.applyVariables.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setVariable = this.setVariable.bind(this);
    this.openMailPreview = this.openMailPreview.bind(this);
    this.closeMailPreview = this.closeMailPreview.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
    this.hideError = this.hideError.bind(this);
    this.download_mail_preview = this.download_mail_preview.bind(this);
    this.uploadPDF = this.uploadPDF.bind(this);
    this.deleteAttachment = this.deleteAttachment.bind(this);
    this.variables = [];
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    if (!props.loggedUser.isLoggedIn) {
      this.props.router.push('/logout');
    } else {
      if (props.loggedUser.data.role == CONFIG.ADMIN || props.loggedUser.data.role == CONFIG.HR) {
      } else {
        this.props.router.push('/home');
      }
    }
    this.setState({usersList: props.employee.employee});
  }

  saveTemplate () {
    let t_id = this.state.templateId.trim(),
      t_name = this.state.templateName.trim(),
      t_subject = this.state.templateSubject.trim(),
      t_body = this.state.templateBody.toString('html'),
      errName = '',
      errSubject = '';
    if (_.isEmpty(t_name)) {
      errName = 'Name empty';
    }
    if (_.isEmpty(t_subject)) {
      errSubject = 'Subject empty';
    }
    this.setState({errName: errName, errSubject: errSubject});
    if (!_.isEmpty(t_name) && !_.isEmpty(t_subject) && !_.isEmpty(t_body)) {
      this.props.onSaveTemplate(t_id, t_name, t_subject, t_body).then((succ) => {
        this.showError('mailsentsuccessfully', succ);
        this.handleCloseDialog();
      }).catch((err) => {
        this.showError('previewalert', err);
      });
    }
  }
  editTemplate (tmp) {
    this.setState({
      openDialog:      true,
      templateId:      tmp.id,
      templateName:    tmp.name,
      templateSubject: tmp.subject,
      templateBody:    RichTextEditor.createValueFromString(tmp.body, 'html')
    });
  }
  deleteTemplate (tmp) {
    confirm('Are you sure ?', 'Do you want to delete this template', 'warning').then((res) => {
      if (res) {
        this.props.onDeleteTemplate(tmp.id).then(() => {
        }).catch((err) => {
          this.showError('previewalert', err);
        });
      }
    });
  }

  replaceVariablesWithValue (templ, str, value) {
    if (value !== undefined) {
      if (value.indexOf('<p>') > -1) {
        let no_lines = value.split('\n').length;
        if (no_lines > 1) {
          value = value.replace(/<p/img, '<div');
          value = value.replace(/<\/p/img, '</div');
        } else {
          value = value.replace(/(<p[^>]+?>|<p>|<\/p>)/img, '');
        }
      }
      var index = templ.body.indexOf(str);
      var i;
      for (i = 0; i <= 20; i++) {
        if (templ.body.indexOf(str) === -1) {
          break;
        }
        templ.body = _.replace(templ.body, str, value);
      }
      templ.name = _.replace(templ.name, str, value);
      templ.subject = _.replace(templ.subject, str, value);
    }
    return templ;
  }
  applyVariables (templateId) {
    let templ = '', recipient = '';
    _.map(this.props.templates.templates, (tmp, i) => {
      if (tmp.id === templateId) {
        templ = _.clone(tmp);
      }
    });

    if (this.state.recipient.length > 0) {
      let id = this.state.recipient[0].user_Id;
      recipient = _.find(this.state.usersList, function (o) { return o.user_Id == id; });
    }

    let format = 'DD-MM-YYYY';
    let string = templ.name.concat(' ', templ.subject, ' ', templ.body);
    let regx = /#[\w\/|-]*/g;
    let variables = string.match(regx);
    if (variables !== null && variables.length > 0) {
      variables = _.uniq(variables);
      variables.map((str, i) => {
        let dateVariable = false;
        if (str.indexOf('|') !== -1) {
          dateVariable = str;
          let res = str.split('|');
          str = res[0];
          format = res[1];
        }

        let variable = _.find(this.props.templates.variable, function (o) { return o.name == str; });

        if (typeof variable !== 'undefined' && variable.name === str) {
          if (variable.variable_type === 'user' || variable.name === '#logo') {
            templ = this.replaceVariablesWithValue(templ, str, variable.value);
          }

          if (_.includes(variable.name, '#date')) {
            let value = new Date();
            value = moment(value).format(format);
            if (dateVariable === false) {
              templ = this.replaceVariablesWithValue(templ, str, value);
            } else {
              templ = this.replaceVariablesWithValue(templ, dateVariable, value);
            }
          }
          if (variable.variable_type === 'system' && !_.isEmpty(recipient) && !_.includes(variable.name, '#date')) {
            let value;
            if (variable.name === '#joining_date') {
              value = recipient.dateofjoining;
              value = moment(value).format(format);
            } else if (variable.name === '#employee_title') {
              value = recipient.jobtitle;
            } else if (variable.name === '#employee_name') {
              value = recipient.name;
            } else if (variable.name === '#salary') {
              value = recipient.salary_detail;
              value = value.toString();
            } else if (variable.name === '#employee_user_name') {
              value = recipient.username;
            } else if (variable.name === '#employee_email_id') {
              value = recipient.work_email;
            } else if (variable.name === '#page_break') {
              value = "<div style='page-break-after:always;'></div>";
            } else if (variable.name === '#employee_user_id') {
              value = recipient.user_Id;
            } else if (variable.name === '#employee_number') {
              value = recipient.emergency_ph1;
            } else if (variable.name === '#training_completion_date') {
              var mydate = new Date(recipient.training_completion_date);
              if (mydate !== 'Invalid Date') {
                value = moment(mydate).format(format);
              } else {
                value = '#training_completion_date';
              }
            } else if (variable.name == '#termination_date') {
              mydate = new Date(recipient.termination_date);
              if (mydate != 'Invalid Date') {
                value = moment(mydate).format(format);
              } else {
                value = '#termination_date';
              }
            }
            if (dateVariable === false) {
              templ = this.replaceVariablesWithValue(templ, str, value);
            } else {
              templ = this.replaceVariablesWithValue(templ, dateVariable, value);
            }
          }
        }
      });
    }

    this.setState({
      templateName:    templ.name,
      templateSubject: templ.subject,
      templateBody:    RichTextEditor.createValueFromString(templ.body, 'html')
    });
  }
  forwardTemplate (tmp) {
    this.setState({
      openSendMailDialog: true,
      templateId:         tmp.id,
      templateName:       tmp.name,
      templateSubject:    tmp.subject,
      templateBody:       RichTextEditor.createValueFromString(tmp.body, 'html'),
      uploadedPDF:        [],
      upload_file:        []
    });
    this.applyVariables(tmp.id);
  }
  openCreateTemplate () {
    this.setState({openDialog: true});
  }
  handleCloseDialog () {
    this.setState({
      openDialog:         false,
      templateId:         '',
      templateName:       '',
      templateSubject:    '',
      templateBody:       RichTextEditor.createEmptyValue(),
      errName:            '',
      errSubject:         '',
      openSendMailDialog: false,
      recipient:          []
    });
  }
  handleCloseDialog1 () {
    this.setState({
      openDialog:         false,
      templateId:         '',
      templateName:       '',
      templateSubject:    '',
      templateBody:       RichTextEditor.createEmptyValue(),
      errName:            '',
      errSubject:         '',
      openSendMailDialog: false,
      recipient:          [],
      uploadedPDF:        []
    });
  }
  toggleDialog (back, front) {
    $('#' + back).toggle();
    $('#' + front).toggle();
  }
  filterList (searchText) {
    let usersList = this.props.employee.employee, // this.props.usersList.users,
      list = [];
    usersList.map((user) => {
      if (user.name.toLowerCase().indexOf(searchText) !== -1) {
        list.push(user);
      }
    });
    this.setState({usersList: list});
  }
  selectUser (data, status, recipientType = this.state.recipientType) {
    if (recipientType === 'Recipient') {
      let recipient = this.state.recipient;
        // status ? recipient.push(data) : _.pullAllBy(recipient, [data], 'user_Id');
      status ? recipient[0] = data : _.pullAllBy(recipient, [data], 'email');
      this.setState({recipient: recipient});
      this.applyVariables(this.state.templateId);
    } else if (recipientType === 'CC') {
      let recipient = this.state.cc;
      status ? recipient.push(data) : _.pullAllBy(recipient, [data], 'user_Id');
      this.setState({cc: recipient});
    } else if (recipientType === 'BCC') {
      let recipient = this.state.bcc;
      status ? recipient.push(data) : _.pullAllBy(recipient, [data], 'user_Id');
      this.setState({bcc: recipient});
    }
  }

  submitEmail (email) {
    var pattern = /^\w[a-zA-Z_.1-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    email = email.trim();
    if (_.isEmpty(email)) {
      this.setState({emailValidationError: 'Empty field'});
    } else if (!email.match(pattern)) {
      this.setState({emailValidationError: 'Not a valid email'});
    } else {
      this.setState({emailValidationError: '', recipientEmailId: ''});
      this.selectUser({user_Id: '#', name: email, email: email}, true, this.state.recipientType);
    }
  }

  onClickLabel (label, indexLabel, recipientType) {
    this.selectUser(label, false, recipientType);
  }
  download_mail_preview (e) {
    let currentTimeStamp = moment().unix();
    let fileName = 'mail-preview';
    this.props.onDownloadPdf($('#dialogContent').html(), fileName).then((succ) => {
      var link = document.createElement('a');
      link.href = CONFIG.pdf_url + succ.message + '?' + currentTimeStamp;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
    }).catch((err) => { });
  }
    // ------editors
  handleContentChange (value) {
    this.setState({templateBody: value});
  }
  closeMailPreview () {
    this.setState({openPreview: false, sentMail: {}});
  }
  showError (id, errorMsg) {
    $('#' + id + ' span').remove();
    $('#' + id).fadeIn().append('<span>' + errorMsg + '<span>');
  }
  hideError (e, id) {
    e.preventDefault();
    $('#' + id).fadeOut(0);
    $('#' + id + ' span').remove();
  }
  openMailPreview () {
    let recipient = this.state.recipient,
      templateName = this.state.templateName.trim(),
      templateSubject = this.state.templateSubject.trim(),
      templateBody = this.state.templateBody.toString('html'),
      state = true,
      error = '';
    if (recipient.length === 0) {
      state = false;
      error = 'Please select a recipient';
    }
    if (state && _.isEmpty(templateName) || _.isEmpty(templateSubject) || _.isEmpty(templateBody)) {
      state = false;
      error = 'Please select a template';
    }
    if (state) {
      let string = templateName.concat(' ', templateSubject, ' ', templateBody);
            // let regx = /#[\w\/|-]*/g;
      let regx = /#[\w-]+\|[\w -\.,@$%&*!%^\\\/]+\||#[\w-]+/ig;
      let result = string.match(regx);
      let pendingVariables = [];
      if (result !== null && result.length > 0) {
        state = false;
        error = "Please put all variable's value";
        result = _.uniq(result);
        result.map((str) => {
          let start_pos = str.indexOf('|') + 1;
          let end_pos = str.indexOf('|', start_pos);
          let defaultValue = str.substring(start_pos, end_pos);
          pendingVariables.push({name: str, value: defaultValue});
        });
        this.setState({pValue: pendingVariables, openVarDialog: true});
      }
    }
    if (state) {
      let cc_detail = _.map(this.state.cc, (cc) => {
        return [cc.email, cc.name];
      });
      let bcc_detail = _.map(this.state.bcc, (bcc) => {
        return [bcc.email, bcc.name];
      });
      let email = [{
        email_id:   recipient[0].email,
        name:       recipient[0].name,
        subject:    templateSubject,
        body:       templateBody,
        cc_detail:  cc_detail,
        bcc_detail: bcc_detail
      }];
      this.setState({openPreview: true, sentMail: {status: state, email: email}});
    } else {
      this.showError('previewalert', error);
    }
  }

  sendMail () {
    this.closeMailPreview();
    let sentMail = this.state.sentMail;
    let files = this.state.upload_file;
    sentMail.email[0].upload_file = files;
    if (sentMail.status) {
      this.props.onSendMail(sentMail.email).then(() => {
        this.handleCloseDialog();
        this.showError('mailsentsuccessfully', 'Mail sent successfully.');
      }).catch(() => {
        this.showError('previewalert', 'Mail not sent. try again');
      });
    }
  }
  handleClose () {
    this.setState({openVarDialog: false, pValue: _.remove(this.state.pValue)});
  }
  setVariable () {
    let pValue = this.state.pValue,
      template = {
        name:    this.state.templateName.trim(),
        subject: this.state.templateSubject.trim(),
        body:    this.state.templateBody.toString('html')
      };

    _.map(pValue, (variable, i) => {
      if (typeof variable.value !== 'undefined') {
        template = this.replaceVariablesWithValue(template, variable.name, variable.value);
      }
    });

    this.setState({
      templateName:    template.name,
      templateSubject: template.subject,
      templateBody:    RichTextEditor.createValueFromString(template.body, 'html'),
      pValue:          null
    }, () => {
      this.handleClose();
      this.openMailPreview();
    });
  }
  uploadPDF (e) {
    let self = this;
    var file_data = $('#file_image').prop('files');
    var form_data = new FormData();
    var LinearProgressBar = [];
    form_data.append('token', getToken());
    for (var i in file_data) {
      form_data.append(i.toString(), file_data[i]);
    }
    for (i = 0; i < file_data['length']; i++) {
      LinearProgressBar.push(
        <div key={i} className="row uploaded-pdf-block-style">
          <div className="col-xs-7">{file_data[i].name}</div>
          <div className="col-xs-5"><LinearProgress mode="indeterminate" /></div>
        </div>);
    }
    self.setState({LinearProgressBar: LinearProgressBar});

    $.ajax({
      url:         CONFIG.upload_email_attachment,
      contentType: false,
      processData: false,
      data:        form_data,
      type:        'post',
      success:     function (data) {
        let obj = JSON.parse(data);
        let uploadedPDF = self.state.uploadedPDF;
        let upload_file_path = self.state.upload_file;
        let preKey = uploadedPDF.length;
        if (obj.error === 0) {
          let data = obj.data;
          _.map(data, (file, key) => {
            uploadedPDF.push(file.name);
            upload_file_path.push(file.path);
          });
        }
        self.setState({
          uploadedPDF:       uploadedPDF,
          upload_file:       upload_file_path,
          LinearProgressBar: []
        });
      },
      error: function (error) { }
    });
  }
  deleteAttachment (filekey) {
    let uploadedPDF = this.state.uploadedPDF;
    let newuploadedPDF = [];
    let upload_file_path = this.state.upload_file;
    let newupload_file_path = [];
    _.map(uploadedPDF, (file, k) => {
      if (filekey != k) {
        newuploadedPDF.push(uploadedPDF[k]);
        newupload_file_path.push(upload_file_path[k]);
      }
    });
    this.setState({uploadedPDF: newuploadedPDF, upload_file: newupload_file_path});
  }
  render () {
    let fileList = [];
    _.map(this.state.uploadedPDF, (name, key) => {
      fileList.push(<div key={key}>{name}<i onClick={() => this.deleteAttachment(key)} className="fa fa-remove uploaded-pdf-block-style cross-button-style"></i></div>);
    });
    const actionsCreateTemplate = [
      <FlatButton label="Close" className="m-r-5" primary onTouchTap={this.handleCloseDialog} />,
      <RaisedButton label={_.isEmpty(this.state.templateId) ? 'SAVE' : 'Update'} primary onClick={this.saveTemplate} />
    ];
    const actionsSendMail = [
      <FlatButton label="Close" primary onTouchTap={this.handleCloseDialog} />,
      <RaisedButton label={'Preview'} primary onClick={this.openMailPreview} />
    ];

        // ------------------------------------
    let listChartItems = [],
      recipientType = this.state.recipientType, // $('input[name="recipientType"]:checked').val(),
      recipient = [];
    if (recipientType === 'Recipient') {
      recipient = this.state.recipient;
    } else if (recipientType === 'CC') {
      recipient = this.state.cc;
    } else if (recipientType === 'BCC') {
      recipient = this.state.bcc;
    }

    _.map(this.state.usersList, (user, i) => {
      let check = false;
      if (_.filter(recipient, _.matches({user_Id: user.user_Id})).length > 0) {
        check = true;
      }
      listChartItems.push(
        <li className="mb-sm b-b p-t p-b" key={i}>
          <div className="form-group">
            <input type="checkbox" id="user" className="check" checked={check} onChange={(e) => this.selectUser({user_Id: user.user_Id, name: user.name, email: user.work_email}, e.target.checked)} />
            {user.name}
          </div>
        </li>);
    });
        // -----------------pending Variables
    let pendingVar = [];
    _.map(this.state.pValue, (variable, i) => {
      pendingVar.push(
        <div className="form-group" key={i}>
          <label>Enter value for {variable.name} :</label>
          <input type="text" className="form-control" onChange={(e) => { variable.value = e.target.value; this.setState({pValue: this.state.pValue}); }} value={variable.value} />
        </div>);
    });
    return (
      <div className="app-body" id="view" style={{'marginTop': 10}}>
        <div className="col-xs-12 col-sm-12" style={{'float': 'right'}}>
          <Dialog
            title={_.isEmpty(this.state.templateId) ? 'Create Template' : 'Edit Template'}
            actions={actionsCreateTemplate}
            modal={false}
            bodyStyle={{minHeight: '70vh'}}
            contentStyle={{maxWidth: '90%', width: '90%', transform: 'translate(0px, 0px)'}}
            open={this.state.openDialog}
            onRequestClose={this.handleCloseDialog}
            autoDetectWindowHeight
            autoScrollBodyContent>
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <LoadingIcon {...this.props} />
              </div>
            </div>
            <div className="col-md-9 border-right-style" >
              <form className="form-inline">
                <div className="form-group form-input-style">
                  <TextField
                    ref='value'
                    floatingLabelText="Name"
                    floatingLabelFixed
                    hintText="Template Name"
                    fullWidth
                    errorText={this.state.errName}
                    value={this.state.templateName}
                    onChange={(e) => this.setState({templateName: e.target.value})}
                  />
                </div>
                <div className="form-group form-input-style">
                  <TextField
                    ref='Name'
                    floatingLabelText="Subject"
                    floatingLabelFixed
                    hintText="Subject"
                    fullWidth
                    errorText={this.state.errSubject}
                    value={this.state.templateSubject}
                    onChange={(e) => this.setState({templateSubject: e.target.value})}
                  />
                </div>
                <div className="form-group form-input-style">
                  <RichTextEditor className="editor-style" value={this.state.templateBody} onChange={this.handleContentChange} />
                </div>
              </form>
            </div>
            <div className="col-md-3">
              <h5>System Variables</h5>
              <Divider />
              {_.map(this.props.templates.variable, (vari) => {
                if (vari.variable_type === 'system') {
                  return (<div key={vari.id}><span className="select-variable">{vari.name}</span><Divider /></div>);
                }
              })}
              <h5 >User Variables</h5>
              <Divider />
              {_.map(this.props.templates.variable, (vari) => {
                if (vari.variable_type == 'user') {
                  return (<div key={vari.id}><span className="select-variable">{vari.name}</span><Divider /></div>);
                }
              })}
            </div>
          </Dialog>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className='row'>
                <div className='col-md-12 col-sm-12 col-xs-12 m-t-xs'>
                  <button className="md-btn md-raised m-b-sm indigo" onClick={this.openCreateTemplate}>Create New Template</button>
                </div>
                <div className='col-md-12 col-xs-12 col-sm-12' style={{paddingTop: '10px', paddingRight: '0px', textAlign: 'center'}}>
                  <div id="mailsentsuccessfully" className="alert alert-success pull-left error-alert-style">
                    <a href="#" className="close" onClick={(e) => this.hideError(e, 'mailsentsuccessfully')} aria-label="close">&times;</a>
                  </div>
                </div>
                <div className={this.state.paper} style={{'marginTop': '8%'}}>
                  {_.map(this.props.templates.templates, (tmp, i) => (
                    <div className="col-md-6 col-sm-6 col-xs-12 body-space" key={i}>
                      <Paper zDepth={0} className="paper scroll" >
                        <div className="delete-style">
                          <span className="pull-right" style={{fontSize: '13px', fontStyle: 'italic', color: '#000', cursor: 'pointer', padding: '5px 10px'}} onClick={() => this.toggleDialog(tmp.id + '_menuBack', tmp.id + '_menu')}><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                          <div id={tmp.id + '_menuBack'} className="dropdown-backdrop-custom" style={{'display': 'none', 'opacity': 0.5}} onClick={() => this.toggleDialog(tmp.id + '_menuBack', tmp.id + '_menu')}></div>
                          <div id={tmp.id + '_menu'} className="menuOptions" onClick={() => this.toggleDialog(tmp.id + '_menuBack', tmp.id + '_menu')}>
                            <span className="b-b" onClick={() => this.forwardTemplate(tmp)} ><i className="fa fa-share tempalate-btn forward-mail" aria-hidden="true" title="forword"></i>Forward Mail</span>
                            <span className="b-b" onClick={() => this.editTemplate(tmp)} ><i className="fa fa-pencil-square-o tempalate-btn edit" aria-hidden="true" title="Edit"></i>Edit Template</span>
                            <span className="b-b" onClick={() => this.deleteTemplate(tmp)} ><i className="fa fa-trash tempalate-btn delete" aria-hidden="true" title="Delete"></i>Delete Template</span>
                          </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 m-b">
                          <span className="flex-style"><b>Name:</b><div className="p-l" dangerouslySetInnerHTML={{__html: tmp.name}}></div></span>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 m-b">
                          <span className="flex-style"><b>Subject: </b><div className="p-l" dangerouslySetInnerHTML={{__html: tmp.subject}}></div></span>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 m-b">
                          <span className="flex-style"><b>Body: </b><div className="p-l" dangerouslySetInnerHTML={{__html: tmp.body}}></div></span>
                        </div>
                      </Paper>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Dialog
            title={'Send Mail'}
            actions={actionsSendMail}
            modal={false}
            bodyClassName="template-dialog-style"
            contentClassName="dialog-content-style"
            open={this.state.openSendMailDialog}
            onRequestClose={this.handleCloseDialog}
            autoDetectWindowHeight
            autoScrollBodyContent
            >
            <Dialog
              title={'Enter values'}
              actions={[ <FlatButton label="Close" primary onTouchTap={this.handleClose} style={{marginRight: 5}} />,
                <RaisedButton label={'Set Variables'} primary onClick={this.setVariable} />]}
              modal={false}
              bodyClassName="template-dialog-style"
              contentClassName="nextdialog-content-style"
              open={this.state.openVarDialog}
              onRequestClose={this.handleClose}
              autoDetectWindowHeight
              autoScrollBodyContent
            >
              <div> <div className="col-sx-12"></div>{pendingVar} </div>
            </Dialog>
            <Dialog
              title={'Mail Preview'}
              titleClassName="templates-dialog-title"
              actions={[<FlatButton label="Cancel" primary onTouchTap={this.closeMailPreview} style={{marginRight: 5}} />,
                <RaisedButton label={'Continue'} primary onClick={this.sendMail} />,
                <FlatButton label={'Download Preview'} primary style={{'float': 'left'}} onClick={(e) => { this.download_mail_preview(e); }} />]}
              modal={false}
              bodyClassName="template-dialog-style"
              contentClassName="nextdialog-content-style"
              open={this.state.openPreview}
              onRequestClose={this.closeMailPreview}
              autoDetectWindowHeight
              autoScrollBodyContent
              >
              <div className="row">
                <div className="col-md-12"><LoadingIcon {...this.props} /></div>
              </div>
              <div id="dialogContent" className="template-dialog-content-style">
                <div className="p-t p-b template-send-email" dangerouslySetInnerHTML={{__html: this.state.sentMail && this.state.sentMail.email && this.state.sentMail.email[0].subject}}></div>
                <div className="p-t p-b" dangerouslySetInnerHTML={{__html: this.state.sentMail && this.state.sentMail.email && this.state.sentMail.email[0].body}}></div>
              </div>
            </Dialog>
            <div className="col-md-9 b-r-gainsboro">
              <form className="form-inline">
                <span className="pull-right add-recipient-style" onClick={() => this.toggleDialog('FilterBack', 'Filter')}>Add recipient</span>
                <div className="dropdown">
                  <div id={'FilterBack'} className="dropdown-backdrop-custom filter-back-style" onClick={() => this.toggleDialog('FilterBack', 'Filter')}></div>
                  <div id={'Filter'} className="dropdown-menu has-child has-arrow selectUser mail-recipient">
                    <ul className="list-unstyled pt-xs">
                      <li className="mb-sm b-b p-t p-b">
                        <div className="form-group form-group-full-width" >
                          <input type="checkbox" id="notListed" className="not-listed" checked={this.state.recipientNotFound} onChange={(e) => this.setState({recipientNotFound: e.target.checked})} /> Recipient Not Listed
                        </div>
                      </li>
                      <li className="mb-sm b-b p-t p-b">
                        <div className="form-group form-group-p-0-w-4" >
                          <input type="radio" id="recipient" className="recipient" name="recipientType" checked={recipientType == 'Recipient'} value="Recipient" onChange={(e) => { this.setState({recipientType: e.target.value}); }} /> Recipient
                        </div>
                        <div className="form-group" style={{width: '30%', paddingLeft: '0px'}} >
                          <input type="radio" id="cc" className="cc" name="recipientType" checked={recipientType == 'CC'} value="CC" onChange={(e) => { this.setState({recipientType: e.target.value}); }} /> CC
                        </div>
                        <div className="form-group" style={{width: '30%', paddingLeft: '0px'}}>
                          <input type="radio" id="bcc" className="bcc" name="recipientType" checked={recipientType == 'BCC'} value="BCC" onChange={(e) => { this.setState({recipientType: e.target.value}); }} /> BCC
                        </div>
                      </li>
                      {this.state.recipientNotFound
                        ? <li className="mb-sm b-b p-t p-b">
                          <div className="form-group" style={{width: '100%'}}>
                            <label>Enter Email Id:</label>
                            <input type="text" style={{width: '100%'}} className="form-control" placeholder="enter email..." onChange={(e) => this.setState({recipientEmailId: e.target.value})} value={this.state.recipientEmailId} />
                            <span style={{color: '#FF0000', padding: '5px', display: 'block'}}>{this.state.emailValidationError}</span>
                            <button type="button" className="btn m-t btn-primary btn-block" onClick={() => this.submitEmail(this.state.recipientEmailId)}>Submit</button>
                          </div>
                        </li>
                      : <span>
                          <li className="mb-sm b-b p-t p-b">
                            <div className="form-group">
                              <input type="text"
                                name="search"
                                className="form-control select-all search-box"
                                placeholder="search"
                                onKeyUp={(e) => this.filterList(e.target.value)} />
                            </div>
                          </li>
                          {listChartItems}
                        </span>
                      }
                    </ul>
                  </div>
                </div>
                <div id="previewalert" className="alert alert-danger pull-left error-alert-style">
                  <a href="#" className="close" onClick={(e) => this.hideError(e, 'previewalert')} aria-label="close">&times;</a>
                </div>
                <div className="form-group selected-recipient form-input-style">
                  <div className="pull-left to">To</div>
                  <div className="pull-left filter-tags" style={{fontSize: '12px'}}>
                    {this.state.recipient.length > 0 ? <FilterLabel data={this.state.recipient} onClick={(label, indexLabel) => this.onClickLabel(label, indexLabel, 'Recipient')} onClear={this.onclearFilter} /> : ''}
                  </div>
                </div>
                {this.state.cc.length > 0
                  ? <div className="form-group selected-recipient form-input-style">
                    <div className="pull-left to">CC</div>
                    <div className="pull-left filter-tags" style={{fontSize: '12px'}}>
                      <FilterLabel data={this.state.cc} onClick={(label, indexLabel) => this.onClickLabel(label, indexLabel, 'CC')} onClear={this.onclearFilter} />
                    </div>
                  </div>
                 : ''}
                {this.state.bcc.length > 0
                  ? <div className="form-group selected-recipient form-input-style">
                    <div className="pull-left to">BCC</div>
                    <div className="pull-left filter-tags" style={{fontSize: '12px'}}>
                      <FilterLabel data={this.state.bcc} onClick={(label, indexLabel) => this.onClickLabel(label, indexLabel, 'BCC')} onClear={this.onclearFilter} />
                    </div>
                  </div>
                : ''}
                <div className="form-group form-input-style">
                  <TextField
                    ref='value'
                    floatingLabelText="Name"
                    floatingLabelFixed
                    hintText="Template Name"
                    fullWidth
                    disabled
                    errorText={this.state.errName}
                    value={this.state.templateName}
                    onChange={(e) => this.setState({templateName: e.target.value})}
                  />
                </div>
                <div className="form-group form-input-style">
                  <TextField
                    ref='Name'
                    floatingLabelText="Subject"
                    floatingLabelFixed
                    hintText="Subject"
                    fullWidth
                    errorText={this.state.errSubject}
                    value={this.state.templateSubject}
                    onChange={(e) => this.setState({templateSubject: e.target.value})}
                  />
                </div>
                <div className="form-group form-input-style">
                  <RichTextEditor
                    id={'editor'}
                    className="editor-style"
                    value={this.state.templateBody}
                    onChange={this.handleContentChange}
                    readOnly
                  />
                </div>
              </form>
              <div className="row">
                <div className="col-md-2">{this.state.LinearProgressBar} {fileList}</div>
              </div>
              <form action={''} method="POST" encType="multipart/form-data">
                <div className="form-group">
                  <button className="btn btn-blue upload-button-style" >
                    <i className="fa fa-file-pdf-o" style={{'marginRight': '5px', 'cursor': 'pointer'}}></i>
                    <input multiple id="file_image" type="file" name="image[]" ref="file" className="form-control" onChange={(e) => this.uploadPDF(e)} /> Attachment
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-3">
              <h5 style={{textAlign: 'center', color: '#000'}}>System Variables</h5>
              <Divider />
              {_.map(this.props.templates.variable, (vari) => {
                if (vari.variable_type === 'system') {
                  return (<div key={vari.id}><span className="select-variable">{vari.name}</span><Divider /></div>);
                }
              })}
              <h5 style={{textAlign: 'center', color: '#000'}}>User Variables</h5>
              <Divider />
              {_.map(this.props.templates.variable, (vari) => {
                if (vari.variable_type == 'user') {
                  return (<div key={vari.id}><span className="select-variable">{vari.name}</span><Divider /></div>);
                }
              })}
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default Variables;
