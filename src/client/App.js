import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import './styles/styles.css';
import routes from './routes/routes';

export const App = ({ history }) => (
  <ConnectedRouter history={history}>
    { routes }
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default App;
