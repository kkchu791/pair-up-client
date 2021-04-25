import React, {Suspense} from 'react';
import { Login } from './Login';
import { Dashboard } from './Dashboard';
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
          <Suspense fallback={<h1>Loading Dashboard...</h1>} >
            <Layout>
              <Dashboard />
            </Layout>
          </Suspense>
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