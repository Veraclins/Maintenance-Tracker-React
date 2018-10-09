import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './styles/styles.css';
import routes from './routes/routes';
import DHeader from './shared/layouts/Header';
import DFooter from './shared/layouts/Footer';
import Spinner from './shared/loaders/Spinner';

export const App = ({ history, loading }) => (
  <ConnectedRouter history={history}>
    <React.Fragment>
      <DHeader />
      {loading ? <Spinner /> : false}
      <main className="main-app-body">
        { routes }
      </main>
      <DFooter />
    </React.Fragment>
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.shape({}).isRequired,
};


App.propTypes = {
  history: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => ({
  loading: state.common.loading,
});

export default connect(mapStateToProps)(App);
