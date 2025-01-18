import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "./Report-List.css";
import Funnel1 from "./Funnel1";
import Doc1 from "./Doc1";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";

function calcTime(time) {
  if (time < 60) {
    return `${time} min`;
  } else {
    return `${(time / 60).toFixed(1)} hr`;
  }
}

const Report = ({ item, i }) => {
  return (
    <tr className="report-body">
      <td className={i % 2 === 0 ? "" : "even"}>{item.vitals.bloodTemp}</td>
      <td className={i % 2 === 0 ? "" : "even"}>{item.vitals.pulseRate}</td>
      <td className={i % 2 === 0 ? "" : "even"}>{item.vitals.respRate}</td>
      <td className={i % 2 === 0 ? "" : "even"}>{item.vitals.bloodPressure}</td>
      <td className={i % 2 === 0 ? "" : "even"}>{item.vitals.bloodOxygen}</td>
      <td className={i % 2 === 0 ? "" : "even"}>{item.vitals.bodyWeight}</td>
      <td className={i % 2 === 0 ? "" : "even"}>{item.vitals.bloodGlucose}</td>
      <td className={i % 2 === 0 ? "" : "even"}>{item.exerciseLog.walking}</td>
      <td className={i % 2 === 0 ? "" : "even"}>{item.exerciseLog.jogging}</td>
      <td className={i % 2 === 0 ? "" : "even"}>{item.exerciseLog.running}</td>
      <td className={i % 2 === 0 ? "" : "even"}>{item.exerciseLog.cycling}</td>
      <td className={i % 2 === 0 ? "" : "even"}>{item.exerciseLog.skipping}</td>
      <td className={i % 2 === 0 ? "" : "even"}>{item.exerciseLog.yoga}</td>
      <td className={i % 2 === 0 ? "" : "even"}>{item.exerciseLog.dance}</td>
    </tr>
  );
};

const ReportDates = ({ item, i }) => {
  return (
    <tr>
      <td className={i % 2 === 0 ? "" : "even"}>{item.date.slice(0, 10)}</td>
    </tr>
  );
};

const ReportList = () => {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://lifetrak.onrender.com/api/healthstats",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.log(response);
          localStorage.removeItem("user");
          navigate("/login");
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched Data:", data);

        const formattedData = data.map((item) => ({
          date: item.date || "N/A",
          vitals: {
            bloodTemp: item.vitals?.bodyTemperature || "N/A",
            pulseRate: item.vitals?.pulseRate || "N/A",
            respRate: item.vitals?.respirationRate || "N/A",
            bloodPressure: item.vitals?.bloodPressure || "N/A",
            bloodOxygen: item.vitals?.bloodOxygen || "N/A",
            bodyWeight: item.vitals?.weight || "N/A",
            bloodGlucose: item.vitals?.bloodGlucose || "N/A",
          },
          exerciseLog: {
            walking: item.exerciseLog?.walking || "N/A",
            jogging: item.exerciseLog?.jogging || "N/A",
            running: item.exerciseLog?.running || "N/A",
            cycling: item.exerciseLog?.cycling || "N/A",
            skipping: item.exerciseLog?.ropeSkipping || "N/A",
            yoga: item.exerciseLog?.yoga || "N/A",
            dance: item.exerciseLog?.dance || "N/A",
          },
        }));

        setReportData(formattedData);
      } catch (error) {
        window.alert("Please Log In");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const exportToExcel = () => {
    const headers = [
      "Blood Temp.",
      "Pulse Rate",
      "Resp. Rate",
      "Blood Pressure",
      "Blood Oxygen",
      "Body Weight",
      "Blood Glucose",
      "Walking",
      "Jogging",
      "Running",
      "Cycling",
      "Skipping",
      "Yoga",
      "Dance",
    ];

    const rows = reportData.map((item) => [
      item.vitals.bloodTemp,
      item.vitals.pulseRate,
      item.vitals.respRate,
      item.vitals.bloodPressure,
      item.vitals.bloodOxygen,
      item.vitals.bodyWeight,
      item.vitals.bloodGlucose,
      item.exerciseLog.walking,
      item.exerciseLog.jogging,
      item.exerciseLog.running,
      item.exerciseLog.cycling,
      item.exerciseLog.skipping,
      item.exerciseLog.yoga,
      item.exerciseLog.dance,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report Data");
    XLSX.writeFile(wb, "ReportData.xlsx");
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
              visible={true}
            />
          </div>
        ) : (
          <div>
            <h1 className="report-heading">Report List</h1>
            <div className="filters">
              <div className="filters-left">
                <div>
                  <select name="from" id="from">
                    <option value="allTime">All Time</option>
                  </select>
                </div>
                <div>
                  <select name="to" id="to">
                    <option value="allTime">All Time</option>
                  </select>
                </div>
                <button className="funnel">
                  <Funnel1 />
                </button>
              </div>
              <div className="filters-right">
                <button onClick={exportToExcel}>
                  <Doc1 />
                  <p className="export">Export Excel</p>
                </button>
              </div>
            </div>
            <div className="table-div">
              <table className="date-table">
                <thead>
                  <tr>
                    <th className="date-heading">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item, index) => (
                    <ReportDates key={index} item={item} i={index} />
                  ))}
                </tbody>
              </table>
              <table>
                <thead>
                  <tr className="report-header">
                    <th>Body Temp.</th>
                    <th>Pulse Rate</th>
                    <th>Resp. Rate</th>
                    <th>Blood Pressure</th>
                    <th>Blood Oxygen</th>
                    <th>Body Weight</th>
                    <th>Blood Glucose</th>
                    <th>Walking</th>
                    <th>Jogging</th>
                    <th>Running</th>
                    <th>Cycling</th>
                    <th>Skipping</th>
                    <th>Yoga</th>
                    <th>Dance</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item, index) => (
                    <Report key={index} item={item} i={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportList;
