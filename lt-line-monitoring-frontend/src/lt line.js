import React from "react";

function Reports() {
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
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Faults</h3>
          <h1>12</h1>
        </div>

        <div style={cardStyle}>
          <h3>Resolved Faults</h3>
          <h1>11</h1>
        </div>

        <div style={cardStyle}>
          <h3>Active Faults</h3>
          <h1>1</h1>
        </div>

        <div style={cardStyle}>
          <h3>System Health</h3>
          <h1>98%</h1>
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
            marginTop: "15px",
            borderCollapse: "collapse",
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
            <tr>
              <td style={tdStyle}>January</td>
              <td style={tdStyle}>3</td>
              <td style={tdStyle}>99%</td>
            </tr>

            <tr>
              <td style={tdStyle}>February</td>
              <td style={tdStyle}>2</td>
              <td style={tdStyle}>98%</td>
            </tr>

            <tr>
              <td style={tdStyle}>March</td>
              <td style={tdStyle}>4</td>
              <td style={tdStyle}>97%</td>
            </tr>

            <tr>
              <td style={tdStyle}>April</td>
              <td style={tdStyle}>3</td>
              <td style={tdStyle}>98%</td>
            </tr>
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
        >
          Download Report
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
};

const thStyle = {
  background: "#334155",
  padding: "12px",
};

const tdStyle = {
  padding: "12px",
  textAlign: "center",
};

export default Reports;