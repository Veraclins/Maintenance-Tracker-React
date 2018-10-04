import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import RootApp from './App';
import configureStore from './store/store';
import history from './shared/utilities/history';

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <RootApp history={history} />
  </Provider>,
  document.getElementById('root'),
);
