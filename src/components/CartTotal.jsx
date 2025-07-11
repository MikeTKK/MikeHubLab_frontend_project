import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const { getCartAmount, currency, delivery_fee, discount } = useContext(ShopContext);

    //----Calcola i vari totali per la visualizzazione, partendo da un subtotale già scontato----
    const discountedSubtotal = getCartAmount();
    //----Ricostruisce il subtotale originale per mostrare il valore prima dello sconto----
    const originalSubtotal = discount > 0 ? discountedSubtotal / (1 - discount / 100) : discountedSubtotal;
    //----Calcola l'importo esatto dello sconto da visualizzare----
    const discountAmount = originalSubtotal - discountedSubtotal;

    return (
        <div className='w-full'>
            <div className='text-center text-2xl mb-3'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className='flex flex-col gap-3 mt-4 text-sm'>
                <div className='flex justify-between text-slate-600'>
                    <p>Subtotal</p>
                    <p>{currency} {originalSubtotal.toFixed(2)}</p>
                </div>
                <hr />
                
                {/*----Mostra la riga dello sconto solo se un codice è stato applicato con successo----*/}
                {discount > 0 && (
                    <>
                        <div className='flex justify-between text-green-600 font-medium'>
                            <p>Discount ({discount}%)</p>
                            <p>- {currency} {discountAmount.toFixed(2)}</p>
                        </div>
                        <hr />
                    </>
                )}

                <div className='flex justify-between text-slate-600'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee.toFixed(2)}</p>
                </div>
                <hr />
                
                <div className='flex justify-between font-bold text-lg text-slate-900'>
                    <b>Total</b>
                    <b>{currency} {(discountedSubtotal + delivery_fee).toFixed(2)}</b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;