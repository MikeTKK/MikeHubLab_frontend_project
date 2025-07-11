import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  //----Componente che visualizza una sezione dedicata alle policy aziendali----
  return (
    <div className='grid sm:grid-cols-3 gap-12 sm:gap-4 text-center py-20 my-10 text-xs sm:text-sm md:text-base text-gray-700 '>
        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="Return Policy Icon" />
            <p className='font-semibold'>14-Day Easy Returns</p>
            <p className='text-gray-500'>Hassle-free returns within 14 days of delivery.</p>
        </div>
        <div>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt="Support Icon" />
            <p className='font-semibold'>Expert Tech Support</p>
            <p className='text-gray-500'>Our team of builders is here to help you 24/7.</p>
        </div>
        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="Warranty Icon" />
            <p className='font-semibold'>Quality & Warranty</p>
            <p className='text-gray-500'>All products are covered by manufacturer warranty.</p>
        </div>
    </div>
  )
}

export default OurPolicy;