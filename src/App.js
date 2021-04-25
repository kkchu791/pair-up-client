import { Main } from './components/desktop';
import { Main as MobileMain } from './components/mobile';
import './App.css';
import { AuthProvider } from './context';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useMediaQuery } from '@material-ui/core';

function App() {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <div className="App">
      <Provider store={store}>
        <AuthProvider>
          { isMobile ? <MobileMain /> : <Main /> }
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
