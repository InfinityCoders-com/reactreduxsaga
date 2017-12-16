import React from 'react';
import * as _ from 'lodash';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';
import {ButtonRaised} from 'components/generic/buttons';


class FormAddSalary extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user_id : "",
      applicable_from : null,
      total_salary : '0',
      total_earning: '0',
      total_deduction: '0',
      leave : '0',
      basic : '0',
      hra : '0',
      conveyance : '0',
      medical_allowance : '0',
      special_allowance : '0',
      arrear : "",
      epf : '0',
      loan : '0',
      advance : '0',
      misc_deduction : '0',
      tds : '0',
    }
    this.handleApplicableFrom = this.handleApplicableFrom.bind(this);
    this.handleApplicableTill = this.handleApplicableTill.bind(this);
  }
  handleApplicableFrom(date){
    this.setState({
      applicable_from : date
    });
  }
  handleApplicableTill(date){
    this.setState({
      applicable_till : date
    });
  }

  componentDidUpdate(){
    let e_basic = this.state.basic
    let e_hra = this.state.hra
    let e_conveyance = this.state.conveyance
    let e_medical_allowance = this.state.medical_allowance
    let e_special_allowance = this.state.special_allowance
    let e_arrear = this.state.arrear
    let n_total_earning = +e_basic + +e_hra + +e_conveyance + +e_medical_allowance + +e_special_allowance + +e_arrear

    let e_epf = this.state.epf
    let e_loan = this.state.loan
    let e_advance = this.state.advance
    let e_misc_deduction = this.state.misc_deduction
    let e_tds = this.state.tds
    let n_total_deduction = +e_epf + +e_loan + +e_advance + +e_misc_deduction + +e_tds

    let n_total_salary = n_total_earning - n_total_deduction

    if( n_total_salary != this.state.total_salary
      || n_total_earning != this.state.total_earning
      || n_total_deduction != this.state.total_deduction){
      this.setState({
        total_earning: n_total_earning,
        total_salary : n_total_salary,
        total_deduction: n_total_deduction,
      })
    }
  }

  componentWillReceiveProps(props){
    let applicable_from = null
    let applicable_till = null
    let total_salary = "0"
    let leave = '0'
    let basic = '0'
    let hra = '0'
    let conveyance = '0'
    let medical_allowance = '0'
    let special_allowance = '0'
    let arrear = '0'
    let epf = '0'
    let loan = '0'
    let advance = '0'
    let misc_deduction = '0'
    let tds = '0'

    if( typeof props.user_latest_salary_details.test != 'undefined' ){
      if( typeof props.user_latest_salary_details.test.applicable_from != 'undefined' ){
        //applicable_from = props.user_latest_salary_details.test.applicable_from
      }
      if( typeof props.user_latest_salary_details.test.applicable_till != 'undefined' ){
        //applicable_till = props.user_latest_salary_details.test.applicable_till
      }
      if( typeof props.user_latest_salary_details.test.total_salary != 'undefined' ){
        total_salary = props.user_latest_salary_details.test.total_salary
      }

      if( typeof props.user_latest_salary_details.test.leaves_allocated != 'undefined' ){
        leave = props.user_latest_salary_details.test.leaves_allocated
      }
    }

    if( typeof props.user_latest_salary_details.Basic != 'undefined' ){
      basic = props.user_latest_salary_details.Basic
    }
    if( typeof props.user_latest_salary_details.HRA != 'undefined' ){
      hra = props.user_latest_salary_details.HRA
    }
    if( typeof props.user_latest_salary_details.Conveyance != 'undefined' ){
      conveyance = props.user_latest_salary_details.Conveyance
    }
    if( typeof props.user_latest_salary_details.Medical_Allowance != 'undefined' ){
      medical_allowance = props.user_latest_salary_details.Medical_Allowance
    }
    if( typeof props.user_latest_salary_details.Medical_Allowance != 'undefined' ){
      special_allowance = props.user_latest_salary_details.Special_Allowance
    }
    if( typeof props.user_latest_salary_details.Arrears != 'undefined' ){
      arrear = props.user_latest_salary_details.Arrears
    }
    if( typeof props.user_latest_salary_details.EPF != 'undefined' ){
      epf = props.user_latest_salary_details.EPF
    }
    if( typeof props.user_latest_salary_details.Loan != 'undefined' ){
      loan = props.user_latest_salary_details.Loan
    }
    if( typeof props.user_latest_salary_details.Advance != 'undefined' ){
      advance = props.user_latest_salary_details.Advance
    }
    if( typeof props.user_latest_salary_details.Misc_Deductions != 'undefined' ){
      misc_deduction = props.user_latest_salary_details.Misc_Deductions
    }
    if( typeof props.user_latest_salary_details.TDS != 'undefined' ){
      tds = props.user_latest_salary_details.TDS
    }

    this.setState({
      user_id : props.userid,
      applicable_from : "",
      applicable_till : "",
      total_salary : total_salary,
      leave : leave,
      basic : basic,
      hra : hra,
      conveyance : conveyance,
      medical_allowance : medical_allowance,
      special_allowance : special_allowance,
      arrear : arrear,
      epf : epf,
      loan : loan,
      advance : advance,
      misc_deduction : misc_deduction,
      tds : tds,
    })
  }

  render(){
    let styles = _.cloneDeep(this.constructor.styles);
    let date = this.state.applicable_from;
    return (
      <div className="row no-gutter">
        <div className="row no-gutter">
          <div className="col-xs-6 p-r">
            <div className="form-group">
              <label>Applicable From : {this.state.applicable_from}</label>
              <DateField
                dateFormat="YYYY-MM-DD"
                onChange={this.handleApplicableFrom}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-xs-6 p-r">
            <div className="form-group">
              <label>Applicable Till : {this.state.applicable_till}</label>
              <DateField dateFormat="YYYY-MM-DD" onChange={this.handleApplicableTill} className="form-control"/>
            </div>
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-12 p-r b-b">
            <div className="col-xs-4">
              <label>Total Salary</label>
              <h5>{ this.state.total_earning }</h5>
            </div>

            <div className="col-xs-4">
              <label>Total Deduction</label>
              <h5>{ this.state.total_deduction }</h5>
            </div>

            <div className="col-xs-4">
              <label>Salary in hand</label>
              <h5>{ this.state.total_salary }</h5>
            </div>
          </div>
          <div className="col-xs-12 p-r">
            <div className="form-group">
              <label>Leaves</label>
              <input type="text" className="form-control" ref="leave" onChange={ () => this.setState({ leave : this.refs.leave.value }) } value={ this.state.leave }/>
            </div>
          </div>
        </div>
        <div className="row no-gutter">
          <div className="col-xs-6 p-r">
            <h5 className="text-center">Earnings</h5>
            <div className="form-group">
              <label>Basic</label>
              <input type="text" className="form-control" ref="basic" onChange={ () => this.setState({ basic : this.refs.basic.value }) } value={ this.state.basic }/>
            </div>
            <div className="form-group">
              <label>HRA</label>
              <input type="text" className="form-control" ref="hra" onChange={ () => this.setState({ hra : this.refs.hra.value }) } value={ this.state.hra }/>
            </div>
            <div className="form-group">
              <label>Conveyance</label>
              <input type="text" className="form-control" ref="conveyance" onChange={ () => this.setState({ conveyance : this.refs.conveyance.value }) } value={ this.state.conveyance }/>
            </div>
            <div className="form-group">
              <label>Medical Allowance</label>
              <input type="text" className="form-control" ref="medical_allowance" onChange={ () => this.setState({ medical_allowance : this.refs.medical_allowance.value }) } value={ this.state.medical_allowance }/>
            </div>
            <div className="form-group">
              <label>Special Allowance</label>
              <input type="text" className="form-control" ref="special_allowance" onChange={ () => this.setState({ special_allowance : this.refs.special_allowance.value }) } value={ this.state.special_allowance }/>
            </div>
            <div className="form-group">
              <label>Arrears</label>
              <input type="text" className="form-control" ref="arrear" onChange={ () => this.setState({ arrear : this.refs.arrear.value }) } value={ this.state.arrear }/>
            </div>
          </div>

          <div className="col-xs-6 p-r">
            <h5 className="text-center">Deductions</h5>
              <div className="form-group">
                <label>EPF</label>
                <input type="text" className="form-control" ref="epf" onChange={ () => this.setState({ epf : this.refs.epf.value }) } value={ this.state.epf }/>
              </div>
              <div className="form-group">
                <label>Loan</label>
                <input type="text" className="form-control" ref="loan" onChange={ () => this.setState({ loan : this.refs.loan.value }) } value={ this.state.loan }/>
              </div>
              <div className="form-group">
                <label>Advance</label>
                <input type="text" className="form-control" ref="advance" onChange={ () => this.setState({ advance : this.refs.advance.value }) } value={ this.state.advance }/>
              </div>
              <div className="form-group">
                <label>Misc Deductions</label>
                <input type="text" className="form-control" ref="misc_deduction" onChange={ () => this.setState({ misc_deduction : this.refs.misc_deduction.value }) } value={ this.state.misc_deduction }/>
              </div>
              <div className="form-group">
                <label>TDS</label>
                <input type="text" className="form-control" ref="tds" onChange={ () => this.setState({ tds : this.refs.tds.value }) } value={ this.state.tds }/>
              </div>
          </div>
        </div>

        <div className="row no-gutter">
          <div className="col-xs-12 p-r">
            <ButtonRaised className="col-xs-12 indigo" onClick={ () => this.props.callAddUserSalary( this.state ) } label="Add" />
          </div>
        </div>
      </div>
    )
  }
}

FormAddSalary.styles = {
  leaveDiv: {
    'marginBottom' : '10px'
  }
};


export default FormAddSalary
