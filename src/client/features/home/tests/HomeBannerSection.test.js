import React from 'react';
import { shallow } from 'enzyme';

import HomeBannerSection from '../HomeBannerSection';

const user = {
  firstName: 'Clinton',
  lastName: 'Agada',
};

describe('Test the HomeBannerSection component', () => {
  it('renders without crashing for a guest', () => {
    const wrapper = shallow(<HomeBannerSection user={user} isLoggedIn={false} isAdmin={false} />);
    expect(wrapper.find('div')).toHaveLength(9);
    expect(wrapper.find('h1.home_welcome')).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders with the right view for a logged in user', () => {
    const wrapper = shallow(<HomeBannerSection user={user} isLoggedIn isAdmin={false} />);
    expect(wrapper.find('h1.home_welcome')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
