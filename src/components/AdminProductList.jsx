import React from 'react';
import AdminProductItem from './AdminProductItem';

const AdminProductList = ({ products, onDelete, onEdit }) => {
  //----Componente che renderizza l'intera lista di prodotti nell'area admin----
  return (
    <div>
      <h2 className='text-xl mb-4'>All Products</h2>
      <div className='grid gap-4'>
        {products.map((product) => (
          <AdminProductItem
            key={product.id}
            product={product}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminProductList;
