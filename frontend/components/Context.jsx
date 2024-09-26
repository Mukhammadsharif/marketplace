import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const ContextProvider = ({ children }) => {
    const [productsLength, setProductsLength] = useState();
    const [productToggle, setProductToggle] = useState(false);

    useEffect(() => {
        let products = localStorage.getItem('products');
        setProductsLength(JSON.parse(products)?.length);
    }, [productToggle]);


    return (
        <ProductContext.Provider value={{ productsLength, productToggle, setProductToggle }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
