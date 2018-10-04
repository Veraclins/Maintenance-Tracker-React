import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './styles/styles.css';
import routes from './routes/routes';
import Header from './shared/layouts/Header';
import Footer from './shared/layouts/Footer';
import Spinner from './shared/loaders/Spinner';

export const App = ({ history, loading }) => (
  <ConnectedRouter history={history}>
    <React.Fragment>
      <Header />
      {loading ? <Spinner /> : false}
      <main className="main-app-body">
        { routes }
      </main>
      <Footer />
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

const mapStateToProps = state => ({
  loading: state.common.loading,
});

export default connect(mapStateToProps)(App);
