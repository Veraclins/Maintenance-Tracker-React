import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import { ViewRequest } from '../ViewRequest';

const request = {
  id: 13,
  user_id: 2,
  title: 'General repainting',
  device: 'Smartphone',
  description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
  status: 'pending',
  created_at: '2018-10-06T23:14:25.294Z',
  updated_at: '2018-10-06T23:14:25.294Z',
};

const mockFunction = jest.fn();

describe('Test the ViewRequest component', () => {
  it('renders with the right view for a user', () => {
    const isAdmin = false;
    const wrapper = shallow(<ViewRequest
      request={request}
      isAdmin={isAdmin}
      updateRequest={mockFunction}
    />);
    expect(wrapper.find('div')).toHaveLength(3);
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders with the right view for an admin', () => {
    const isAdmin = true;
    const wrapper = shallow(<ViewRequest
      request={request}
      isAdmin={isAdmin}
      updateRequest={mockFunction}
    />);
    expect(wrapper.find('div')).toHaveLength(3);
    expect(wrapper.find('a')).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });
});
