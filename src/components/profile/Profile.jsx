import React, { useEffect, useState } from "react";
import "./Profile.css";
import profile from "../../assets/profile.png";
import Pencil1 from "./Pencil1";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    dateOfBirth: "",
    gender: "Male",
    weight: "",
    height: "",
    username: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    setError(null);
  };

  const [isEditable, setIsEditable] = useState({
    fullname: false,
    email: false,
    dateOfBirth: false,
    gender: false,
    weight: false,
    height: false,
    username: false,
  });

  const toggleEdit = (field) => {
    setIsEditable((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    console.log(isEditable);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://lifetrak.onrender.com/api/protected/dashboard",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          localStorage.removeItem("user");
          navigate("/login");
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setLoading(false);
        console.log("Fetched data:", data);
        setForm(data);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    console.log("Form state updated:", form);
  }, [form]); // Observe form changes

  return (
    <>
      <main className="profile-bg">
        {loading ? (
          <div className="loader">
            <Circles
              height="40"
              width="40"
              color="#02035d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div>
            <h1 className="profile-details">Profile Details</h1>
            <div className="img-container">
              <img src={profile} alt="" />
            </div>
            <div className="profile-field">
              <label htmlFor="">Name</label>
              <div>
                <input
                  disabled={!isEditable.fullname}
                  type="text"
                  id="fullname"
                  name="fullname"
                  onChange={handleChange}
                  value={form.fullname}
                />
                <button className="edit" onClick={() => toggleEdit("fullname")}>
                  <Pencil1 main={true} />
                </button>
              </div>
            </div>
            <div className="profile-field">
              <label htmlFor="">Username</label>
              <div>
                <input
                  disabled={!isEditable.username}
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  value={form.username}
                />
                <button className="edit" onClick={() => toggleEdit("username")}>
                  <Pencil1 main={true} />
                </button>
              </div>
            </div>
            <div className="email-field">
              <label htmlFor="">Email address</label>
              <p className="user-mail">{form.email}</p>
            </div>
            <hr className="rule" />
            <div className="other-details">
              <label htmlFor="">Date of Birth</label>
              <div>
                <input
                  disabled={!isEditable.dateOfBirth}
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  onChange={handleChange}
                  value={form.dateOfBirth.slice(0, 10)}
                />
                <button
                  className="edit-other"
                  onClick={() => toggleEdit("dateOfBirth")}
                >
                  <Pencil1 main={false} />
                </button>
              </div>
            </div>
            <div className="other-details">
              <label htmlFor="">Gender</label>
              <div>
                <input
                  disabled={!isEditable.gender}
                  type="text"
                  className="max"
                  id="gender"
                  name="gender"
                  onChange={handleChange}
                  value={form.gender}
                />
                <button
                  className="edit-other"
                  onClick={() => toggleEdit("gender")}
                >
                  <Pencil1 main={false} />
                </button>
              </div>
            </div>
            <div className="other-details">
              <label htmlFor="">Weight</label>
              <div>
                <input
                  disabled={!isEditable.weight}
                  type="text"
                  className="max"
                  id="weight"
                  name="weight"
                  onChange={handleChange}
                  value={form.weight}
                />
                <button
                  className="edit-other"
                  onClick={() => toggleEdit("weight")}
                >
                  <Pencil1 main={false} />
                </button>
              </div>
            </div>
            <div className="other-details">
              <label htmlFor="">Height</label>
              <div>
                <input
                  disabled={!isEditable.height}
                  type="text"
                  className="max"
                  id="height"
                  name="height"
                  onChange={handleChange}
                  value={form.height}
                />
                <button
                  className="edit-other"
                  onClick={() => toggleEdit("height")}
                >
                  <Pencil1 main={false} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Profile;
