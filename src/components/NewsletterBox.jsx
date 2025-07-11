import React, { useState } from 'react';
import { toast } from 'react-toastify';

const NewsletterBox = () => {
    //----Stato per gestire il valore dell'input email in modo controllato----
    const [email, setEmail] = useState('');

    //----Gestisce l'iscrizione: valida l'email, mostra un toast con il codice sconto e resetta il form----
    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim() === '') {
            toast.error("Please enter a valid email.");
            return;
        }

        const discountCode = "WELCOME10";

        toast.success(
            <div>
                <p>Thanks for subscribing! Here is your 10% discount code:</p>
                <p className='font-bold text-lg mt-2'>{discountCode}</p>
            </div>,
            { autoClose: false } // Impedisce la chiusura automatica del toast
        );

        setEmail('');
    };

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 10% off</p>
        <p className='text-gray-400 mt-3'>
        Suscribe now!
        </p>
          <form onSubmit={handleSubscribe} className='flex justify-center'>
              <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  className='p-3 border border-slate-300 rounded-l-md w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4 cursor-pointer active:bg-gray-700 '>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsletterBox