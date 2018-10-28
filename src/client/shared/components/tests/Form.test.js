import React from 'react';
import { shallow } from 'enzyme';
import DInput from '../Input';

import { Form } from '../Form';
import DSelectInput from '../Select';
import DTextArea from '../TextArea';

const mockFunction = jest.fn();
describe('Test the Form component', () => {
  it('renders without crashing', () => {
    const inputs = {};
    const errors = {};
    const wrapper = shallow(<Form
      inputs={inputs}
      errors={errors}
      handleInputChange={mockFunction}
      handleSubmit={mockFunction}
      formTitle="Default Form"
    />);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all elements when there are inputs', () => {
    const inputs = {
      email: {
        type: 'email',
        value: '',
        placeholder: 'Enter your email',
        required: true,
      },
      password: {
        type: 'password',
        value: '',
        placeholder: 'Enter your password',
        required: true,
      },
    };
    const errors = {};
    const formLinks = {
      label: "Don't have an account?",
      link: '/signup',
      text: 'Create one',
    };
    const wrapper = shallow(<Form
      inputs={inputs}
      errors={errors}
      formLinks={formLinks}
      handleInputChange={mockFunction}
      handleSubmit={mockFunction}
      formTitle="Log into Your Account"
    />);
    expect(wrapper.find('div')).toHaveLength(7);
    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find(DInput)).toHaveLength(2);
    expect(wrapper.find('input.hs-button')).toHaveLength(1);
  });

  it('renders all elements when there are select inputs', () => {
    const options = [
      { value: '', label: 'Select Device Type' },
      { value: 'Laptop', label: 'Laptop Pc' },
    ];
    const select = {
      device: {
        options,
        placeholder: 'Select your device type',
        required: true,
        value: '',
      },
    };
    const errors = {};
    const formLinks = {
      label: "Don't have an account?",
      link: '/signup',
      text: 'Create one',
    };
    const inputs = {};
    const wrapper = shallow(<Form
      inputs={inputs}
      selects={select}
      errors={errors}
      formLinks={formLinks}
      handleInputChange={mockFunction}
      handleSelectChange={mockFunction}
      handleSubmit={mockFunction}
      formTitle="Log into Your Account"
    />);
    expect(wrapper.find('div')).toHaveLength(7);
    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find(DSelectInput)).toHaveLength(1);
    expect(wrapper.find('input.hs-button')).toHaveLength(1);
  });

  it('renders all elements when there are text areas', () => {
    const textArea = {
      description: {
        value: '',
        required: true,
        placeholder: 'Enter the description of the request',
      },
    };
    const errors = {};
    const formLinks = {
      label: "Don't have an account?",
      link: '/signup',
      text: 'Create one',
    };
    const inputs = {};
    const wrapper = shallow(<Form
      inputs={inputs}
      textAreas={textArea}
      errors={errors}
      formLinks={formLinks}
      handleInputChange={mockFunction}
      handleTextAreaChange={mockFunction}
      handleSubmit={mockFunction}
      formTitle="Log into Your Account"
    />);
    expect(wrapper.find('div')).toHaveLength(7);
    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find(DTextArea)).toHaveLength(1);
    expect(wrapper.find('input.hs-button')).toHaveLength(1);
  });
  it('uses default props when not supplied', () => {
    expect(Form.defaultProps.handleSelectChange).toBeDefined();
    expect(Form.defaultProps.handleTextAreaChange).toBeDefined();
    const result = Form.defaultProps.handleTextAreaChange();
    expect(result).toBe(null);
    const select = Form.defaultProps.handleSelectChange();
    expect(select).toBe(null);
  });
});
