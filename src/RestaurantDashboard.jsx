import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";

function RestaurantDashboard() {
  const navigate = useNavigate();
  const { groupCode } = useParams();

  const [bill, setBill] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await api.get(`/bill/${groupCode}`);
        setBill(res.data);
        setParticipants(res.data.participants);
      } catch (err) {
        console.error(err);
        alert("Failed to load group data");
      }
    };

    fetchGroup();
  }, [groupCode]);

  if (!bill) return <p>Loading…</p>;

  const total = bill.total;
  const collected = participants
    .filter(p => p.status === "PAID")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const pending = total - collected;

  return (
    <div className="page">
      <div className="card group-card">

        {/* HEADER */}
        <div className="header-row">
          <h2>Restaurant Dashboard</h2>
          <span className="manager-badge">● Manager</span>
        </div>

        {/* SUMMARY */}
        <div className="summary-grid">
          <SummaryBox title="Group Code" value={groupCode} icon="🍽️" />
          <SummaryBox title="Total Bill" value={`₹${total}`} icon="💰" />
          <SummaryBox title="Collected" value={`₹${collected}`} icon="✅" green />
          <SummaryBox title="Pending" value={`₹${pending}`} icon="❌" red />
        </div>

        {/* TABLE */}
        <div className="bill-box">
          <div className="row header">
            <span>Name</span>
            <span>Phone</span>
            <span>Amount</span>
            <span>Status</span>
          </div>

          {participants.map(p => (
            <PaymentRow
              key={p.id}
              name={p.payer_name || "-"}
              phone={p.phone}
              amount={`₹${p.amount}`}
              status={p.status}
            />
          ))}
        </div>

        <button
          className="secondary"
          onClick={() => navigate("/manager")}
        >
          ← Back
        </button>

      </div>
    </div>
  );
}

/* ===== Helpers ===== */

function SummaryBox({ title, value, icon, green, red }) {
  const color = green ? "#3cff9a" : red ? "#ff6b6b" : "#ffb020";
  return (
    <div className="summary-box">
      <div style={{ color }}>{icon}</div>
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}

function PaymentRow({ name, phone, amount, status }) {
  const paid = status === "PAID";
  return (
    <div className="row">
      <span>{name}</span>
      <span>{phone}</span>
      <span>{amount}</span>
      <span className={paid ? "paid" : "unpaid"}>
        {paid ? "✔ Paid" : "✖ Unpaid"}
      </span>
    </div>
  );
}

export default RestaurantDashboard;
