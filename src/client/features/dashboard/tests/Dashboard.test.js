import React from 'react';
import { shallow } from 'enzyme';

import { Dashboard, mapStateToProps } from '../Dashboard';

const user = {
  firstName: 'Clinton',
  lastName: 'Agada',
};

const location = {
  pathname: '',
};

describe('Test the Dashboard component', () => {
  it('renders with the right view for a logged in user', () => {
    const isLoggedIn = true;
    const wrapper = shallow(<Dashboard
      isLoggedIn={isLoggedIn}
      user={user}
      location={location}
    />);
    expect(wrapper.find('section')).toHaveLength(1);
    expect(wrapper.find('h1.home_welcome')).toHaveLength(1);
    expect(wrapper.find('div.home_timeline_section')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Testing mapStateToProps', () => {
  it('should correctly map state  ', () => {
    const mockState = {
      auth: {
        user,
      },
    };

    const newState = mapStateToProps(mockState);

    expect(newState.user).toEqual(user);
  });
});
