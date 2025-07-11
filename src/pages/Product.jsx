import React, { useContext, useEffect, useState,} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext) || {};
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  
  //----Stato per memorizzare l'intera opzione selezionata (es. {name: '16GB', price: 99})----
  const [selectedOption, setSelectedOption] = useState(null);

  //----Trova il prodotto corretto e imposta gli stati iniziali, inclusa l'opzione di default----
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProductData = () => {
      if (products && products.length > 0) {
        const foundProduct = products.find((item) => item._id === productId);
        
        if (foundProduct) {
          setProductData(foundProduct);
          if (foundProduct.image && foundProduct.image.length > 0) {
            setImage(foundProduct.image[0]);
          }
          //----Imposta la prima opzione disponibile come predefinita al caricamento del prodotto----
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedOption(foundProduct.sizes[0]);
          }
        }
      }
    };

    fetchProductData();
  }, [productId, products]);

  //----Impedisce il rendering finché i dati del prodotto e l'opzione di default non sono caricati----
  if (!productData || !selectedOption) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  return (
    <div className='pt-10'>

      {/* ----Pulsante back---- */}
      <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 sm:hidden'>
        <img src={assets.dropdown_icon} alt="Back" className="h-4 rotate-180" /> 
        <span>Back</span>
      </button>

      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*----Sezione Immagini----*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-start gap-2 sm:justify-normal sm:w-[18.7%] w-full' >
            {/*----Crea le anteprime cliccabili per cambiare l'immagine principale----*/}
            {productData.image.map((item, index) => (
              <img 
                onClick={() => setImage(item)} 
                src={item} 
                key={index} 
                className={`w-[24%] sm:w-full flex-shrink-0 cursor-pointer rounded-md border-2 transition-colors ${image === item ? 'border-blue-500' : 'border-transparent'}`} 
                alt={`Thumbnail ${index + 1}`} 
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto rounded-lg' src={image} alt={productData.name} />
          </div>
        </div>

        {/*----Informazioni sul Prodotto----*/}
        <div className='flex-1'>
          <h1 className='font-bold text-3xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-4'>
            <img src={assets.star_icon} alt="" className='w-3.5'/>
            <img src={assets.star_icon} alt="" className='w-3.5'/>
            <img src={assets.star_icon} alt="" className='w-3.5'/>
            <img src={assets.star_icon} alt="" className='w-3.5'/>
            <img src={assets.star_dull_icon} alt="" className='w-3.5'/>
            <p className='pl-2 text-slate-500'>(122)</p>
          </div>

          {/*----Il prezzo mostrato è dinamico e dipende dall'opzione selezionata----*/}
          <p className='mt-5 text-4xl font-light'>{currency}{selectedOption.price}</p>
          
          <p className='mt-5 text-slate-600 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p className="font-semibold">Select Option:</p>
            <div className='flex gap-2 flex-wrap'>
              {/*----Renderizza i pulsanti per ogni opzione disponibile del prodotto----*/}
              {productData.sizes.map((option, index) => (
                <button 
                  onClick={() => setSelectedOption(option)} 
                  className={`border py-2 px-4 rounded-md cursor-pointer transition-colors ${option.name === selectedOption.name ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-100 hover:bg-slate-200'}`} 
                  key={index}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
          
          {/*----Aggiunge al carrello l'ID del prodotto e l'intero oggetto dell'opzione selezionata----*/}
          <button onClick={() => addToCart(productData._id, selectedOption)} className='bg-black text-white px-10 py-4 text-sm active:bg-gray-700 rounded-md'>ADD TO CART</button>
        </div>
      </div>
      
      <div className='mt-20'>
        <RelatedProducts 
          category={productData.category} 
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  );
};

export default Product;