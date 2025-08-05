import { auth, onAuthStateChanged } from "../configuration";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // const navigate = useNavigate();
    useEffect(()=> {
        onAuthStateChanged(auth, (user)=> {
            if(user && user.emailVerified) {
                setUser(user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
                console.log("Please Sign in")
            }
            setLoading(false);
        })
    }, [])

    return <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated, loading}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext)