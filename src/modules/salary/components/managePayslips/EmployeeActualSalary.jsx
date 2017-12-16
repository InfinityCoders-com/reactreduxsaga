import React from 'react';

class EmployeeActualSalary extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      basic: '',
      epf: '',
      hra: '',
      loan: '',
      conveyance: '',
      advance: '',
      medical_allowance: '',
      misc_deduction: '',
      special_allowance: '',
      tds: '',
      arrear: '',
      bonus: '',
      total_earning: '',
      total_deduction: '',
      net_salary: ''
    };
  }

  componentWillReceiveProps (props) {
    let basic = 0;
    let epf = 0;
    let hra = 0;
    let loan = 0;
    let conveyance = 0;
    let advance = 0;
    let medical_allowance = 0;
    let misc_deduction = 0;
    let special_allowance = 0;
    let tds = 0;
    let arrear = 0;
    let bonus = 0;
    let total_earning = 0;
    let total_deduction = 0;
    let net_salary = 0;

    let SalaryDetails = props.employee_actual_salary;

    if (typeof SalaryDetails.Basic !== 'undefined') {
      basic = SalaryDetails.Basic;
    }
    if (typeof SalaryDetails.EPF !== 'undefined') {
      epf = SalaryDetails.EPF;
    }
    if (typeof SalaryDetails.HRA !== 'undefined') {
      hra = SalaryDetails.HRA;
    }
    if (typeof SalaryDetails.Loan !== 'undefined') {
      loan = SalaryDetails.Loan;
    }
    if (typeof SalaryDetails.Conveyance !== 'undefined') {
      conveyance = SalaryDetails.Conveyance;
    }
    if (typeof SalaryDetails.Advance !== 'undefined') {
      advance = SalaryDetails.Advance;
    }
    if (typeof SalaryDetails.Medical_Allowance !== 'undefined') {
      medical_allowance = SalaryDetails.Medical_Allowance;
    }
    if (typeof SalaryDetails.Misc_Deductions !== 'undefined') {
      misc_deduction = SalaryDetails.Misc_Deductions;
    }
    if (typeof SalaryDetails.Special_Allowance !== 'undefined') {
      special_allowance = SalaryDetails.Special_Allowance;
    }
    if (typeof SalaryDetails.TDS !== 'undefined') {
      tds = SalaryDetails.TDS;
    }
    if (typeof SalaryDetails.Arrears !== 'undefined') {
      arrear = SalaryDetails.Arrears;
    }
    if (typeof SalaryDetails.total_earning !== 'undefined') {
      total_earning = SalaryDetails.total_earning;
    }
    if (typeof SalaryDetails.total_deduction !== 'undefined') {
      total_deduction = SalaryDetails.total_deduction;
    }
    if (typeof SalaryDetails.net_salary !== 'undefined') {
      net_salary = SalaryDetails.net_salary;
    }

    this.setState({
      basic: basic,
      epf: epf,
      hra: hra,
      loan: loan,
      conveyance: conveyance,
      advance: advance,
      medical_allowance: medical_allowance,
      misc_deduction: misc_deduction,
      special_allowance: special_allowance,
      tds: tds,
      arrear: arrear,
      bonus: bonus,
      total_earning: total_earning,
      total_deduction: total_deduction,
      net_salary: net_salary
    });
  }
  render () {
    return (
      <div>
        <div className="box-body">
          <table className="table">
            <tbody>
              <tr>
                <td className="text-center"><b><u>Earnings</u></b></td>
                <td></td>
                <td className="text-center"><b><u>Deductions</u></b></td>
                <td></td>
              </tr>
              <tr>
                <td>Basic</td>
                <td>{this.state.basic}</td>
                <td>EPF</td>
                <td>{this.state.epf}</td>
              </tr>
              <tr>
                <td>HRA</td>
                <td>{this.state.hra}</td>
                <td>Loan</td>
                <td>{this.state.loan}</td>
              </tr>
              <tr>
                <td>Conveyance</td>
                <td>{this.state.conveyance}</td>
                <td>Advance</td>
                <td>{this.state.advance}</td>
              </tr>
              <tr>
                <td>Medical Allowance</td>
                <td>{this.state.medical_allowance}</td>
                <td>Misc Deductions</td>
                <td>
                  {this.state.misc_deduction}
                </td>
              </tr>
              <tr>
                <td>Special Allowance</td>
                <td>{this.state.special_allowance}</td>
                <td>TDS</td>
                <td>{this.state.tds}</td>
              </tr>
              <tr>
                <td>Arrears</td>
                <td>{this.state.arrear}</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Bonus</td>
                <td>
                {this.state.bonus}
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td><h5>Total Earnings</h5></td>
                <td><h5>{this.state.total_earning}</h5></td>
                <td><h5>Total Deductions</h5></td>
                <td>{this.state.total_deduction}</td>
              </tr>
              <tr>
                <td><h3>Net Salary</h3></td>
                <td><h3>{this.state.net_salary}</h3></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EmployeeActualSalary;
