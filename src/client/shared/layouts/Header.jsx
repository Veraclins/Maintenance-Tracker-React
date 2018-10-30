import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import logo from '../../img/veratech-logo_burned.png';
import { logoutUser } from '../../features/authentication/authAction';
import NavItem from './NavItem';

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
      <NavItem closeNavbar={this.closeNavbar} link="/login">
        Login
      </NavItem>
      <NavItem closeNavbar={this.closeNavbar} link="/signup">
        Register
      </NavItem>
    </React.Fragment>
  )

  loggedInNav = () => {
    const { activeSubMenu } = this.state;
    const subMenuActiveClass = 'has-submenu active_submenu';
    const subMenuClass = 'has-submenu';
    return (
      <React.Fragment>
        <NavItem closeNavbar={this.closeNavbar} link="/dashboard">
          Dashboard
        </NavItem>
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
          <ul className="sub-menu">
            <NavItem closeNavbar={this.closeNavbar} link="/requests/create">
            Create a Request
            </NavItem>
            <NavItem closeNavbar={this.closeNavbar} link="/requests">
            View Requests
            </NavItem>
          </ul>
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
              <NavItem closeNavbar={this.closeNavbar} link="/admin">
                Admin Page
              </NavItem>
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
