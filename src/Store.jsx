import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
const context = createContext()

function Store(props) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    function getProducts() {
        axios.get("https://dummyjson.com/products").then(
            (response) => {
                setProducts(response.data.products)

            }
        )
    }

    useEffect(
        () => {
            getProducts()
        }, []
    )


    function addToCart(id) {
        const product = products.find(
            (items) => {
                return (
                    items.id === id
                )
            }
        )
        // console.log(product)
        const exists = cart.find(
            (item) => {
                return (
                    item.id === id
                )
            }
        )
        if (exists) {
            const updateCart = cart.map(
                (item) => {
                    return (
                        item.id === id ? { ...item, qty: item.qty + 1 } : item
                    )
                }
            )
            setCart(updateCart)
        } else {
            setCart([...cart, { ...product, qty: 1 }])
        }
    }
function qtyHandler(id, flag) {
    const exists = cart.find(item => item.id === id);

    if (exists) {
        const updateCart = cart.map(item => {
            if (item.id === id) {
                const newQty = flag === 1 ? item.qty - 1 : item.qty + 1;
                // Prevent qty going below 1
                return { ...item, qty: newQty < 1 ? 1 : newQty };
            }
            return item;
        });
        setCart(updateCart);
    }
}






    return (
        <context.Provider value={{ addToCart, cart, qtyHandler }}>
            {props.children}
        </context.Provider>
    )
}
export default Store;
export { context }