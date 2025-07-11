import React, { useEffect, useState, useRef } from 'react';
import AdminProductForm from '../components/AdminProductForm';
import AdminProductList from '../components/AdminProductList';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const formRef = useRef(null);
  
  //----Crea una lista di categorie uniche derivandola dai prodotti esistenti----
  const categories = [...new Set(products.map(p => p.category))];

  //----Carica la lista dei prodotti dal server al primo montaggio del componente----
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(error => console.error("Error loading products:", error));
  }, []);

  //----Gestisce la cancellazione di un prodotto dopo conferma----
  const handleDelete = (idToDelete) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:3001/products/${idToDelete}`, {
        method: 'DELETE',
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        setProducts(products.filter(product => product.id !== idToDelete));
      }).catch(error => console.error("Error deleting product:", error));
    }
  };

  //----Gestisce sia la creazione (POST) che l'aggiornamento (PUT) di un prodotto----
  const handleSave = (productData) => {
    const isEditing = !!editProduct;
    const url = isEditing ? `http://localhost:3001/products/${editProduct.id}` : 'http://localhost:3001/products';
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
    .then(res => res.json())
    .then(savedProduct => {
      //----Aggiorna lo stato locale in base alla modalità (modifica o aggiunta)----
      if (isEditing) {
        setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p));
      } else {
        setProducts(prevProducts => [...prevProducts, savedProduct]);
      }
      setEditProduct(null); // Resetta il form
    })
    .catch(error => console.error("Error saving product:", error));
  };

  //----Imposta il prodotto da modificare e scorre la pagina fino al form----
  const handleEdit = (productToEdit) => {
    setEditProduct(productToEdit);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='p-4 md:p-8'>
      <div ref={formRef}>
        <h1 className='text-2xl font-bold mb-6 text-center md:text-left'>Admin Dashboard</h1>
        <AdminProductForm onSave={handleSave} editProduct={editProduct} products={products} categories={categories} />
      </div>
      <div className="mt-8">
        <AdminProductList
          products={products}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;