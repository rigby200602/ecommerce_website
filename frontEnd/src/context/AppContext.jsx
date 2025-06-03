import { createContext, use, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);

    const value = { navigate, user, setUser, isSeller, setIsSeller }
    return <AppContextProvider value={value}>
        {children}
    </AppContextProvider>
}

export const useAppContext = () => {
    return useAppContext(AppContext)
}