import React, { useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const Contact = () => {
    //----Stato per gestire i valori di tutti i campi del form di contatto----
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inquiry: 'Support',
        message: ''
    });

    //----Gestore generico per aggiornare lo stato del form al cambio di un input----
    const handleChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    //----Gestisce l'invio del form: previene il ricaricamento, mostra una notifica e resetta i campi----
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success(`Thanks, ${formData.name}! Your message has been sent.`);
        setFormData({ name: '', email: '', inquiry: 'Support', message: '' });
    };

    return (
        <div>
            <div className='text-center text-2xl pt-10'>
                <Title text1={'CONTACT'} text2={'US'} />
            </div>
            
            {/*----Sezione superiore con informazioni di contatto statiche----*/}
            <div className='my-10 flex flex-col justify-center md:flex-row gap-10'>
                <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="MikeHub Lab contact" />
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-gray-600'>Our Office</p>
                    <p className='text-gray-500'>123 Tech Avenue, Shoreditch<br />London E1 6AN, United Kingdom</p>
                    <p className='font-semibold text-xl text-gray-600'>Get in Touch</p>
                    <p className='text-gray-500'>Tel: +44 1234 567890<br />Email: contact@mikehublab.com</p>
                    <p className='font-semibold text-xl text-gray-600'>Careers at MikeHub Lab</p>
                    <p className='text-gray-500'>Passionate about tech? Explore our open positions.</p>
                    <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
                        Explore Jobs
                    </button>
                </div>
            </div>

            {/*----Sezione inferiore con il form di contatto interattivo----*/}
            <div className='my-24 flex flex-col items-center'>
                <div className="text-center mb-8">
                    <Title text1={'SEND US A'} text2={'MESSAGE'} />
                </div>
                <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex flex-col gap-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                    className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="inquiry" className="block text-sm font-medium text-slate-700 mb-2">Reason for Contact</label>
                                <select 
                                    name="inquiry" 
                                    id="inquiry"
                                    value={formData.inquiry}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="Support">Technical Support</option>
                                    <option value="Information">General Information</option>
                                    <option value="Sales">Sales & Commercial</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Your Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Your Message</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                rows="5" 
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <div className="text-right">
                            <button type="submit" className='bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors'>
                                Send Message
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;