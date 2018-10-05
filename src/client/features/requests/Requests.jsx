import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Requests = ({ requests, noRequestMessage, isAdmin }) => {
  const pending = requests.filter(request => request.status === 'pending');
  const approved = requests.filter(request => request.status === 'approved');
  const disapproved = requests.filter(request => request.status === 'disapproved');
  const resolved = requests.filter(request => request.status === 'resolved');
  const path = isAdmin ? 'admin' : 'requests';
  return (
    <div className="request_content_layout body_gradient">
      <div className="container">
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
        {pending.length !== 0
          ? (
            <div className="request_category">
              <h3 className="category_name">Pending</h3>
              <div className="span_desc">
                {pending.map(request => (
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
                        to={`/${path}/${request.id}`}
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
                ))}
              </div>
              <div className="clear" />
            </div>
          ) : false}
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
