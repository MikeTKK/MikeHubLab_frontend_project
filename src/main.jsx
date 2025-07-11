import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*----Abilita il routing basato su URL per l'intera applicazione----*/}
    <BrowserRouter>
      {/*----Fornisce lo store di Redux a tutti i componenti discendenti----*/}
      <Provider store={store}>
        {/*----Fornisce il contesto dello shop (carrello, prodotti, etc.)----*/}
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);