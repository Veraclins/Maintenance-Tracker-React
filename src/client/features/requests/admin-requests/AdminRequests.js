import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { PropTypes } from 'prop-types';
import history from '../../../shared/utilities/history';
import { getAllAdminRequests } from './adminRequestsAction';
import Request from '../Requests';


export class AdminRequests extends Component {
  componentDidMount() {
    const {
      location, getRequests, isLoggedIn, user, isAdmin,
    } = this.props;
    if (!isLoggedIn) {
      toastr.error('You must be logged in to view your requests');
      return history.push('/login', { from: location.pathname });
    }
    if (!isAdmin) {
      toastr.error('You you do not have permission to view that page');
      return history.push('/dashboard');
    }
    return getRequests(user);
  }

  render() {
    const { requests, isAdmin } = this.props;
    const noRequestMessage = 'There are no requests yet';
    return (
      <Request
        requests={requests}
        isAdmin={isAdmin}
        noRequestMessage={noRequestMessage}
      />
    );
  }
}

AdminRequests.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  getRequests: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
  user: state.auth.user,
  location: state.router.location,
  requests: state.requests.requests,
});
export const mapDispatchToProps = dispatch => ({
  getRequests: user => dispatch(getAllAdminRequests(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminRequests);
