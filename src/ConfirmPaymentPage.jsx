import { useLocation, useNavigate } from "react-router-dom";
import api from "./api"; // adjust path if needed

function ConfirmPaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // safety guard
  if (!state) {
    return <p>Invalid access</p>;
  }

  const { billId, groupCode, amount } = state;
  const payerName = localStorage.getItem("name") || "Guest";
  const payerPhone = localStorage.getItem("phone") || "Unknown";

  const handlePayNow = async () => {
    try {
      await api.post(
        "/payment/confirm",
        {
          billId,
          groupCode,
          payerName,
          payerPhone,
        },
        {
          headers: {
            "idempotency-key": crypto.randomUUID()
          }
        }
      );
   console.log(groupCode, payerName, amount);
      navigate("/payment-success", {
        state: { amount }
      });
    } catch (err) {
      console.error(err);
      alert("Payment failed or already processed");
    }
  };

  const handleNotNow = async () => {
    try {
      await api.post("/payment/decline");
      navigate("/payment-pending", {
        state: { amount }
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update payment status");
    }
  };

  return (
    <div className="page">
      <div className="card">

        <div className="qr-icon">💳</div>

        <h2 className="qr-title">Confirm Payment</h2>
        <p className="subtitle">
          Do you want to pay your share now?
        </p>

        <div className="bill-box">
          <div className="row bold">
            <span>Amount to Pay</span>
            <span>₹{amount}</span>
          </div>
        </div>

        {/* PAY NOW */}
        <button onClick={handlePayNow}>
          ✔ Pay Now
        </button>

        {/* NOT NOW */}
        <button className="secondary" onClick={handleNotNow}>
          ✕ Not Now
        </button>

        <p className="info">
          You can pay anytime before the bill closes
        </p>

      </div>
    </div>
  );
}

export default ConfirmPaymentPage;
