import "./login.scss";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../authContext/apiCall";
import { AuthContext } from "../authContext/AuthContext";
const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { dispatch, error } = useContext(AuthContext);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(user, dispatch);
    setLoading(true);
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
          />
        </div>
      </div>

      <div className="container">
        <form>
          <h1>Sign in</h1>
          {error && (
            <p className="error-messages">
              <b>{error}</b>. Please try again
            </p>
          )}
          <input
            type="email"
            placeholder="Email or phone number"
            name="email"
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="none"
            onChange={handleInput}
          />
          <button onClick={handleSubmit}>
            {loading && !error && <b>Loading...</b>}
            {!loading && <b>Sign Up</b>}
            {error && <b>Sign Up</b>}
          </button>
          <span>
            New to Netflix?
            <Link to="/signup">
              <b>Sign up now</b>
            </Link>
            .
          </span>
          <p>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
