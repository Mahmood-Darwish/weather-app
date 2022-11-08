import { Outlet, Navigate } from 'react-router-dom'
import { authContext } from "./auth"
import { useContext } from "react";

const PrivateRoutes = ({ shouldBeLoggedIn }) => {
    const useAuth = useContext(authContext);

    console.log(shouldBeLoggedIn, useAuth.user)

    return (
        (useAuth.user !== null) === (shouldBeLoggedIn !== null) ? <Outlet /> : <Navigate to="/weather_app" />
    )
}

export default PrivateRoutes