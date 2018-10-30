import React from 'react';
import { shallow } from 'enzyme';

import { UpdateRequest, mapDispatchToProps } from '../UpdateRequest';
import Forms from '../../../../shared/components/Form';

const mockFunction = jest.fn();
const location = {};
const isLoggedIn = true;
const user = {};
const request = {
  id: 13,
  request_id: 2,
  title: 'General repainting',
  device: 'Smartphone',
  description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
  status: 'pending',
  created_at: '2018-10-06T23:14:25.294Z',
  updated_at: '2018-10-06T23:14:25.294Z',
};
const match = {
  params: {},
};

describe('Tests the create request component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<UpdateRequest
      clearValidation={mockFunction}
      fetch={mockFunction}
      location={location}
      isLoggedIn={isLoggedIn}
      user={user}
      request={request}
      match={match}
    />);
    expect(wrapper.find(Forms)).toHaveLength(1);
  });
});

describe('directly invoking the handleInputChange method from component instance', () => {
  it('should update the input when invoked with a value for email', () => {
    const wrapper = shallow(<UpdateRequest
      clearValidation={mockFunction}
      fetch={mockFunction}
      location={location}
      isLoggedIn={isLoggedIn}
      user={user}
      request={request}
      match={match}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('input')).toEqual({
      title: {
        value: 'General repainting',
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
    const wrapper = shallow(<UpdateRequest
      clearValidation={mockFunction}
      fetch={mockFunction}
      location={location}
      isLoggedIn={isLoggedIn}
      user={user}
      request={request}
      match={match}
    />);
    const instance = wrapper.instance();
    const options = [
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
        value: 'Smartphone',
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
    const wrapper = shallow(<UpdateRequest
      clearValidation={mockFunction}
      fetch={mockFunction}
      location={location}
      isLoggedIn={isLoggedIn}
      user={user}
      request={request}
      match={match}
    />);
    const instance = wrapper.instance();
    expect(wrapper.state('textArea')).toEqual({
      description: {
        value: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
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
    const wrapper = shallow(<UpdateRequest
      clearValidation={mockFunction}
      fetch={mockFunction}
      location={location}
      isLoggedIn={isLoggedIn}
      update={mockFunction}
      user={user}
      request={request}
      match={match}
    />);
    const instance = wrapper.instance();
    const event = {
      preventDefault: mockFunction,
    };
    instance.handleSubmit(event);
    expect(wrapper.state('input')).toEqual({
      title: {
        value: 'General repainting',
        placeholder: 'Enter the title of the request',
        required: true,
      },
    });
  });
});

describe('Testing mapDispatchToProps', () => {
  it('should correctly map dispatches to props', () => {
    const mockDispatch = jest.fn();
    const newProps = mapDispatchToProps(mockDispatch);
    newProps.update(request, user);
    newProps.fetch(user, request.id);
    newProps.clearValidation('device');
    expect(mockDispatch)
      .toHaveBeenCalledTimes(3);
  });
});
