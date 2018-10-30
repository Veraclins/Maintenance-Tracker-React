import React from 'react';
import { shallow } from 'enzyme';

import { SignUp, mapDispatchToProps } from '../SignUp';
import AuthRender from '../../AuthRender';

const mockFunction = jest.fn();
const location = {};
const errors = {};

describe('Tests the signup component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<SignUp
      signup={mockFunction}
      clearValidation={mockFunction}
      location={location}
      errors={errors}
    />);
    expect(wrapper.find(AuthRender)).toHaveLength(1);
  });
});

describe('directly invoking the handleChange method from component instance', () => {
  it('should update the firstName when invoked with a value for firstName', () => {
    const wrapper = shallow(<SignUp
      signup={mockFunction}
      loading={false}
      clearValidation={mockFunction}
      location={location}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('firstName')).toEqual({
      type: 'text',
      value: '',
      placeholder: 'Enter your first name',
      required: true,
    });
    const event = {
      target: {
        name: 'firstName',
        value: 'Clinton',
      },
    };
    instance.handleChange(event);
    expect(wrapper.state('firstName')).toEqual({
      type: 'text',
      value: 'Clinton',
      placeholder: 'Enter your first name',
      required: true,
    });
  });
  it('should update the lastName when invoked with a value for lastName', () => {
    const wrapper = shallow(<SignUp
      signup={mockFunction}
      loading={false}
      clearValidation={mockFunction}
      location={location}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('lastName')).toEqual({
      type: 'text',
      value: '',
      placeholder: 'Enter your last name',
      required: true,
    });
    const event = {
      target: {
        name: 'lastName',
        value: 'Veraclins',
      },
    };
    instance.handleChange(event);
    expect(wrapper.state('lastName')).toEqual({
      type: 'text',
      value: 'Veraclins',
      placeholder: 'Enter your last name',
      required: true,
    });
  });
  it('should update the email when invoked with a value for email', () => {
    const error = {
      email: 'email is required',
    };
    const wrapper = shallow(<SignUp
      signup={mockFunction}
      loading={false}
      clearValidation={mockFunction}
      location={location}
      errors={error}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('email')).toEqual({
      type: 'email',
      value: '',
      placeholder: 'Enter your email address',
      required: true,
    });
    const event = {
      target: {
        name: 'email',
        value: 'agada@test.com',
      },
    };
    instance.handleChange(event);
    expect(wrapper.state('email')).toEqual({
      type: 'email',
      value: 'agada@test.com',
      placeholder: 'Enter your email address',
      required: true,
    });
  });
  it('should update the password when invoked with a value for password', () => {
    const wrapper = shallow(<SignUp
      signup={mockFunction}
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
  it('should update the passwordConfirmation when invoked with a value for passwordConfirmation', () => {
    const wrapper = shallow(<SignUp
      signup={mockFunction}
      loading={false}
      clearValidation={mockFunction}
      location={location}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('passwordConfirmation')).toEqual({
      type: 'password',
      value: '',
      placeholder: 'Repeat the password',
      required: true,
    });
    const event = {
      target: {
        name: 'passwordConfirmation',
        value: 'passWord4',
      },
    };
    instance.handleChange(event);
    expect(wrapper.state('passwordConfirmation')).toEqual({
      type: 'password',
      value: 'passWord4',
      placeholder: 'Repeat the password',
      required: true,
    });
  });
});

describe('directly invoking the handleSubmit method from component instance', () => {
  it('should reset all fields', () => {
    const wrapper = shallow(<SignUp
      signup={mockFunction}
      loading={false}
      clearValidation={mockFunction}
      location={location}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('email')).toEqual({
      type: 'email',
      value: '',
      placeholder: 'Enter your email address',
      required: true,
    });
    expect(wrapper.state('password')).toEqual({
      type: 'password',
      value: '',
      placeholder: 'Enter your password',
      required: true,
    });
    expect(wrapper.state('firstName')).toEqual({
      type: 'text',
      value: '',
      placeholder: 'Enter your first name',
      required: true,
    });
    expect(wrapper.state('lastName')).toEqual({
      type: 'text',
      value: '',
      placeholder: 'Enter your last name',
      required: true,
    });
    expect(wrapper.state('passwordConfirmation')).toEqual({
      type: 'password',
      value: '',
      placeholder: 'Repeat the password',
      required: true,
    });
    const event = {
      preventDefault: mockFunction,
    };
    instance.handleSubmit(event);
    expect(wrapper.state('email')).toEqual({
      type: 'email',
      value: '',
      placeholder: 'Enter your email address',
      required: true,
    });
    expect(wrapper.state('password')).toEqual({
      type: 'password',
      value: '',
      placeholder: 'Enter your password',
      required: true,
    });
    expect(wrapper.state('firstName')).toEqual({
      type: 'text',
      value: '',
      placeholder: 'Enter your first name',
      required: true,
    });
    expect(wrapper.state('lastName')).toEqual({
      type: 'text',
      value: '',
      placeholder: 'Enter your last name',
      required: true,
    });
    expect(wrapper.state('passwordConfirmation')).toEqual({
      type: 'password',
      value: '',
      placeholder: 'Repeat the password',
      required: true,
    });
  });
});

describe('Testing mapDispatchToProps', () => {
  it('should correctly map dispatches to props  ', () => {
    const mockDispatch = jest.fn();
    const user = {};
    const newProps = mapDispatchToProps(mockDispatch);
    newProps.signup(user, location);
    newProps.clearValidation('email');
    expect(mockDispatch)
      .toHaveBeenCalledTimes(2);
  });
});
