import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const requestMapper = (requests, path) => requests.map(request => (
  <div className="request_details" key={request.id}>
    <span className="request_title">{request.title}</span>
    <span className="request_button">
      <Link
        className="buttons button_small"
        to={`/${path}/${request.id}`}
      >
          View
      </Link>
    </span>
  </div>
));

const renderRequest = (requests, action, path) => (
  <div className="request_category">
    <h3 className="category_name">{action}</h3>
    <div className="span_desc">
      {requestMapper(requests, path)}
    </div>
    <div className="clear" />
  </div>
);

const requestHeader = (requests, isAdmin, noRequestMessage) => (
  <div className="request_header">
    {requests.length !== 0
      ? (
        <p>
          {`These are all ${isAdmin ? 'the' : 'your'}  requests`}
        </p>
      )
      : (
        <div className="no_content">
          <p className="no_requests">{noRequestMessage}</p>
          {!isAdmin
            ? (
              <Link
                to="/requests/create"
                className="buttons button_default"
              >
                MAKE A REQUEST
              </Link>
            ) : false}
        </div>
      )}
  </div>
);

const filterRequest = requests => ({
  pending: requests.filter(request => request.status === 'pending'),
  approved: requests.filter(request => request.status === 'approved'),
  disapproved: requests.filter(request => request.status === 'disapproved'),
  resolved: requests.filter(request => request.status === 'resolved'),
});

export const Requests = ({ requests, noRequestMessage, isAdmin }) => {
  const filteredRequest = filterRequest(requests);
  const {
    pending,
    approved,
    disapproved,
    resolved,
  } = filteredRequest;
  const path = isAdmin ? 'admin' : 'requests';
  return (
    <div className="request_content_layout body_gradient">
      <div className="container">
        {requestHeader(requests, isAdmin, noRequestMessage)}
        {pending.length !== 0
          ? renderRequest(pending, 'Pending', path) : false}
        <div className="clear" />
        {approved.length !== 0
          ? renderRequest(approved, 'Approved', path) : false}
        <div className="clear" />
        {disapproved.length !== 0
          ? renderRequest(disapproved, 'Disapproved', path) : false}
        <div className="clear" />
        {resolved.length !== 0
          ? renderRequest(resolved, 'Resolved', path) : false}
        <div className="clear" />
      </div>
    </div>
  );
};

Requests.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  noRequestMessage: PropTypes.string.isRequired,
};

export default Requests;
