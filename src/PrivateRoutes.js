import { Outlet, Navigate } from 'react-router-dom'
import { authContext } from "./auth"
import { useContext } from "react";

const PrivateRoutes = () => {
    const useAuth = useContext(authContext);
    return (
        useAuth.user ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes