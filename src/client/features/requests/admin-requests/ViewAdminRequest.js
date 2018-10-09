import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { PropTypes } from 'prop-types';
import history from '../../../shared/utilities/history';
import ViewRequests from '../ViewRequest';
import { adminViewRequest, adminUpdateRequest } from './adminRequestsAction';


export class ViewAdminRequest extends Component {
  componentDidMount() {
    const {
      match, location, viewRequest, isLoggedIn, user, isAdmin,
    } = this.props;
    if (!isLoggedIn) {
      toastr.error('You must be logged in to view a request');
      return history.push('/login', { from: location.pathname });
    }
    if (!isAdmin) {
      toastr.error('You you do not have permission to view that page');
      return history.push('/dashboard');
    }
    const { params } = match;
    return viewRequest(user, params.requestId);
  }

  updateRequest = (event) => {
    const { user, updateRequest, request } = this.props;
    const status = event.target.id;
    updateRequest(request, status, user);
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
                updateRequest={this.updateRequest}
              />
            ) : (
              <div className="single_request_column">
                <div className="single_request_info">
                  <h3 className="no_request_found">You don{"'"}t have a request with that Id</h3>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}


ViewAdminRequest.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  viewRequest: PropTypes.func.isRequired,
  updateRequest: PropTypes.func.isRequired,
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
  viewRequest: (user, requestId) => dispatch(adminViewRequest(user, requestId)),
  updateRequest: (request, status, user) => dispatch(adminUpdateRequest(request, status, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewAdminRequest);
