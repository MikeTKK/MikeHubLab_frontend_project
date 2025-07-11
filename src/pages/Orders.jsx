import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { orders, currency } = useContext(ShopContext);

  //----Funzione di utilità per formattare la data in un formato leggibile----
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  //----Se non ci sono ordini, mostra un messaggio e un invito all'azione----
  if (!orders || orders.length === 0) {
    return (
      <div className=' pt-16 min-h-[60vh] flex flex-col items-center justify-center'>
        <Title text1={'MY'} text2={'ORDERS'} />
        <p className='mt-10 text-slate-600 text-lg'>You haven't placed any orders yet.</p>
        <Link to="/collection" className='mt-6 bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700'>Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className='pt-16 min-h-[80vh]'>
      <div className='text-center'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div className='mt-8 space-y-8'>
        {/*----Itera su ogni ordine per visualizzarlo singolarmente----*/}
        {orders.map((order) => (
          <div key={order.orderId} className='p-4 bg-white border border-slate-200 rounded-lg shadow-sm'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-slate-200'>
                <div>
                    <p className='text-lg font-semibold text-slate-800'>Order ID:</p>
                    <span className='font-mono text-sm text-slate-600'>{order.orderId}</span>
                </div>
                <div className='mt-2 sm:mt-0 text-sm text-slate-600 text-left sm:text-right'>
                    <p>Date: <span className='font-medium text-slate-800'>{formatDate(order.date)}</span></p>
                    <p>Order Total: <span className='font-bold text-slate-900'>{currency}{order.amount.toFixed(2)}</span></p>
                    <p>Status: <span className='font-medium text-blue-600'>{order.status}</span></p>
                </div>
            </div>

            <p className='text-md font-semibold mb-3 text-slate-700'>Ordered Items:</p>
            {/*----Per ogni ordine, itera sui prodotti contenuti al suo interno----*/}
            {order.items.map((item, index) => (
              <div key={index} className='py-4 border-t border-slate-200 flex items-center gap-4'>
                  <img className='w-16 h-16 object-cover rounded' src={item.image} alt={item.name} />
                  <div className='flex-grow'>
                    <p className='font-medium text-slate-800'>{item.name}</p>
                    <div className='flex items-center justify-between text-sm text-slate-500 mt-1'>
                      <span>Option: {item.size}</span>
                      <span>{item.quantity} x {currency}{item.price.toFixed(2)}</span>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;