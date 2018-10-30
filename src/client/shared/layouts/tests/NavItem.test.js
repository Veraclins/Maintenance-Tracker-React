import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';

import NavItem from '../NavItem';

const mockFunction = jest.fn();

describe('Test the NavItem component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <NavItem
        link="login"
        closeNavbar={mockFunction}
      >
        Login
      </NavItem>,
    );
    expect(wrapper.find('li')).toHaveLength(1);
    expect(wrapper.find(NavLink)).toHaveLength(1);
    expect(wrapper.find('div.clear')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
