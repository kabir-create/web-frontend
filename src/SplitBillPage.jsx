import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api"; // adjust path if needed

function SplitBillPage() {
  const navigate = useNavigate();

  const [groupCode, setGroupCode] = useState("");
  const [totalBill, setTotalBill] = useState("");
  const [people, setPeople] = useState(2);
  const [loading, setLoading] = useState(false);

  const perPerson =
    totalBill && people ? Math.round(Number(totalBill) / people) : 0;

  const handleConfirm = async () => {
    if (!groupCode || groupCode.length < 3) {
      alert("Enter a valid group code");
      return;
    }

    if (!totalBill || Number(totalBill) <= 0) {
      alert("Enter a valid bill amount");
      return;
    }

    if (people < 2) {
      alert("At least 2 people are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/bill/create", {
        groupCode,
        totalAmount: Number(totalBill),
        numberOfUsers: people
      });

      const { billId, splitAmount, qr } = res.data;

      navigate("/preview", {
        state: {
          billId,
          groupCode,
          splitAmount,
          totalBill: Number(totalBill),
          people,
          qr
        }
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create bill. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card split-card">

        <div className="qr-icon">👥</div>

        <h2 className="qr-title">Create Group Bill</h2>
        <p className="subtitle">
          Enter group code and bill details
        </p>

        {/* GROUP CODE INPUT */}
        <input
          className="input"
          placeholder="Enter group code (e.g. trip-goa)"
          value={groupCode}
          onChange={(e) => setGroupCode(e.target.value)}
        />

        {/* TOTAL BILL */}
        <input
          className="input"
          type="number"
          placeholder="Enter total bill amount"
          value={totalBill}
          onChange={(e) => setTotalBill(e.target.value)}
        />

        {/* PEOPLE */}
        <select
          className="dropdown"
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
        >
          <option value={2}>2 people</option>
          <option value={3}>3 people</option>
          <option value={4}>4 people</option>
          <option value={5}>5 people</option>
          <option value={6}>6 people</option>
        </select>

        {/* PREVIEW */}
        <div className="bill-box">
          <div className="row">
            <span>Total Bill</span>
            <span>₹{totalBill || 0}</span>
          </div>

          <div className="row">
            <span>Split Between</span>
            <span>{people} people</span>
          </div>

          <div className="row bold">
            <span>Per Person</span>
            <span>₹{perPerson}</span>
          </div>
        </div>

        <button
          className="confirm"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Creating Bill..." : "Generate QR"}
        </button>

      </div>
    </div>
  );
}

export default SplitBillPage;
