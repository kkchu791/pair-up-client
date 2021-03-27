import { Main } from './components';
import './App.css';
import { AuthProvider } from './context';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
