import { createContext, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [product, setProduct] = useState([])
    const [cartItems, setCartItems] = useState({})
    // Fetch All Products
    const fetchProduct = async () => {
        setProduct(dummyProducts)
    }
    // Add Product to Cart 
    const addToCart = () => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }
    // Update Cart Item Quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }


    useEffect(() => {
        fetchProduct()
    }, [])

    const value = {
        navigate, user, setUser, isSeller, setIsSeller,
        showUserLogin, setShowUserLogin, product, currency, addToCart,
        updateCartItem
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
