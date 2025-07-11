import React from 'react';

const AdminProductItem = ({ product, onDelete, onEdit }) => {
  //----Componente che rappresenta una singola riga di prodotto nella lista dell'area admin----
  return (
    <div className='bg-white border border-slate-200 p-4 rounded-lg flex justify-between items-center mb-2 transition-shadow hover:shadow-md'>
      <div>
        <h3 className='font-semibold text-slate-800'>{product.name}</h3>
        <p className='text-sm text-slate-500'>{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(product.price)}</p>
      </div>
      <div className='flex gap-4'>

        <button onClick={() => onEdit(product)} className='font-medium text-blue-600 hover:text-blue-800 active:text-blue-900 transition-colors'>Edit</button>
        <button onClick={() => onDelete(product.id)} className='font-medium text-red-600 hover:text-red-800 active:text-red-900 transition-colors'>Delete</button>
      </div>
    </div>
  );
};

export default AdminProductItem;