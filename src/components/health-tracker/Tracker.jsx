import { useEffect, useState, useContext } from "react";
import "./Tracker.css";
import Bell1 from "./Bell1";
import ChevronDown from "./ChevronDown";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthContext";
import { Circles } from "react-loader-spinner";

const Tracker = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);
  console.log(userInfo);
  // console.log(userHealthInfo);
  const userId = userInfo?.userId;
  console.log(userId);
  const [patientName, setPatientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
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

  useEffect(() => {
    const fetchDashboard = async () => {
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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setLoading(false);
        setPatientName(data.fullname);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching dashboard data:", err);
        alert("Access Denied. Please log in again.");
        navigate("/login");
      }
    };

    fetchDashboard();
  }, [navigate]);

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    if (userId) {
      setFormData((prevState) => ({
        ...prevState,
        userId,
      }));
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [category, key] = name.split(".");

    if (category === "vitals" || category === "exerciseLog") {
      setFormData((prevState) => ({
        ...prevState,
        [category]: {
          ...prevState[category],
          [key]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Convert string values to numbers where applicable
      const convertedFormData = {
        ...formData,
        vitals: {
          ...formData.vitals,
          bodyTemperature: formData.vitals.bodyTemperature
            ? parseFloat(formData.vitals.bodyTemperature)
            : null,
          pulseRate: formData.vitals.pulseRate
            ? parseInt(formData.vitals.pulseRate, 10)
            : null,
          respirationRate: formData.vitals.respirationRate
            ? parseInt(formData.vitals.respirationRate, 10)
            : null,
          bloodOxygen: formData.vitals.bloodOxygen
            ? parseFloat(formData.vitals.bloodOxygen)
            : null,
          weight: formData.vitals.weight
            ? parseFloat(formData.vitals.weight)
            : null,
          bloodGlucoseLevel: formData.vitals.bloodGlucoseLevel
            ? parseFloat(formData.vitals.bloodGlucoseLevel)
            : null,
        },
        exerciseLog: {
          ...formData.exerciseLog,
          walking: formData.exerciseLog.walking
            ? parseFloat(formData.exerciseLog.walking)
            : null,
          jogging: formData.exerciseLog.jogging
            ? parseFloat(formData.exerciseLog.jogging)
            : null,
          running: formData.exerciseLog.running
            ? parseFloat(formData.exerciseLog.running)
            : null,
          cycling: formData.exerciseLog.cycling
            ? parseFloat(formData.exerciseLog.cycling)
            : null,
          ropeSkipping: formData.exerciseLog.ropeSkipping
            ? parseInt(formData.exerciseLog.ropeSkipping, 10)
            : null,
          yoga: formData.exerciseLog.yoga
            ? parseInt(formData.exerciseLog.yoga, 10)
            : null,
          dance: formData.exerciseLog.dance
            ? parseInt(formData.exerciseLog.dance, 10)
            : null,
        },
      };

      const data = {
        ...convertedFormData,
        date: selectedDate || new Date().toISOString().split("T")[0],
      };

      console.log("Payload Data:", JSON.stringify(data, null, 2));

      const response = await fetch(
        "https://lifetrak.onrender.com/api/healthstats",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Backend Error Details:", errorDetails);
        throw new Error(errorDetails.message || "Failed to log health stats");
      }
      setSubmitting(false);
      alert("Health stats logged successfully!");
      navigate("/report");

      setFormData({
        userId,
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

      setSelectedDate("");
    } catch (err) {
      setSubmitting(false);
      console.error("Error logging health stats:", err);
    }
  };

  return (
    <div className="main-tracker">
      <div className="trackerbg">
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
            <form action="" onSubmit={handleSubmit}>
              <section className="hayft">
                <div className="a1">
                  <h1 className="tracker-title">
                    How are you feeling today?{" "}
                    <span className="patient-name">{patientName}</span>
                  </h1>
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
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="date-input"
                    placeholder="DD/MM/YYYY"
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
                      <label className="vitals-label" htmlFor="bodyTemperature">
                        Body Temperature (Expected: 36.1°C - 37.2°C)
                      </label>
                    </div>
                    <span className="parameter">
                      <input
                        type="number"
                        name="vitals.bodyTemperature"
                        id="bodyTemperature"
                        placeholder="e.g., 36.8"
                        value={formData.vitals.bodyTemperature}
                        onChange={handleInputChange}
                      />
                      <p>°C</p>
                    </span>
                  </div>

                  <div className="vitals-row">
                    <div className="vitals-name">
                      <label className="vitals-label" htmlFor="pulseRate">
                        Pulse Rate (Normal: 60-100 beats/min)
                      </label>
                    </div>
                    <span className="parameter">
                      <input
                        type="number"
                        name="vitals.pulseRate"
                        id="pulseRate"
                        placeholder="e.g., 72"
                        value={formData.vitals.pulseRate}
                        onChange={handleInputChange}
                      />
                      <p>beats per minute</p>
                    </span>
                  </div>

                  <div className="vitals-row">
                    <div className="vitals-name">
                      <label className="vitals-label" htmlFor="respirationRate">
                        Respiration Rate (Normal: 12-20 breaths/min)
                      </label>
                    </div>
                    <span className="parameter">
                      <input
                        type="number"
                        name="vitals.respirationRate"
                        id="respirationRate"
                        placeholder="e.g., 16"
                        value={formData.vitals.respirationRate}
                        onChange={handleInputChange}
                      />
                      <p>breaths per minute</p>
                    </span>
                  </div>

                  <div className="vitals-row">
                    <div className="vitals-name">
                      <label className="vitals-label" htmlFor="bloodPressure">
                        Blood Pressure (Normal: 120/80 mmHg)
                      </label>
                    </div>
                    <span className="parameter">
                      <input
                        type="text"
                        name="vitals.bloodPressure"
                        id="bloodPressure"
                        placeholder="e.g., 120/80"
                        value={formData.vitals.bloodPressure}
                        onChange={handleInputChange}
                      />
                      <p>mmHg</p>
                    </span>
                  </div>

                  <div className="vitals-row">
                    <div className="vitals-name">
                      <label className="vitals-label" htmlFor="bloodOxygen">
                        Blood Oxygen (Normal: 95%-100%)
                      </label>
                    </div>
                    <span className="parameter">
                      <input
                        type="number"
                        name="vitals.bloodOxygen"
                        id="bloodOxygen"
                        placeholder="e.g., 98"
                        value={formData.vitals.bloodOxygen}
                        onChange={handleInputChange}
                      />
                      <p>%</p>
                    </span>
                  </div>

                  <div className="vitals-row">
                    <div className="vitals-name">
                      <label className="vitals-label" htmlFor="weight">
                        Weight (Enter in kg)
                      </label>
                    </div>
                    <span className="parameter">
                      <input
                        type="number"
                        name="vitals.weight"
                        id="weight"
                        placeholder="e.g., 70"
                        value={formData.vitals.weight}
                        onChange={handleInputChange}
                      />
                      <p>kg</p>
                    </span>
                  </div>

                  <div className="vitals-row">
                    <div className="vitals-name">
                      <label
                        className="vitals-label"
                        htmlFor="bloodGlucoseLevel"
                      >
                        Blood Glucose Level (Normal: 4.0-5.4 mmol/L)
                      </label>
                    </div>
                    <span className="parameter">
                      <input
                        type="number"
                        name="vitals.bloodGlucoseLevel"
                        id="bloodGlucoseLevel"
                        placeholder="e.g., 5.1"
                        value={formData.vitals.bloodGlucoseLevel}
                        onChange={handleInputChange}
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
                          Walking - Distance covered while walking (Recommended:
                          3–5 km per day)
                        </label>
                      </div>
                      <span className="parameter">
                        <input
                          type="number"
                          name="exerciseLog.walking"
                          value={formData.exerciseLog.walking}
                          onChange={handleInputChange}
                        />
                        <p>km</p>
                      </span>
                    </div>
                    <div className="vitals-row">
                      <div className="vitals-name">
                        <label className="vitals-label" htmlFor="">
                          Jogging - Distance covered while jogging (Recommended:
                          2–4 km per day)
                        </label>
                      </div>
                      <span className="parameter">
                        <input
                          type="number"
                          name="exerciseLog.jogging"
                          value={formData.exerciseLog.jogging}
                          onChange={handleInputChange}
                        />
                        <p>km</p>
                      </span>
                    </div>
                    <div className="vitals-row">
                      <div className="vitals-name">
                        <label className="vitals-label" htmlFor="">
                          Running - Distance covered while running (Recommended:
                          1–3 km per day)
                        </label>
                      </div>
                      <span className="parameter">
                        <input
                          type="number"
                          name="exerciseLog.running"
                          value={formData.exerciseLog.running}
                          onChange={handleInputChange}
                        />
                        <p>km</p>
                      </span>
                    </div>
                    <div className="vitals-row">
                      <div className="vitals-name">
                        <label className="vitals-label" htmlFor="">
                          Cycling - Distance covered while cycling (Recommended:
                          5–10 km per session)
                        </label>
                      </div>
                      <span className="parameter">
                        <input
                          type="number"
                          name="exerciseLog.cycling"
                          value={formData.exerciseLog.cycling}
                          onChange={handleInputChange}
                        />
                        <p>km</p>
                      </span>
                    </div>
                    <div className="vitals-row">
                      <div className="vitals-name">
                        <label className="vitals-label" htmlFor="">
                          Rope Skipping - Number of skips (Recommended: 50–200
                          skips per session)
                        </label>
                      </div>
                      <span className="parameter">
                        <input
                          type="number"
                          name="exerciseLog.ropeSkipping"
                          value={formData.exerciseLog.ropeSkipping}
                          onChange={handleInputChange}
                        />
                        <p>counts</p>
                      </span>
                    </div>
                    <div className="vitals-row">
                      <div className="vitals-name">
                        <label className="vitals-label" htmlFor="">
                          Yoga Time spent practicing yoga (Recommended: 15–60
                          minutes per session)
                        </label>
                      </div>
                      <span className="parameter">
                        <input
                          type="number"
                          name="exerciseLog.yoga"
                          value={formData.exerciseLog.yoga}
                          onChange={handleInputChange}
                        />
                        <p>mins</p>
                      </span>
                    </div>
                    <div className="vitals-row">
                      <div className="vitals-name">
                        <label className="vitals-label" htmlFor="">
                          Dance - Time spent dancing (Recommended: 20–45 minutes
                          per session)
                        </label>
                      </div>
                      <span className="parameter">
                        <input
                          type="number"
                          name="exerciseLog.dance"
                          value={formData.exerciseLog.dance}
                          onChange={handleInputChange}
                        />
                        <p>mins</p>
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <section id="tracker_submit" className="submit-info">
                <button className="button">
                  {!submitting ? (
                    "Submit"
                  ) : (
                    <div className="loader2">
                      <Circles
                        height="40"
                        width="40"
                        color="#fff"
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  )}
                </button>
                <Link to={"/report"}>
                  <button className="report_button">View Reports</button>
                </Link>
                <Link to={"/health-stats"}>
                  <button className="report_button">View All Reports</button>
                </Link>
              </section>
            </form>
            {/* <hr className="rule" />
            <section className="print-report">
              <h2 className="vitals-title">Print report</h2>
            </section> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracker;
