import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItems from './ProductItems';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    //----Quando i prodotti cambiano, li ordina per data per trovare i 5 più recenti----
    useEffect(()=>{
      if (products.length > 0) {
        const sortedProducts = [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
        setLatestProducts(sortedProducts.slice(0, 5));
      }
    },[products]);

  return (
    <div className='my-16'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'ARRIVALS'} />
        <p className='w-full md:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-4'>
        Explore the future of tech with our newest arrivals. From next-gen GPUs to lightning-fast SSDs, get the performance you need to elevate your gaming and creative workflows.
        </p>
      </div>

      {/*----Renderizza la lista dei prodotti più recenti----*/}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8 mt-6'>
          {
            latestProducts.map((item, index)=>(
              <ProductItems key={item.id || index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }
      </div>
    </div>
  )
}

export default LatestCollection