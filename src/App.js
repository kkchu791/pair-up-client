
import React from 'react';
import { Main } from './components/desktop';
import { Main as MobileMain } from './components/mobile';
import './App.css';
import { AuthProvider } from './context';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useMediaQuery } from '@material-ui/core';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const App = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div className="App">
      <Provider store={store}>
        <AuthProvider>
          <HelmetProvider>
            <Helmet>
              <meta charSet="utf-8" />
              <title>
                Greatness Go - {process.env.NODE_ENV}
              </title>
              <link rel="greatness go" href="https://greatnessgo.com/" />
            </Helmet>
            { isMobile ? <MobileMain /> : <Main /> }
          </HelmetProvider>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
