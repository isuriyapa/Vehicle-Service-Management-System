import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CustomersContextProvider } from './context/CustomersContext';
import { SuppliersContextProvider } from './context/SuppliersContext';
import { AuthContextProvider } from './context/AuthContext';
import { GlobalStyle } from './styles/GlobalStyle';
import { GlobalProvider } from './context/globalContext';
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <CustomersContextProvider>
          <SuppliersContextProvider>
            <GlobalStyle />
            <GlobalProvider>
              <App />
            </GlobalProvider>
          </SuppliersContextProvider>
        </CustomersContextProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
