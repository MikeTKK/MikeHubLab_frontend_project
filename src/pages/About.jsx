import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  //----Componente che renderizza la pagina "About Us", descrivendo la missione e i punti di forza dell'azienda----
  return (
    <div>
      <div className='text-2xl text-center pt-8'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-12 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] object-cover rounded-lg' src={assets.about_img} alt="Team working on computer hardware" />
        <div className='flex flex-col justify-center gap-6 text-slate-700'>
          <p>
            MikeHub Lab was founded by passionate PC builders on a simple principle: building a high-performance PC should be an exciting and rewarding experience. We are a one-stop shop dedicated to providing tech enthusiasts with the best components on the market.
          </p>
          <b className='text-slate-900 text-xl font-semibold'>Our Mission</b>
          <p>
            Our mission is to empower every builder, from beginner to pro, with meticulously selected components, expert knowledge, and a supportive community. We don't just sell parts; we provide the foundation for your ultimate PC build, ensuring every piece meets our rigorous standards for performance and reliability.
          </p>
        </div>
      </div>
      <div className='text-xl py-4 mt-16'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      
      <div className='grid md:grid-cols-3 gap-8 text-sm text-left'>
        <div className='bg-white p-8 flex flex-col gap-4 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
          <img src={assets.quality_icon} alt="Quality Icon" className='w-12 h-12' />
          <b className='text-base text-slate-900 mt-2'>Performance-Vetted Selection</b>
          <p className='text-slate-600'>Every component in our catalog is performance-vetted by our expert team. We don't sell everything—we sell the best, ensuring your build has the power and reliability you demand.</p>
        </div>
        <div className='bg-white p-8 flex flex-col gap-4 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
          <img src={assets.support_img} alt="Support Icon" className='w-12 h-12' />
          <b className='text-base text-slate-900 mt-2'>Expert Support</b>
          <p className='text-slate-600'>Stuck on a compatibility question? Our support team isn't just knowledgeable—they're experienced builders ready to provide clear, practical advice for every stage of your build.</p>
        </div>
        <div className='bg-white p-8 flex flex-col gap-4 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
           <img src={assets.community_icon} alt="Community Icon" className='w-12 h-12' />
          <b className='text-base text-slate-900 mt-2'>Community Focused</b>
          <p className='text-slate-600'>MikeHub Lab is more than a store; it's a community for enthusiasts. Join us for build guides, performance tips, and to share the incredible machines you create.</p>
        </div>
      </div>
      <div className='mt-24'>
        <NewsletterBox />
      </div>
    </div>
  )
}

export default About;