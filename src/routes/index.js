import React from 'react';
import { Switch } from 'react-router-dom';
import Signin from '~/pages/Signin';
import Signup from '~/pages/Signup';
import Profile from '~/pages/Profile';
import Dashboard from '~/pages/Dashboard';

/** Custom Route */
import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/register" component={Signup} />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
