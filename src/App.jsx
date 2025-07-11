import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Collection from './pages/Collection';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

const App = () => {
  //----Componente principale che definisce la struttura e il routing dell'intera applicazione----
  return (
    <div className='flex flex-col min-h-screen'>
      {/*----Contenitore per la visualizzazione delle notifiche (toast)----*/}
      <ToastContainer theme="light" />
      
      {/*----Header dell'applicazione con la barra di navigazione----*/}
      <header className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-gradient-to-r from-blue-100/90 to-blue-600/90 backdrop-blur-sm sticky top-0 z-10'>
        <Navbar />
      </header>

      {/*----Contenuto principale della pagina che cresce per riempire lo spazio----*/}
      <main className='flex-grow px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <SearchBar />
        {/*----Definizione di tutte le rotte di navigazione dell'applicazione----*/}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/admindashboard' element={<AdminDashboard />} />
        </Routes>
      </main>

      {/*----Footer dell'applicazione----*/}
      <footer className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white mt-20'>
        <Footer />
      </footer>
    </div>
  );
};

export default App;