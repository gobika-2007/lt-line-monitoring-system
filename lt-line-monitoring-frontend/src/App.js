import React, { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import FaultHistory from "./FaultHistory";
import Reports from "./Reports";

import {
  FaHome,
  FaHistory,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div>
      {/* Navigation Bar */}
      <nav
        style={{
          background: "#0f172a",
          color: "white",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <h2>⚡ LT Line Monitoring System</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={navButton}
            onClick={() => setPage("dashboard")}
          >
            <FaHome /> &nbsp; Dashboard
          </button>

          <button
            style={navButton}
            onClick={() => setPage("history")}
          >
            <FaHistory /> &nbsp; Fault History
          </button>

          <button
            style={navButton}
            onClick={() => setPage("reports")}
          >
            <FaChartBar /> &nbsp; Reports
          </button>

          <button
            style={{
              ...navButton,
              backgroundColor: "#ef4444",
            }}
            onClick={() => {
              setLoggedIn(false);
              setPage("dashboard");
            }}
          >
            <FaSignOutAlt /> &nbsp; Logout
          </button>
        </div>
      </nav>

      {/* Page Content */}
      {page === "dashboard" && <Dashboard />}
      {page === "history" && <FaultHistory />}
      {page === "reports" && <Reports />}
    </div>
  );
}

const navButton = {
  display: "flex",
  alignItems: "center",
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: "#2563eb",
  color: "white",
  fontWeight: "bold",
  fontSize: "14px",
};

export default App;