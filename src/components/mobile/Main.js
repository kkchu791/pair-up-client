import React from 'react';
import { Login } from './Login';
import { Home } from './Home';
import { SignUp } from './SignUp';
import { PATH } from '../../constants';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export const Main = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={PATH.ROOT}>
          <Home />
        </Route>
        <Route path={PATH.LOGIN}>
          <Login />
        </Route>
        <Route path={PATH.SIGNUP}>
          <SignUp />
        </Route>
      </Switch>
    </Router>
  )
}

export default Main;