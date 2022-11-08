import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { authContext } from "../utils/auth"
import { useContext } from "react";


export default function Navbar() {
    const useAuth = useContext(authContext);
    return (
        <nav className="nav">
            <Link to="/weather_app" className="weather-app">
                Weather App
            </Link>
            <ul>
                <CustomLink to="/weather_app/about">About</CustomLink>
                {
                    !useAuth.user &&
                    (
                        <CustomLink to="/weather_app/login">Login</CustomLink>
                    )
                }
                {
                    useAuth.user &&
                    (
                        (<CustomLink to="/weather_app/cities">My Cities</CustomLink>)
                    )
                }
                {
                    useAuth.user &&
                    (
                        <button tabIndex={0} onClick={() => { useAuth.logout() }}> Log out </button>
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
            <Link tabIndex={0} to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}