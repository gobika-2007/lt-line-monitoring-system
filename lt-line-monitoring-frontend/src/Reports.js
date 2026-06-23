import React, { useEffect, useState } from "react";
import axios from "axios";

function Reports() {
  const [faults, setFaults] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("https://lt-line-monitoring-system.onrender.com/api/faults");
      setFaults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalFaults = faults.length;

  const activeFaults = faults.filter(
    (fault) => fault.status === "Active"
  ).length;

  const resolvedFaults = faults.filter(
    (fault) => fault.status === "Resolved"
  ).length;

  const systemHealth =
    totalFaults === 0
      ? 100
      : Math.round((resolvedFaults / totalFaults) * 100);

  const monthlyData = {};

  faults.forEach((fault) => {
    const month = new Date(fault.timestamp).toLocaleString(
      "default",
      { month: "long" }
    );

    if (!monthlyData[month]) {
      monthlyData[month] = {
        faults: 0,
      };
    }

    monthlyData[month].faults++;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>📊 System Reports & Analytics</h1>

      <p style={{ color: "#cbd5e1" }}>
        LT Line Monitoring Performance Overview
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Faults</h3>
          <h1>{totalFaults}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Resolved Faults</h3>
          <h1>{resolvedFaults}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Active Faults</h3>
          <h1>{activeFaults}</h1>
        </div>

        <div style={cardStyle}>
          <h3>System Health</h3>
          <h1>{systemHealth}%</h1>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          background: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
        }}
      >
        <h2>⚡ Monthly Performance Summary</h2>

        <table
  style={{
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
    backgroundColor: "white",
    color: "#1e293b",
  }}
>
          <thead>
            <tr>
              <th style={thStyle}>Month</th>
              <th style={thStyle}>Faults</th>
              <th style={thStyle}>Efficiency</th>
            </tr>
          </thead>

          <tbody>

                        {Object.keys(monthlyData).length > 0 ? (
              Object.keys(monthlyData).map((month) => (
                <tr key={month}>
                  <td style={tdStyle}>{month}</td>

                  <td style={tdStyle}>
                    {monthlyData[month].faults}
                  </td>

                  <td style={tdStyle}>
                    {Math.max(
                      0,
                      100 - monthlyData[month].faults * 2
                    )}
                    %
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No report data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => window.print()}
        >
          📄 Download Report
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "15px",
  textAlign: "center",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
};

const thStyle = {
  background: "#2563eb",
  color: "white",
  padding: "12px",
  border: "1px solid #475569",
};

const tdStyle = {
  background: "#ffffff",
  color: "#1e293b",
  padding: "12px",
  textAlign: "center",
  border: "1px solid #cbd5e1",
};

export default Reports;