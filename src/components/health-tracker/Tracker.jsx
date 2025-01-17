import React, { useEffect, useState } from "react";
import "./Tracker.css";
import Bell1 from "./Bell1";
import ChevronDown from "./ChevronDown";
import { useNavigate, Link } from "react-router-dom";

const Tracker = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("user") || ""); // Initialize with stored userId or empty string
  const [formData, setFormData] = useState({
    userId: userId,
    date: new Date().toISOString().split("T")[0],
    vitals: {
      bodyTemperature: "",
      pulseRate: "",
      respirationRate: "",
      bloodPressure: "",
      bloodOxygen: "",
      weight: "",
      bloodGlucoseLevel: "",
    },
    exerciseLog: {
      walking: "",
      jogging: "",
      running: "",
      cycling: "",
      ropeSkipping: "",
      yoga: "",
      dance: "",
    },
  });

  // Ensure userId is up-to-date
  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (storedUserId) {
      setUserId(storedUserId);
      setFormData((prevData) => ({
        ...prevData,
        userId: storedUserId,
      }));
    } else {
      console.warn("User ID not found in localStorage");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      vitals: {
        ...prevData.vitals,
        [name]: value,
      },
    }));
  };

  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleExerciseChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      exerciseLog: {
        ...prevData.exerciseLog,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("User ID is required to submit the form");
      return;
    }

    if (formData.exerciseLog.cycling < 1) {
      window.alert("Rope Skipping counts must be a non-negative integer");
      return;
    } else if (formData.exerciseLog.ropeSkipping < 1) {
      window.alert("Cycling distance must be a positive number");
      return;
    } else if (formData.exerciseLog.yoga < 1) {
      window.alert("Yoga duration must be a non-negative integer (minutes)");
      return;
    } else if (formData.exerciseLog.walking < 1) {
      window.alert("Walking distance must be a positive number");
      return;
    } else if (formData.exerciseLog.jogging < 1) {
      window.alert("Jogging distance must be a positive number");
      return;
    } else if (formData.exerciseLog.running < 1) {
      window.alert("Running distance must be a positive number");
      return;
    } else if (formData.exerciseLog.dance < 1) {
      window.alert("Dance duration must be a non-negative integer (minutes)");
      return;
    } else if (
      formData.vitals.bodyTemperature > 42 ||
      formData.vitals.bodyTemperature < 35
    ) {
      window.alert("Body Temperature must be between 35°C and 42°C");
      return;
    } else if (
      formData.vitals.pulseRate > 200 ||
      formData.vitals.pulseRate < 40
    ) {
      window.alert("Pulse Rate must be between 40 and 200 beats per minute");
      return;
    } else if (
      formData.vitals.respirationRate > 50 ||
      formData.vitals.respirationRate < 10
    ) {
      window.alert(
        "Respiration Rate must be between 10 and 50 breaths per minute"
      );
      return;
    } else if (
      formData.vitals.bloodOxygen > 100 ||
      formData.vitals.bloodOxygen < 0
    ) {
      window.alert("Blood Oxygen level must be between 0% and 100%");
      return;
    } else if (formData.vitals.weight > 500 || formData.vitals.weight < 0) {
      window.alert("Weight must be between 0 and 500 kg");
      return;
    } else if (
      formData.vitals.bloodGlucoseLevel > 30 ||
      formData.vitals.bloodGlucoseLevel < 0
    ) {
      window.alert();
      return;
    }

    try {
      fetch("https://lifetrak.onrender.com/api/healthstats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data saved successfully:", data);
          navigate("/report");
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <main className="trackerbg">
        <form action="" onSubmit={handleSubmit}>
          <section className="hayft">
            <div className="a1">
              <h1 className="tracker-title">How are you feeling today?</h1>
              <Link to={"/profile"} className="a2">
                <p>Edit Personal Data</p>
                <span className="notif">
                  <div className="bell">
                    <Bell1 />
                  </div>
                  <div className="dot"></div>
                </span>
              </Link>
            </div>
            <div className="a1">
              <p className="subtitle">Log your health stats for today!</p>
              <input
                name="date"
                id="date"
                value={formData.date}
                onChange={handleDateChange}
                className="date-input"
                type="date"
              />
            </div>
          </section>
          <section className="vitals">
            <div className="vitals-header">
              <h2 className="vitals-title">Vitals</h2>
              <ChevronDown />
            </div>
            <div className="vitals-list">
              <div className="vitals-row">
                <div className="vitals-name">
                  <label className="vitals-label" htmlFor="">
                    Body Temperature
                  </label>
                </div>
                <span className="parameter">
                  <input
                    min={35}
                    max={42}
                    name="bodyTemperature"
                    value={formData.vitals.bodyTemperature}
                    onChange={handleChange}
                    id="bodyTemperature"
                    type="number"
                  />
                  <p>°C</p>
                </span>
              </div>
              <div className="vitals-row">
                <div className="vitals-name">
                  {" "}
                  <label className="vitals-label" htmlFor="">
                    Pulse Rate{" "}
                  </label>
                </div>
                <span className="parameter">
                  <input
                    min={40}
                    max={200}
                    name="pulseRate"
                    value={formData.vitals.pulseRate}
                    onChange={handleChange}
                    id="pulseRate"
                    type="number"
                  />
                  <p>beats per minute</p>
                </span>
              </div>
              <div className="vitals-row">
                <div className="vitals-name">
                  {" "}
                  <label className="vitals-label" htmlFor="">
                    Respiration Rate
                  </label>
                </div>
                <span className="parameter">
                  <input
                    min={10}
                    max={50}
                    name="respirationRate"
                    value={formData.vitals.respirationRate}
                    onChange={handleChange}
                    id="respirationRate"
                    type="number"
                  />
                  <p>breaths per minute</p>
                </span>
              </div>
              <div className="vitals-row">
                <div className="vitals-name">
                  {" "}
                  <label className="vitals-label" htmlFor="">
                    Blood Pressure
                  </label>
                </div>
                <span className="parameter">
                  <input
                    name="bloodPressure"
                    value={formData.vitals.bloodPressure}
                    onChange={handleChange}
                    id="bloodPressure"
                    type="text"
                  />
                  <p>mmHg</p>
                </span>
              </div>
              <div className="vitals-row">
                <div className="vitals-name">
                  {" "}
                  <label className="vitals-label" htmlFor="">
                    Blood Oxygen
                  </label>
                </div>
                <span className="parameter">
                  <input
                    min={0}
                    max={100}
                    id="bloodOxygen"
                    name="bloodOxygen"
                    value={formData.vitals.bloodOxygen}
                    onChange={handleChange}
                    type="number"
                  />
                  <p>PaO2</p>
                </span>
              </div>
              <div className="vitals-row">
                <div className="vitals-name">
                  {" "}
                  <label className="vitals-label" htmlFor="">
                    Weight
                  </label>
                </div>
                <span className="parameter">
                  <input
                    min={0}
                    max={500}
                    id="weight"
                    name="weight"
                    value={formData.vitals.weight}
                    onChange={handleChange}
                    type="number"
                  />
                  <p>kg</p>
                </span>
              </div>
              <div className="vitals-row">
                <div className="vitals-name">
                  <label className="vitals-label" htmlFor="">
                    Blood Glucose Level
                  </label>
                </div>
                <span className="parameter">
                  <input
                    id="bloodGlucoseLevel"
                    name="bloodGlucoseLevel"
                    value={formData.vitals.bloodGlucoseLevel}
                    onChange={handleChange}
                    type="text"
                  />
                  <p>mmol/L</p>
                </span>
              </div>
            </div>
          </section>

          <hr className="rule" />
          <section className="del">
            <div className="vitals">
              <div className="vitals-header">
                <h2 className="vitals-title">Daily Exercise Log</h2>
                <ChevronDown />
              </div>
              <p className="faa">Fill as applicable</p>
              <div className="vitals-list">
                <div className="vitals-row">
                  <div className="vitals-name">
                    <label className="vitals-label" htmlFor="">
                      Walking{" "}
                    </label>
                  </div>
                  <span className="parameter">
                    <input
                      min={1}
                      id="walking"
                      name="walking"
                      value={formData.exerciseLog.walking}
                      onChange={handleExerciseChange}
                      type="number"
                    />
                    <p>km</p>
                  </span>
                </div>
                <div className="vitals-row">
                  <div className="vitals-name">
                    {" "}
                    <label className="vitals-label" htmlFor="">
                      Jogging
                    </label>
                  </div>
                  <span className="parameter">
                    <input
                      min={1}
                      id="jogging"
                      name="jogging"
                      value={formData.exerciseLog.jogging}
                      onChange={handleExerciseChange}
                      type="number"
                    />
                    <p>km</p>
                  </span>
                </div>
                <div className="vitals-row">
                  <div className="vitals-name">
                    {" "}
                    <label className="vitals-label" htmlFor="">
                      Running
                    </label>
                  </div>
                  <span className="parameter">
                    <input
                      min={1}
                      id="running"
                      name="running"
                      value={formData.exerciseLog.running}
                      onChange={handleExerciseChange}
                      type="number"
                    />
                    <p>km</p>
                  </span>
                </div>
                <div className="vitals-row">
                  <div className="vitals-name">
                    {" "}
                    <label className="vitals-label" htmlFor="">
                      Cycling
                    </label>
                  </div>
                  <span className="parameter">
                    <input
                      min={1}
                      id="cycling"
                      name="cycling"
                      value={formData.exerciseLog.cycling}
                      onChange={handleExerciseChange}
                      type="number"
                    />
                    <p>km</p>
                  </span>
                </div>
                <div className="vitals-row">
                  <div className="vitals-name">
                    {" "}
                    <label className="vitals-label" htmlFor="">
                      Rope Skipping{" "}
                    </label>
                  </div>
                  <span className="parameter">
                    <input
                      min={1}
                      id="ropeSkipping"
                      name="ropeSkipping"
                      value={formData.exerciseLog.ropeSkipping}
                      onChange={handleExerciseChange}
                      type="number"
                    />
                    <p>counts</p>
                  </span>
                </div>
                <div className="vitals-row">
                  <div className="vitals-name">
                    {" "}
                    <label className="vitals-label" htmlFor="">
                      Yoga
                    </label>
                  </div>
                  <span className="parameter">
                    <input
                      min={1}
                      id="yoga"
                      name="yoga"
                      value={formData.exerciseLog.yoga}
                      onChange={handleExerciseChange}
                      type="number"
                    />
                    <p>mins</p>
                  </span>
                </div>
                <div className="vitals-row">
                  <div className="vitals-name">
                    {" "}
                    <label className="vitals-label" htmlFor="">
                      Dance
                    </label>
                  </div>
                  <span className="parameter">
                    <input
                      id="dance"
                      name="dance"
                      value={formData.exerciseLog.dance}
                      onChange={handleExerciseChange}
                      type="number"
                    />
                    <p>mins</p>
                  </span>
                </div>
              </div>
            </div>
            {/* <a className="vitals-label" id="ccb">
              Calculate calories burned
            </a> */}
          </section>
          <section id="submit" className="submit-info">
            <button className="button">Submit</button>
          </section>
        </form>
        <hr className="rule" />
        <section className="print-report">
          <h2 className="vitals-title">Print report</h2>
          {/* <div className="report-date">
            <div>
              <label htmlFor="">From</label>
              <input type="date" className="date-input" name="" id="" />
            </div>
            <div className="report-field">
              <label htmlFor="">To</label>
              <input type="date" className="date-input" name="" id="" />
            </div>
          </div> */}
          <Link to={"/report"}>
            <button className="">View Reports</button>
          </Link>
        </section>
      </main>
    </>
  );
};

export default Tracker;
