import { combineReducers } from 'redux';
import authReducer from './authReducer';

//----Combina tutti i reducer dell'applicazione in un unico rootReducer per lo store di Redux----
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;