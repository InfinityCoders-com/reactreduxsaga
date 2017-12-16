import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {notify} from 'src/services/notify';
import * as actions from 'appRedux/actions';
import Menu from 'components/generic/Menu';
import Header from 'components/generic/Header';
import {isNotUserValid} from 'src/services/generic';
import HolidaysList from 'components/holidays/HolidaysList';

class Holidays extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
  }
  componentWillMount () {
    this.props.requestHolidayList();
  }
  componentWillReceiveProps (props) {
    let {route, router, loggedUser, holidaysList: {isError, message}} = props;
    let isNotValid = isNotUserValid(route.path, loggedUser);
    if (isNotValid.status) {
      router.push(isNotValid.redirectTo);
    }
    if (isError) {
      notify('Error !', message, 'error');
    }
  }
  render () {
    let {isLoading, data} = this.props.holidaysList;
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Holidays List'} showLoading={isLoading} />
          <div className="app-footer">
          </div>
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-12">
                  <HolidaysList holidays={data.holidays} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:     state.frontend.toJS(),
    loggedUser:   state.logged_user.userLogin,
    holidaysList: state.holidaysList.holidaysList
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Holidays));
