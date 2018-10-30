import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavItem = ({ closeNavbar, children, link }) => (
  <li className="menu-item">
    <NavLink
      onClick={closeNavbar}
      to={`${link}`}
    >
      {children}
    </NavLink>
    <span className="arrow" />
    <div className="clear" />
  </li>
);

NavItem.propTypes = {
  closeNavbar: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};


export default NavItem;
