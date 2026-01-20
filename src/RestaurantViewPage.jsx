import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

function RestaurantViewPage() {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        // 🔹 BACKEND CALL (replace with mock if not ready)
        const res = await api.get("/manager/tables");
        setTables(res.data);
      } catch (err) {
        console.warn("Using mock tables (API not ready)");

        // 🔸 MOCK DATA (SAFE FALLBACK)
        setTables([
          {
            groupCode: "grp-1",
            table: "T-1",
            status: "Active",
            guests: 4,
            total: 1200,
          },
          {
            groupCode: "grp-2",
            table: "T-2",
            status: "Pending",
            guests: 2,
            total: 650,
          },
          {
            groupCode: "grp-3",
            table: "T-3",
            status: "Active",
            guests: 6,
            total: 2100,
          },
          {
            groupCode: "grp-4",
            table: "T-4",
            status: "Closed",
            guests: 3,
            total: 890,
          },
        ]);
      }
    };

    fetchTables();
  }, []);

  const totalTables = tables.length;
  const active = tables.filter(t => t.status === "Active").length;
  const pending = tables.filter(t => t.status === "Pending").length;

  return (
    <div className="page">
      <div className="card">

        {/* HEADER */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ color: "#fff", marginBottom: 6 }}>
            Restaurant Tables
          </h1>
          <p className="subtitle">
            Select a table to view payment details
          </p>
        </div>

        {/* SUMMARY */}
        <div className="summary-row">
          <StatBox label="Total Tables" value={totalTables} />
          <StatBox label="Active" value={active} green />
          <StatBox label="Pending" value={pending} yellow />
        </div>

        {/* 🔥 TABLE GRID (IMAGE-LIKE LAYOUT) */}
        <div className="tables-grid">
          {tables.map(t => (
            <div
              key={t.groupCode}
              className="table-card"
              onClick={() =>
                navigate(`/manager/group/${t.groupCode}`)
              }
            >
              <div className="table-header">
                <span className="table-name">{t.table}</span>
                <span className={`status ${t.status}`}>
                  {t.status}
                </span>
              </div>

              <p>👥 Guests: {t.guests}</p>
              <p>💰 Total: ₹{t.total}</p>

              <button className="card-btn">
                View Details →
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ===== Helper Components ===== */

function StatBox({ label, value, green, yellow }) {
  const color = green
    ? "#3cff9a"
    : yellow
    ? "#ffb020"
    : "#fff";

  return (
    <div className="stat-box">
      <p>{label}</p>
      <h3 style={{ color }}>{value}</h3>
    </div>
  );
}

export default RestaurantViewPage;
