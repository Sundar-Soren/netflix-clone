import React, { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { Search, Notifications } from "@material-ui/icons";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { AuthContext } from "../../auth/authContext/AuthContext";
import { logOut } from "../../auth/authContext/AuthAction";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  const handleLogOut = () => {
    localStorage.removeItem("netflix-user");
    dispatch(logOut());
  };

  return (
    <>
      <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
          <div className="left">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix Logo"
            />

            <Link to="/" className="link">
              <span>Homepage</span>
            </Link>
            <Link to="/series" className="link">
              <span>Series</span>
            </Link>
            <Link to="/movies" className="link">
              <span>Movies</span>
            </Link>
          </div>
          <div className="right ">
            <span className="res">KIDS</span>
            <Notifications className="icon res" />
            <img
              className="res"
              src="https://images.pexels.com/photos/101537/baby-boy-hat-covered-101537.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt="profile pic"
            />

            <div className="profile">
              <ArrowDropDownIcon className="icon" />
              <div className="options">
                <span>Setting</span>

                {user && <span onClick={handleLogOut}>Log Out</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
