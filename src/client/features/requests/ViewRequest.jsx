import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import toastr from 'toastr';
import { PropTypes } from 'prop-types';
import history from '../../shared/utilities/history';
import { getSingleRequest } from './user-requests/userRequestsAction';


export class ViewRequest extends Component {
  componentDidMount() {
    const {
      match, location, fetchRequest, isLoggedIn, user,
    } = this.props;
    if (!isLoggedIn) {
      toastr.error('You must be logged to rate an article');
      return history.push('/login', { from: location.pathname });
    }
    const { params } = match;
    return fetchRequest(user, params.requestId);
  }

  render() {
    const { request } = this.props;
    return (
      <div className="request_content_layout body_gradient">
        <div className="container">
          {request.id
            ? (
              <div className="single_request_column">
                <div className="single_request_info">
                  <time>{moment(request.created_at).format('Do_MMMM_YYYY')}</time>
                  <span className="request_status">{request.status}</span>
                  <h3 className="single_request_title">{request.title}</h3>
                  <h4>{request.device}</h4>
                  <p className="single_request_body">
                    {request.description}
                  </p>
                  <Link to={`/requests/${request.id}/update`} className="edit_request_link"> <span>EDIT</span></Link>
                </div>
              </div>
            ) : <h3 className="single_request_title">No request with the given id</h3>}
        </div>
      </div>
    );
  }
}


ViewRequest.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  fetchRequest: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  request: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  user: state.auth.user,
  location: state.router.location,
  request: state.requests.currentRequest,
});
const mapDispatchToProps = dispatch => ({
  fetchRequest: (user, requestId) => dispatch(getSingleRequest(user, requestId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewRequest);
