import React, { useState } from "react";
import "./Sign_Up.css";
import { useNavigate } from "react-router-dom";

const Sign_Up = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    gender: "Male",
    weight: "",
    height: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = (e) => {
    const navigate = useNavigate();
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      fetch("https://lifetrak.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate("/login");
          console.log("Data saved successfully:", data);
        });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <>
      <main id="top" className="bg">
        <div className="bg2">
          <h1 className="h1">Create your Profile</h1>
          <form onSubmit={handleSubmit} action="">
            <section id="one" className="form-section">
              <div className="">
                <label className="label" htmlFor="name">
                  {" "}
                  Full Name
                </label>
                <input
                  className="input"
                  type="text"
                  id="fullName"
                  name="fullName"
                  onChange={handleChange}
                  value={form.fullName}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="email"
                  className="input"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                  required
                />
              </div>
            </section>
            <section id="two" className="form-section">
              <div className="">
                <label className="label" htmlFor="dateOfBirth">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  className="input dob"
                  name="dateOfBirth"
                  onChange={handleChange}
                  value={form.dateOfBirth}
                  required
                />
              </div>
              <div className="">
                <label className="label" htmlFor="gender">
                  Gender
                </label>
                <div className="gender">
                  <select
                    className="select"
                    id="gender"
                    name="gender"
                    onChange={handleChange}
                    value={form.gender}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="">
                <label htmlFor="weight" className="label">
                  Weight
                </label>
                <input
                  type="number"
                  id="weight"
                  className="input"
                  required
                  onChange={handleChange}
                  value={form.weight}
                  name="weight"
                />
              </div>
              <div className="">
                <label htmlFor="height" className="label">
                  Height
                </label>
                <input
                  type="number"
                  id="height"
                  className="input"
                  required
                  onChange={handleChange}
                  value={form.height}
                  name="height"
                />
              </div>
            </section>
            <section className="form-section">
              <div className="">
                <label htmlFor="username" className="label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="input"
                  name="username"
                  onChange={handleChange}
                  value={form.username}
                  required
                />
              </div>
            </section>
            <section id="four" className="form-section">
              <div className="">
                <label htmlFor="password" className="label">
                  {" "}
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="input password-field"
                  name="password"
                  onChange={handleChange}
                  value={form.password}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="confirmPassword" className="label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="input password-field"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={form.confirmPassword}
                  required
                />
              </div>
            </section>
            <section id="submit">
              <button type="submit" className="button">
                Create
              </button>
            </section>
          </form>
        </div>
      </main>
    </>
  );
};

export default Sign_Up;
