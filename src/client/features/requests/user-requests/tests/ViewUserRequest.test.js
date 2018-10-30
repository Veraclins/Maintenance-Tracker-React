import React from 'react';
import toastr from 'toastr';
import { shallow } from 'enzyme';

import { ViewUserRequest, mapDispatchToProps } from '../ViewUserRequest';
import ViewRequests from '../../ViewRequest';

const mockFunction = jest.fn();
const location = {};
const match = {
  params: {},
};
const user = {
  firstName: 'Clinton',
  lastName: 'Maureen',
};

describe('Tests the admin request component', () => {
  it('should render without errors', () => {
    const isLoggedIn = false;
    const request = {
      id: 2,
    };
    const isAdmin = false;
    const wrapper = shallow(<ViewUserRequest
      fetch={mockFunction}
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      location={location}
      request={request}
      match={match}
      user={user}
    />);
    expect(wrapper.find(ViewRequests)).toHaveLength(1);
  });
});

describe('directly invoking the componentDidMount method from component instance', () => {
  it('should call the history.push function when you are not logged in', () => {
    const isLoggedIn = false;
    const isAdmin = false;
    const request = {};
    const wrapper = shallow(<ViewUserRequest
      fetch={mockFunction}
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      location={location}
      request={request}
      match={match}
      user={user}
    />);
    const instance = wrapper.instance();
    toastr.error = mockFunction;
    instance.componentDidMount();
    expect(toastr.error).toHaveBeenCalled();
  });

  it('should fetch the request when you are an admin', () => {
    const isLoggedIn = true;
    const isAdmin = false;
    const request = {};
    const wrapper = shallow(<ViewUserRequest
      fetch={mockFunction}
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      location={location}
      match={match}
      request={request}
      user={user}
    />);
    const instance = wrapper.instance();
    instance.componentDidMount();
    expect(mockFunction).toHaveBeenCalled();
  });
});

describe('Testing mapDispatchToProps', () => {
  it('should correctly map dispatches to props  ', () => {
    const mockDispatch = jest.fn();
    const newProps = mapDispatchToProps(mockDispatch);
    newProps.fetch(user, 2);
    expect(mockDispatch)
      .toHaveBeenCalledTimes(1);
  });
});
