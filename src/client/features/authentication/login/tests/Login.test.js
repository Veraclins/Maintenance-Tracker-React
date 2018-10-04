import React from 'react';
import { shallow } from 'enzyme';

import Login from '../Login';

const mockFunction = jest.fn();
const errors = {
  password: ['The password field is required'],
};
const values = {
  emailOrUsername: '',
  password: '',
};

describe('Test the login presentation component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Login
      handleChange={mockFunction}
      handleSubmit={mockFunction}
      errors={errors}
      values={values}
    />);
    expect(wrapper.find('div'));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render without errors', () => {
    const wrapper = shallow(<Login
      handleChange={mockFunction}
      handleSubmit={mockFunction}
      errors={errors}
      values={values}
    />);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(2);
  });
});
