import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='my-4'>
      
      <div className='flex flex-col sm:flex-row border border-slate-200 bg-white rounded-lg overflow-hidden'>
        {/*----Sezione Sinistra: Testo----*/}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-16 md:py-20'>
          <div className='text-[#414141] text-center sm:text-left px-6'>
            <div className='flex items-center justify-center sm:justify-start gap-2'>
              <img src={assets.promo} alt="Promo" className='w-10 h-10' />
              <p className='font-medium text-sm md:text-base'>CUTTING-EDGE TECH</p>
            </div>

            <h1 className='prata-regular text-3xl md:text-4xl lg:text-5xl sm:py-3 leading-tight'>
              Build Your Dream Rig
            </h1>
            
            <Link to="/collection" className='inline-flex items-center justify-center sm:justify-start gap-2 cursor-pointer group'>
              <p className='font-semibold text-sm md:text-base bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent'>SHOP NOW</p>
              <p className='w-8 md:w-11 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full'></p>
            </Link>
          </div>
        </div>

        {/*----Sezione Destra: Immagine----*/}
        <div className='w-full sm:w-1/2'>
          <img 
            className='h-full w-full object-cover' 
            src={assets.hero_img} 
            alt="A high-performance gaming PC setup" 
          />
        </div>
      </div>

      {/*----Il video----*/}
      <div className='mt-16 flex justify-center'>
        <video 
          className='w-full max-w-5xl rounded-lg shadow-xl' 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source 
            src="/video/video.mp4" 
            type="video/mp4" 
          />
        </video>
      </div>

    </section>
  )
}

export default Hero