import React from 'react';
import { shallow } from 'enzyme';

import { Login, mapDispatchToProps } from '../Login';
import AuthRender from '../../AuthRender';

const mockFunction = jest.fn();
const location = {};
const errors = {};

describe('Tests the login component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<Login
      login={mockFunction}
      clearValidation={mockFunction}
      location={location}
      errors={errors}
    />);
    expect(wrapper.find(AuthRender)).toHaveLength(1);
  });
});

describe('directly invoking the handleChange method from component instance', () => {
  it('should update the email when invoked with a value for email', () => {
    const error = {
      email: 'email is required',
    };
    const wrapper = shallow(<Login
      login={mockFunction}
      loading={false}
      clearValidation={mockFunction}
      location={location}
      errors={error}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('email')).toEqual({
      type: 'email',
      value: '',
      placeholder: 'Enter your email',
      required: true,
    });
    const event = {
      target: {
        name: 'email',
        value: 'Veraclins',
      },
    };
    instance.handleChange(event);
    expect(wrapper.state('email')).toEqual({
      type: 'email',
      value: 'Veraclins',
      placeholder: 'Enter your email',
      required: true,
    });
    expect(mockFunction)
      .toHaveBeenCalledTimes(1);
  });
  it('should update the password when invoked with a value for password', () => {
    const wrapper = shallow(<Login
      login={mockFunction}
      loading={false}
      clearValidation={mockFunction}
      location={location}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('password')).toEqual({
      type: 'password',
      value: '',
      placeholder: 'Enter your password',
      required: true,
    });
    const event = {
      target: {
        name: 'password',
        value: 'passWord4',
      },
    };
    instance.handleChange(event);
    expect(wrapper.state('password')).toEqual({
      type: 'password',
      value: 'passWord4',
      placeholder: 'Enter your password',
      required: true,
    });
  });
});

describe('directly invoking the handleSubmit method from component instance', () => {
  it('should reset the email and password', () => {
    const wrapper = shallow(<Login
      login={mockFunction}
      loading={false}
      clearValidation={mockFunction}
      location={location}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('email')).toEqual({
      type: 'email',
      value: '',
      placeholder: 'Enter your email',
      required: true,
    });
    expect(wrapper.state('password')).toEqual({
      type: 'password',
      value: '',
      placeholder: 'Enter your password',
      required: true,
    });
    const event = {
      preventDefault: mockFunction,
    };
    instance.handleSubmit(event);
    expect(wrapper.state('email')).toEqual({
      type: 'email',
      value: '',
      placeholder: 'Enter your email',
      required: true,
    });
    expect(wrapper.state('password')).toEqual({
      type: 'password',
      value: '',
      placeholder: 'Enter your password',
      required: true,
    });
  });
});

describe('Testing mapDispatchToProps', () => {
  it('should correctly map dispatches to props  ', () => {
    const user = {
      email: 'innocent@test.com',
      password: 'password',
    };
    const mockDispatch = jest.fn();
    const newProps = mapDispatchToProps(mockDispatch);
    newProps.login(user, location);
    newProps.clearValidation('email');
    expect(mockDispatch)
      .toHaveBeenCalledTimes(2);
  });
});
