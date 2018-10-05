import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DefaultHome from '../features/home/Home';
import DefaultDashboard from '../features/home/Dashboard';
import DefaultLogin from '../features/authentication/login/Login';
import DefaultSignUp from '../features/authentication/sign-up/SignUp';
import DefaultRequests from '../features/requests/user-requests/Requests';
import DefaultViewRequests from '../features/requests/ViewRequest';
import DefaultCreateRequest from '../features/requests/user-requests/CreateRequest';
import DefaultUpdateRequest from '../features/requests/user-requests/UpdateRequest';

const routes = (
  <Switch>
    <Route path="/requests/create" component={DefaultCreateRequest} />
    <Route path="/dashboard" component={DefaultDashboard} exact />
    <Route path="/login" component={DefaultLogin} />
    <Route path="/signup" component={DefaultSignUp} />
    <Route path="/requests" component={DefaultRequests} exact />
    <Route path="/requests/:requestId" component={DefaultViewRequests} exact />
    <Route path="/requests/:requestId/edit" component={DefaultUpdateRequest} />
    <Route path="/" component={DefaultHome} exact />
  </Switch>
);

export default routes;
