import React, { useEffect, useState } from 'react';

const initialState = {
  name: '', description: '', price: '', image: '', category: '',
  subCategory: '', sizes: '',
};

const AdminProductForm = ({ onSave, editProduct, products = [], categories = [] }) => {
  const [form, setForm] = useState(initialState);

  //----Filtra dinamicamente le sottocategorie uniche in base alla categoria selezionata----
  const availableSubCategories = form.category 
    ? [...new Set(products.filter(p => p.category === form.category).map(p => p.subCategory))]
    : [];

  //----Popola il form con i dati del prodotto quando si attiva la modalità di modifica----
  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name || '',
        description: editProduct.description || '',
        price: editProduct.price !== undefined ? String(editProduct.price) : '',
        image: Array.isArray(editProduct.image) ? editProduct.image.join(',') : '',
        category: editProduct.category || '',
        subCategory: editProduct.subCategory || '',
        sizes: Array.isArray(editProduct.sizes) ? editProduct.sizes.join(',') : '',
        _id: editProduct._id,
        id: editProduct.id,
      });
    } else {
      setForm(initialState);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    const newValue = type === 'checkbox' ? checked : value;

    //----Quando la categoria cambia, resetta la sottocategoria per forzare una nuova selezione----
    if (name === "category") {
      setForm(prev => ({ ...prev, category: value, subCategory: "" }));
    } else {
      setForm(prev => ({ ...prev, [name]: newValue }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //----Prepara l'oggetto da salvare, convertendo i valori stringa del form in array----
    let productToSave = {
      ...form,
      price: parseFloat(form.price) || 0,
      image: typeof form.image === 'string' && form.image.trim() !== '' ? form.image.split(',').map(s => s.trim()).filter(s => s) : [],
      category: form.category,
      subCategory: form.subCategory,
      sizes: typeof form.sizes === 'string' && form.sizes.trim() !== '' ? form.sizes.split(',').map(s => s.trim()).filter(s => s) : [],
      date: form.date || Date.now(),
    };
    //----Se è un nuovo prodotto (non in modifica), genera un nuovo ID----
    if (!editProduct || !editProduct.id) {
      productToSave._id = 'prod_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
      productToSave.id = Math.random().toString(16).substring(2, 6) + Math.random().toString(16).substring(2, 6);
    }
    onSave(productToSave);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className='mb-8 bg-white border border-slate-200 p-6 rounded-lg shadow-sm'>
      <h2 className='text-xl mb-4 font-bold text-slate-800'>{editProduct ? 'Edit Product' : 'Add Product'}</h2>
      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="block mb-2 p-2 border border-slate-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="block mb-2 p-2 border border-slate-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required step="any" className="block mb-2 p-2 border border-slate-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input type="text" name="image" placeholder="Image URL(s) comma-separated (e.g. /img.png)" value={form.image} onChange={handleChange} className="block mb-2 p-2 border border-slate-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
      
      <select name="category" value={form.category} onChange={handleChange} required className="block mb-2 p-2 border border-slate-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="" disabled>Select a Category</option>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      
      <select name="subCategory" value={form.subCategory} onChange={handleChange} disabled={availableSubCategories.length === 0} className="block mb-2 p-2 border border-slate-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100">
        <option value="" disabled>Select a Subcategory</option>
        {availableSubCategories.map(subCat => <option key={subCat} value={subCat}>{subCat}</option>)}
      </select>

      <input type="text" name="sizes" placeholder="Sizes (comma-separated e.g. S,M,L)" value={form.sizes} onChange={handleChange} className="block mb-2 p-2 border border-slate-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
      
      <div className='flex justify-between items-center mt-4'>
        <button type="submit" className='mt-4 bg-blue-600 text-white font-bold px-6 py-2 rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors'>
            {editProduct ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;