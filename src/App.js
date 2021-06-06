
import React from 'react';
import { Main } from './components/desktop';
import { Main as MobileMain } from './components/mobile';
import './App.css';
import { AuthProvider } from './context';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useMediaQuery } from '@material-ui/core';
import { Helmet } from 'react-helmet';

const App = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div className="App">
      <Provider store={store}>
        <AuthProvider>
          <Helmet>
            <meta charSet="utf-8" />
            <title>
              Greatness Go - {process.env.NODE_ENV}
            </title>
            <link rel="greatness go" href="https://greatnessgo.com/" />
          </Helmet>
          { isMobile ? <MobileMain /> : <Main /> }
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
