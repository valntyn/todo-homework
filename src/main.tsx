import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from './App';
import { ThemeContextProvider } from './context/ThemeContext';
import { persistor, store } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
