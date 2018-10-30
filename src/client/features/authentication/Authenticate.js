import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { PropTypes } from 'prop-types';
import history from '../../shared/utilities/history';
import DefaultDashboard from '../dashboard/Dashboard';
import DefaultRequests from '../requests/user-requests/UserRequests';
import DefaultCreateRequest from '../requests/user-requests/CreateRequest';
import DefaultUpdateRequest from '../requests/user-requests/UpdateRequest';
import DefaultViewUserRequest from '../requests/user-requests/ViewUserRequest';
import DefaultAdmin from '../requests/admin-requests/Admin';

export class Authenticate extends Component {
  componentDidMount() {
    const { location, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      toastr.error('You must be logged in to view that page');
      return history.push('/login', { from: location.pathname });
    }
    return true;
  }

  render() {
    const { isLoggedIn } = this.props;
    return isLoggedIn ? (
      <Switch>
        <Route path="/dashboard" component={DefaultDashboard} exact />
        <Route path="/requests/create" component={DefaultCreateRequest} />
        <Route path="/requests/:requestId" component={DefaultViewUserRequest} exact />
        <Route path="/requests/:requestId/edit" component={DefaultUpdateRequest} />
        <Route path="/requests" component={DefaultRequests} exact />
        <Route component={DefaultAdmin} exact />
      </Switch>
    ) : null;
  }
}


Authenticate.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
};

export const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  location: state.router.location,
});

export default connect(mapStateToProps)(Authenticate);
