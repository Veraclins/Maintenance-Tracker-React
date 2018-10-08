import React from 'react';
import toastr from 'toastr';
import { shallow } from 'enzyme';

import { ViewAdminRequest, mapDispatchToProps } from '../ViewAdminRequest';
import ViewRequests from '../../ViewRequest';

const mockFunction = jest.fn();
const location = {};
const match = {
  params: {},
};
const user = {
  firstName: 'Clinton',
  lastName: 'Andrew',
};

describe('Tests the admin requests component', () => {
  it('should render without errors', () => {
    const isLoggedIn = false;
    const request = {
      id: 1,
    };
    const isAdmin = false;
    const wrapper = shallow(<ViewAdminRequest
      viewRequest={mockFunction}
      updateRequest={mockFunction}
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
    const wrapper = shallow(<ViewAdminRequest
      viewRequest={mockFunction}
      updateRequest={mockFunction}
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

  it('should call the history.push function when you are not an admin', () => {
    const isLoggedIn = true;
    const isAdmin = false;
    const request = {};
    const wrapper = shallow(<ViewAdminRequest
      viewRequest={mockFunction}
      updateRequest={mockFunction}
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
    const isAdmin = true;
    const request = {};
    const wrapper = shallow(<ViewAdminRequest
      viewRequest={mockFunction}
      updateRequest={mockFunction}
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      location={location}
      request={request}
      match={match}
      user={user}
    />);
    const instance = wrapper.instance();
    instance.componentDidMount();
    expect(mockFunction).toHaveBeenCalled();
  });
});

describe('directly invoking the updateRequest method from component instance', () => {
  it('should call the history.push function when you are not logged in', () => {
    const isLoggedIn = false;
    const isAdmin = false;
    const request = {};
    const wrapper = shallow(<ViewAdminRequest
      viewRequest={mockFunction}
      updateRequest={mockFunction}
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      location={location}
      request={request}
      match={match}
      user={user}
    />);
    const e = {
      target: {
        id: 'approve',
      },
    };
    const instance = wrapper.instance();
    instance.updateRequest(e);
    expect(mockFunction).toHaveBeenCalled();
  });
});

describe('Testing mapDispatchToProps', () => {
  it('should correctly map dispatches to props  ', () => {
    const mockDispatch = jest.fn();
    const newProps = mapDispatchToProps(mockDispatch);
    newProps.viewRequest(user, 2);
    newProps.updateRequest({}, 'approve', user);
    expect(mockDispatch)
      .toHaveBeenCalledTimes(2);
  });
});
