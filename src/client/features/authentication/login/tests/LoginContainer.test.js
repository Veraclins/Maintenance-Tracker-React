import React from 'react';
import { shallow } from 'enzyme';

import Login from '../Login';
import { LoginContainer } from '../LoginContainer';

const mockFunction = jest.fn();
const history = {
  push: mockFunction,
};

describe('Tests the login container', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<LoginContainer
      login={mockFunction}
      loading={false}
      clearValidation={mockFunction}
      history={history}
    />);
    expect(wrapper.find('div')).toHaveLength(4);
    expect(wrapper.find(Login)).toHaveLength(1);
  });
});

describe('directly invoking the handleChange method from component instance', () => {
  it('should update the emailOrUsername when invoked by with a value for emailOrUsername', () => {
    const wrapper = shallow(<LoginContainer
      login={mockFunction}
      loading={false}
      clearValidation={mockFunction}
      history={history}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('emailOrUsername')).toBe('');
    const event = {
      target: {
        id: 'emailOrUsername',
        value: 'Veraclins',
      },
    };
    instance.handleChange(event);
    expect(wrapper.state('emailOrUsername')).toBe('Veraclins');
  });
  it('should update the password when invoked by with a value for password', () => {
    const wrapper = shallow(<LoginContainer
      login={mockFunction}
      loading={false}
      clearValidation={mockFunction}
      history={history}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('password')).toBe('');
    const event = {
      target: {
        id: 'password',
        value: 'passWord4',
      },
    };
    instance.handleChange(event);
    expect(wrapper.state('password')).toBe('passWord4');
  });
});

describe('directly invoking the handleSubmit method from component instance', () => {
  it('should reset the emailOrUsername and password', () => {
    const wrapper = shallow(<LoginContainer
      login={mockFunction}
      loading={false}
      clearValidation={mockFunction}
      history={history}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('emailOrUsername')).toBe('');
    expect(wrapper.state('password')).toBe('');
    const event = {
      preventDefault: mockFunction,
    };
    instance.handleSubmit(event);
    expect(wrapper.state('emailOrUsername')).toBe('');
    expect(wrapper.state('password')).toBe('');
  });
});
