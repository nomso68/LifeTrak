import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Circles } from "react-loader-spinner";

const ReportList = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://lifetrak.onrender.com/api/all-healthstats",
          {
            method: "GET",
            credentials: "include", // Include cookies if needed
            // headers: {
            //   "Content-Type": "application/json",
            //   "x-secret-code": "123456", // Include the secret code here
            // },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        const formattedData = data.map((item) => ({
          date: item.date || "N/A",
          vitals: {
            bloodTemp: item.vitals?.bodyTemperature || "N/A",
            pulseRate: item.vitals?.pulseRate || "N/A",
            respRate: item.vitals?.respirationRate || "N/A",
            bloodPressure: item.vitals?.bloodPressure || "N/A",
            bloodOxygen: item.vitals?.bloodOxygen || "N/A",
            bodyWeight: item.vitals?.weight || "N/A",
            bloodGlucose: item.vitals?.bloodGlucoseLevel || "N/A",
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
        console.error("Error fetching report data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const exportToExcel = () => {
    const headers = [
      "Date",
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
      item.date,
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

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "HealthStats");
    XLSX.writeFile(workbook, "HealthStatsReport.xlsx");
  };

  return (
    <div className="report-list">
      {loading ? (
        <div className="loader">
          <Circles height="40" width="40" color="#02035d" ariaLabel="loading" />
        </div>
      ) : (
        <div>
          <h1>Health Stats Report</h1>
          <button onClick={exportToExcel} className="export-button">
            Export to Excel
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportList;
