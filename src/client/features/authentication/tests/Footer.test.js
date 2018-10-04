import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import Footer from '../Footer';

describe('Test the login presentation component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('div'));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render without errors', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('footer')).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(4);
  });
});
