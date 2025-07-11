import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext) || {};
    const [cartData, setCartData] = useState([]);
    const goTo = useNavigate();

    //----Trasforma la struttura dati nidificata del carrello in un array semplice per la visualizzazione----
    useEffect(() => {
        if (!cartItems) return;

        const tempData = [];
        //----Itera sugli ID dei prodotti nel carrello----
        for (const itemId in cartItems) {
            //----Itera sulle opzioni (es. "16GB RAM") per quell'ID----
            for (const optionName in cartItems[itemId]) {
                const itemDetails = cartItems[itemId][optionName];
                
                if (itemDetails && itemDetails.quantity > 0) {
                    tempData.push({
                        _id: itemId,
                        size: optionName, // Nome dell'opzione
                        quantity: itemDetails.quantity,
                        price: itemDetails.price // Prezzo specifico dell'opzione
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    //----Se il carrello è vuoto, mostra un messaggio apposito----
    if (cartData.length === 0) {
        return (
            <div className='border-t border-slate-200 pt-14 text-center min-h-[50vh] flex flex-col justify-center items-center'>
                <Title text1={'YOUR'} text2={'CART IS EMPTY'} />
                <p className='text-slate-600 mt-4'>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/collection">
                    <button className='bg-blue-600 text-white font-bold py-3 px-6 mt-8 rounded-md hover:bg-blue-700 transition-colors duration-300'>
                        Start Shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className='border-t border-slate-200 pt-14'>
            <button onClick={() => goTo(-1)} className='flex items-center gap-2 mb-6 sm:hidden'>
                <img src={assets.dropdown_icon} alt="Back" className="h-4 rotate-180" /> 
                <span>Back</span>
            </button>
            <div className='text-center text-2xl mb-3'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>
            <div>
                {cartData.map((item) => {
                    //----Trova i dati completi del prodotto (es. nome, immagine) dalla lista globale----
                    const productData = products.find((product) => product._id === item._id);
                    if (!productData) return null;

                    return (
                        <div key={`${item._id}-${item.size}`} className='py-4 border-b border-slate-200 grid grid-cols-[1fr_auto_auto] sm:grid-cols-[4fr_1fr_auto] items-center gap-4'>
                            <div className='flex items-center gap-4 sm:gap-6'>
                                <img className='w-16 sm:w-20 rounded-md border border-slate-200' src={productData.image[0]} alt={productData.name} />
                                <div>
                                    <p className='text-sm sm:text-base font-medium text-slate-800'>{productData.name}</p>
                                    <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5 mt-1 text-sm'>
                                        <p className='font-semibold'>{currency}{item.price.toFixed(2)}</p>
                                        <p className='px-2 py-0.5 border bg-slate-100 text-slate-600 rounded-md w-fit'>{item.size}</p>
                                    </div>
                                </div>
                            </div>
                            <input 
                                onChange={(e) => updateQuantity(item._id, item.size, Number(e.target.value))} 
                                className='border border-slate-300 w-16 text-center px-1 py-1 rounded-md' 
                                type="number" 
                                min="1" 
                                value={item.quantity} 
                            />
                            {/*----Impostare la quantità a 0 rimuove l'articolo dal carrello----*/}
                            <button onClick={() => updateQuantity(item._id, item.size, 0)} className='p-2 rounded-full hover:bg-slate-100'>
                                <img className='w-5 h-5' src={assets.bin_icon} alt="Remove item" />
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className='flex justify-end my-12'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <div className='w-full text-right mt-4'>
                        <button onClick={() => navigate('/place-order')} className='w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors'>
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
