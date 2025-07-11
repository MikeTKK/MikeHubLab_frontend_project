import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
} from '../actions/authActions';

//----Lo stato iniziale viene idratato da localStorage per mantenere la sessione utente----
const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //----Quando inizia una richiesta di login o registrazione, imposta lo stato di caricamento----
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    //----Gestisce il successo della registrazione (attualmente ferma solo il caricamento)----
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    //----In caso di login riuscito, aggiorna lo stato con i dati dell'utente e il token----
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    //----In caso di fallimento, resetta lo stato di autenticazione e salva l'errore----
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: action.payload,
      };
    //----Gestisce il logout, pulendo localStorage e resettando lo stato----
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;