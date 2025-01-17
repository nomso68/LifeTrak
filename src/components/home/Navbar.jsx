import { useEffect, useState } from "react";
import "./Navbar.css";
import Logo from "../../assets/LifeLogo.png";
import { Link, useLocation } from "react-router-dom";
import profile from "../../assets/profile.png";
import MenuHamburger1 from "./MenuHamburger1";

const Navbar = () => {
  const [menu, setMenu] = useState(window.innerWidth > 992);
  const [userId, setUserId] = useState(localStorage.getItem("user") || "");
  const location = useLocation(); // React Router's hook to get the current location

  // Handle menu visibility based on screen size
  useEffect(() => {
    const handleResize = () => {
      setMenu(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Synchronize userId with localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId !== userId) {
      setUserId(storedUserId);
    }
  }, [userId]);

  const handleMenu = () => {
    setMenu((prevMenu) => !prevMenu);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://lifetrak.onrender.com/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.status}`);
      }

      // Clear user data
      localStorage.removeItem("user");
      setUserId("");
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
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

      {!userId ? (
        <div className="bt">
          {location.pathname !== "/login" && (
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
