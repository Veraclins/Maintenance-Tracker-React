import React from 'react';
import { shallow } from 'enzyme';
import { Route, Switch } from 'react-router-dom';
import toastr from 'toastr';

import { Authenticate, mapStateToProps } from '../Authenticate';

const location = {
  push: jest.fn(),
};

describe('Tests the login component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<Authenticate
      isLoggedIn
      location={location}
    />);
    expect(wrapper.find(Switch)).toHaveLength(1);
    expect(wrapper.find(Route)).toHaveLength(6);
  });
});

describe('directly invoking the componentDidMount method from component instance', () => {
  it('should call the history.push function when not logged in', () => {
    const wrapper = shallow(<Authenticate
      isLoggedIn={false}
      location={location}
    />);
    const instance = wrapper.instance();
    toastr.error = jest.fn();
    instance.componentDidMount();
    expect(toastr.error).toHaveBeenCalled();
  });
});


describe('Testing mapStateToProps', () => {
  it('should correctly map state  ', () => {
    const mockState = {
      auth: {
        isAuthenticated: true,
      },
      router: {
        location,
      },
    };

    const newState = mapStateToProps(mockState);

    expect(newState.isLoggedIn).toEqual(true);
    expect(newState.location).toEqual(location);
  });
});
