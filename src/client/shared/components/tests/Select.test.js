import React from 'react';
import { shallow } from 'enzyme';

import { SelectInput } from '../Select';

const mockFunction = jest.fn();
describe('Test the Form component', () => {
  it('renders without crashing', () => {
    const options = [
      { value: '', label: 'Select Device Type' },
      { value: 'Laptop', label: 'Laptop Pc' },
    ];
    const wrapper = shallow(<SelectInput
      name="input"
      required
      options={options}
      inputLabel="Text input"
      value=""
      placeholder="enter text"
      autoComplete="on"
      handleChange={mockFunction}
    />);
    expect(wrapper.find('select')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
