import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../auth"

function Register() {
    const [details, setDetails] = useState({ email: "", password: "", confirmation: "" })

    const useAuth = useContext(authContext);

    const navigate = useNavigate();

    const handleSubmission = function (e) {
        e.preventDefault();
        if (details.password != details.confirmation) {
            alert("Passwords do not match!")
            return
        }
        const response = useAuth.register(details.email, details.password)
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
            <label>
                <p>Confirm Password</p>
                <input type="password" onChange={(e) => setDetails({ ...details, confirmation: e.target.value })} value={details.confirmation} />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Register;