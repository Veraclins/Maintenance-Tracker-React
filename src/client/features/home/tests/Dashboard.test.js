import React from 'react';
import { shallow } from 'enzyme';
import toastr from 'toastr';

import { Dashboard, mapStateToProps } from '../Dashboard';

const mockFunction = jest.fn();

const user = {
  firstName: 'Clinton',
  lastName: 'Agada',
};

const history = {
  push: mockFunction,
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
    expect(wrapper.find('h1')).toHaveLength(2);
    expect(wrapper.find('div')).toHaveLength(17);
    expect(wrapper).toMatchSnapshot();
  });
});


describe('directly invoking the componentDidMount method from component instance', () => {
  it('should call the history.push function', () => {
    const isLoggedIn = false;
    const wrapper = shallow(<Dashboard
      isLoggedIn={isLoggedIn}
      user={user}
      history={history}
      location={location}
    />);
    const instance = wrapper.instance();
    toastr.error = mockFunction;
    instance.componentDidMount();
    expect(toastr.error).toHaveBeenCalled();
  });
});

describe('Testing mapStateToProps', () => {
  it('should correctly map state  ', () => {
    const mockState = {
      auth: {
        isAuthenticated: true,
        user,
      },
      router: {
        location,
      },
    };

    const newState = mapStateToProps(mockState);

    expect(newState.isLoggedIn)
      .toEqual(true);

    expect(newState.location)
      .toEqual(location);
    expect(newState.user)
      .toEqual(user);
  });
});
