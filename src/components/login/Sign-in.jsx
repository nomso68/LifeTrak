import { useState, useContext } from "react";
import "./Sign-in.css";
import "./Beat";
import Beat from "./Beat";
import Locked2 from "./Locked2";
import User4 from "./User4";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(AuthContext);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const [user, setUser] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://lifetrak.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserInfo(data);
      // Update user state
      setUser(data.userId);
      localStorage.setItem("user", data.userId);
      console.log(user);
      navigate("/tracker");
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://lifetrak.onrender.com/api/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: forgotEmail }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Password reset email sent! Check your inbox.");
      setShowForgotModal(false);
    } catch (error) {
      console.error("Error sending forgot password email:", error.message);
    }
  };
  return (
    <>
      <main className="loginbg">
        <div className="title">
          <h1 className="heading">Welcome</h1>
          <Beat />
        </div>
        <form onSubmit={handleSubmit} action="">
          <div className="field">
            <label className="labelText" htmlFor="username">
              Username
            </label>
            <div className="username" type="text">
              <input
                type="text"
                className="lInput"
                id="username"
                name="username"
                onChange={handleChange}
                value={form.username}
              />
              <User4 />
            </div>
          </div>
          <div className="field">
            <label className="labelText" htmlFor="password">
              Password
            </label>
            <div className="password" type="password">
              <input
                type="password"
                className="lInput"
                id="password"
                name="password"
                onChange={handleChange}
                value={form.password}
              />
              <Locked2 />
            </div>
          </div>
          <div className="submit">
            <button
              type="button"
              className="transparent"
              onClick={() => setShowForgotModal(true)}
            >
              Forgot Password
            </button>
            <button className="button">Login</button>
          </div>
        </form>
      </main>

      {showForgotModal && (
        <div className="modal">
          <h2>Forgot Password</h2>
          <form onSubmit={handleForgotPassword}>
            <label htmlFor="forgotEmail">Enter your email:</label>
            <input
              type="email"
              id="forgotEmail"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            <button type="submit">Send Reset Link</button>
            <button type="button" onClick={() => setShowForgotModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SignIn;
