import { useLocation, useNavigate } from "react-router-dom";

function PaymentPendingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p>Invalid access</p>;
  }

  const { amount, groupCode } = state;

  return (
    <div className="page">
      <div className="card">

        <div className="qr-icon">⏳</div>

        <h2 className="qr-title">Payment Pending</h2>
        <p className="subtitle">
          You can complete your payment anytime before the bill closes.
        </p>

        <div className="info" style={{ color: "#ff5c5c", fontWeight: 700 }}>
          ● UNPAID
        </div>

        <div className="bill-box">
          <div className="row">
            <span>Amount Due</span>
            <span>₹{amount}</span>
          </div>
        </div>

        <button onClick={() => navigate(`/group/${groupCode}`)}>
          View Group Status →
        </button>

      </div>
    </div>
  );
}

export default PaymentPendingPage;
