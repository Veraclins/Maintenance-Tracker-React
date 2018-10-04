import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../img/veratech-logo_burned.png';


class Header extends Component {
  constructor() {
    super();
    this.state = {
      navbarActive: false,
    };
  }

  toggleNavbar = () => {
    const { navbarActive } = this.state;
    this.setState({ navbarActive: !navbarActive });
  }

  render() {
    /* eslint-disable jsx-a11y/anchor-is-valid */
    const { navbarActive } = this.state;
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
                role="navigation"
              >
                <span />
                <span />
                <span />
                <span />
              </a>
              <div className={navbarActive ? 'menu-top-menu-container show' : 'menu-top-menu-container'}>
                <ul id="top-menu" className="menu">
                  <li
                    id="menu-item-838"
                    className="has-submenu menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-838"
                  >
                    <NavLink to="/requests">Requests</NavLink>
                    <span className="arrow" />
                    <div className="clear" />
                    <ul className="sub-menu">
                      <li
                        id="menu-item-62750"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-62750"
                      >
                        <NavLink to="/pending">
                          Pending Requests
                        </NavLink>
                        <span className="arrow" />
                        <div className="clear" />
                      </li>
                      <li
                        id="menu-item-62879"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-62879"
                      >
                        <NavLink to="/approved">
                          Approved Requests
                        </NavLink>
                        <span className="arrow" />
                        <div className="clear" />
                      </li>
                      <li
                        id="menu-item-840"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-840"
                      >
                        <NavLink to="/disapproved">
                          Disapproved Requests
                        </NavLink>
                        <span className="arrow" />
                        <div className="clear" />
                      </li>
                      <li
                        id="menu-item-996"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-996"
                      >
                        <NavLink to="/resolved">Resolved Requests</NavLink>
                        <span className="arrow" />
                        <div className="clear" />
                      </li>
                    </ul>
                  </li>
                  <li
                    id="menu-item-716"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-716"
                  >
                    <NavLink to="admin">
                      Admin Page
                    </NavLink>
                    <span className="arrow" />
                    <div className="clear" />
                  </li>
                  <li
                    id="menu-item-53"
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-53"
                  >
                    <NavLink to="/login">Login</NavLink>
                    <span className="arrow" />
                    <div className="clear" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="clear" />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
