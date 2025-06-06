import { createContext, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [product, setProduct] = useState([])

    const fetchProduct = async () => {
        setProduct(dummyProducts)
    }

    useEffect(()=>{
        fetchProduct()
    },[])

    const value = { navigate, user, setUser, isSeller, setIsSeller,
        showUserLogin, setShowUserLogin, product, setProduct
     }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
