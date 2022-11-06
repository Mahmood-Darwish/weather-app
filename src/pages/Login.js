import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../auth";

function Login() {
  const [details, setDetails] = useState({ email: "", password: "" });

  const useAuth = useContext(authContext);

  const navigate = useNavigate();

  const handleSubmission = function (e) {
    e.preventDefault();
    const response = useAuth.login(details.email, details.password);
    if (response != null) {
      useAuth.setUser(details.email);
      navigate("/weather_app");
    }
  };

  return (
    <div className="wrapper fadeInDown">
      <section id="formContent">
        <h2 className="active"> Sign In </h2>

        <form onSubmit={handleSubmission}>
          <input
            type="email"
            id="login"
            className="fadeIn second"
            placeholder="login"
            value={details.email}
            onChange={(e) =>
              setDetails({ ...details, email: e.target.value })
            }
          />

          <input
            type="password"
            id="password"
            className="fadeIn third"
            placeholder="password"
            value={details.password}
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
          />

          <button type="submit" className="fadeIn fourth"> Log in </button>

        </form>

        <footer id="formFooter">
          <button className="fadeIn fourth" onClick={() => navigate("/register")}>
            Don't have an account? Register here.
          </button>
        </footer>

      </section>

    </div>
  );
}

export default Login;
