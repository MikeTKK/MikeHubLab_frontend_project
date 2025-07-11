import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'; 

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const currency = '€';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [discount, setDiscount] = useState(0);

    //----Inizializza lo stato del carrello leggendo i dati salvati in localStorage----
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : {};
        } catch (error) {
            console.error("Failed to parse cart items from localStorage", error);
            return {};
        }
    });

    //----Inizializza lo stato degli ordini leggendo i dati salvati in localStorage----
    const [orders, setOrders] = useState(() => {
        try {
            const savedOrders = localStorage.getItem('orders');
            return savedOrders ? JSON.parse(savedOrders) : [];
        } catch (error) {
            console.error("Failed to parse orders from localStorage", error);
            return [];
        }
    });

    //----Pulisce lo stato e il localStorage degli ordini al logout----
    const clearOrdersOnLogout = () => {
        setOrders([]);
        localStorage.removeItem('orders');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3001/products');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
                setError(null);
            } catch (e) {
                console.error("Error fetching products:", e);
                setError("Unable to load products. Please try again later.");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    //----Salva il carrello in localStorage ad ogni modifica----
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    //----Salva gli ordini in localStorage ad ogni modifica----
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addToCart = (itemId, option) => {
        if (!option || !option.name || option.price === undefined) {
            toast.error('Please select an option');
            return;
        }
        const optionIdentifier = option.name;
        setCartItems(prev => {
            const newCart = structuredClone(prev);
            if (!newCart[itemId]) {
                newCart[itemId] = {};
            }
            if (newCart[itemId][optionIdentifier]) {
                newCart[itemId][optionIdentifier].quantity += 1;
            } else {
                newCart[itemId][optionIdentifier] = { quantity: 1, price: option.price };
            }
            return newCart;
        });
        toast.success('Product added to cart!');
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const optionIdentifier in cartItems[itemId]) {
                totalCount += cartItems[itemId][optionIdentifier].quantity;
            }
        }
        return totalCount;
    };

    //----Aggiorna la quantità di un prodotto, rimuovendolo se la quantità scende a zero----
    const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId] && cartData[itemId][size]) {
            if (quantity <= 0) {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
                toast.info('Product removed from cart!');
            } else {
                cartData[itemId][size].quantity = quantity;
            }
        }
        setCartItems(cartData);
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            for (const optionIdentifier in cartItems[itemId]) {
                const item = cartItems[itemId][optionIdentifier];
                totalAmount += item.price * item.quantity;
            }
        }

        //----Applica la percentuale di sconto al totale se uno sconto è attivo----
        if (discount > 0) {
            totalAmount = totalAmount - (totalAmount * (discount / 100));
        }

        return totalAmount;
    };

    //----Verifica un codice voucher e, se valido, applica lo sconto corrispondente----
    const applyVoucher = (voucherCode) => {
        if (voucherCode === "WELCOME10") {
            setDiscount(10);
            toast.success("10% discount applied!");
        } else {
            toast.error("Invalid voucher code.");
        }
    };

    //----Crea un nuovo ordine, svuota il carrello e reindirizza alla pagina degli ordini----
    const placeNewOrder = (email, cartOrderItems) => {
        const newOrder = {
            orderId: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            email: email,
            items: cartOrderItems,
            amount: getCartAmount() + delivery_fee,
            date: new Date().toISOString(),
            status: 'Ready for delivery'
        };
        setOrders(prevOrders => [...prevOrders, newOrder]);
        setCartItems({});
        setDiscount(0); // Resetta lo sconto dopo aver piazzato l'ordine
        toast.success("Order placed successfully!");
        navigate('/orders');
    };

    const value = {
        products,
        loading,
        error,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        discount,
        applyVoucher,
        navigate,
        orders,
        placeNewOrder,
        clearOrdersOnLogout,
    };
    //----Se i prodotti sono in fase di caricamento, mostra un'icona di caricamento----
    if (loading) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center text-center p-4 bg-white'>
                <img 
                    src={assets.loading} 
                    alt="Loading..." 
                    className='w-24 h-24'
                />
                <p className='text-xl font-semibold text-slate-700'>Loading products.</p>
            </div>
        );
    }
    //----Se si verifica un errore nel fetch, mostra una schermata di errore personalizzata----
    if (error) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center text-center p-4 bg-white'>
                <img 
                    src={assets.error} 
                    alt="Error loading products" 
                    className='w-32 h-32 mb-6 opacity-70'
                />
                <p className='text-xl font-semibold text-slate-700'>Oops! Something went wrong.</p>
                <p className='text-slate-500 mt-2'>{error}</p>
            </div>
        );
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;