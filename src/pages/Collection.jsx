import React, { useContext, useEffect, useState, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';

const Collection = () => {
  const context = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const { products, search, showSearch } = context || {};

  //----Usa useMemo per calcolare la lista di categorie uniche solo quando l'elenco dei prodotti cambia----
  const availableCategories = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  //----Usa useMemo per calcolare la lista di sottocategorie uniche solo quando l'elenco dei prodotti cambia----
  const availableSubCategories = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return [...new Set(products.map(p => p.subCategory))];
  }, [products]);

  //----Effect principale che applica filtri e ordinamento ogni volta che i prodotti o i criteri cambiano----
  useEffect(() => {
    if (!Array.isArray(products)) return;

    let processedProducts = [...products];

    //----Applica i filtri in sequenza: ricerca, categorie e sottocategorie----
    if (showSearch && search) {
      processedProducts = processedProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (selectedCategories.length > 0) {
      processedProducts = processedProducts.filter(item => selectedCategories.includes(item.category));
    }
    if (selectedSubCategories.length > 0) {
      processedProducts = processedProducts.filter(item => selectedSubCategories.includes(item.subCategory));
    }
    
    //----Applica l'ordinamento per prezzo, se selezionato----
    if (sortType === 'low-high') {
      processedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      processedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(processedProducts);
  }, [products, search, showSearch, selectedCategories, selectedSubCategories, sortType]);

  if (!context) {
    return <div className="text-center py-20">Loading...</div>;
  }

  //----Funzione per aggiungere/rimuovere una categoria dai filtri attivi----
  const toggleCategory = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories(prev => 
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };
  
  //----Funzione per aggiungere/rimuovere una sottocategoria dai filtri attivi----
  const toggleSubCategory = (e) => {
    const { value, checked } = e.target;
    setSelectedSubCategories(prev =>
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10'>
      {/*----Colonna Sinistra: Filtri----*/}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="Toggle filters" />
        </p>
        <div className={`${showFilter ? 'block' : 'hidden'} sm:block`}>
          
          <div className='border border-gray-300 pl-5 pr-2 py-3 mt-6'>
            <p className='mb-2 text-sm font-medium'>SORT BY</p>
            <select onChange={(e) => setSortType(e.target.value)} value={sortType} className='border-2 border-gray-300 text-sm px-2 py-1 w-full'>
              <option value="relevant">Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          <div className='border border-gray-300 pl-5 py-3 mt-4'>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {availableCategories.map(cat => (
                <p key={cat} className='flex gap-2 items-center'>
                  <input className='w-4 h-4' type="checkbox" value={cat} onChange={toggleCategory}/>
                  {cat}
                </p>
              ))}
            </div>
          </div>

          <div className='border border-gray-300 pl-5 py-3 my-4'>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {availableSubCategories.map(subCat => (
                  <p key={subCat} className='flex gap-2 items-center'>
                  <input className='w-4 h-4' type="checkbox" value={subCat} onChange={toggleSubCategory}/>
                  {subCat}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/*----Colonna Destra: Prodotti Filtrati----*/}
      <div className='flex-1'>
        <div className='text-center text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filteredProducts.map((item) => (
            <ProductItems key={item._id} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
