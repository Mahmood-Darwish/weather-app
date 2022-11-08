import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../auth";

function Login() {
  const [details, setDetails] = useState({ email: "", password: "" });

  const useAuth = useContext(authContext);

  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();
    const response = useAuth.login(details.email, details.password);
    const resolvedResponse = await Promise.resolve(response)
    if (resolvedResponse != null) {
      await useAuth.setUser(resolvedResponse.user.uid);
      console.log(useAuth.user)
      navigate("/weather_app");
    }
  };

  return (
    <div className="wrapper fadeInDown">
      <section id="formContent">
        <h2 className="active"> Sign In </h2>

        <form onSubmit={handleSubmission}>
          <input
            tabIndex={0}
            type="email"
            id="login"
            className="fadeIn second"
            placeholder="E-mail"
            value={details.email}
            onChange={(e) =>
              setDetails({ ...details, email: e.target.value })
            }
          />

          <input
            tabIndex={0}
            type="password"
            id="password"
            className="fadeIn third"
            placeholder="Password"
            value={details.password}
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
          />

          <button tabIndex={0} type="submit" className="fadeIn fourth"> Log in </button>

        </form>

        <footer id="formFooter">
          <button tabIndex={0} className="fadeIn fourth" onClick={() => navigate("/weather_app/register")}>
            Don't have an account? Register here.
          </button>
        </footer>

      </section>

    </div>
  );
}

export default Login;
