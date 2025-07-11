import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; 
import rootReducer from './reducers/index.js';

//----Stato iniziale opzionale per l'applicazione----
const initialState = {};

//----Array dei middleware da applicare allo store (es. per azioni asincrone)----
const middleware = [thunk];

//----Crea lo store Redux, combinando il reducer principale, lo stato iniziale e i middleware----
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;