import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { PropTypes } from 'prop-types';
import history from '../../../shared/utilities/history';
import DefaultAdminRequests from './AdminRequests';
import DefaultViewAdminRequest from './ViewAdminRequest';


export class Admin extends Component {
  componentDidMount() {
    const { isAdmin } = this.props;
    if (!isAdmin) {
      toastr.error('You you do not have permission to view that page');
      return history.push('/dashboard');
    }
    return true;
  }

  render() {
    const { isAdmin } = this.props;
    return isAdmin ? (
      <Switch>
        <Route path="/admin" component={DefaultAdminRequests} exact />
        <Route path="/admin/:requestId" component={DefaultViewAdminRequest} exact />
      </Switch>
    ) : null;
  }
}


Admin.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
});


export default connect(mapStateToProps)(Admin);
