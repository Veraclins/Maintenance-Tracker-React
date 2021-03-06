import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';

import { Header, mapDispatchToProps } from '../Header';
import NavItem from '../NavItem';

const mockFunction = jest.fn();

describe('Test the Header component', () => {
  it('renders without crashing', () => {
    const isAdmin = false;
    const isLoggedIn = false;
    const wrapper = shallow(<Header
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      logout={mockFunction}
    />);
    expect(wrapper.find('header')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the right nav elements for a guest', () => {
    const isAdmin = false;
    const isLoggedIn = false;
    const wrapper = shallow(<Header
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      logout={mockFunction}
    />);
    expect(wrapper.find(NavLink)).toHaveLength(1);
    expect(wrapper.find(NavItem)).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the right nav elements for a logged in user', () => {
    const isAdmin = false;
    const isLoggedIn = true;
    const wrapper = shallow(<Header
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      logout={mockFunction}
    />);
    expect(wrapper.find(NavLink)).toHaveLength(1);
    expect(wrapper.find(NavItem)).toHaveLength(3);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the right nav elements for an admin', () => {
    const isAdmin = true;
    const isLoggedIn = true;
    const wrapper = shallow(<Header
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      logout={mockFunction}
    />);
    expect(wrapper.find(NavLink)).toHaveLength(1);
    expect(wrapper.find(NavItem)).toHaveLength(4);
    expect(wrapper).toMatchSnapshot();
  });

  it('it runs the logout function on click of the button', () => {
    const isAdmin = true;
    const isLoggedIn = true;
    const wrapper = shallow(<Header
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      logout={mockFunction}
    />);
    expect(wrapper.find('.button_default')).toHaveLength(1);
    wrapper.find('.button_default').simulate('click');
    expect(mockFunction).toHaveBeenCalled();
  });
});

describe('directly invoking the toggleNavbar method from component instance', () => {
  it('should update the navbarActive when invoked', () => {
    const isAdmin = false;
    const isLoggedIn = true;
    const wrapper = shallow(<Header
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      logout={mockFunction}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('navbarActive')).toEqual(false);
    instance.toggleNavbar();
    expect(wrapper.state('navbarActive')).toEqual(true);
  });
});

describe('directly invoking the openSubMenu method from component instance', () => {
  it('should update the activeSubMenu when invoked', () => {
    const isAdmin = false;
    const isLoggedIn = true;
    const wrapper = shallow(<Header
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      logout={mockFunction}
    />);
    const e = {
      target: {
        id: 'nav-1',
      },
    };
    const instance = wrapper.instance();
    expect(wrapper.state('activeSubMenu')).toEqual('');
    instance.openSubMenu(e);
    expect(wrapper.state('activeSubMenu')).toEqual('nav-1');
  });
});

describe('Testing mapDispatchToProps', () => {
  it('should correctly map dispatches to props  ', () => {
    const mockDispatch = jest.fn();
    const newProps = mapDispatchToProps(mockDispatch);
    newProps.logout();
    expect(mockDispatch)
      .toHaveBeenCalledTimes(1);
  });
});
