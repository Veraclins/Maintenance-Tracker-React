import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';

import { Footer } from '../Footer';

describe('Test the Footer component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('footer')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all elements', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('footer')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('div')).toHaveLength(11);
    expect(wrapper.find(NavLink)).toHaveLength(6);
    expect(wrapper).toMatchSnapshot();
  });
});
