import React, { useEffect, useState, useContext } from "react";
import "./Navbar.css";
import Logo from "../../assets/LifeLogo.png";
import { Link } from "react-router-dom";
import profile from "../../assets/profile.png";
import MenuHamburger1 from "./MenuHamburger1";
import { AuthContext } from "../../../utils/AuthContext";

const Navbar = () => {
  const [menu, setMenu] = useState(true);
  const { userInfo, logout } = useContext(AuthContext);

  const handleMenu = () => {
    setMenu((prevMenu) => !prevMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      setMenu(window.innerWidth > 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      {window.innerWidth <= 992 && (
        <button onClick={handleMenu} className="hamburger">
          <MenuHamburger1 />
        </button>
      )}
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="menu">
        <ul className={`navbar__ul ${menu ? "show" : ""}`}>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <a href="#Our_features" className="nav-link">
              Features
            </a>
          </li>
          <li>
            <a href="#Insights" className="nav-link">
              About Us
            </a>
          </li>
          <li>
            <a href="" className="nav-link">
              Consult a Doctor
            </a>
          </li>
          <li>
            <a href="#Insights" className="nav-link">
              Blog
            </a>
          </li>
          <li>
            <a href="#Footer" className="nav-link">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
      {!userInfo ? (
        <div className="bt">
          {window.location.pathname !== "/login" && (
            <Link to="/login">
              <button className="btn1">Login</button>
            </Link>
          )}
          <Link to="/register">
            <button className="btn2">Sign Up</button>
          </Link>
        </div>
      ) : (
        <div className="bt">
          <Link to="/profile">
            <div className="avatar">
              <img src={profile} alt="User Avatar" />
            </div>
          </Link>
          <button onClick={handleLogout} className="sign-out">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
