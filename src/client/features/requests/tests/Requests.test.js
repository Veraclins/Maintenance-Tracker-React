import React from 'react';
import { shallow } from 'enzyme';

import { Requests } from '../Requests';

const user = {
  firstName: 'Clinton',
  lastName: 'Agada',
};
const location = {
  pathname: '',
};
const userReq = [
  {
    id: 1,
    user_id: 2,
    title: 'Excellent Work',
    device: 'Desktop',
    description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
    status: 'disapproved',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:25.357Z',
  },
  {
    id: 13,
    user_id: 2,
    title: 'General repainting',
    device: 'Smartphone',
    description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
    status: 'pending',
    created_at: '2018-10-06T23:14:25.294Z',
    updated_at: '2018-10-06T23:14:25.294Z',
  },
  {
    id: 12,
    user_id: 2,
    title: 'General repainting',
    device: 'Smartphone',
    description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
    status: 'pending',
    created_at: '2018-10-06T23:14:10.132Z',
    updated_at: '2018-10-06T23:14:10.132Z',
  },
  {
    id: 4,
    user_id: 2,
    title: 'Routine Maintenance',
    device: 'Smartphone',
    description: 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.',
    status: 'resolved',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:09.985Z',
  },
  {
    id: 7,
    user_id: 4,
    title: 'Routine Maintenance',
    device: 'Desktop',
    description: 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.',
    status: 'pending',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:09.748Z',
  },
  {
    id: 8,
    user_id: 3,
    title: 'Routine Maintenance',
    device: 'Tablet',
    description: 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.',
    status: 'pending',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:09.748Z',
  },
];
const adminReq = [
  {
    id: 1,
    user_id: 2,
    title: 'Excellent Work',
    device: 'Desktop',
    description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
    status: 'disapproved',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:25.357Z',
  },
  {
    id: 13,
    user_id: 2,
    title: 'General repainting',
    device: 'Smartphone',
    description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
    status: 'pending',
    created_at: '2018-10-06T23:14:25.294Z',
    updated_at: '2018-10-06T23:14:25.294Z',
  },
  {
    id: 12,
    user_id: 2,
    title: 'General repainting',
    device: 'Smartphone',
    description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
    status: 'pending',
    created_at: '2018-10-06T23:14:10.132Z',
    updated_at: '2018-10-06T23:14:10.132Z',
  },
  {
    id: 4,
    user_id: 2,
    title: 'Routine Maintenance',
    device: 'Smartphone',
    description: 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.',
    status: 'resolved',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:09.985Z',
  },
  {
    id: 7,
    user_id: 4,
    title: 'Routine Maintenance',
    device: 'Desktop',
    description: 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.',
    status: 'pending',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:09.748Z',
  },
  {
    id: 8,
    user_id: 3,
    title: 'Routine Maintenance',
    device: 'Tablet',
    description: 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.',
    status: 'pending',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:09.748Z',
  },
  {
    id: 2,
    user_id: 2,
    title: 'Browsers Crash Always',
    device: 'Laptop',
    description: 'The quarterly routine maintenance service for the Elepaq 3.5KVA Generator is long overdue and necessary in order to forestall total breakdown. The love of the lord is the beginning of wisdom.',
    status: 'pending',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:09.748Z',
  },
  {
    id: 10,
    user_id: 3,
    title: 'Routine Maintenance',
    device: 'Smartphone',
    description: 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.',
    status: 'pending',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:09.748Z',
  },
  {
    id: 11,
    user_id: 2,
    title: 'Battery Problem',
    device: 'Laptop',
    description: 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.',
    status: 'pending',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:09.748Z',
  },
  {
    id: 9,
    user_id: 3,
    title: 'Faulty Touch Pad',
    device: 'Smartphone',
    description: 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.',
    status: 'pending',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:09.748Z',
  },
  {
    id: 3,
    user_id: 2,
    title: 'Screen Problems',
    device: 'Tablet',
    description: 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.',
    status: 'pending',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:09.748Z',
  },
  {
    id: 5,
    user_id: 2,
    title: 'Routine Maintenance',
    device: 'Laptop',
    description: 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.',
    status: 'pending',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:09.748Z',
  },
  {
    id: 6,
    user_id: 3,
    title: 'Intermitent freezing of apps',
    device: 'Smartphone',
    description: 'If you are passing parameters to your queries you will want to avoid string concatenating parameters into the query text directly. This can lead to sql injection vulnerabilities. node-postgres supports paramterized queries, passing your query text unaltered as well as your parameters to the PostgreSQL server where the parameters are safely substituted into the query with battle-tested parameter substitution code within the server itself.',
    status: 'pending',
    created_at: '2018-10-06T23:14:09.748Z',
    updated_at: '2018-10-06T23:14:09.748Z',
  },
];
const mockFunction = jest.fn();
const noRequestMessage = "You don't have any request yet";

describe('Test the Requests component', () => {
  it('renders with the right view for a logged in user with no request', () => {
    const isLoggedIn = true;
    const isAdmin = false;
    const requests = [];
    const wrapper = shallow(<Requests
      requests={requests}
      isAdmin={isAdmin}
      getRequests={mockFunction}
      user={user}
      location={location}
      isLoggedIn={isLoggedIn}
      noRequestMessage={noRequestMessage}
    />);
    expect(wrapper.find('div')).toHaveLength(8);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders with the right view for a logged in user with some requests', () => {
    const isLoggedIn = true;
    const isAdmin = false;
    const requests = userReq;
    const wrapper = shallow(<Requests
      requests={requests}
      isAdmin={isAdmin}
      getRequests={mockFunction}
      user={user}
      location={location}
      isLoggedIn={isLoggedIn}
      noRequestMessage={noRequestMessage}
    />);
    expect(wrapper.find('div')).toHaveLength(22);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders with the right view for a logged in user', () => {
    const isLoggedIn = true;
    const isAdmin = true;
    const requests = adminReq;
    const wrapper = shallow(<Requests
      requests={requests}
      isAdmin={isAdmin}
      getRequests={mockFunction}
      user={user}
      location={location}
      isLoggedIn={isLoggedIn}
      noRequestMessage={noRequestMessage}
    />);
    expect(wrapper.find('div')).toHaveLength(29);
    expect(wrapper).toMatchSnapshot();
  });
});
