import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { PropTypes } from 'prop-types';
import history from '../../../shared/utilities/history';
import { getAllRequests } from './userRequestsAction';
import Request from '../Requests';


export class UserRequests extends Component {
  componentDidMount() {
    const {
      location, getRequests, isLoggedIn, user,
    } = this.props;
    if (!isLoggedIn) {
      toastr.error('You must be logged in to view your requests');
      return history.push('/login', { from: location.pathname });
    }
    return getRequests(user);
  }

  render() {
    const { requests, isAdmin } = this.props;
    const noRequestMessage = "You don't have any request yet";
    return (
      <Request
        requests={requests}
        isAdmin={isAdmin}
        noRequestMessage={noRequestMessage}
      />
    );
  }
}


UserRequests.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  getRequests: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
  isLoggedIn: state.auth.isAuthenticated,
  user: state.auth.user,
  location: state.router.location,
  requests: state.requests.requests,
});
export const mapDispatchToProps = dispatch => ({
  getRequests: user => dispatch(getAllRequests(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRequests);
