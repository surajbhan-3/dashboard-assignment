import React from "react";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
export const AuthContext = createContext()


export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [uId, setuId] = useState(null);

    useEffect(() => {
        // Check if user data is available in localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedUserId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
    
        if (storedUser && storedUserId && token) {
          setUser(storedUser);
          setuId(storedUserId);
        }
      }, [uId, user]);
  

    return (
      <AuthContext.Provider value={{ user, setUser, uId, setuId }}>
        {children}
      </AuthContext.Provider>
    );
  };