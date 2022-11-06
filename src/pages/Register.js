import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../auth";

function Register() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirmation: "",
  });

  const useAuth = useContext(authContext);

  const navigate = useNavigate();

  const handleSubmission = function (e) {
    e.preventDefault();
    if (details.password != details.confirmation) {
      alert("Passwords do not match!");
      return;
    }
    const response = useAuth.register(details.email, details.password);
    if (response != null) {
      useAuth.setUser(details.email);
      navigate("/weather_app");
    }
  };

  return (
    <div className="wrapper fadeInDown">
      <section id="formContent">
        <h2 className="active"> Register </h2>

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

          <input
            type="password"
            id="password"
            className="fadeIn third"
            placeholder="password confirmation"
            value={details.confirmation}
            onChange={(e) =>
              setDetails({ ...details, confirmation: e.target.value })
            }
          />

          <button type="submit" className="fadeIn fourth"> Register </button>

        </form>

        <footer id="formFooter">
          <button className="fadeIn fourth" onClick={() => navigate("/login")}>
            Already have an account? Log in.
          </button>
        </footer>

      </section>

    </div>
  );
}

export default Register;
