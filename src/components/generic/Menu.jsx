import React from 'react';
import PropTypes from 'prop-types';
import LoggedUserInfo from 'components/menu/LoggedUserInfo';
import DisplayMenuList from 'components/menu/DisplayMenuList';

class Menu extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      role: props.loggedUser.data.role
    };
    this.click = this.click.bind(this);
  }
  click (a) {
    let id = a;
    if ($('ul #' + id).hasClass('active') && $('ul li').hasClass('active')) {
      $('ul li').removeClass('active');
      $('ul #' + id).removeClass('active');
    } else {
      $('ul li').removeClass('active');
      $('ul #' + id).addClass('active');
    }
  }
  render () {
    return (
      <div id="aside" className="app-aside modal fade nav-dropdown">
        <div className="left navside dark dk">
          <div className="navbar no-radius">
            <a className="navbar-brand">
              <img src="./favicon.ico" />
              <span className="hidden-folded inline">HR</span>
            </a>
          </div>
          <div className="hide-scroll">
            <nav className="scroll nav-light">
              <DisplayMenuList rolePages={this.props.loggedUser.data.role_pages} click={(id) => this.click(id)} />
            </nav>
          </div>
          <LoggedUserInfo loggedUser={this.props.loggedUser.data} />
        </div>
      </div>
    );
  }
}

export default Menu;

Menu.PropTypes = {
  logged_user: PropTypes.shape({
    role:      PropTypes.string.isRequired,
    rolePages: PropTypes.object.isRequired
  }).isRequired
};
