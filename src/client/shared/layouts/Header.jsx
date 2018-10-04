import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import logo from '../../img/veratech-logo_burned.png';
import { logoutUser } from '../../features/authentication/authAction';


class Header extends Component {
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


  render() {
    /* eslint-disable jsx-a11y/anchor-is-valid */
    const { navbarActive, activeSubMenu } = this.state;
    const { logout, isLoggedIn, isAdmin } = this.props;
    const subMenuActiveClass = 'has-submenu active_submenu';
    const subMenuClass = 'has-submenu';
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
                  {isLoggedIn ? (
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
                        <NavLink
                          id="request-menu-toggle"
                          to="#"
                          onClick={this.openSubMenu}
                        >
                          Requests
                        </NavLink>
                        <span className="arrow" />
                        <div className="clear" />
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
                              All Requests
                            </NavLink>
                            <span className="arrow" />
                            <div className="clear" />
                          </li>
                          <li className="menu-item">
                            <NavLink
                              onClick={this.closeNavbar}
                              to="/requests/pending"
                            >
                              Pending Requests
                            </NavLink>
                            <span className="arrow" />
                            <div className="clear" />
                          </li>
                          <li className="menu-item">
                            <NavLink
                              onClick={this.closeNavbar}
                              to="/requests/approved"
                            >
                              Approved Requests
                            </NavLink>
                            <span className="arrow" />
                            <div className="clear" />
                          </li>
                          <li className="menu-item">
                            <NavLink
                              onClick={this.closeNavbar}
                              to="/requests/disapproved"
                            >
                              Disapproved Requests
                            </NavLink>
                            <span className="arrow" />
                            <div className="clear" />
                          </li>
                          <li className="menu-item">
                            <NavLink
                              onClick={this.closeNavbar}
                              to="/requests/resolved"
                            >
                              Resolved Requests
                            </NavLink>
                            <span className="arrow" />
                            <div className="clear" />
                          </li>
                        </ul>
                      </li>
                    </React.Fragment>
                  ) : false}
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
                  {!isLoggedIn
                    ? (
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
                    : (
                      <li className="menu-item">
                        <a
                          className="buttons button_default"
                          onClick={() => { this.closeNavbar(); logout(); }}
                          href="#"
                        >
                          Logout
                        </a>
                        <span className="arrow" />
                        <div className="clear" />
                      </li>
                    )
                  }
                </ul>
              </div>
            </div>
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

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
});

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
