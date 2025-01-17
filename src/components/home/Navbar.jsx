import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Logo from "../../assets/LifeLogo.png";
import { Link } from "react-router-dom";
import profile from "../../assets/profile.png";
import MenuHamburger1 from "./MenuHamburger1";

const Navbar = ({ login }) => {
  const [menu, setMenu] = useState(true);
  const handleMenu = () => {
    setMenu(!menu);
    console.log(menu);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMenu(true);
      } else {
        setMenu(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [userId, setUserId] = useState(localStorage.getItem("user") || ""); // Initialize with stored userId or empty string

  const handleLogout = () => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID not found in local storage.");
      return;
    }
    try {
      fetch("https://lifetrak.onrender.com/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        localStorage.removeItem("user");
        setUserId("");
        window.location.href = "/";
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <div className="navbar">
      {window.innerWidth <= 992 && (
        <button onClick={handleMenu} className="hamburger">
          <MenuHamburger1 />
        </button>
      )}
      <div className="logo">
        <Link to={"/"}>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="menu">
        <ul className={`navbar__ul ${menu ? "show" : ""}`}>
          <li>
            <Link to={"/"} className="nav-link">
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
      {!userId && (
        <div className="bt">
          {window.location.href.slice(-5) !== "login" && (
            <Link to={"/login"}>
              <button className="btn1">Login</button>
            </Link>
          )}
          <Link to={"/register"}>
            <button className="btn2">Sign Up</button>
          </Link>
        </div>
      )}
      {userId && (
        <div className="bt">
          <Link to={"/profile"}>
            <div className="avatar">
              <img src={profile} alt="" />
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
