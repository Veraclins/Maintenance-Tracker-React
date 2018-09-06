import React from 'react';
import { shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import App from '../App';

const history = createBrowserHistory();


it('renders without crashing', () => {
  const wrapper = shallow(<App history={history} />);
  expect(wrapper.find('div'));
  expect(wrapper.find('NavBar'));
  expect(wrapper.find('Switch'));
  expect(wrapper).toMatchSnapshot();
});
