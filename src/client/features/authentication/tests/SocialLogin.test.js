import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import SocialLogin from '../social-login/SocialLogin';

describe('Test the login presentation component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SocialLogin />);
    expect(wrapper.find('div'));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render without errors', () => {
    const wrapper = shallow(<SocialLogin />);
    expect(wrapper.find('div')).toHaveLength(5);
    expect(wrapper.find(Link)).toHaveLength(3);
  });
});
