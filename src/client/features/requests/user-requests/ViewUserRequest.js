import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getSingleRequest } from './userRequestsAction';
import ViewRequests from '../ViewRequest';


export class ViewUserRequest extends Component {
  componentDidMount() {
    const { match, fetch, user } = this.props;
    const { params } = match;
    return fetch(user, params.requestId);
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
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  fetch: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  request: PropTypes.shape({}).isRequired,
};

export const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
  user: state.auth.user,
  request: state.requests.currentRequest,
});
export const mapDispatchToProps = dispatch => ({
  fetch: (user, requestId) => dispatch(getSingleRequest(user, requestId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserRequest);
