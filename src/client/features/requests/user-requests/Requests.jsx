import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { PropTypes } from 'prop-types';
import history from '../../../shared/utilities/history';
import { getAllRequests } from './userRequestsAction';


export class Requests extends Component {
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
    const { requests } = this.props;
    const pending = requests.filter(request => request.status === 'pending');
    const approved = requests.filter(request => request.status === 'approved');
    const disapproved = requests.filter(request => request.status === 'disapproved');
    const resolved = requests.filter(request => request.status === 'resolved');
    return (
      <div className="request_content_layout body_gradient">
        <div className="container">
          <div className="request_header">
            {requests.length !== 0
              ? <p>These are your requests so far</p>
              : (
                <div className="no_content">
                  <p className="no_requests">You don{"'"}t have any request yet</p>
                  <Link
                    to="/requests/create"
                    className="buttons button_default"
                  >
                    MAKE A REQUEST
                  </Link>
                </div>
              )}
          </div>
          {pending.length !== 0
            ? (
              <div className="request_category">
                <h3 className="category_name">Pending</h3>
                <div className="span_desc">
                  {pending.map(request => (
                    <div className="request_details">
                      <span className="request_title">{request.title}</span>
                      <span className="request_button">
                        <Link
                          className="buttons button_small"
                          to={`/requests/${request.id}`}
                        >
                            View
                        </Link>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="clear" />
              </div>
            ) : false}
          <div className="clear" />
          {approved.length !== 0
            ? (
              <div className="request_category">
                <h3 className="category_name">Approved</h3>
                <div className="span_desc">
                  {approved.map(request => (
                    <div className="request_details" key={request.id}>
                      <span className="request_title">{request.title}</span>
                      <span className="request_button">
                        <Link
                          className="buttons button_small"
                          to={`/requests/${request.id}`}
                        >
                            View
                        </Link>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="clear" />
              </div>
            ) : false}
          <div className="clear" />
          {disapproved.length !== 0
            ? (
              <div className="request_category">
                <h3 className="category_name">Disapproved</h3>
                <div className="span_desc">
                  {disapproved.map(request => (
                    <div className="request_details">
                      <span className="request_title">{request.title}</span>
                      <span className="request_button">
                        <Link
                          className="buttons button_small"
                          to={`/requests/${request.id}`}
                        >
                            View
                        </Link>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="clear" />
              </div>
            ) : false}
          <div className="clear" />
          {resolved.length !== 0
            ? (
              <div className="request_category">
                <h3 className="category_name">Resolved</h3>
                <div className="span_desc">
                  {resolved.map(request => (
                    <div className="request_details">
                      <span className="request_title">{request.title}</span>
                      <span className="request_button">
                        <Link
                          className="buttons button_small"
                          to={`/requests/${request.id}`}
                        >
                            View
                        </Link>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="clear" />
              </div>
            ) : false}
          <div className="clear" />
        </div>
      </div>
    );
  }
}


Requests.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  getRequests: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  user: state.auth.user,
  location: state.router.location,
  requests: state.requests.requests,
});
const mapDispatchToProps = dispatch => ({
  getRequests: user => dispatch(getAllRequests(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
