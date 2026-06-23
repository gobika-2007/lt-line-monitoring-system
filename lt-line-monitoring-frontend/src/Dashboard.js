import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartSection from "./ChartSection";
import "./Dashboard.css";

function Dashboard() {
  const [faults, setFaults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all faults from MongoDB
  const fetchFaults = async () => {
    try {
      const response = await axios.get(
  "https://lt-line-monitoring-system.onrender.com/api/faults"
);
      setFaults(response.data);
    } catch (error) {
      console.error("Error fetching faults:", error);
    }
  };

  useEffect(() => {
    fetchFaults();

    // Auto refresh every 5 seconds
    const interval = setInterval(() => {
      fetchFaults();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate a fault
  const simulateFault = async () => {
    setLoading(true);

    const faultData = {
      location: "LT Line - Zone A",
      voltage: Math.floor(Math.random() * 25) + 220,
      current: Math.floor(Math.random() * 5) + 2,
      status: "Active",
    };

    try {
      await axios.post(
  "http://localhost:5000/api/faults",
  faultData
);

      alert("⚡ Fault Saved Successfully!");

      fetchFaults();
    } catch (error) {
      console.error(error);
      alert("Failed to save fault");
    }

    setLoading(false);
  };

  const activeFaults = faults.filter(
    (fault) => fault.status === "Active"
  ).length;

  const resolvedFaults = faults.filter(
    (fault) => fault.status === "Resolved"
  ).length;

  return (
    <div className="dashboard">

      <h1 className="title">
        ⚡ LT Line Monitoring Dashboard
      </h1>

      {/* Statistics Cards */}

      <div className="cards">

        <div className="card">
          <h3>Total Faults</h3>
          <h1>{faults.length}</h1>
        </div>

        <div className="card">
          <h3>Active Faults</h3>
          <h1>{activeFaults}</h1>
        </div>

        <div className="card">
          <h3>Resolved Faults</h3>
          <h1>{resolvedFaults}</h1>
        </div>

        <div className="card">
          <h3>System Status</h3>
          <h1 className="online">ONLINE</h1>
        </div>

      </div>

      {/* Simulate Button */}

      <div className="simulate">

        <button
          className="simulate-btn"
          onClick={simulateFault}
        >
          {loading ? "Saving..." : "⚡ Simulate Fault"}
        </button>

      </div>

      {/* Charts */}

      <ChartSection />

      {/* Recent Faults */}

      <div className="recent">

        <h2>Recent Fault Alerts</h2>

        <table>

          <thead>

            <tr>
              <th>Location</th>
              <th>Voltage</th>
              <th>Current</th>
              <th>Status</th>
              <th>Time</th>
            </tr>

          </thead>

          <tbody>

            {faults.length > 0 ? (
              faults.slice(0, 5).map((fault) => (
                <tr key={fault._id}>
                  <td>{fault.location}</td>

                  <td>{fault.voltage} V</td>

                  <td>{fault.current} A</td>

                  <td>
                    <span
                      className={
                        fault.status === "Active"
                          ? "status active"
                          : "status resolved"
                      }
                    >
                      {fault.status}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      fault.timestamp
                    ).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  No Faults Available
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;