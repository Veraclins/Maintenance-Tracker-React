import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getAllAdminRequests } from './adminRequestsAction';
import Request from '../Requests';
import { fetchRequest } from '../requestHelper';


export class AdminRequests extends Component {
  componentDidMount() {
    return fetchRequest(this.props);
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
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
  user: state.auth.user,
  requests: state.requests.requests,
});
export const mapDispatchToProps = dispatch => ({
  getRequests: user => dispatch(getAllAdminRequests(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminRequests);
