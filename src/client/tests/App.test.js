import React from 'react';
import { shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import { App } from '../App';

const history = createBrowserHistory();
const loading = false;


it('renders without crashing', () => {
  const wrapper = shallow(<App history={history} loading={loading} />);
  expect(wrapper.find('div'));
  expect(wrapper.find('NavBar'));
  expect(wrapper.find('Switch'));
  expect(wrapper).toMatchSnapshot();
});
it('renders the loader', () => {
  const wrapper = shallow(<App history={history} loading />);
  expect(wrapper.find('div'));
  expect(wrapper.find('Spinner'));
});
