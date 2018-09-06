import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../shared/layouts/Header';
import Home from '../features/home/Home';
import LoginContainer from '../features/authentication/login/LoginContainer';
import Footer from '../shared/layouts/Footer';

const routes = (
  <div>
    <Header />
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={LoginContainer} />
    </Switch>
    <Footer />
  </div>
);

export default routes;
