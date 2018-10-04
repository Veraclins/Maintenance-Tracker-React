import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../features/home/Home';
import Dashboard from '../features/home/Dashboard';
import DefaultLogin from '../features/authentication/login/Login';
import DefaultSignUp from '../features/authentication/sign-up/SignUp';
import DefaultRequests from '../features/requests/user-requests/Requests';
import DefaultViewRequests from '../features/requests/ViewRequest';
import DefaultCreateRequest from '../features/requests/user-requests/CreateRequest';

const routes = (
  <Switch>
    <Route path="/requests/create" component={DefaultCreateRequest} />
    <Route path="/dashboard" component={Dashboard} exact />
    <Route path="/login" component={DefaultLogin} />
    <Route path="/signup" component={DefaultSignUp} />
    <Route path="/requests" component={DefaultRequests} exact />
    <Route path="/requests/:requestId" component={DefaultViewRequests} />
    <Route path="/" component={Home} exact />
  </Switch>
);

export default routes;
