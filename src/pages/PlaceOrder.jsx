import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
    const { placeNewOrder, getCartAmount, cartItems, products, applyVoucher } = useContext(ShopContext) || {};
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    //----Stato unico per gestire tutti i campi del form di consegna, pre-compilando l'email----
    const [deliveryData, setDeliveryData] = useState({
        firstName: '',
        lastName: '',
        email: user?.email || '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });
    //----Stato per gestire il codice voucher e il metodo di pagamento selezionato----
    const [voucher, setVoucher] = useState('');
    const [method, setMethod] = useState('cod');
    //----Stato per disabilitare il bottone durante l'invio dell'ordine----
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    //----Controlla se l'utente è autenticato, altrimenti lo reindirizza al login----
    useEffect(() => {
        const toastId = 'auth-redirect-toast';
        if (!isAuthenticated && !toast.isActive(toastId)) {
            toast.error("You must be logged in to place an order.", { toastId: toastId });
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    //----Gestore unico per aggiornare lo stato del form di consegna----
    const handleChange = (e) => {
        setDeliveryData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePlaceOrder = () => {
        //----Impedisce click multipli disabilitando il bottone----
        setIsPlacingOrder(true);

        //----Controlla che tutti i campi di consegna siano stati compilati----
        for (const key in deliveryData) {
            if (deliveryData[key] === "") {
                toast.error("Please fill in all delivery details.");
                setIsPlacingOrder(false); // Riabilita il bottone in caso di errore
                return;
            }
        }
        if (getCartAmount() === 0) {
            toast.error("Your cart is empty.");
            setIsPlacingOrder(false); // Riabilita il bottone in caso di errore
            return;
        }

        const orderItemsDetails = [];
        for (const itemId in cartItems) {
            const productInfo = products.find(p => p._id === itemId);
            if (productInfo) {
                for (const optionName in cartItems[itemId]) {
                    const itemDetails = cartItems[itemId][optionName];
                    orderItemsDetails.push({ _id: itemId, name: productInfo.name, image: productInfo.image[0] || '', price: itemDetails.price, quantity: itemDetails.quantity, size: optionName });
                }
            }
        }

        placeNewOrder(deliveryData.email, orderItemsDetails);
    };

    if (!isAuthenticated) return null;

    return (
        //----Il form gestisce l'invio dell'ordine tramite la sua funzione onSubmit----
        <form onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }} className='flex flex-col sm:flex-row justify-between gap-8 pt-10'>
            {/*----Lato Sinistro: Informazioni di Consegna----*/}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 sm:hidden'>
                    <img src={assets.dropdown_icon} alt="Back" className="h-4 rotate-180" /> 
                    <span>Back to Cart</span>
                </button>
                <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                <div className='flex gap-3'>
                    <input name="firstName" onChange={handleChange} value={deliveryData.firstName} className='border border-slate-300 rounded-md py-2 px-3 w-full' type="text" placeholder='First Name' required />
                    <input name="lastName" onChange={handleChange} value={deliveryData.lastName} className='border border-slate-300 rounded-md py-2 px-3 w-full' type="text" placeholder='Last Name' required />
                </div>
                <input name="email" onChange={handleChange} value={deliveryData.email} className='border border-slate-300 rounded-md py-2 px-3 w-full' type="email" placeholder='Email Address' required />
                <input name="street" onChange={handleChange} value={deliveryData.street} className='border border-slate-300 rounded-md py-2 px-3 w-full' type="text" placeholder='Street Address' required />
                <div className='flex gap-3'>
                    <input name="city" onChange={handleChange} value={deliveryData.city} className='border border-slate-300 rounded-md py-2 px-3 w-full' type="text" placeholder='City' required />
                    <input name="state" onChange={handleChange} value={deliveryData.state} className='border border-slate-300 rounded-md py-2 px-3 w-full' type="text" placeholder='State' required />
                </div>
                <div className='flex gap-3'>
                    <input name="zipcode" onChange={handleChange} value={deliveryData.zipcode} className='border border-slate-300 rounded-md py-2 px-3 w-full' type="number" placeholder='Zip Code' required />
                    <input name="country" onChange={handleChange} value={deliveryData.country} className='border border-slate-300 rounded-md py-2 px-3 w-full' type="text" placeholder='Country' required />
                </div>
                <input name="phone" onChange={handleChange} value={deliveryData.phone} className='border border-slate-300 rounded-md py-2 px-3 w-full' type="number" placeholder='Phone' required />
            </div>
            {/*----Lato Destro: Carrello e Pagamento----*/}
            <div className='w-full sm:w-2/5 mt-8 sm:mt-0'>
                <CartTotal />
                <div className='mt-8'>
                    <p className='text-slate-600 font-medium'>Have a promo code?</p>
                    <div className='mt-2 flex'>
                        <input onChange={(e) => setVoucher(e.target.value)} value={voucher} type="text" placeholder='Enter code' className='border border-slate-300 rounded-md py-2 px-3 w-full' />
                        {/* Chiama applyVoucher al click */}
                        <button onClick={() => applyVoucher(voucher)} type="button" className='w-auto bg-blue-600 text-white font-bold px-16 py-3 text-sm cursor-pointer rounded-md hover:bg-blue-700'>Apply</button>
                    </div>
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    <div className='flex flex-col gap-3 mt-4'>
                        <div onClick={() => setMethod('mastercard')} className='inline-flex items-center gap-2 border p-2 cursor-pointer rounded-md justify-center'>
                            <div className={`w-3 h-3 border-2 border-gray-500 rounded-full flex-shrink-0 ${method === 'mastercard' ? 'bg-green-400' : ''}`}></div>
                            <img className='h-10 w-20 object-cover flex-shrink-0' src={assets.mastercard} alt="Mastercard" />
                        </div>
                        <div onClick={() => setMethod('paypal')} className='inline-flex items-center gap-2 border p-2 cursor-pointer rounded-md justify-center'>
                            <div className={`w-3 h-3 border-2 border-gray-500 rounded-full flex-shrink-0 ${method === 'paypal' ? 'bg-green-400' : ''}`}></div>
                            <img className='h-10 w-20 object-cover flex-shrink-0' src={assets.paypal} alt="Paypal" />
                        </div>
                        <div onClick={() => setMethod('cod')} className='inline-flex items-center gap-2 border p-2 cursor-pointer rounded-md justify-center'>
                            <div className={`w-3 h-3 border-2 border-gray-500 rounded-full flex-shrink-0 ${method === 'cod' ? 'bg-green-400' : ''}`}></div>
                            <p className='text-gray-600 font-medium'>Cash on Delivery</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        {/*----Il bottone ora è di tipo 'submit' e viene disabilitato durante l'invio----*/}
                        <button 
                            type="submit" 
                            disabled={isPlacingOrder}
                            className='w-full bg-blue-600 text-white font-bold px-16 py-3 text-sm cursor-pointer rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isPlacingOrder ? 'Placing Order...' : 'PLACE ORDER'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;