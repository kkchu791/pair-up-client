import React from 'react';
import { Login } from './Login';
import { QuickSched } from './QuickSched';
import { Calendar } from './Calendar';
import { Home } from './Home';
import { SignUp } from './SignUp';
import { Layout } from './Layout';
import { UserProfile } from './UserProfile';
import { Sessions } from './Sessions';
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
        <Route path={PATH.DASHBOARD}>
          <Layout>
            <QuickSched />
          </Layout>
        </Route>
        <Route path={PATH.CALENDAR}>
          <Layout>
            <Calendar />
          </Layout>
        </Route>
        <Route path={PATH.SESSIONS}>
          <Layout>
            <Sessions />
          </Layout>
        </Route>
        <Route
          path={PATH.USER}
          component={UserProfile}
        />
      </Switch>

    </Router>
  )
}

export default Main;