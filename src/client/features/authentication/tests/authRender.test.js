import React from 'react';
import { shallow } from 'enzyme';

import AuthRender from '../AuthRender';
import FormComponent from '../../../shared/components/Form';

const self = {
  props: {},
};

describe('Tests the login component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<AuthRender
      self={self}
    />);
    expect(wrapper.find(FormComponent)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});
