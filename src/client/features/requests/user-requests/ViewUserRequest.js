import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { PropTypes } from 'prop-types';
import history from '../../../shared/utilities/history';
import { getSingleRequest } from './userRequestsAction';
import ViewRequests from '../ViewRequest';


export class ViewUserRequest extends Component {
  componentDidMount() {
    const {
      match, location, fetchRequest, isLoggedIn, user,
    } = this.props;
    if (!isLoggedIn) {
      toastr.error('You must be logged in to view a request');
      return history.push('/login', { from: location.pathname });
    }
    const { params } = match;
    return fetchRequest(user, params.requestId);
  }

  render() {
    const { request, isAdmin } = this.props;
    return (
      <div className="request_content_layout body_gradient">
        <div className="container">
          {request.id
            ? (
              <ViewRequests
                request={request}
                isAdmin={isAdmin}
              />
            ) : (
              <div className="single_request_column">
                <div className="single_request_info">
                  <h3 className="no_request_found">You don{"'"}t have a request with that ID</h3>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}


ViewUserRequest.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  fetchRequest: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  request: PropTypes.shape({}).isRequired,
};

export const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
  user: state.auth.user,
  location: state.router.location,
  request: state.requests.currentRequest,
});
export const mapDispatchToProps = dispatch => ({
  fetchRequest: (user, requestId) => dispatch(getSingleRequest(user, requestId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserRequest);
