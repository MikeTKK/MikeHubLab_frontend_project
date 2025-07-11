import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';

//----Email utilizzato per identificare l'utente amministratore----
const ADMIN_EMAIL = "admin@mikehublab.com";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, clearOrdersOnLogout } = useContext(ShopContext) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  //----Determina se l'utente loggato è un amministratore----
  const isAdmin = isAuthenticated && user && user.email === ADMIN_EMAIL;
  
  //----Gestisce il logout: pulisce stato redux e context, poi reindirizza----
  const handleLogout = () => {
    dispatch(logout());
    clearOrdersOnLogout();
    navigate('/login');
    setVisible(false); 
  };

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo_icon} className='w-32 md:w-40' alt="Logo Icon" /></Link>

      {/*----Menu di navigazione per desktop----*/}
      <ul className='hidden sm:flex gap-6 text-md'>
        <NavLink to='/'>
          {({ isActive }) => (
            <div className={`flex flex-col items-center gap-1 transition-colors duration-200 ${isActive ? 'text-blue-700' : 'text-slate-600 hover:text-sky-500'}`}>
              <p>Home</p>
              {isActive && <hr className='w-3/4 border-none h-[2px] bg-blue-600' />}
            </div>
          )}
        </NavLink>
        <NavLink to='/collection'>
          {({ isActive }) => (
            <div className={`flex flex-col items-center gap-1 transition-colors duration-200 ${isActive ? 'text-blue-700' : 'text-slate-600 hover:text-sky-500'}`}>
              <p>Collection</p>
              {isActive && <hr className='w-3/4 border-none h-[2px] bg-blue-600' />}
            </div>
          )}
        </NavLink>
        <NavLink to='/about'>
          {({ isActive }) => (
            <div className={`flex flex-col items-center gap-1 transition-colors duration-200 ${isActive ? 'text-blue-700' : 'text-slate-600 hover:text-sky-500'}`}>
              <p>About</p>
              {isActive && <hr className='w-3/4 border-none h-[2px] bg-blue-600' />}
            </div>
          )}
        </NavLink>
        <NavLink to='/contact'>
          {({ isActive }) => (
            <div className={`flex flex-col items-center gap-1 transition-colors duration-200 ${isActive ? 'text-blue-700' : 'text-slate-600 hover:text-sky-500'}`}>
              <p>Contact</p>
              {isActive && <hr className='w-3/4 border-none h-[2px] bg-blue-600' />}
            </div>
          )}
        </NavLink>
        {/*----Mostra il link alla dashboard solo se l'utente è admin----*/}
        {isAdmin && (
          <NavLink to='/admindashboard'>
            {({ isActive }) => (
              <div className={`flex flex-col items-center gap-1 transition-colors duration-200 ${isActive ? 'text-red-600' : 'text-red-500 hover:text-red-600'}`}>
                <p>Admin</p>
                {isActive && <hr className='w-3/4 border-none h-[2px] bg-red-600' />}
              </div>
            )}
          </NavLink>
        )}
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(prevState => !prevState)} src={assets.search_icon} className='w-5 cursor-pointer' alt="Search Icon" />

        {/*----Mostra il dropdown del profilo se l'utente è autenticato, altrimenti il link di login----*/}
        {isAuthenticated ? (
          <div className='group relative hidden sm:block'>
            <img className='w-5 cursor-pointer ' src={assets.profile_icon} alt="Profile Icon" />
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10'>
              <div className='flex flex-col gap-2 w-48 py-3 px-4 bg-white text-slate-700 rounded-md shadow-lg border border-slate-200'>
                {user && user.name && (
                  <div className='px-1 mb-1 border-b pb-2'>
                    <p className='text-center text-sm text-slate-800 font-semibold rounded-md'>
                      {user.name}
                    </p>
                  </div>
                )}
                {isAdmin && (
                  <Link to='/admindashboard' className='px-2 py-1 rounded cursor-pointer hover:bg-slate-100 text-red-500 font-medium'>Admin Dashboard</Link>
                )}
                <Link to='/orders' className='px-2 py-1 rounded cursor-pointer hover:bg-slate-100 hover:text-black'>My Orders</Link>
                <p onClick={handleLogout} className='px-2 py-1 rounded cursor-pointer hover:bg-slate-100 text-red-600 font-medium'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <Link to='/login' className='hidden sm:block'>
            <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="Login Icon" /></Link>
        )}

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart Icon" />
          <p className='absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-sky-500 text-white rounded-full text-[10px]'>{getCartCount()}</p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu Icon" />
      </div>

      {/*----Sidebar per la navigazione su dispositivi mobili----*/}
      <div className={`absolute top-0 right-0 bottom-0 h-screen overflow-y-auto bg-white transition-all duration-300 ease-in-out ${visible ? 'w-64 shadow-xl border-l border-slate-200' : 'w-0'} z-20`}>
        <div className='flex flex-col text-slate-700'>
          <div onClick={() => setVisible(false)} className='flex items-center justify-between gap-4 p-4 cursor-pointer hover:bg-slate-100 border-b border-slate-200'>
            <div className='flex items-center gap-4'>
              <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back Icon" />
              <p>Back</p>
            </div>
            {isAuthenticated && user && user.name && (
              <div className='pr-2'>
                <p className='rounded-md bg-slate-100 text-center p-1 px-2 text-xs text-slate-700 font-semibold'>
                  {user.name}
                </p>
              </div>
            )}
          </div>
          <div className='p-2 flex flex-col gap-1'>
            <NavLink onClick={() => setVisible(false)} className='py-3 px-4 rounded-md hover:bg-slate-100' to='/'>Home</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-3 px-4 rounded-md hover:bg-slate-100' to='/collection'>Collection</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-3 px-4 rounded-md hover:bg-slate-100' to='/about'>About</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-3 px-4 rounded-md hover:bg-slate-100' to='/contact'>Contact</NavLink>
          </div>
          <div className='mt-auto p-4 border-t border-slate-200'>
            {isAuthenticated ? (
              <div className='flex flex-col gap-2'>
                {isAdmin && (
                  <Link to='/admindashboard' onClick={() => setVisible(false)} className='py-3 px-4 rounded-md text-red-600 hover:bg-red-50'>Admin Dashboard</Link>
                )}
                <Link to='/orders' onClick={() => setVisible(false)} className='py-3 px-4 rounded-md hover:bg-slate-100'>My Orders</Link>
                <p onClick={handleLogout} className='py-3 px-4 rounded-md cursor-pointer hover:bg-slate-100 text-red-600'>Logout</p>
              </div>
            ) : (
              <Link to='/login' onClick={() => setVisible(false)} className='block w-full text-center bg-blue-600 text-white px-4 py-3 rounded-md'>Login / Sign Up</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;