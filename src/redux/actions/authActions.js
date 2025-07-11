import axios from 'axios';

//----Tipi di azioni per il flusso di autenticazione----
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'; // Nota: non più usato nel flusso principale
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

//----Action Creators sincroni per ogni fase del login----
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

//----Thunk per gestire l'intero processo di login asincrono----
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    //----Simula una chiamata API per verificare le credenziali dell'utente----
    const response = await axios.get(`http://localhost:3001/users?email=${credentials.email}&password=${credentials.password}`);
    if (response.data && response.data.length > 0) {
      const user = response.data[0];
      const token = `fake-jwt-token-for-${user.email}`; // Simula un token JWT
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(loginSuccess(user, token));
    } else {
      dispatch(loginFailure('Invalid credentials'));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

//----Thunk per registrare un nuovo utente ed eseguire il login automatico----
export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post('http://localhost:3001/users', userData);
    const user = response.data;
    const token = `fake-jwt-token-for-${user.email}`;

    //----Salva i dati e il token nel localStorage per la persistenza----
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    //----Esegue il dispatch di loginSuccess per autenticare l'utente nell'app----
    dispatch(loginSuccess(user, token));

  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};