import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FaultHistory.css";

function FaultHistory() {
  const [faults, setFaults] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch faults from MongoDB
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

    const interval = setInterval(() => {
      fetchFaults();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Delete Fault
  const deleteFault = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fault?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://lt-line-monitoring-system.onrender.com/api/faults/${id}`
      );

      alert("Fault Deleted Successfully");

      fetchFaults();
    } catch (error) {
      console.error(error);
      alert("Unable to delete fault");
    }
  };

  // Search & Filter
  const filteredFaults = faults.filter((fault) => {
    const location = fault.location || "";
    const status = fault.status || "";

    const matchesSearch = location
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fault-page">

      <h1>⚡ Fault History</h1>

      {/* Search & Filter */}

      <div className="toolbar">

        <input
          type="text"
          placeholder="Search by Location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Resolved">Resolved</option>
        </select>

      </div>

      {/* Table */}

      <table>

        <thead>

          <tr>
            <th>Location</th>
            <th>Voltage</th>
            <th>Current</th>
            <th>Status</th>
            <th>Date & Time</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {filteredFaults.length > 0 ? (

            filteredFaults.map((fault) => (

              <tr key={fault._id}>

                <td>{fault.location}</td>

                <td>{fault.voltage} V</td>

                <td>{fault.current} A</td>

                <td>

                  <span
                    className={
                      fault.status === "Active"
                        ? "active"
                        : "resolved"
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

                <td>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteFault(fault._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="6">
                No Fault Records Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default FaultHistory;