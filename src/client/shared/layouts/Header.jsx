import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import logo from '../../img/veratech-logo_burned.png';
import { logoutUser } from '../../features/authentication/authAction';


export class Header extends Component {
  constructor() {
    super();
    this.state = {
      navbarActive: false,
      activeSubMenu: '',
    };
  }

  toggleNavbar = () => {
    const { navbarActive } = this.state;
    this.setState({ navbarActive: !navbarActive });
  }

  openSubMenu = (e) => {
    this.setState({ activeSubMenu: e.target.id });
  }

  closeNavbar = () => this.setState({ activeSubMenu: '', navbarActive: false });

  guestNav = () => (
    <React.Fragment>
      <li className="menu-item">
        <NavLink
          onClick={this.closeNavbar}
          to="/login"
        >
          Login
        </NavLink>
        <span className="arrow" />
        <div className="clear" />
      </li>
      <li className="menu-item">
        <NavLink
          onClick={this.closeNavbar}
          to="/signup"
        >
          Register
        </NavLink>
        <span className="arrow" />
        <div className="clear" />
      </li>
    </React.Fragment>
  )

  requestNav = () => (
    <ul className="sub-menu">
      <li className="menu-item">
        <NavLink
          onClick={this.closeNavbar}
          to="/requests/create"
        >
          Create a Request
        </NavLink>
        <span className="arrow" />
        <div className="clear" />
      </li>
      <li className="menu-item">
        <NavLink
          onClick={this.closeNavbar}
          to="/requests"
        >
          View Requests
        </NavLink>
        <span className="arrow" />
        <div className="clear" />
      </li>
    </ul>
  )

  loggedInNav = () => {
    const { activeSubMenu } = this.state;
    const subMenuActiveClass = 'has-submenu active_submenu';
    const subMenuClass = 'has-submenu';
    return (
      <React.Fragment>
        <li className="menu-item">
          <NavLink
            onClick={this.closeNavbar}
            to="/dashboard"
          >
            Dashboard
          </NavLink>
          <span className="arrow" />
          <div className="clear" />
        </li>
        <li
          className={activeSubMenu === 'request-menu-toggle'
            ? subMenuActiveClass
            : subMenuClass
          }
        >
          <a
            id="request-menu-toggle"
            onClick={this.openSubMenu}
          >
            Requests
          </a>
          <span className="arrow" />
          <div className="clear" />
          {this.requestNav()}
        </li>
      </React.Fragment>
    );
  }

  navigation = () => {
    const { navbarActive } = this.state;
    const { logout, isLoggedIn, isAdmin } = this.props;
    return (
      <div className="navigation">
        <a
          className={navbarActive
            ? 'nav_toggle active'
            : 'nav_toggle'}
          onClick={this.toggleNavbar}
        >
          <span />
          <span />
          <span />
          <span />
        </a>
        <div className={navbarActive ? 'menu-top-menu-container show' : 'menu-top-menu-container'}>
          <ul id="top-menu" className="menu">
            {isLoggedIn ? this.loggedInNav() : false}
            {isAdmin ? (
              <li className="menu-item">
                <NavLink
                  onClick={this.closeNavbar}
                  to="/admin"
                >
                  Admin Page
                </NavLink>
                <span className="arrow" />
                <div className="clear" />
              </li>
            ) : false}
            {!isLoggedIn ? this.guestNav() : (
              <li className="menu-item">
                <a
                  className="buttons button_default"
                  onClick={() => { this.closeNavbar(); logout(); }}
                >
                  Logout
                </a>
                <span className="arrow" />
                <div className="clear" />
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  render() {
    return (
      <header>
        <div className="header_layout">
          <div className="container">
            <div className="logo">
              <NavLink to="/">
                <img
                  src={logo}
                  alt="VeraTech"
                  width="144"
                  height="42"
                />
              </NavLink>
            </div>
            {this.navigation()}
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
});

export const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
