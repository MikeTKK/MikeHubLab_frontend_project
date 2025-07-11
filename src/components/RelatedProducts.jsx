import React, { useContext, useEffect, useState} from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems';

const RelatedProducts = ({ category, subCategory, currentProductId }) => {

    const { products } = useContext(ShopContext) || {};
    const [related, setRelated] = useState([]);

    //----Filtra i prodotti per trovare quelli correlati, escludendo il prodotto corrente----
    useEffect(() => {
        if (products && products.length > 0) {

            const relatedProducts = products.filter((item) => {
                return (item.category === category || item.subCategory === subCategory) && item._id !== currentProductId;
            });
            
            setRelated(relatedProducts.slice(0, 5));
        }
    }, [products, category, subCategory, currentProductId]);

    //----Se non ci sono prodotti correlati, il componente non viene renderizzato----
    if (related.length === 0) {
        return null;
    }

    return (
        <div className='my-24'>
            <div className='text-center'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-8'>
                {related.map((item) => (
                    <ProductItems key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;