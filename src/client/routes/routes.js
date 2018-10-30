import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DefaultHome from '../features/home/Home';
import DefaultLogin from '../features/authentication/login/Login';
import DefaultSignUp from '../features/authentication/sign-up/SignUp';
import DefaultAuthenticate from '../features/authentication/Authenticate';

const routes = (
  <Switch>
    <Route path="/login" component={DefaultLogin} />
    <Route path="/signup" component={DefaultSignUp} />
    <Route path="/" component={DefaultHome} exact />
    <Route component={DefaultAuthenticate} />
  </Switch>
);

export default routes;
