import React from "react";
import "./register.scss";
import { KeyboardArrowRight } from "@material-ui/icons";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="register">
      <div className="top">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
        <Link to="/login">
          <button className="loginButton">Sign In</button>
        </Link>
      </div>

      <div className="container">
        <h1>Unlimited movies, TV</h1>
        <h1>shows, and more. </h1>
        <h3>Watch anywhere. Cancel anytime.</h3>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="input">
          <input type="email" placeholder="Enter Password" />
          <button className="registerButton">
            Get Started <KeyboardArrowRight className="SIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
