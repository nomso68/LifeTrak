import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "./Report-List.css";
import Funnel1 from "./Funnel1";
import Search1 from "./Search1";
import Doc1 from "./Doc1";
import BarChart4 from "./BarChart4";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";

const Report = ({ item, i }) => {
  return (
    <tr className="report-body">
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.vitals.bloodTemp || "-"}
      </td>
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.vitals.pulseRate || "-"}
      </td>
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.vitals.respRate || "-"}
      </td>
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.vitals.bloodPressure || "-"}
      </td>
      <td className={i % 2 === 0 ? "" : "even"}>
        {`${item.vitals.bloodOxygen}%` || "-"}
      </td>
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.vitals.bodyWeight ? `${item.vitals.bodyWeight}kg` : "-"}
      </td>
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.vitals.bloodGlucose ? `${item.vitals.bloodGlucose}mg/DL` : "-"}
      </td>
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.exerciseLog.walking ? `${item.exerciseLog.walking}km` : "-"}
      </td>
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.exerciseLog.jogging ? `${item.exerciseLog.jogging}km` : "-"}
      </td>
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.exerciseLog.running ? `${item.exerciseLog.running}km` : "-"}
      </td>
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.exerciseLog.cycling ? `${item.exerciseLog.cycling}km` : "-"}
      </td>
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.exerciseLog.skipping
          ? `${item.exerciseLog.skipping} counts`
          : "-"}
      </td>
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.exerciseLog.yoga ? calcTime(item.exerciseLog.yoga) : "-"}
      </td>
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.exerciseLog.dance ? calcTime(item.exerciseLog.dance) : "-"}
      </td>
    </tr>
  );
};

function calcTime(time) {
  if (time < 60) {
    let minOrHr = "min";
    return `${time} ${minOrHr}`;
  } else {
    let minOrHr = "hr";
    return `${(time / 60).toFixed(1)} ${minOrHr}`;
  }
}

const ReportDates = ({ item, i }) => {
  return (
    <tr>
      <td className={i % 2 === 0 ? "" : "even"}>
        {item.date.slice(0, 10) || "-"}
      </td>
    </tr>
  );
};

const ReportList = () => {
  const navigate = useNavigate();
  const [reportData, setreportData] = useState([]);
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
        console.log(data);

        setLoading(false);
        setreportData(data);
      } catch (error) {
        window.alert("Please Log In");
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
      item.vitals.bloodTemp || "-",
      item.vitals.pulseRate || "-",
      item.vitals.respRate || "-",
      item.vitals.bloodPressure || "-",
      `${item.vitals.bloodOxygen}%` || "-",
      item.vitals.bodyWeight ? `${item.vitals.bodyWeight}kg` : "-",
      item.vitals.bloodGlucose ? `${item.vitals.bloodGlucose}mg/DL` : "-",
      item.exerciseLog.walking ? `${item.exerciseLog.walking}km` : "-",
      item.exerciseLog.jogging ? `${item.exerciseLog.jogging}km` : "-",
      item.exerciseLog.running ? `${item.exerciseLog.running}km` : "-",
      item.exerciseLog.cycling ? `${item.exerciseLog.cycling}km` : "-",
      item.exerciseLog.skipping ? `${item.exerciseLog.skipping} counts` : "-",
      item.exerciseLog.yoga ? calcTime(item.exerciseLog.yoga) : "-",
      item.exerciseLog.dance ? calcTime(item.exerciseLog.dance) : "-",
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
              wrapperStyle={{}}
              wrapperClass=""
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
                    <option selected value="allTime">
                      All Time
                    </option>
                  </select>
                </div>
                <div>
                  <select name="to" id="to">
                    <option selected value="allTime">
                      All Time
                    </option>
                  </select>
                </div>
                <button className="funnel">
                  <Funnel1 />
                </button>
              </div>
              <div className="filters-right">
                {/* <div>
              <Search1 />
              <input type="text" id="search" placeholder="Search..." />
            </div> */}
                <button onClick={exportToExcel}>
                  <Doc1 />
                  <p className="export">Export PDF</p>
                </button>
                <button>
                  <BarChart4 />
                  <p className="export">Export Excel</p>
                </button>
              </div>
            </div>
            <div className="table-div">
              <table className="date-table">
                <thead>
                  <tr>
                    <th className="date-heading"> Date </th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item, index) => (
                    <ReportDates item={item} i={index} key={index} />
                  ))}
                </tbody>
              </table>
              <table className="">
                <thead>
                  <tr className="report-header">
                    <th>Blood Temp.</th>
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
                    <Report key={index} i={index} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

export default ReportList;
