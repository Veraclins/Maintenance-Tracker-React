import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getAllRequests } from './userRequestsAction';
import Request from '../Requests';


export class UserRequests extends Component {
  componentDidMount() {
    const { getRequests, user } = this.props;
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
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  getRequests: PropTypes.func.isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
  user: state.auth.user,
  requests: state.requests.requests,
});
export const mapDispatchToProps = dispatch => ({
  getRequests: user => dispatch(getAllRequests(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRequests);
