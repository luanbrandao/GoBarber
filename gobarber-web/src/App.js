import React from 'react';
// atualiza a page apenas depois de buscas o conteúdo no storage
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import './config/ReactotronConfig';

import { Provider } from 'react-redux';
import history from './services/history';
import Routes from './routes';
import {store , persistor} from './store';
import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Router history={history}>
        <Routes />
        <GlobalStyle />
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
