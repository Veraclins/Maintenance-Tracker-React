import React from 'react';
import { shallow } from 'enzyme';

import { Home } from '../Home';
import HomeContentSection from '../HomeContentSection';
import HomeBannerSection from '../HomeBannerSection';

const user = {
  firstName: 'Clinton',
  lastName: 'Agada',
};

describe('Test the Home component', () => {
  it('renders without crashing for a guest', () => {
    const isAdmin = false;
    const isLoggedIn = false;
    const wrapper = shallow(<Home
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      user={user}
    />);
    expect(wrapper.find('section')).toHaveLength(1);
    expect(wrapper.find(HomeContentSection)).toHaveLength(1);
    expect(wrapper.find(HomeBannerSection)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders with the right view for a logged in user', () => {
    const isAdmin = false;
    const isLoggedIn = true;
    const wrapper = shallow(<Home
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      user={user}
    />);
    expect(wrapper.find('section')).toHaveLength(1);
    expect(wrapper.find(HomeContentSection)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });
});
