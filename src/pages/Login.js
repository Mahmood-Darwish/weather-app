import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../auth"

function Login() {
    const [details, setDetails] = useState({ email: "", password: "" })

    const useAuth = useContext(authContext);

    const navigate = useNavigate();

    const handleSubmission = function (e) {
        e.preventDefault();
        const response = useAuth.login(details.email, details.password)
        if (response != null) {
            useAuth.setUser(details.email)
            navigate("/weather_app")
        }
    }

    return (
        <form onSubmit={handleSubmission}>
            <label>
                <p>Email</p>
                <input type="email" onChange={(e) => setDetails({ ...details, email: e.target.value })} value={details.email} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={(e) => setDetails({ ...details, password: e.target.value })} value={details.password} />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Login;