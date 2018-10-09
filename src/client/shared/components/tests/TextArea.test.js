import React from 'react';
import { shallow } from 'enzyme';

import { TextArea } from '../TextArea';

const mockFunction = jest.fn();
describe('Test the Form component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<TextArea
      name="input"
      required
      inputLabel="Text input"
      value=""
      placeholder="enter text"
      autoComplete="on"
      handleChange={mockFunction}
    />);
    expect(wrapper.find('textarea')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
