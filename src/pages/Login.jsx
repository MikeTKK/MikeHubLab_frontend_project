import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../redux/actions/authActions';

const Login = () => {
  //----Stato per alternare tra la modalità 'Login' e 'Sign Up'----
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //----Recupera lo stato di autenticazione, caricamento ed errore dal Redux store----
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  //----Se l'utente è già autenticato, lo reindirizza alla homepage----
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  //----Gestisce l'invio del form, dispatchando l'azione corretta (login o registrazione)----
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (currentState === 'Login') {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  //----Funzione per cambiare modalità e resettare i campi del form----
  const toggleState = (newState) => {
    setCurrentState(newState);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-16 gap-4 text-slate-800 bg-white p-8 rounded-lg shadow-sm'>
      <div className='inline-flex items-center gap-2 mb-4'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-slate-400' />
      </div>

      {/*----Mostra il campo 'Name' solo in modalità 'Sign Up'----*/}
      {currentState === 'Sign Up' && (
        <input
          type="text"
          className='w-full px-3 py-2 border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <input
        type="email"
        className='w-full px-3 py-2 border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        className='w-full px-3 py-2 border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-red-500 text-sm w-full text-center">{typeof error === 'object' ? JSON.stringify(error) : error}</p>}

      <div className='w-full flex justify-between text-sm mt-[-8px] text-slate-500'>
        <p className='cursor-pointer hover:text-slate-800'>Forgot your password?</p>
        {/*----Testo per cambiare modalità in base allo stato corrente----*/}
        {currentState === 'Login' ? 
          <p onClick={() => toggleState('Sign Up')} className='cursor-pointer text-blue-600 hover:text-blue-700 font-medium'>Create account</p> : 
          <p onClick={() => toggleState('Login')} className='cursor-pointer text-blue-600 hover:text-blue-700 font-medium'>Login here</p>
        }
      </div>

      <button
        type="submit"
        disabled={loading}
        className='w-full bg-blue-600 text-white font-bold px-8 py-2 mt-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {loading ? 'Loading...' : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}
      </button>
    </form>
  );
};

export default Login;