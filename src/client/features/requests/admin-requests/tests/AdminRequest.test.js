import React from 'react';
import toastr from 'toastr';
import { shallow } from 'enzyme';

import { AdminRequests, mapDispatchToProps } from '../AdminRequests';
import Request from '../../Requests';

const mockFunction = jest.fn();
const location = {};
const errors = {};
const noRequestMessage = 'There are no requests yet';
const user = {
  firstName: 'Clinton',
  lastName: 'Maureen',
};

describe('Tests the admin requests component', () => {
  it('should render without errors', () => {
    const isLoggedIn = false;
    const requests = [];
    const isAdmin = false;
    const wrapper = shallow(<AdminRequests
      getRequests={mockFunction}
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      noRequestMessage={noRequestMessage}
      clearValidation={mockFunction}
      location={location}
      requests={requests}
      errors={errors}
      user={user}
    />);
    expect(wrapper.find(Request)).toHaveLength(1);
  });
});

describe('directly invoking the componentDidMount method from component instance', () => {
  it('should call the history.push function when you are not logged in', () => {
    const isLoggedIn = false;
    const isAdmin = false;
    const requests = [];
    const wrapper = shallow(<AdminRequests
      getRequests={mockFunction}
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      noRequestMessage={noRequestMessage}
      clearValidation={mockFunction}
      location={location}
      errors={errors}
      requests={requests}
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
    const requests = [];
    const wrapper = shallow(<AdminRequests
      getRequests={mockFunction}
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      noRequestMessage={noRequestMessage}
      clearValidation={mockFunction}
      location={location}
      errors={errors}
      requests={requests}
      user={user}
    />);
    const instance = wrapper.instance();
    toastr.error = mockFunction;
    instance.componentDidMount();
    expect(toastr.error).toHaveBeenCalled();
  });

  it('should fetch the requests when you are an admin', () => {
    const isLoggedIn = true;
    const isAdmin = true;
    const requests = [];
    const wrapper = shallow(<AdminRequests
      getRequests={mockFunction}
      isAdmin={isAdmin}
      isLoggedIn={isLoggedIn}
      noRequestMessage={noRequestMessage}
      clearValidation={mockFunction}
      location={location}
      errors={errors}
      requests={requests}
      user={user}
    />);
    const instance = wrapper.instance();
    toastr.error = mockFunction;
    instance.componentDidMount();
    expect(toastr.error).toHaveBeenCalled();
  });
});

describe('Calling mapDispatchToProps', () => {
  it('should correctly map dispatches to props  ', () => {
    const mockDispatch = jest.fn();
    const newProps = mapDispatchToProps(mockDispatch);
    newProps.getRequests(user);
    expect(mockDispatch)
      .toHaveBeenCalledTimes(1);
  });
});
