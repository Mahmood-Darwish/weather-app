import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { authContext } from "./auth"
import { useContext } from "react";


export default function Navbar() {
    const useAuth = useContext(authContext);
    return (
        <nav className="nav">
            <Link to="/weather_app" className="weather-app">
                Weather App
            </Link>
            <ul>
                <CustomLink to="/pricing">Pricing</CustomLink>
                <CustomLink to="/about">About</CustomLink>
                {
                    !useAuth.user &&
                    (
                        <CustomLink to="/login">Login</CustomLink>
                    )
                }
                {
                    useAuth.user &&
                    (
                        <button onClick={() => { useAuth.logout() }}> Log out </button>
                    )
                }
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}