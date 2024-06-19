import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({children}) {
    const {user, uid} = useAuth();
    
    if(!user){
        return (
            <Navigate to="/login" />
             )
    }
  return children
}

export default ProtectedRoutes