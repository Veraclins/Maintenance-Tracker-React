import React from 'react';
import { shallow } from 'enzyme';

import { CreateRequest, mapDispatchToProps } from '../CreateRequest';
import Forms from '../../../../shared/components/Form';

const mockFunction = jest.fn();
const location = {};
const isLoggedIn = true;
const user = {};

describe('Tests the create request component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<CreateRequest
      clearValidation={mockFunction}
      location={location}
      isLoggedIn={isLoggedIn}
      user={user}
    />);
    expect(wrapper.find(Forms)).toHaveLength(1);
  });
});

describe('directly invoking the handleInputChange method from component instance', () => {
  it('should update the input when invoked with a value for email', () => {
    const wrapper = shallow(<CreateRequest
      clearValidation={mockFunction}
      location={location}
      isLoggedIn={isLoggedIn}
      user={user}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('input')).toEqual({
      title: {
        value: '',
        placeholder: 'Enter the title of the request',
        required: true,
      },
    });
    const event = {
      target: {
        name: 'title',
        value: 'Veraclins Request',
      },
    };
    instance.handleInputChange(event);
    expect(wrapper.state('input')).toEqual({
      title: {
        value: 'Veraclins Request',
        placeholder: 'Enter the title of the request',
        required: true,
      },
    });
  });
});

describe('directly invoking the handleSelectChange method from component instance', () => {
  it('should update the select input when invoked with a value for email', () => {
    const wrapper = shallow(<CreateRequest
      clearValidation={mockFunction}
      location={location}
      isLoggedIn={isLoggedIn}
      user={user}
    />);
    const instance = wrapper.instance();
    const options = [
      { value: '', label: 'Select Device Type' },
      { value: 'Laptop', label: 'Laptop Pc' },
      { value: 'Desktop', label: 'Desktop Pc' },
      { value: 'Smartphone', label: 'Smartphone' },
      { value: 'Tablet', label: 'Tablet Pc' },
      { value: 'Others', label: 'Others' },
    ];
    expect(wrapper.state('select')).toEqual({
      device: {
        options,
        placeholder: 'Select your device type',
        required: true,
        value: '',
      },
    });
    const event = {
      target: {
        name: 'device',
        value: 'Laptop',
      },
    };
    instance.handleSelectChange(event);
    expect(wrapper.state('select')).toEqual({
      device: {
        options,
        placeholder: 'Select your device type',
        required: true,
        value: 'Laptop',
      },
    });
  });
});

describe('directly invoking the handleTextAreaChange method from component instance', () => {
  it('should update the text area when invoked with a value for email', () => {
    const wrapper = shallow(<CreateRequest
      clearValidation={mockFunction}
      location={location}
      isLoggedIn={isLoggedIn}
      user={user}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('textArea')).toEqual({
      description: {
        value: '',
        required: true,
        placeholder: 'Enter the description of the request',
      },
    });
    const event = {
      target: {
        name: 'description',
        value: 'Veraclins Request description',
      },
    };
    instance.handleTextAreaChange(event);
    expect(wrapper.state('textArea')).toEqual({
      description: {
        value: 'Veraclins Request description',
        required: true,
        placeholder: 'Enter the description of the request',
      },
    });
  });
});

describe('directly invoking the handleSubmit method from component instance', () => {
  it('should reset the state', () => {
    const wrapper = shallow(<CreateRequest
      clearValidation={mockFunction}
      location={location}
      isLoggedIn={isLoggedIn}
      create={mockFunction}
      user={user}
    />);
    const instance = wrapper.instance();
    const event = {
      preventDefault: mockFunction,
    };
    instance.handleSubmit(event);
    expect(wrapper.state('input')).toEqual({
      title: {
        value: '',
        placeholder: 'Enter the title of the request',
        required: true,
      },
    });
  });
});

describe('Testing mapDispatchToProps', () => {
  it('should correctly map dispatches to props', () => {
    const mockDispatch = jest.fn();
    const request = {};
    const newProps = mapDispatchToProps(mockDispatch);
    newProps.create(request, user);
    newProps.clearValidation('device');
    expect(mockDispatch)
      .toHaveBeenCalledTimes(2);
  });
});
