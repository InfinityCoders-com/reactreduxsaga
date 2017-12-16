import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import SalaryDetails from 'modules/salary/components/userSalary/SalaryDetails';
import SalaryHistory from 'components/salary/userSalary/SalaryHistory';
import PayslipHistory from 'components/salary/userSalary/PayslipHistory';
import * as actions from 'appRedux/actions';
import * as actions_salary from 'appRedux/salary/actions/viewSalary';

class Salary extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.viewSalarySummary = this.viewSalarySummary.bind(this);
    this.state = {
      view_salary_id:  false,
      salary_details:  {},
      holding_amt:     '',
      payslip_history: []
    };
  }
  componentWillMount () {
    this.props.onSalaryDetails();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }

    let s_salary_details = {};
    let s_salary_history = [];
    let s_payslip_history = [];

    if (this.state.view_salary_id === false) {
      if (typeof props.salary.salary_history !== 'undefined' && props.salary.salary_history.length > 0) {
        let viewSalaryInfo = props.salary.salary_history[0];
        s_salary_details = viewSalaryInfo;
        s_salary_history = props.salary.salary_history;
      }
      if (typeof props.salary.payslip_history !== 'undefined' && props.salary.payslip_history.length > 0) {
        s_payslip_history = props.salary.payslip_history;
      }
    }

    this.setState({salary_details: s_salary_details, salary_history: s_salary_history, payslip_history: s_payslip_history});
  }

  viewSalarySummary (id) {
    let new_details = this.state.salary_details;
    _.forEach(this.state.salary_history, (d, k) => {
      if (d.test.id === id) {
        new_details = d;
      }
    });
    this.setState({'salary_details': new_details});
  }
  render () {
    return (
      <div >
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Salary'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="box">
                <div className="box-divider m-a-0"></div>
                <div className="box-body">
                  <div className="row">
                    <div className="col-sm-6 col-xs-12">
                      <h6 className="text-center">Salary Details</h6>
                      <SalaryDetails data={this.state.holding_amt} />
                    </div>
                    <div className="col-sm-3 col-xs-6 salary-border-left">
                      <h6 className="text-center">Salary Revisions</h6>
                      <hr />
                      <SalaryHistory data={this.props.salary.salary_history} viewSalarySummary={this.viewSalarySummary} />
                    </div>
                    <div className="col-sm-3 col-xs-6 salary-border-left">
                          <h6 className="text-center">Previous Payslips</h6>
                      <hr />
                      <PayslipHistory payslip_history={this.state.payslip_history} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Salary.styles = {
  height100per: {
    'minHeight': '150px'
  }
};

function mapStateToProps (state) {
  return {
    frontend:   state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin,
    salary:     state.salary.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onSalaryDetails: () => {
      return dispatch(actions_salary.getSalaryDetails());
    }
  };
};

const VisibleSalary = connect(mapStateToProps, mapDispatchToProps)(Salary);

const RouterVisibleSalary = withRouter(VisibleSalary);

export default RouterVisibleSalary;
