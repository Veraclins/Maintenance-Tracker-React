import React from 'react';
import { shallow } from 'enzyme';

import { Input } from '../Input';

const mockFunction = jest.fn();
describe('Test the Form component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Input
      type="text"
      name="input"
      required
      inputLabel="Text input"
      value=""
      placeholder="enter text"
      autoComplete="on"
      handleChange={mockFunction}
    />);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
