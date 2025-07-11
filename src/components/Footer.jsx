import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='mt-24'>
        {/* ----Sezione superiore---- */}
        <div className='flex flex-col sm:grid grid-cols-[2.5fr_1fr_1.5fr] gap-14 text-sm'>
            <div>
                <Link to='/'>
                    <img src={assets.logo_icon} className='mb-5 w-32' alt="MikeStoreLab Logo" />
                </Link>
                <p className='w-full md:w-4/5 text-gray-600 break-words'>
                The ultimate destination for PC builders and tech enthusiasts. We provide top-tier components and expert support to help you build the rig of your dreams.
                </p>
            </div>
            {/* ----Links aziendali---- */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-3 text-gray-600'>
                    <li className='cursor-pointer hover:text-black w-fit'><Link to='/'>Home</Link></li>
                    <li className='cursor-pointer hover:text-black w-fit'><Link to='/about'>About us</Link></li>
                    <li className='cursor-pointer hover:text-black w-fit'><Link to='/contact'>Contact</Link></li>
                    <li className='cursor-pointer hover:text-black w-fit'>Privacy Policy</li>
                </ul>
            </div>
            {/* ----Contatti aziendali---- */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-3 text-gray-600'>
                    <li>Tel: +44 1234 567890</li>
                    <li>contact@mikehublab.com</li>
                    <li className='flex items-center gap-4 mt-2'>
                        <img src={assets.facebook_icon} alt="Facebook" className='w-5 cursor-pointer' />
                        <img src={assets.twitter_icon} alt="Twitter" className='w-5 cursor-pointer' />
                        <img src={assets.linkedin_icon} alt="LinkedIn" className='w-5 cursor-pointer' />
                    </li>
                </ul>
            </div>
        </div>
        {/* ----Copyright ---- */}
        <div className='mt-20'>
            <hr className='border-t border-gray-300'/>
            <p className='py-5 text-sm text-center text-gray-500'>
                Copyright © {new Date().getFullYear()} MikeHub Lab. All Rights Reserved.
            </p>
        </div> 
    </div>
  )
}

export default Footer;