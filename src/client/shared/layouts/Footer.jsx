import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../img/veratech-logo_burned.png';


const Footer = () => (
  <footer>
    <div className="footer_section footer_gradient">
      <div className="container">
        <div className="footer_left_section">
          <NavLink to="/" className="footer_logo">
            <img
              src={logo}
              alt="VeraTech"
              width="144"
              height="42"
            />
          </NavLink>
        </div>
        <div className="footer_right_section">
          <div className="footer_navigation">
            <h6>Links</h6>
            <div className="footer-menu-container">
              <ul id="footer-menu" className="footer_nav_list">
                <li
                  id="menu-item-995"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-995"
                >
                  <NavLink to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li
                  id="menu-item-39"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-39"
                >
                  <NavLink to="login">Login</NavLink>
                </li>
                <li
                  id="menu-item-62473"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-62473"
                >
                  <NavLink to="signup">
                    Register
                  </NavLink>
                </li>
                <li
                  id="menu-item-37"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-37"
                >
                  <NavLink to="requests">
                    Requests
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_contact">
            <h4>
              Office Address:
            </h4>
            <h6>
              235 Ikorodu Road, Ilupeju, Lagos
            </h6>
            <address>
              <p>
                <small />
              </p>
            </address>
            <p>
              <small>
                <NavLink to="mailto:info@veratech.com">info@veratech.com</NavLink>
              </small>
            </p>
          </div>
        </div>
        <div className="clear" />
      </div>
      <div className="container">
        <div className="footer_copyright">
          <p>
            <small>
              Copyright © VeraTech 2018.
            </small>
          </p>
        </div>
      </div>
      <div className="footer_bottom_bg" />
    </div>
  </footer>
);

export default Footer;
