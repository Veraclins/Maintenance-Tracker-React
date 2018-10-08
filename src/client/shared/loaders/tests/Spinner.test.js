import React from 'react';
import { shallow } from 'enzyme';

import Spinner from '../Spinner';

describe('Test the Spinner component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('nav')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
