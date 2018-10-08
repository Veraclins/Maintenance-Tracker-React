import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ViewRequest = ({ request, isAdmin, updateRequest }) => (
  <div className="single_request_column">
    <div className="single_request_info">
      <time>{moment(request.created_at).format('Do_MMMM_YYYY')}</time>
      <span className="request_status">{request.status}</span>
      <h3 className="single_request_title">{request.title}</h3>
      <h4>{request.device}</h4>
      <p className="single_request_body">
        {request.description}
      </p>
      {!isAdmin
        ? (
          <div className="request_footer">
            {request.updatedAt > request.createdAt
              ? (<span className="edited_flag"><small>edited</small></span>)
              : false}
            {request.status === 'pending' || request.status === 'disapproved'
              ? (
                <Link to={`/requests/${request.id}/edit`} className="edit_request_link">
                  <span>EDIT</span>
                </Link>
              ) : false}
          </div>
        ) : (
          <div className="request_footer">
            {request.status === 'pending'
              ? (
                <React.Fragment>
                  <a className="buttons button_small" id="disapprove" onClick={updateRequest}>Disapprove</a>
                  <a className="buttons button_small button_right" id="approve" onClick={updateRequest}>Approve</a>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {request.status === 'approved'
                    ? (
                      <React.Fragment>
                        <a className="buttons button_small" id="disapprove" onClick={updateRequest}>Disapprove</a>
                        <a className="buttons button_small button_right" id="resolve" onClick={updateRequest}>Resolve</a>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {request.status === 'disapproved'
                          ? (
                            <React.Fragment>
                              <a className="buttons button_small button_right" id="approve" onClick={updateRequest}>Approve</a>
                            </React.Fragment>
                          ) : false}
                      </React.Fragment>
                    )}
                </React.Fragment>
              )}
          </div>
        )}
    </div>
  </div>
);

ViewRequest.propTypes = {
  request: PropTypes.shape({}).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  updateRequest: PropTypes.func,
};

ViewRequest.defaultProps = {
  updateRequest: () => null,
};

export default ViewRequest;
