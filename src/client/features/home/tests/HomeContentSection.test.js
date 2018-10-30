import React from 'react';
import { shallow } from 'enzyme';

import HomeContentSection from '../HomeContentSection';

describe('Test the HomeContentSection component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<HomeContentSection />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all sections', () => {
    const wrapper = shallow(<HomeContentSection />);
    expect(wrapper.find('div.technical_layout_right')).toHaveLength(1);
    expect(wrapper.find('div.technical_layout_left')).toHaveLength(1);
    expect(wrapper.find('div.section_viewer')).toHaveLength(3);
    expect(wrapper.find('div.home_timeline_section')).toHaveLength(1);
  });
});
